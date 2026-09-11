"use client";

import { useEffect, useRef, useState } from "react";
import { getHandMetrics } from "../../lib/hand/handMetrics";
import { demoVaari, estimateVaari, type VaariEstimate } from "../../lib/hand/vaariModel";
import { guideCopy, validateHandInGuide } from "../../lib/hand/handValidation";

type Landmark = { x: number; y: number; z?: number };

export function HandCalibration({ onComplete, onDemo }: { onComplete: (value: VaariEstimate) => void; onDemo: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("Preparing camera…");
  const [error, setError] = useState("");
  const [estimate, setEstimate] = useState<VaariEstimate | null>(null);

  useEffect(() => {
    let active = true;
    let frame = 0;
    let stream: MediaStream | undefined;
    let tracker: { close?: () => void } | undefined;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 960 }, height: { ideal: 640 } },
          audio: false,
        });
        if (!active || !videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatus("Looking for hand…");

        // MediaPipe logs this informational TFLite delegate message through console.error.
        // Suppress only that known non-error while its model initializes, preserving real errors.
        const originalConsoleError = console.error;
        console.error = (...args: unknown[]) => {
          if (args.some((arg) => String(arg).includes("Created TensorFlow Lite XNNPACK delegate for CPU"))) return;
          originalConsoleError(...args);
        };
        try {
          const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
          const files = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
          tracker = await HandLandmarker.createFromOptions(files, {
            baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task" },
            runningMode: "VIDEO",
            numHands: 2,
          });
        } finally {
          console.error = originalConsoleError;
        }

        let stableFrames = 0;
        const stableSamples: VaariEstimate[] = [];
        let captured = false;
        const tick = () => {
          if (!active || !videoRef.current || !canvasRef.current || !tracker) return;
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const detection = (tracker as { detectForVideo: (input: HTMLVideoElement, time: number) => { landmarks: Landmark[][] } }).detectForVideo(video, performance.now());
            if (detection.landmarks.length > 1) {
              stableFrames = 0;
              setStatus("Oru kai mathi.");
            } else if (detection.landmarks[0]) {
              const guideState = validateHandInGuide(detection.landmarks[0]);
              if (guideState !== "READY") { stableFrames = 0; stableSamples.length = 0; setStatus(guideCopy[guideState]); frame = requestAnimationFrame(tick); return; }
              stableFrames += 1;
              setStatus(stableFrames > 48 ? "Vaari locked." : stableFrames > 8 ? "Hold cheyyu." : "Set aanu.");
              drawLandmarks(canvas, detection.landmarks[0]);
              if (stableFrames > 6 && stableSamples.length < 48) {
                stableSamples.push(estimateVaari(getHandMetrics(detection.landmarks[0]), 0.88));
              }
              if (stableSamples.length >= 48 && !captured) {
                captured = true;
                const grams = stableSamples.map(sample => sample.grams).sort((a,b) => a-b)[Math.floor(stableSamples.length / 2)];
                setEstimate({ grams, confidence: 88, label: "Distance-normalized landmark calibration" });
              }
            } else {
              stableFrames = 0;
              setStatus("Kai evide?");
            }
          }
          frame = requestAnimationFrame(tick);
        };
        tick();
      } catch (caught) {
        if (active) {
          setError("Camera access could not start. Check permission, then try again.");
          setStatus("Camera unavailable");
        }
      }
    };
    start();
    return () => { active = false; cancelAnimationFrame(frame); tracker?.close?.(); stream?.getTracks().forEach((track) => track.stop()); };
  }, []);

  return <section>
    <div className="mb-7"><p className="eyebrow">01 / HAND GEOMETRY ANALYSIS</p><h2 className="mt-2 text-4xl font-black tracking-tight">Show your hand.</h2><p className="mt-2 text-[#075A6D]">Let&apos;s scientifically measure your vaari.</p></div>
    <div className="panel overflow-hidden rounded-3xl"><div className="relative aspect-video bg-[#303630]"><video ref={videoRef} muted playsInline className="h-full w-full scale-x-[-1] object-cover"/><div className="pointer-events-none absolute inset-y-[14%] left-[37%] right-[37%] rounded-[45%] border-2 border-dashed border-[#FFB8A6] opacity-80"><span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest text-[#ffdccb]">PLACE ONE OPEN HAND HERE</span></div><canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full scale-x-[-1]"/>{error && <div className="absolute inset-0 grid place-items-center bg-[#303630] p-8 text-center text-white"><div><b>Camera permission needed.</b><p className="mt-2 text-sm text-white/70">{error}</p><button onClick={() => location.reload()} className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">Retry camera</button></div></div>}<div className="absolute bottom-4 left-4 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#61d981]"/>{status}</div></div><div className="flex flex-wrap items-center justify-between gap-4 p-5"><div><p className="eyebrow">ESTIMATED VAARI CAPACITY</p><b className="text-2xl">{estimate ? `${estimate.grams} g` : "Awaiting landmark data"}</b></div><div className="flex gap-2"><button onClick={() => { onComplete(demoVaari); onDemo(); }} className="rounded-full border border-[#7972AE] px-4 py-2 text-sm font-bold">Use demo hand</button><button disabled={!estimate} onClick={() => estimate && onComplete(estimate)} className="rounded-full bg-[#303630] px-5 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-30">Continue →</button></div></div></div>
  </section>;
}

function drawLandmarks(canvas: HTMLCanvasElement, landmarks: Landmark[]) {
  const context = canvas.getContext("2d");
  if (!context) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff4e8";
  context.strokeStyle = "#FFB8A6";
  context.lineWidth = 2;
  landmarks.forEach((landmark) => { context.beginPath(); context.arc((1 - landmark.x) * canvas.width, landmark.y * canvas.height, 4, 0, Math.PI * 2); context.fill(); context.stroke(); });
}
