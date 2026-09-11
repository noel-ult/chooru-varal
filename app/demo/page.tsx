"use client";
import { VaariIntelligence } from "../components/VaariIntelligence";
import { demoMotion } from "../../lib/hand/motionTracking";
export default function DemoScreenshot(){const motion=demoMotion(128);return <main className="grid-bg min-h-screen px-5 py-8"><div className="mx-auto max-w-6xl"><p className="eyebrow">DOCUMENTATION DEMO · LOCAL SAMPLE DATA</p><VaariIntelligence capacity={128} rice={372} confidence={87} motion={motion}/></div></main>}
