# chooru-varal source reference


Source reviewed: [`0a1f1e6b8903`](https://github.com/noel-ult/chooru-varal/commit/0a1f1e6b8903d1c2caa1468a60b6a697a1b1e024).

This reference records the checked-in source, scripts, configuration names, and route declarations. It is a navigation aid; service availability and successful test execution require separate verification.

## Package commands

Run each command in the directory containing its package manifest. A declared script is not necessarily a passing check; guides call out placeholders and known mismatches.

### package.json

| Script | Shell command |
| --- | --- |
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `next lint` |

Manifest: [package.json](../package.json).

## Configuration names

Names below are declared by source or example files. Example-only entries may be stale; consult the linked reader and project guide before relying on them. Secret values are intentionally omitted.

| Name | Declared/read in |
| --- | --- |
| `NEXT_DIST_DIR` | [next.config.ts](../next.config.ts) |

## File-based pages and handlers

- [app/demo/page.tsx](../app/demo/page.tsx)
- [app/page.tsx](../app/page.tsx)

## Existing documentation

Historical plans/reports describe their own revision; use current source when they disagree.

- [README.md](../README.md)

## Source and configuration map

Generated lockfiles, binary assets, compiled output, vendored dependencies, and cached bytecode are omitted. Test files remain listed so coverage can be located.

- [Dockerfile](../Dockerfile)
- [app/components/HandCalibration.tsx](../app/components/HandCalibration.tsx)
- [app/components/Landing.tsx](../app/components/Landing.tsx)
- [app/components/ProgressRail.tsx](../app/components/ProgressRail.tsx)
- [app/components/ResultScreen.tsx](../app/components/ResultScreen.tsx)
- [app/components/RiceUpload.tsx](../app/components/RiceUpload.tsx)
- [app/components/TrajectoryView.tsx](../app/components/TrajectoryView.tsx)
- [app/components/VaariIntelligence.tsx](../app/components/VaariIntelligence.tsx)
- [app/components/VaariMotionCapture.tsx](../app/components/VaariMotionCapture.tsx)
- [app/components/VaariPoseCalibration.tsx](../app/components/VaariPoseCalibration.tsx)
- [app/demo/page.tsx](../app/demo/page.tsx)
- [app/globals.css](../app/globals.css)
- [app/layout.tsx](../app/layout.tsx)
- [app/page.tsx](../app/page.tsx)
- [compose.yaml](../compose.yaml)
- [index.html](../index.html)
- [lib/calculations/vaariCalculator.ts](../lib/calculations/vaariCalculator.ts)
- [lib/hand/handMetrics.ts](../lib/hand/handMetrics.ts)
- [lib/hand/handValidation.ts](../lib/hand/handValidation.ts)
- [lib/hand/motionTracking.ts](../lib/hand/motionTracking.ts)
- [lib/hand/vaariModel.ts](../lib/hand/vaariModel.ts)
- [lib/rice/riceEstimation.ts](../lib/rice/riceEstimation.ts)
- [next-env.d.ts](../next-env.d.ts)
- [next.config.ts](../next.config.ts)
- [package.json](../package.json)
- [postcss.config.mjs](../postcss.config.mjs)
- [tailwind.config.ts](../tailwind.config.ts)
- [tsconfig.json](../tsconfig.json)
