"use client";
import { useEffect, useRef, useState } from "react";
import type { VaariEstimate } from "../../lib/hand/vaariModel";
import { analyzeMotion, type MotionPoint, type MotionProfile } from "../../lib/hand/motionTracking";
import { TrajectoryView } from "./TrajectoryView";

export function VaariMotionCapture({ hand, onComplete, onDemo }: { hand: VaariEstimate; onComplete: (x: MotionProfile) => void; onDemo: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const recordingRef = useRef(false);
  const pointsRef = useRef<MotionPoint[]>([]);
  const [recording, setRecording] = useState(false);
  const [points, setPoints] = useState<MotionPoint[]>([]);
  const [message, setMessage] = useState("Start when ready.");
  useEffect(() => {
    let active = true, frame = 0, stream: MediaStream | undefined;
    let model: { close: () => void; detectForVideo: (v: HTMLVideoElement, t: number) => { landmarks: Array<Array<{x:number;y:number;z?:number}>> } } | undefined;
    const init = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        if (!video.current || !active) return;
        video.current.srcObject = stream; await video.current.play();
        const originalError = console.error;
        console.error = (...args: unknown[]) => { if (!args.some(x => String(x).includes("Created TensorFlow Lite XNNPACK delegate for CPU"))) originalError(...args); };
        try {
          const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
          const files = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
          model = await HandLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task" }, runningMode: "VIDEO", numHands: 1 });
        } finally { console.error = originalError; }
        const tick = () => {
          if (!active || !video.current || !model) return;
          const handLandmarks = model.detectForVideo(video.current, performance.now()).landmarks[0];
          if (recordingRef.current && handLandmarks) { const wrist = handLandmarks[0], tip = handLandmarks[8]; pointsRef.current.push({ x:wrist.x, y:wrist.y, z:wrist.z ?? 0, time:performance.now(), curl:Math.min(1, Math.hypot(tip.x-wrist.x, tip.y-wrist.y)*2), landmarks:handLandmarks.map(point=>({x:point.x,y:point.y})) }); }
          frame = requestAnimationFrame(tick);
        };
        tick();
      } catch { if (active) setMessage("Camera unavailable. Use demo motion."); }
    };
    void init();
    return () => { active = false; cancelAnimationFrame(frame); model?.close(); stream?.getTracks().forEach(track => track.stop()); };
  }, []);
  const toggle = () => { if (!recording) { pointsRef.current=[];setPoints([]);recordingRef.current=true;setRecording(true);setMessage("Recording: approach → scoop → lift → hold → release"); } else { recordingRef.current=false;setRecording(false);setPoints([...pointsRef.current]);setMessage(pointsRef.current.length<12?"Onnu koodi vaari kaanikkamo?":"Motion captured."); } };
  return <section><p className="eyebrow">03 / VAARI MOTION</p><h2 className="mt-2 text-4xl font-black tracking-tight">Show us how you take one vaari.</h2><p className="mt-2 text-[#075A6D]">A heuristic motion study of your natural scoop. Start, scoop, lift, hold, release.</p><div className="mt-7 grid gap-5 md:grid-cols-[1fr_.9fr]"><div className="panel overflow-hidden rounded-3xl"><div className="relative aspect-video bg-[#303630]"><video ref={video} muted playsInline className="h-full w-full scale-x-[-1] object-cover"/><div className="absolute bottom-4 left-4 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white">{recording?"● CAPTURING MOTION":message}</div></div><div className="flex gap-3 p-5"><button onClick={toggle} className={`rounded-full px-5 py-3 text-sm font-bold text-white ${recording?"bg-[#FFB8A6]":"bg-[#303630]"}`}>{recording?"Stop capture":"Start motion capture"}</button><button onClick={onDemo} className="rounded-full border border-[#7972AE] px-4 py-2 text-sm font-bold">Use demo motion</button></div></div><div className="panel rounded-3xl p-5">{points.length>1?<TrajectoryView points={points}/>:<div className="grid h-full min-h-64 place-items-center text-center text-sm text-[#74766f]">Your recorded wrist path will appear here.<br/>No fake trajectory, only tracked landmark data.</div>}<button disabled={points.length<12} onClick={()=>points.length>=12&&onComplete(analyzeMotion(points,hand.grams))} className="mt-5 w-full rounded-full bg-[#303630] py-3 text-sm font-bold text-white disabled:opacity-40">Analyze motion →</button></div></div></section>;
}
