"use client";
import { useEffect, useState } from "react";
import type { MotionProfile } from "../../lib/hand/motionTracking";
import { TrajectoryView } from "./TrajectoryView";
type Experiment = "finish" | "take" | "split" | "forecast" | "sadya";
export function VaariIntelligence({
  capacity,
  rice,
  confidence,
  motion,
}: {
  capacity: number;
  rice: number;
  confidence: number;
  motion: MotionProfile;
}) {
  const [active, setActive] = useState<Experiment | null>(null),
    [hunger, setHunger] = useState("NORMAL"),
    [people, setPeople] = useState(4);
  const count = rice / motion.effectiveCapacity;
  const cards: [Experiment, string, string, string, string][] = [
    [
      "finish",
      "CAN I FINISH THIS?",
      `${count.toFixed(2)} vaaris`,
      `Final vaari: ${(count % 1).toFixed(2)}`,
      "↗",
    ],
    [
      "take",
      "HOW MUCH SHOULD I TAKE?",
      `${Math.round(motion.effectiveCapacity * 2.5)} g`,
      "Build a serving plan",
      "◒",
    ],
    [
      "split",
      "SPLIT THIS CHORU",
      `${Math.round(rice / people)} g each`,
      `${people} people at the table`,
      "÷",
    ],
    [
      "forecast",
      "RICE FORECAST",
      `${Math.max(0, Math.round(rice - motion.effectiveCapacity))} g after 1`,
      "Watch the plate disappear",
      "◔",
    ],
    [
      "sadya",
      "SADHYA MODE",
      "Leaf · rice · space · plan",
      "Advanced surface study",
      "✦",
    ],
  ];
  return (
    <section>
      <header className="text-center">
        <p className="eyebrow">06 / VAARI INTELLIGENCE REPORT</p>
        <h2 className="mt-2 text-5xl font-black tracking-[-.06em]">
          Your choru, understood.
        </h2>
      </header>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#050505] p-7 text-white">
          <p className="text-xs font-bold tracking-[.2em] text-[#F5009F]">
            YOUR VAARI PROFILE
          </p>
          <div className="mt-2 text-6xl font-black">
            {motion.effectiveCapacity}
            <span className="text-xl"> g</span>
          </div>
          <b className="mt-6 block text-xl">{motion.signature}</b>
          <p className="mt-2 text-sm text-white/65">
            {motion.scoopDepth > 75
              ? "Deep scoop · committed lift."
              : "Controlled motion · measured serving."}
          </p>
        </div>
        <div className="panel rounded-[2rem] p-7">
          <p className="eyebrow">YOUR CHORU</p>
          <div className="mt-2 text-5xl font-black">{rice} g</div>
          <b className="mt-3 block text-xl">≈ {count.toFixed(2)} VAARIS</b>
          <div className="mt-6 flex gap-1 text-[#F5009F]">
            {Array.from({ length: Math.ceil(count) }, (_, i) => (
              <span
                key={i}
                className={i === Math.floor(count) ? "opacity-50" : ""}
              >
                ●
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#6b6e67]">
            Observed vaari capacity · image-based choru estimate
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.9fr]">
        <div>
          <TrajectoryView points={motion.points} />
          <div className="panel mt-5 rounded-3xl p-6">
            <p className="eyebrow">VAARI MOTION PROFILE</p>
            <div className="mt-5 space-y-3">
              <Score
                label="Speed"
                value={Math.round(Math.min(98, motion.averageSpeed * 170))}
              />
              <Score label="Stability" value={motion.stability} />
              <Score label="Scoop depth" value={motion.scoopDepth} />
              <Score label="Smoothness" value={motion.smoothness} />
              <Score label="Consistency" value={motion.consistency} />
            </div>
          </div>
        </div>
        <div>
          <div className="panel rounded-3xl p-6">
            <p className="eyebrow">RICE EXPERIMENTS</p>
            <p className="mt-2 text-sm text-[#050505]">
              What should we do with your choru?
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {cards.slice(0, 4).map(([id, title, detail, hint, icon]) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`group min-h-36 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${active === id ? "border-[#128EEF] bg-[#F8F8F8] shadow-[4px_4px_0_#128EEF]" : "border-[#d8d1c7] bg-white hover:border-[#050505] hover:shadow-[3px_3px_0_#F5009F]"}`}
                >
                  <span className="flex items-start justify-between">
                    <b className="block max-w-[11rem] text-sm leading-tight">
                      {title}
                    </b>
                    <i className="grid h-7 w-7 place-items-center rounded-full bg-[#F8F8F8] text-base not-italic text-[#050505]">
                      {icon}
                    </i>
                  </span>
                  <span className="mt-5 block text-base font-black text-[#128EEF]">
                    {detail}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#6e716a]">
                    {hint} <i className="not-italic text-[#128EEF]">→</i>
                  </span>
                </button>
              ))}
            </div>
            <p className="eyebrow mt-7">ADVANCED MODE</p>
            <button
              onClick={() => setActive("sadya")}
              className={`mt-2 w-full rounded-2xl border p-4 text-left ${active === "sadya" ? "border-[#050505] bg-[#F8F8F8]" : "border-[#128EEF]"}`}
            >
              <span className="flex items-center justify-between">
                <b>SADHYA MODE</b>
                <i className="grid h-8 w-8 place-items-center rounded-full bg-[#128EEF] not-italic">
                  {cards[4][4]}
                </i>
              </span>
              <span className="mt-2 block text-xs text-[#687068]">
                {cards[4][2]} · {cards[4][3]} →
              </span>
            </button>
          </div>
          <Active
            active={active}
            rice={rice}
            vaari={motion.effectiveCapacity}
            count={count}
            hunger={hunger}
            setHunger={setHunger}
            people={people}
            setPeople={setPeople}
          />
        </div>
      </div>
      <p className="mt-8 text-center text-xl font-black">
        VAARI DIAGNOSIS ·{" "}
        {count > 5 ? "Nalla vaari aanu." : "Definitely manageable."}
      </p>
    </section>
  );
}
function Active(p: {
  active: Experiment | null;
  rice: number;
  vaari: number;
  count: number;
  hunger: string;
  setHunger: (x: string) => void;
  people: number;
  setPeople: (x: number) => void;
}) {
  if (!p.active)
    return (
      <div className="panel mt-5 rounded-3xl p-6 text-sm text-[#050505]">
        <p className="eyebrow">ACTIVE EXPERIMENT</p>
        <p className="mt-2">
          Choose an experiment to begin an unnecessarily serious calculation.
        </p>
      </div>
    );
  const body =
    p.active === "finish" ? (
      <>
        This plate is <b>{p.count.toFixed(2)} natural vaaris</b>.{" "}
        {p.count < 5
          ? "Definitely possible."
          : "The final vaari is emotionally significant."}
      </>
    ) : p.active === "take" ? (
      <TakePanel
        vaari={p.vaari}
        rice={p.rice}
        hunger={p.hunger}
        setHunger={p.setHunger}
      />
    ) : p.active === "split" ? (
      <>
        <label>
          People{" "}
          <input
            className="ml-3 w-16 rounded border p-2"
            min="1"
            type="number"
            value={p.people}
            onChange={(e) => p.setPeople(Math.max(1, +e.target.value))}
          />
        </label>
        <p className="mt-4">
          <b>{Math.round(p.rice / p.people)} g</b> ·{" "}
          {(p.rice / p.people / p.vaari).toFixed(2)} vaaris each. Distribution
          mathematically acceptable.
        </p>
      </>
    ) : p.active === "forecast" ? (
      <div className="mt-3 flex items-end gap-2">
        {Array.from({ length: Math.min(6, Math.ceil(p.count)) }, (_, i) => {
          const g = Math.max(0, p.rice - p.vaari * (i + 1));
          return (
            <div key={i} className="flex-1 text-center">
              <div
                className="mx-auto bg-[#F5009F]"
                style={{ height: `${Math.max(8, (g / p.rice) * 100)}px` }}
              />
              <small>
                V{i + 1}
                <br />
                {Math.round(g)}g
              </small>
            </div>
          );
        })}
      </div>
    ) : (
      <Sadya rice={p.rice} vaari={p.vaari} count={p.count} />
    );
  return (
    <div className="panel mt-5 rounded-3xl p-6 text-sm text-[#5d625a]">
      <p className="eyebrow">ACTIVE EXPERIMENT · {p.active.toUpperCase()}</p>
      <div className="mt-3">{body}</div>
    </div>
  );
}
function TakePanel({
  vaari,
  rice,
  hunger,
  setHunger,
}: {
  vaari: number;
  rice: number;
  hunger: string;
  setHunger: (x: string) => void;
}) {
  const [adjustment, setAdjustment] = useState(100),
    [saved, setSaved] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("choru-vaari-adjustment");
    if (stored) setAdjustment(+stored);
  }, []);
  const multipliers = { NORMAL: 2.5, "NALLA VISHAPPU": 3.2, ATHYAVASHYAM: 4 };
  const servings = multipliers[hunger as keyof typeof multipliers] ?? 2.5;
  const observed = Math.round((vaari * adjustment) / 100),
    grams = Math.round(servings * observed),
    remaining = Math.max(0, rice - grams);
  const save = () => {
    window.localStorage.setItem("choru-vaari-adjustment", String(adjustment));
    setSaved(true);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["NORMAL", "NALLA VISHAPPU", "ATHYAVASHYAM"].map((x) => (
          <button
            onClick={() => setHunger(x)}
            key={x}
            className={`rounded-full border px-3 py-2 text-[10px] font-bold ${hunger === x ? "border-[#128EEF] bg-[#F8F8F8] text-[#050505]" : "border-[#d7d1c7]"}`}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-[#F8F8F8] p-3">
          <b className="block text-2xl text-[#050505]">{servings.toFixed(1)}</b>
          VAARIS
        </div>
        <div className="rounded-xl bg-[#F8F8F8] p-3">
          <b className="block text-2xl text-[#128EEF]">{grams}g</b>SERVING
        </div>
        <div className="rounded-xl bg-[#F5F0E7] p-3">
          <b className="block text-2xl text-[#050505]">{remaining}g</b>REMAINS
        </div>
      </div>
      <div className="mt-5 border-t border-[#e5d9cc] pt-4">
        <div className="flex justify-between text-xs">
          <b>PERSONAL VAARI BASELINE</b>
          <span>{observed}g / vaari</span>
        </div>
        <input
          className="mt-3 w-full accent-[#128EEF]"
          type="range"
          min="75"
          max="125"
          value={adjustment}
          onChange={(e) => {
            setAdjustment(+e.target.value);
            setSaved(false);
          }}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[11px] text-[#050505]">
            Weighed a real vaari once? Save this correction and future serving
            calculations will use it.
          </p>
          <button
            onClick={save}
            className="shrink-0 rounded-full bg-[#050505] px-3 py-2 text-[10px] font-black text-white"
          >
            {saved ? "SAVED ✓" : "SAVE BASELINE"}
          </button>
        </div>
      </div>
    </div>
  );
}
function Sadya({
  rice,
  vaari,
  count,
}: {
  rice: number;
  vaari: number;
  count: number;
}) {
  const [view, setView] = useState<"map" | "model" | "plan">("map"),
    [reserve, setReserve] = useState(true),
    [highlight, setHighlight] = useState<"rice" | "other" | "free">("rice"),
    [simulatedVaaris, setSimulatedVaaris] = useState(0),
    [tilt, setTilt] = useState(0);
  const occupancy = Math.min(96, Math.round(42 + count * 7 + simulatedVaaris * 11)),
    free = 100 - occupancy,
    other = Math.round(occupancy * 0.43),
    riceArea = occupancy - other,
    compat = Math.round(
      Math.max(
        54,
        Math.min(
          96,
          70 + free * 0.45 - (count > 5 ? 8 : 0) + (reserve ? 3 : -4),
        ),
      ),
    );
  const selected = { rice: riceArea, other, free }[highlight];
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setView("map")}
          className={`rounded-full px-3 py-1 text-[10px] font-bold ${view === "map" ? "bg-[#050505] text-white" : "border"}`}
        >
          SURFACE MAP
        </button>
        <button
          onClick={() => setView("model")}
          className={`rounded-full px-3 py-1 text-[10px] font-bold ${view === "model" ? "bg-[#050505] text-white" : "border"}`}
        >
          3D INSPECT
        </button>
        <button
          onClick={() => setView("plan")}
          className={`rounded-full px-3 py-1 text-[10px] font-bold ${view === "plan" ? "bg-[#050505] text-white" : "border"}`}
        >
          SERVING PLAN
        </button>
      </div>
      {view === "map" ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#050505] p-3 text-white">
              <p className="text-[9px] font-bold tracking-widest">
                SADHYA MAP · {highlight.toUpperCase()}
              </p>
              <i
                className={`absolute left-[26%] top-[34%] h-[38%] w-[42%] rounded-full bg-[#F8F8F8] transition ${highlight !== "rice" ? "opacity-35" : "ring-2 ring-[#128EEF]"}`}
              />
              <i
                className={`absolute right-4 top-6 h-7 w-7 rounded-full bg-[#ef8c3c] transition ${highlight !== "other" ? "opacity-35" : "ring-2 ring-[#128EEF]"}`}
              />
              <i
                className={`absolute bottom-5 left-5 h-5 w-10 rounded-full bg-[#128EEF] transition ${highlight !== "free" ? "opacity-35" : "ring-2 ring-[#128EEF]"}`}
              />
              <small className="absolute bottom-2 left-3">
                Tap legend to inspect region
              </small>
            </div>
            <div>
              <p>
                <b>{rice} g</b> choru · {count.toFixed(2)} vaaris
              </p>
              <p className="mt-2">
                <b>{free}% free</b> image area
              </p>
              <p className="mt-2">
                Serving space:{" "}
                <b>{free > 22 ? "ANOTHER VAARI POSSIBLE" : "GETTING TIGHT"}</b>
              </p>
              <p className="mt-5 text-xs">
                Selected region:{" "}
                <b>
                  {highlight.toUpperCase()} · {selected}%
                </b>
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            {(["rice", "other", "free"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setHighlight(key)}
                className={`rounded-lg border p-2 ${highlight === key ? "border-[#050505] bg-[#F8F8F8]" : ""}`}
              >
                {key.toUpperCase()}
                <br />
                <b>{{ rice: riceArea, other, free }[key]}%</b>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-[#128EEF] bg-[#F8F8F8] p-3">
            <div className="flex items-center justify-between gap-3">
              <div><p className="eyebrow">SERVING SURFACE SIMULATOR</p><p className="mt-1 text-xs">Simulate one more vaari before committing it to the leaf.</p></div>
              <button onClick={()=>setSimulatedVaaris(value=>value>=3?0:value+1)} className="rounded-full bg-[#050505] px-3 py-2 text-[10px] font-black text-white">{simulatedVaaris>=3?"RESET LEAF":"ADD VAARI +"}</button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#128EEF] font-black text-[#050505]">{simulatedVaaris}</span><span>{simulatedVaaris===0?"Leaf is waiting patiently.":simulatedVaaris===1?"One extra vaari: still socially acceptable.":simulatedVaaris===2?"Choru load is becoming a decision.":"Maximum simulated commitment reached."}</span></div>
          </div>
        </>
      ) : view === "model" ? (
        <div className="rounded-2xl border-2 border-[#050505] bg-[#f8f8f8] p-4">
          <div className="flex items-center justify-between"><p className="eyebrow">INTERACTIVE SERVING SURFACE</p><span className="rounded-full bg-[#128EEF] px-2 py-1 text-[9px] font-black text-white">HEURISTIC 3D</span></div>
          <div className="mt-4 grid gap-5 md:grid-cols-[1fr_150px]">
            <div className="relative h-56 overflow-hidden rounded-xl bg-[#dcecf7]" style={{perspective:"700px"}}>
              <div className="absolute left-[12%] top-[18%] h-[62%] w-[76%] rounded-[48%_52%_45%_55%] border-2 border-[#075A6D] bg-[#65AC9C] shadow-[0_18px_18px_rgba(5,5,5,.25)] transition-transform duration-300" style={{transform:`rotateX(58deg) rotateZ(${tilt}deg)`,transformStyle:"preserve-3d"}}>
                <button aria-label="Inspect rice region" onClick={()=>setHighlight("rice")} className={`absolute left-[31%] top-[29%] h-[46%] w-[40%] rounded-[48%] border-2 bg-[#FFFDF9] shadow-[0_8px_0_rgba(5,5,5,.18)] ${highlight==="rice"?"border-[#F5009F]":"border-[#128EEF]"}`} style={{transform:"translateZ(14px)"}}/>
                <button aria-label="Inspect other food region" onClick={()=>setHighlight("other")} className={`absolute right-[11%] top-[19%] h-8 w-8 rounded-full bg-[#F5009F] ${highlight==="other"?"ring-4 ring-white":""}`} style={{transform:"translateZ(19px)"}}/>
                <button aria-label="Inspect free pappadam area" onClick={()=>setHighlight("free")} className={`absolute bottom-[13%] left-[12%] h-5 w-12 rounded-full bg-[#FFD500] ${highlight==="free"?"ring-4 ring-white":""}`} style={{transform:"translateZ(11px)"}}/>
              </div>
              <span className="absolute bottom-3 left-3 text-[9px] font-bold tracking-widest text-[#075A6D]">DRAG-FREE ROTATION · CLICK A REGION</span>
            </div>
            <div className="text-xs"><b className="text-[#075A6D]">{highlight.toUpperCase()} REGION</b><p className="mt-2">{selected}% of analyzed surface.</p><label className="mt-6 block font-bold">ROTATE LEAF<input aria-label="Rotate serving surface" className="mt-3 w-full accent-[#F5009F]" type="range" min="-18" max="18" value={tilt} onChange={event=>setTilt(+event.target.value)}/></label><button onClick={()=>setTilt(0)} className="mt-3 text-[10px] font-black text-[#F5009F]">RESET VIEW ↺</button></div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-[#F8F8F8] p-4 text-xs">
          <p className="eyebrow">SADHYA PLAN · YOUR {vaari}G VAARI</p>
          <div className="mt-3 grid grid-cols-2 gap-y-2">
            <span>Parippu</span>
            <b>.8 vaari</b>
            <span>Sambar</span>
            <b>1.0 vaari</b>
            <span>Kaalan / Pulissery</span>
            <b>.6 vaari</b>
            <span>Rasam</span>
            <b>.5 vaari</b>
          </div>
          <button
            onClick={() => setReserve(!reserve)}
            className={`mt-4 w-full rounded-lg p-3 text-left font-bold ${reserve ? "bg-[#050505] text-white" : "bg-[#F8F8F8] text-[#7e2f38]"}`}
          >
            PAYASAM RESERVE .7 VAARI · {reserve ? "PROTECTED" : "COMPROMISED"}
            <small className="ml-2 font-normal">
              {reserve ? "Do not spend this early." : "Reclaim serving space."}
            </small>
          </button>
        </div>
      )}
      <div className="mt-4 border-t pt-3 text-xs">
        <span className="text-[#050505]">
          PAPPADAM SPACE {free > 18 ? "AVAILABLE" : "TIGHT"} · ESTIMATED SADHYA
          COMPATIBILITY {compat}%
        </span>
      </div>
    </div>
  );
}
function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <div className="mt-1 h-2 rounded-full bg-[#e7e2d9]">
        <div
          className="h-full rounded-full bg-[#050505]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
