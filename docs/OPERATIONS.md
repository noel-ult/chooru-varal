# chooru-varal: verification and operations

Reviewed against [default-branch commit 57dacbabde33](https://github.com/noel-ult/chooru-varal/commit/57dacbabde3379d9c7644898f20e4bc67086e0ec) on 2026-10-28. Start with the [developer guide](PROJECT_GUIDE.md) for installation and architecture, and the [source reference](REFERENCE.md) for exact scripts, configuration readers, routes, and source locations.

## Browser capture pipeline

Complete demo mode, test camera denial/invalid positioning, upload a rice image, and inspect results on desktop/mobile. Live camera requires localhost or HTTPS permission.

These are acceptance scenarios for a maintainer to run in the documented environment. Their inclusion is not a claim that live integrations or production credentials were tested during this documentation update.

## Deployment and failure diagnosis

MediaPipe resources must load in the browser. Estimates depend on framing/input quality; an available Next process does not add backend persistence.

## Maintaining the contract

When behavior changes, update the guide and examples in the same PR. Check the entry point and working directory before copying commands. Use the linked source readers to distinguish build-time configuration from process environment. For failures, capture the first application error, runtime version, selected mode, and redacted configuration names before later proxy or port errors.

Keep changes tied to evidence: a declared command is not proof it passes, a process health response is not a successful end-to-end workflow, and a historical report describes its own revision. Record actual check results and any unavailable external services in the PR.
