![Choru Vaari Kodukkam](public/docs/choru-vaari-header.svg)

# Choru Vaari Kodukkam 🎯

## Basic Details
### Team Name
[Add team name]

### Team Members
- Team Lead: [Name] - [College]
- Member 2: [Name] - [College]
- Member 3: [Name] - [College]

### Project Description
Choru Vaari Kodukkam estimates a personal rice-handful capacity from hand landmarks, then estimates the quantity of choru in a plate image and expresses it in vaaris.

### The Problem (that doesn't exist)
“Ente oru vaari choru ethra aanu?” is usually answered with vibes, family intuition, and a serving spoon.

### The Solution (that nobody asked for)
We turn it into a solemn computer-vision workflow: hand geometry estimates vaari capacity, Canvas segmentation estimates choru, and a calculator delivers a verdict of suspicious importance.

## Technical Details
### Technologies/Components Used
For Software:
- TypeScript, React, Next.js
- Tailwind CSS
- MediaPipe Tasks Vision (hand landmarks)
- Canvas API (local rice-region segmentation)
- Browser MediaDevices API

For Hardware:
- Webcam (optional; demo mode works without it)
- A device capable of displaying a very serious rice dashboard

### Implementation
For Software:
# Installation
```bash
npm install
```

# Run
```bash
npm run dev
```

Open `http://localhost:3000`. The **Try Demo** path uses predefined hand data and a local sample plate image.

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot 1](public/docs/screenshot-landing.png)
*Landing page: the unnecessary research proposition is introduced.*

![Screenshot 2](public/docs/screenshot-hand.png)
*Hand measurement: landmark calibration overlays the mirrored camera feed.*

![Screenshot 3](public/docs/screenshot-result.png)
*Result: capacity, estimated choru and final vaari verdict.*

# Diagrams
![Workflow](public/docs/workflow.svg)
*Webcam landmarks and plate-image segmentation meet at the vaari calculator before producing a verdict.*

### Project Demo
# Video
[Add your demo video link here]
*The video should show the calibration-to-verdict workflow.*

# Additional Demos
- Use the in-app **Try Demo** button for a local sample run.

## Team Contributions
- [Name 1]: Hand tracking, vaari estimation, frontend
- [Name 2]: Rice image analysis, UI, testing
- [Name 3]: Demo preparation and documentation

---
Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
