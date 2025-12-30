# 🏰 Bastam Museum: Interactive 3D Fortress Reconstruction

> *Bridging Archaeology and Architecture through Digital Innovation*

<div align="center">

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](https://github.com/sirkianmj/BastamMuseum/blob/main/README.md#-license)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-r128+-000000?logo=three.js)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite)](https://vite.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://bastam-museum.vercel.app)

[🌍 View Live Project](https://bastam-museum.vercel.app/) | [📚 GitHub Repository](https://github.com/sirkianmj/BastamMuseum)

</div>

---

## 📖 Overview

**Bastam Museum** is an immersive digital reconstruction of the ancient Urartian fortress *Rusai-URU.TUR* (The Small City of Rusa), built in the 7th century BC by King Rusa II in West Azerbaijan, Iran. This project transforms archaeological research into an interactive 3D experience, allowing users to explore one of the most sophisticated fortress-cities of the ancient world.

The application serves as a **living laboratory** where cutting-edge digital reconstruction methodologies validate archaeological findings and bring architectural history to life. It represents the convergence of archaeology, architecture, and technology—demonstrating how computational tools can reconstruct and verify historical structures with unprecedented precision.

---

## 🎯 The Mission

This project answers a fundamental question posed by its creator:

> *"Is what archaeologists have drawn on paper actually physically and engineeringly 'stable' and 'buildable'?"*

Using rigorous architectural critique and Building Information Modeling (BIM) principles, the Bastam Museum validates the groundbreaking work of archaeologist **Wolfram Kleiss** while revealing the sophisticated engineering intelligence embedded in 7th-century BC Urartian architecture.

### Key Research Achievements

- ✅ **Structural Validation**: Confirmed that Kleiss's archaeological documentation exhibits exceptional architectural precision
- 🔬 **Material Science Analysis**: Demonstrated the engineering logic behind the three-pillar construction system (stone plinths, mudbrick superstructure, wooden ring beams)
- 🏗️ **Functional Discovery**: Redefined spaces through interdisciplinary analysis—identifying royal stables rather than mere warehouses through soil chemistry
- 🌍 **Climatic Adaptation**: Revealed how Urartian architects engineered solutions for extreme mountain environments

---

## 🌟 What Makes This Project Unique

### **Multidisciplinary Approach**

This isn't merely a 3D visualization. The project synthesizes:
- **Archaeology**: Primary source material from Kleiss's excavation reports
- **Structural Engineering**: Computational analysis of load distribution and spatial logic
- **Environmental Science**: Integration of climatic and topographical constraints
- **Digital Humanities**: Interactive storytelling through immersive visualization

### **Narrative Architecture**

The experience is organized hierarchically, mirroring the actual fortress structure:

| **Level** | **Area** | **Function** | **Experience** |
|-----------|---------|-------------|-----------------|
| **Lower** | The Settlement (Siedlung) | Residential and commercial | Organic, intimate spaces |
| **Middle** | The Citadel (Unterburg/Mittelburg) | Economic and religious center | Grand columned halls and storage |
| **Upper** | The Royal Citadel (Oberburg) | Authority and defense | Strategic vistas and private spaces |

### **Interactive Discovery**

Users don't simply observe—they investigate:
- Explore the royal stables and discover architectural evidence of equestrian usage
- Navigate the mysterious Bone Rooms and contemplate their ceremonial significance
- Trace the Pithos Hall galleries and understand access solutions
- Examine construction details and witness the ingenuity of mudbrick engineering

---

## 🛠 Technology Stack

### **Frontend Architecture**

- **React** (Modern UI framework for interactive components)
- **TypeScript** (Type-safe development for robustness)
- **Three.js** (WebGL-based 3D rendering engine)
- **Vite** (Ultra-fast build tool and development server)

### **3D Visualization & Interaction**

- **Advanced 3D Modeling**: Faithful digital reconstruction of archaeological site plans
- **Interactive Camera System**: Intuitive navigation through multiple fortress levels
- **Real-time Lighting**: Dynamic lighting to highlight architectural features
- **Performance Optimization**: Efficient asset loading and LOD (Level of Detail) systems

### **Project Structure**

```
BastamMuseum/
├── 3dmodels/           # Pre-processed 3D geometry files
├── components/         # Reusable React components
├── services/           # Data processing and utility functions
├── App.tsx             # Main application component
├── index.tsx           # React entry point
├── index.html          # HTML template
├── metadata.json       # Archaeological and architectural metadata
├── vite.config.ts      # Build configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** (v7 or later)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sirkianmj/BastamMuseum.git
   cd BastamMuseum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🏛 Architectural Highlights

### **The Three-Pillar Construction System**

The fortress exemplifies sophisticated engineering adapted to extreme mountain conditions:

#### 1. **Stone Plinth (Stone Socle)**
- Massive stone bases protecting mudbrick from moisture
- Acts as damp-proof course preventing capillary water infiltration
- Transfers loads from tall adobe walls to uneven rock bedding

#### 2. **Mudbrick Superstructure**
- Walls reaching 4 meters in thickness
- Superior thermal insulation for harsh mountain winters
- Material of choice for fortress-scale architecture in antiquity

#### 3. **Wooden Ring Beam System**
- Horizontal and vertical wooden ties providing tensile strength
- Critical earthquake resistance mechanism
- Demonstrates understanding of composite structural behavior

### **Spatial Hierarchy and Access Control**

The fortress design reflects sophisticated security architecture:
- **Single longitudinal axis** organizing 800-meter length
- **Stratified access points** restricting movement between functional zones
- **Defensive geometry** with overlapping sightlines and controlled approaches

---

## 📚 Research Foundation

This project is grounded in meticulous archaeological documentation:

**Primary Sources:**
- Kleiss, Wolfram. *Bastam I: Ausgrabungen in den Urartäischen Anlagen 1972-1975*. Teheraner Forschungen, Band IV. Gebr. Mann Verlag, Berlin, 1979.
- Kleiss, Wolfram. *Bastam II: Ausgrabungen in den Urartäischen Anlagen 1977-1978*. Teheraner Forschungen, Band V. Gebr. Mann Verlag, Berlin, 1988.

**Research Methodology:**
- Quantitative structural analysis through BIM
- Qualitative spatial interpretation through design visualization
- Interdisciplinary validation (soil chemistry, osteology, architectural theory)

---

## 💡 Key Discoveries in the Model

### **Royal Stables Identification**

The "East Building" (Ostbau) and "North Hall" (Hallenbau) were initially classified as warehouses or barracks. Soil analysis and structural examination revealed:
- High phosphate concentrations indicating animal waste
- Low stone platforms functioning as mangers
- Column spacing (3.00m intervals) precisely matching equestrian requirements
- Specialized flooring systems for load-bearing hooves

### **The Pithos Hall Gallery System**

A critical puzzle was solved through reconstruction:
- **The Challenge**: How to access jar contents when pithoi reach 2 meters height
- **The Solution**: Suspended wooden galleries documented by Kleiss
- **The Validation**: 3D modeling confirmed geometric feasibility and structural logic

### **Bone Rooms and Administrative Archives**

Near the citadel gate lie enigmatic spaces containing:
- Thousands of animal bone fragments
- Hundreds of clay seals (Bullae) indicating administrative records
- Evidence of ritual feasting and ceremonial practices
- Integration of storage, administration, and ceremonial functions

---

## 🌍 Environmental and Climatic Context

Bastam's architecture cannot be understood without its context:

### **Topographic Constraints**

- **Elevation**: High-altitude plateau exposing fortress to extreme weather
- **Substrate**: Blade-like rock ridge requiring massive terracing
- **Slope**: Steep gradients dictating every architectural decision
- **Scale**: 800m × 400m elongated form maximizing defensive perimeter

### **Climatic Design Responses**

- **Wind Protection**: Introverted architecture with minimal openings
- **Thermal Mass**: Thick adobe walls storing heat
- **Precipitation Management**: Protective cantilevers preventing rain erosion
- **Snow Loads**: Strategic roof overhangs and structural depth

---

## 📖 Navigating the Experience

### **Chapter One: Contextual Reading**

Understand the fortress-city as an integrated system combining:
- Citadel (defensive and administrative center)
- Lower Settlement (residential and commercial zones)
- Environmental adaptations to mountain topography

### **Chapter Two: Spatial Analysis**

Explore specific architectural features:
- Construction tectonics and material logic
- Functional spaces from public to private
- Integration of storage, defense, and administration

### **Chapter Three: Technical Verification**

Engage with the research methodology:
- 3D modeling validation of archaeological drawings
- Structural analysis and engineering critique
- Performance optimization for digital presentation

---

## 🎨 Design Philosophy

The interface follows principles established by Kleiss's methodology:

**Principle 1: Thinking in Section**
Rather than static plans, emphasis on three-dimensional relationships and vertical spatial sequences.

**Principle 2: Statics & Tectonics Analysis**
Every architectural element must bear weight; form follows structural logic.

**Principle 3: Function Follows Details**
Archaeological evidence—soil chemistry, artifact distribution, construction marks—reveals function.

**Principle 4: Layer Separation**
Clear visual distinction between chronological phases and functional zones.

**Principle 5: Reconstruction Through Reasoning**
Nothing is drawn without archaeological or structural justification.

---

## 🔬 Technical Features

### **Performance Optimization**

- **Draco Compression**: Reduced 3D model file sizes by up to 70%
- **Level of Detail (LOD)**: Simplified geometry for distant viewing
- **Lazy Loading**: Assets load on-demand as users explore
- **Efficient Rendering**: WebGL optimization for smooth 60fps experience

### **User Experience**

- **Intuitive Navigation**: Gesture and mouse controls for exploration
- **Responsive Design**: Seamless experience across desktop and tablet
- **Contextual Information**: Metadata reveals architectural details on demand
- **Progressive Disclosure**: Complexity revealed through interaction

---

## 🌐 Deployment

The project is deployed on **Vercel**, enabling:
- **Global CDN Distribution**: Fast loading from any geographic location
- **Automatic Deployments**: Updates from GitHub automatically deployed
- **Edge Caching**: Optimized asset delivery
- **Serverless Functions**: Backend support if needed

**Live Site**: [https://bastam-museum.vercel.app/](https://bastam-museum.vercel.app/)

---

## 🤝 Contributing

This project is open to collaborative research and enhancement. Contributions are welcome in:

- **Archaeological Interpretation**: Refinements to spatial understanding based on new research
- **Architectural Visualization**: Enhanced rendering and lighting studies
- **Interactive Features**: New ways to explore and understand the fortress
- **Documentation**: Translation and scholarly documentation
- **Performance**: Optimization for broader device compatibility

---

## 📜 License

**© 2025 Kian Mansouri Jamshidi. All Rights Reserved.**

This project and all associated content, including but not limited to the digital reconstruction, 3D models, interactive experience, research documentation, and visual design are the exclusive intellectual property of Kian Mansouri Jamshidi.

### Permitted Use

- **Personal Educational Viewing**: You may view and interact with this project for personal, non-commercial educational purposes
- **Academic Reference**: You may reference this project in scholarly work with proper attribution

### Prohibited Use

- **Commercial Use**: No part of this project may be used for commercial purposes without explicit written permission
- **Reproduction**: No reproduction, copying, modification, or distribution is permitted without written consent
- **Derivative Works**: Creating derivative works or modifications is strictly prohibited
- **Redistribution**: Redistribution of any form (code, models, documentation) is not permitted

### Attribution Requirement

If you reference this project in any publication or scholarly work, you must provide proper attribution:

```
Bastam Museum: Interactive 3D Fortress Reconstruction
Creator: Kian Mansouri Jamshidi
Website: https://bastam-museum.vercel.app/
Repository: https://github.com/sirkianmj/BastamMuseum
```

### Research Material Attribution

This reconstruction is based on the foundational archaeological work of:
- Wolfram Kleiss (*Bastam I & II*, Teheranen Forschungen series)
- Original excavations and documentation remain the intellectual property of their respective authors and institutions

### Contact for Licensing

For inquiries regarding usage rights, commercial partnerships, or permissions beyond the scope of this license, please contact:

**Kian Mansouri Jamshidi** – [GitHub Profile](https://github.com/sirkianmj)

---

## 🙏 Acknowledgments

**Research Foundation**
- Wolfram Kleiss for pioneering archaeological documentation combining architectural precision with archaeological rigor
- Paul Zimansky for interdisciplinary analysis combining osteology with architectural interpretation
- The Teheranen Forschungen publication series preserving this vital research

**Project Creator**
- **Kian Mansouri Jamshidi** – Designer and digital architect of this reconstruction

**Institutional Support**
- Grounded in academic rigorous methodology from archaeological and architectural disciplines

---

## 🔗 Resources

- **Live Experience**: [bastam-museum.vercel.app](https://bastam-museum.vercel.app/)
- **GitHub Repository**: [sirkianmj/BastamMuseum](https://github.com/sirkianmj/BastamMuseum)
- **Three.js Documentation**: [threejs.org](https://threejs.org)
- **Vite Guide**: [vite.dev](https://vite.dev)
- **React Documentation**: [react.dev](https://react.dev)

---

## 📧 Contact & Inquiries

For questions about the project, archaeological methodology, architectural analysis, or potential collaborations:

**Creator**: Kian Mansouri Jamshidi  
**Repository**: [github.com/sirkianmj](https://github.com/sirkianmj)

---

<div align="center">

### *Where Archaeology Meets Architecture Through Digital Innovation*

**Exploring the genius of 7th-century BC Urartian engineering through immersive 3D reconstruction**

</div>
