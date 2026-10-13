# Choru Vaari Kodukkam development guide

A browser-based rice-and-hand experiment built with Next.js, React, TypeScript, and MediaPipe. It combines hand calibration, motion capture, rice-image estimation, and an interactive report. Results are playful estimates, not a measurement certification.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Try Demo uses predefined hand data and a local sample plate image. For live capture, grant camera permission on localhost or an HTTPS origin and make sure the MediaPipe model/runtime resources can load.

## Processing flow

`app/page.tsx` coordinates the experiment. Components in `app/components/` handle landing, calibration, capture, rice upload, trajectory display, and results. `lib/hand/` implements geometry, validity checks, motion tracking, and the vaari model. `lib/rice/riceEstimation.ts` analyzes the uploaded image. `lib/calculations/vaariCalculator.ts` divides estimated rice by capacity and selects a verdict.

The capture and calculation workflow runs in the browser; no backend API or database is included. Do not infer server persistence from the presence of a Next.js development server. Browser/device camera support, framing, lighting, and image quality affect estimates. The calculator itself assumes a usable nonzero capacity, so upstream validation is significant.

## Checks and deployment

Build with `npm run build` and serve with `npm start`. A root Dockerfile and `compose.yaml` provide a container path. No automated test files are tracked. The declared `next lint` command should be checked against the installed Next.js CLI rather than treated as a verified lint gate.

Manually check demo completion, camera denial, invalid hand positioning, rice upload, and the result screen at desktop and mobile widths. The README includes project credits, screenshots, and the event demo; preserve those when updating technical documentation.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)
