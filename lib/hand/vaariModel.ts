import type { HandMetrics } from "./handMetrics";
export type VaariEstimate={ grams:number; confidence:number; label:string };
export function estimateVaari(m:HandMetrics, stability=.86):VaariEstimate {
  // Deliberately use ratios only. Raw pixel distances/palm area grow when the
  // user moves toward the camera, so they must never affect capacity.
  const palmAspect=m.palmWidth/Math.max(m.palmLength,.001);
  const spreadRatio=m.fingerSpread/Math.max(m.palmLength,.001);
  const thumbRatio=m.thumbSpan/Math.max(m.palmLength,.001);
  const geometry=(palmAspect-.78)*28+(spreadRatio-1.25)*15+(thumbRatio-.92)*12;
  const grams=Math.round(Math.max(92,Math.min(162,128+geometry)));
  return { grams, confidence:Math.round(58+stability*35), label:grams>155?"Generous hand geometry":"Calibrated palm geometry" };
}
export const demoVaari:VaariEstimate={ grams:128, confidence:87, label:"Demo hand calibration" };
