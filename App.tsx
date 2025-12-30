import React, { useState, useEffect, useRef } from 'react';
import { Environment3D } from './components/Environment3D';
import { InterfaceOverlay } from './components/InterfaceOverlay';
import { CameraMode, Artifact, ViewMode } from './types';
import { ArrowRight, Maximize2, FileText, MousePointer2, X } from 'lucide-react';

// FULL 20 ITEMS LIST
const INITIAL_ARTIFACTS: Artifact[] = [
  {
    url: '3dmodels/Standard_Wall_Segment_opt.glb',
    name: 'Standard Wall Segment',
    description: 'A modular wall section representing the standard fortification architecture of the Bastam citadel. Based on the Schalenbauweise (shell construction) technique described in the excavation reports, this model features a robust double-faced stone socle (base) filled with rubble, designed to support a mudbrick superstructure. This was the primary method used to enclose the vast 800-meter length of the fortress.'
  },
  {
    url: '3dmodels/Stepped_Slope_Wall_opt.glb',
    name: 'Stepped Slope Wall',
    description: 'Designed for the steep topography of the Bastam citadel, this module replicates the specific architecture of the Hangbebauung (Slope Construction). As detailed in Bastam II, Urartian architects cut stepped foundations (Felsabtreppungen) directly into the bedrock. This asset allows you to place walls that naturally step down angled terrain, connecting the upper citadel to the lower settlement.'
  },
  {
    url: '3dmodels/The_Cyclopean_Tower_Block_opt.glb',
    name: 'Cyclopean Tower Block',
    description: 'A massive masonry block representing the heavy defensive architecture of the citadel’s lower fortifications. Based on the Risalit structures described in Bastam I, these large, rough-hewn blocks form the base of the projecting defensive towers and buttresses that protected the perimeter of Rusai-URU.TUR against siege.'
  },
  {
    url: '3dmodels/The_Fortress_Corner_Block_opt.glb',
    name: 'Fortress Corner Block',
    description: 'A specialized structural asset representing the Eckbollwerk (Corner Bulwark). As described in the excavations of the Östliche Vorburg (Eastern Fortress), these heavy stone blocks were used to construct the reinforced, often sharp-angled corners of the defensive walls, providing critical structural integrity at turning points in the fortification line.'
  },
  {
    url: '3dmodels/The_Limestone_Paving_Module_opt.glb',
    name: 'Limestone Paving Module',
    description: 'A textured floor module depicting the Steinplattenpflaster (stone slab paving) found in high-traffic areas of the fortress. Excavations revealed these paved surfaces in the monumental South Gate, the ramps leading to the Upper Castle, and the side aisles of the great pillared halls (Hallenbauten).'
  },
  {
    url: '3dmodels/The_Pithos_Bench_opt.glb',
    name: 'Pithos Bench',
    description: 'A storage room asset recreating the bankartigen Erhöhungen (bench-like elevations) found in the citadel’s magazines. Based on findings in the Unterburg and settlement, these stone and mudbrick benches were designed to support rows of massive Pithoi jars, stabilizing them for the storage of wine and grain.'
  },
  {
    url: '3dmodels/Urartian_Wooden_Column_opt.glb',
    name: 'Urartian Wooden Column',
    description: 'A reconstruction of the vertical supports used in the great Hallenbauten (Halls). Based on the stone bases found in situ and the charred remains of timber, this model depicts the thick wooden columns that supported the heavy roofs of the royal stables and reception halls described in Bastam II.'
  },
  {
    url: '3dmodels/Ashlar_Stone_opt.glb',
    name: 'Ashlar Stone',
    description: 'A high-quality dressed stone block featuring the bossierte Quadern (bossed ashlar) technique. Unlike the rough fieldstones used in common walls, these precisely cut stones were found in the elite sections of the Middle Castle (Mittelburg), signifying high-status royal or religious architecture.'
  },
  {
    url: '3dmodels/Bulla_opt.glb',
    name: 'Bulla (Clay Sealing)',
    description: 'A small but significant artifact asset representing a Tonbulla (clay sealing). Thousands of these stamped clay pieces were excavated in the "Bone Rooms" (Knochenräume). They served as administrative tags or receipts for goods delivered to the fortress, often bearing the seal of the King or royal officials.'
  },
  {
    url: '3dmodels/Destruction_Debris_Tile_opt.glb',
    name: 'Destruction Debris Tile',
    description: 'A textured ground asset depicting the Brandschutt (fire destruction debris). This tile represents the layer of ash, charred timber, and baked mud found throughout the site, preserving the moment Rusai-URU.TUR was destroyed by fire around 590 BC. It adds historical realism to ruined or post-siege scenes.'
  },
  {
    url: '3dmodels/Ddway_opt.glb',
    name: 'Domestic Doorway Module',
    description: 'A residential architectural element designed for the settlement (Siedlung) area at the foot of the fortress. Unlike the monumental gates, this doorway module reflects the domestic architecture of the private houses excavated in Area S2, featuring a simple lintel and jambs suited for mudbrick construction.'
  },
  {
    url: '3dmodels/Fortress_Corner_Segment_opt.glb',
    name: 'Fortress Corner Segment',
    description: 'A large modular section representing a complete Eckrisalit (Corner Projection). This asset allows for the construction of the jagged, saw-tooth perimeter walls typical of Urartian fortification design, which maximized flanking fire coverage for the defenders as described in Bastam I.'
  },
  {
    url: '3dmodels/Monumental_Gate_Entrance_opt.glb',
    name: 'Monumental Gate Entrance',
    description: 'A grand architectural asset representing the Southern and Northern Gates (Südtor / Nordtor). Based on the excavation plans, this model captures the imposing nature of the main fortress entrances, featuring heavy flanking towers and stone thresholds that controlled access to the citadel.'
  },
  {
    url: '3dmodels/arrow_head_opt.glb',
    name: 'Peykan (Arrowhead)',
    description: 'A detailed prop representing the iron arrowheads and lance tips (Eisen-Lanzenspitzen) excavated at the site. "Peykan" (Persian for arrowhead) refers to the military remnants found in the destruction layers, testifying to the garrison\'s weaponry and the final battle for the fortress.'
  },
  {
    url: '3dmodels/pot_opt.glb',
    name: 'Urartian Pot',
    description: 'A ceramic prop representing the distinctive Urartian pottery found throughout the site. This model is based on the fine red polished ware and utilitarian vessels found in the settlement and store rooms (Bastam I), essential for dressing scenes in magazines and domestic quarters.'
  },
  {
    url: '3dmodels/roof_opt.glb',
    name: 'Roof Module',
    description: 'A structural module depicting the flat Urartian roof construction. Based on clay impressions found in the destruction debris (Bastam II), this model features closely laid round timber beams covered with reed mats and a thick layer of tamped earth, a distinct style of the ancient Near East.'
  },
  {
    url: '3dmodels/Slope_Connector_opt.glb',
    name: 'Slope Connector',
    description: 'A utility architectural piece designed to bridge the gap between different terrace levels. Essential for the Hangbebauung (Slope Building) areas, this connector allows for the seamless transition of walls across the jagged, irregular bedrock topography characteristic of the Bastam site.'
  },
  {
    url: '3dmodels/Stable_Manger_1opt.glb',
    name: 'Stable Manger',
    description: 'A functional interior prop based on Wolfram Kleiss\'s interpretation of the pillared halls. As detailed in Bastam II, the long stone benches (Bänke) lining the walls of the halls were likely used as Futtertröge (mangers), identifying these large buildings as royal horse stables for the cavalry.'
  },
  {
    url: '3dmodels/staircase_stone_opt.glb',
    name: 'Stone Staircase',
    description: 'A structural module representing the internal stone staircases (Treppenhaus) found in multi-story buildings like the Hallenbau. These stairs provided access to upper floors or the roof, constructed from rough-hewn stone slabs to connect the varying elevations of the terraced architecture.'
  },
  {
    url: '3dmodels/Bone_RoomFloorTile_opt.glb',
    name: 'Bone Room Floor Tile',
    description: 'A ground texture asset recreating the unique archaeological phenomenon of the "Bone Rooms" found in the Middle Castle (Mittelburg). As detailed in Bastam II, excavations in Room MB 2,1 revealed a massive layer containing nearly 500,000 animal bones mixed with ash and clay bullae. This tile depicts that specific destruction horizon.'
  }
].map((item, index) => ({
  id: `artifact-${index}`,
  name: item.name,
  url: item.url,
  description: item.description,
  fileName: item.url ? item.url.split('/').pop() : undefined
}));

const App: React.FC = () => {
  const [artifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);
  const [activeArtifactId, setActiveArtifactId] = useState<string>(INITIAL_ARTIFACTS[0].id);
  const [cameraMode, setCameraMode] = useState<CameraMode>(CameraMode.CINEMATIC);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ARTICLE);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeArtifact = artifacts.find(a => a.id === activeArtifactId) || artifacts[0];
  const currentIndex = artifacts.findIndex(a => a.id === activeArtifactId);

  // Auto-switch camera mode based on ViewMode
  useEffect(() => {
    if (viewMode === ViewMode.CINEMA) {
      setCameraMode(CameraMode.ORBIT);
    } else if (viewMode === ViewMode.ARTICLE) {
      setCameraMode(CameraMode.CINEMATIC);
    }
  }, [viewMode]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);
    }
  };

  const setModelByName = (name: string) => {
    const found = artifacts.find(a => a.name.toLowerCase().includes(name.toLowerCase()) || (a.url && a.url.toLowerCase().includes(name.toLowerCase())));
    if (found) {
      setActiveArtifactId(found.id);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % artifacts.length;
    setActiveArtifactId(artifacts[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + artifacts.length) % artifacts.length;
    setActiveArtifactId(artifacts[prevIndex].id);
  };

  return (
    <div className="relative w-full h-screen bg-[#f4f1ea] font-sans text-bastam-text overflow-hidden selection:bg-bastam-accent/30 selection:text-bastam-dark">
      
      {/* 3D Background - Responsive width based on mode */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${viewMode === ViewMode.ARTICLE ? 'w-full lg:w-[55%]' : 'w-full'}`}>
        <Environment3D 
          modelUrl={activeArtifact.url} 
          mode={cameraMode}
          fileName={activeArtifact.fileName}
          scrollProgress={scrollProgress}
        />
        
        {/* Vignette Overlay (Only in Article mode) */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-gradient-to-r from-transparent via-transparent to-[#f4f1ea] ${viewMode === ViewMode.ARTICLE ? 'opacity-100' : 'opacity-0'}`} />

        {/* Artifact Description Card (Visible in Article & Cinema mode) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 left-8 md:left-12 max-w-[320px] md:max-w-md p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-xl shadow-xl text-bastam-dark transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 pointer-events-auto ${
            isDescriptionVisible && (viewMode === ViewMode.ARTICLE || viewMode === ViewMode.CINEMA) 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-12 pointer-events-none'
          }`}
        >
           <div className="flex items-center gap-3 mb-4 opacity-60">
             <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-bastam-accent">Artifact {String(currentIndex + 1).padStart(2, '0')}</div>
             <div className="h-[1px] flex-1 bg-bastam-dark/20"></div>
           </div>
           
           <h2 className="font-serif text-3xl md:text-4xl mb-4 leading-none text-bastam-dark">{activeArtifact.name}</h2>
           
           <div className="max-h-[300px] overflow-y-auto no-scrollbar">
             <p className="font-sans text-sm leading-relaxed text-bastam-text/90 font-medium">
               {activeArtifact.description}
             </p>
           </div>
           
           {activeArtifact.url === null && (
              <div className="mt-4 pt-4 border-t border-bastam-dark/10 text-[10px] text-bastam-text/50 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bastam-accent/50 animate-pulse"></span>
                Digital Reconstruction Pending
              </div>
           )}
        </div>
      </div>

      {/* Header - Minimal & Brand Centric */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
           <div className="flex items-center gap-3">
             <h1 className="font-serif text-2xl font-bold tracking-widest text-bastam-dark">BASTAM</h1>
             <span className="h-4 w-[1px] bg-bastam-dark/20"></span>
             <span className="text-[10px] font-sans tracking-[0.3em] text-bastam-text/60 uppercase">Digital Archive</span>
           </div>
        </div>
      </nav>

      {/* Interface Controls */}
      <InterfaceOverlay 
        artifact={activeArtifact}
        cameraMode={cameraMode}
        onModeToggle={setCameraMode}
        artifacts={artifacts}
        onSelectArtifact={setActiveArtifactId}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={currentIndex}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isDescriptionVisible={isDescriptionVisible}
        onToggleDescription={() => setIsDescriptionVisible(!isDescriptionVisible)}
      />

      {/* ARTICLE SIDEBAR - The Core Content */}
      <div 
        className={`absolute top-0 right-0 h-full z-10 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] bg-[#f4f1ea]/95 backdrop-blur-md border-l border-bastam-dark/5 shadow-2xl ${
          viewMode === ViewMode.ARTICLE ? 'translate-x-0 w-full lg:w-[45%]' : 'translate-x-full w-full lg:w-[45%]'
        }`}
      >
        {/* CLOSE BUTTON - Switches to CINEMA view */}
        <button 
          onClick={() => setViewMode(ViewMode.CINEMA)}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/80 text-bastam-dark/40 hover:text-bastam-accent hover:bg-white transition-all duration-300 shadow-sm"
          title="Close Article / Enter Cinema Mode"
        >
          <X size={20} />
        </button>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-full w-full overflow-y-auto no-scrollbar"
        >
          <div className="p-8 md:p-16 flex flex-col gap-20 pb-48 min-h-full max-w-2xl mx-auto">
            
            {/* ARTICLE HERO */}
            <section className="pt-24">
               <div className="inline-flex items-center gap-3 text-bastam-accent mb-8">
                  <span className="h-[1px] w-12 bg-bastam-accent"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.25em]">Research Profile</span>
               </div>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-bastam-dark mb-10">
                 Digital Reconstruction of Bastam Fortress: An Architectural Critique
               </h1>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-bastam-text/70 border-t border-bastam-dark/10 pt-8">
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-bastam-text/40 mb-1">Supervisor</span>
                   <p className="font-serif text-bastam-dark">Dr. Mohammadkhani</p>
                 </div>
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-bastam-text/40 mb-1">Research Team</span>
                   <p className="font-serif text-bastam-dark">Kian Mansouri Jamshidi, Amir Erfan Bastami, Alireza Samadian</p>
                 </div>
                 <div className="md:col-span-2">
                   <span className="block text-[10px] uppercase tracking-widest text-bastam-text/40 mb-1">Based On</span>
                   <p className="font-serif italic text-bastam-dark">Excavation Reports Bastam I (1979) and Bastam II (1988)</p>
                 </div>
               </div>

               <div className="mt-16 flex items-center gap-4 text-xs font-medium text-bastam-text/40 uppercase tracking-widest animate-pulse">
                 <MousePointer2 size={16} />
                 <span>Scroll to Read</span>
               </div>
            </section>

            {/* FULL ARTICLE TEXT START */}
            
            {/* CHAPTER ONE */}
            <section className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:font-normal prose-p:font-sans prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none">
              <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6">Chapter One</span>
              <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8">Fundamentals and Contextual Reading</h2>
              
              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">01. The Opening Narrative: Why Did Architects Turn to Archaeologists?</h3>
              <p>
                In this research, we entered the ancient site of Bastam with a fundamental and bold question: Is what archaeologists have drawn on paper actually physically and engineeringly "stable" and "buildable"? We did not approach the massive documents of Wolfram Kleiss merely to review history; rather, with an engineering and critical gaze, we intended to put the lines he introduced as walls, roofs, and architectural spaces to the test.
              </p>
              <p>
                Our goal in this article is to analyze the quality of Kleiss's work. We want to know if a German archaeologist in the 1970s was able to correctly understand the structural and spatial logic of a mountainous megastructure. To answer this question, we adopted a reverse method: <strong className="text-bastam-dark font-medium">Digital Reconstruction and Building Information Modeling (BIM)</strong>. We proceeded with the assumption that if the structures drawn by Kleiss can be modeled in modeling software and their connections are logical, then his work is accurate. Otherwise, we would be facing "architectural holes" in the archaeological reports.
              </p>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">02. Environmental Complexities: Architecture in Battle with Nature</h3>
              <p>
                Before we can critique the architecture of Bastam, we must know under what conditions this architecture was formed. Using the simple term "topography" to describe the context of Bastam does not do justice to the subject. Here, we are facing a set of environmental and climatic complexities that directly dictated the architectural form.
              </p>
              <p>
                Bastam, or "Rusai-URU.TUR" (meaning The Small City of Rusa), is built on a rock ridge and blade-like cliff in West Azerbaijan. This context possesses the following limiting characteristics:
              </p>
              <ul className="list-none pl-0 space-y-6 my-8">
                <li className="pl-6 border-l-2 border-bastam-accent/30">
                  <strong className="text-bastam-dark block mb-1">Steep Slopes and Landslides</strong>
                  The rock bed of the fortress is not a flat surface; it is a ridge with steep slopes that forced Urartian architects to construct massive terraces and heavy retaining walls. Every building in Bastam, before being a space, is a soil-retaining structure.
                </li>
                <li className="pl-6 border-l-2 border-bastam-accent/30">
                  <strong className="text-bastam-dark block mb-1">Harsh and Windy Climate</strong>
                  Being situated at high altitudes and exposed to cold and severe winds drove the architecture towards introversion, thick adobe walls (as thermal insulation), and minimal openings.
                </li>
                <li className="pl-6 border-l-2 border-bastam-accent/30">
                  <strong className="text-bastam-dark block mb-1">Difficult Access</strong>
                  The elongated and linear form of the site (800 meters long and 400 meters wide) made spatial organization dependent on a single longitudinal axis, making the hierarchy of access strictly security-oriented and controlled.
                </li>
              </ul>
              
              {/* Interactive Trigger */}
              <button 
                onClick={() => setModelByName('Monumental Gate Entrance')}
                className="w-full not-prose group flex items-center justify-between p-6 bg-white border border-bastam-dark/5 shadow-sm hover:shadow-md hover:border-bastam-accent/50 transition-all rounded-sm my-8"
              >
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-bastam-bg text-bastam-accent rounded-full"><Maximize2 size={18} /></div>
                   <div className="text-left">
                     <span className="text-[10px] uppercase tracking-widest text-bastam-text/50 block">Figure 1</span>
                     <span className="font-serif text-lg text-bastam-dark">East Building (General View)</span>
                   </div>
                 </div>
                 <ArrowRight className="text-bastam-accent opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
              </button>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">03. What is Bastam? Anatomy of a "Fortress-City"</h3>
              <p>
                For an audience who has not heard the name Bastam, a clear image must be drawn. Bastam is not merely a military castle; rather, it is a complete Fortress-City that was founded in the 7th century BC by the powerful Urartian king, "Rusa II".
              </p>
              <p>Why "Fortress-City"? Because this complex is composed of:</p>
              <ul>
                <li><strong>The Citadel (Burgberg):</strong> Located on top of the rock cliff, comprising the ruler's residence, temples, warehouses, and military garrison.</li>
                <li><strong>The Lower Settlement (Siedlung):</strong> Spread out at the foot of the mountain, comprising the living quarters of common people, craftsmen, and merchants.</li>
              </ul>
            </section>

            {/* CHAPTER TWO */}
            <section className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:font-normal prose-p:font-sans prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none pt-12 border-t border-bastam-dark/10">
              <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6">Chapter Two</span>
              <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8">Spatial Analysis (Physical Reading and Functional Analysis)</h2>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">04. Tectonics and Logic of Construction: The Language of Materials in Bastam</h3>
              <p>
                One of the key sections of our critique is the review of the "Technique of Construction." In his reports, Kleiss pointed out materials with high precision, and in our modeling, we realized that the selection of these materials followed a precise engineering logic. The construction system of Bastam rests on three pillars:
              </p>

              <div className="not-prose grid grid-cols-1 gap-4 my-8">
                 <button onClick={() => setModelByName('Ashlar Stone')} className="text-left p-6 bg-white/50 border border-bastam-dark/5 hover:bg-white hover:border-bastam-accent transition-all">
                    <h4 className="font-serif text-lg text-bastam-dark mb-2">A) Stone Plinth (Stone Socle)</h4>
                    <p className="text-sm text-bastam-text/70 leading-relaxed">All walls in Bastam, without exception, rest on a massive stone base. These stones had two vital functions: First, the transfer of the load of heavy adobe walls onto the uneven rock bed. Second, acting as a Damp Proof Course.</p>
                 </button>
                 <button onClick={() => setModelByName('Standard Wall Segment')} className="text-left p-6 bg-white/50 border border-bastam-dark/5 hover:bg-white hover:border-bastam-accent transition-all">
                    <h4 className="font-serif text-lg text-bastam-dark mb-2">B) Mudbrick Superstructure</h4>
                    <p className="text-sm text-bastam-text/70 leading-relaxed">On the stone bases, thick adobe walls (sometimes reaching 4 meters in thickness) were raised. Adobe was used as the best available thermal insulator.</p>
                 </button>
                 <button onClick={() => setModelByName('Urartian Wooden Column')} className="text-left p-6 bg-white/50 border border-bastam-dark/5 hover:bg-white hover:border-bastam-accent transition-all">
                    <h4 className="font-serif text-lg text-bastam-dark mb-2">C) Wooden Ring Beam System</h4>
                    <p className="text-sm text-bastam-text/70 leading-relaxed">Without the existence of horizontal and vertical wooden ties (ring beams), these tall walls would not have endured against earthquakes. Wood provided flexibility to the compressive adobe.</p>
                 </button>
              </div>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">05. General View of Spaces: A Narrative from Bottom to Top</h3>
              <p>
                To understand the architecture of Bastam, one must visualize a path that a visitor traverses in Bastam. This path is a journey from the most public sectors to the most private and secure layers:
              </p>
              <ul>
                 <li><strong>The Settlement (Siedlung):</strong> At the lowest level, the houses of ordinary people are located.</li>
                 <li><strong>The Lower Citadel (Unterburg):</strong> Through the south gate, is the main military entrance. Here, guesthouses, stables, and primary warehouses are located.</li>
                 <li><strong>The Middle Citadel (Mittelburg):</strong> Ascending to a higher elevation, we reach the economic and religious heart of the fortress. Columned halls for food storage and temples are located here.</li>
                 <li><strong>The Upper Citadel (Oberburg):</strong> At the peak of the cliff, the ruler's citadel is located. Double-walled enclosures and private spaces are characteristics of this section.</li>
              </ul>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">06. Wolfram Kleiss: Archaeologist with an Architect's Mind</h3>
              <p>
                What makes the Bastam reports valuable to us is the character of Wolfram Kleiss himself. In reviewing "Bastam I" and "Bastam II," we realized that Kleiss is not an ordinary archaeologist. He has a completely architectural mindset. Unlike many archaeologists who only care about the sequence of layers (Stratigraphy), Kleiss has a concern for "Space" and "Mass."
              </p>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">01. Architectural Re-reading: When the Soil Speaks</h3>
              <p>
                In the previous chapter, we recognized the physical context of the fortress. But the art of Wolfram Kleiss becomes evident in the detailed analysis of individual buildings. In the report Bastam I, many spaces were introduced merely with general names such as "East Building." However, in Bastam II, with the entry of interdisciplinary methods (soil chemistry and osteology), our understanding of Bastam's architecture was transformed.
              </p>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">02. Redefining "East Building" (Ostbau): Royal Stables</h3>
              <p>
                One of the most brilliant interpretive shifts in Kleiss's reports relates to two massive columned buildings at the bottom of the fortress. At first glance, the "East Building" looked like a warehouse or a barracks. But Kleiss in the second volume, using chemical evidence, redefined this space.
              </p>
              
              <div className="not-prose bg-bastam-gold/10 border-l-4 border-bastam-gold p-8 my-8 rounded-r-lg">
                <div className="flex items-center gap-2 mb-3 text-bastam-gold font-serif italic">
                   <FileText size={18} />
                   <span>Analytical Note: Transition from Archaeology to Architecture</span>
                </div>
                <p className="text-bastam-dark text-sm leading-relaxed">
                   Phosphate tests on the soil of these halls showed a high concentration of urea and animal waste. Finding this, alongside the discovery of low stone platforms (previously thought to be benches), proved that these were "Mangers" and these magnificent halls were, in fact, "Royal Stables" and a camp for the cavalry.
                </p>
                <button 
                  onClick={() => setModelByName('Stable Manger')} 
                  className="mt-4 px-4 py-2 bg-white text-bastam-dark text-xs uppercase font-bold tracking-widest rounded-sm shadow-sm hover:text-bastam-accent transition-colors"
                >
                  View Stable Manger
                </button>
              </div>

              <p>
                The impact of the change of use on architectural critique: This change of use (from fortress to stable) changes our view of the architectural details of these buildings:
              </p>
              <ul>
                <li><strong>Smart Flooring:</strong> Kleiss shows in sections that the service corridors (where horses stood) were paved with flat stones to be resistant to hoof impact, while the middle corridor (where grooms walked) remained earthen.</li>
                <li><strong>Ventilation Issue:</strong> Keeping about 60 war horses in a closed space requires a strong ventilation system.</li>
                <li><strong>Structural Modulation:</strong> The column rhythm in these halls (intervals of 3.00 meters) is precisely the module required for tying two horses in each span.</li>
              </ul>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">03. The Pithos Halls: Engineering of Storage</h3>
              <p>
                The middle section of the fortress (Mittelburg) is the host to massive warehouses of provisions and wine. The distinctive feature of these spaces is the presence of gigantic jars (Pithoi) that are buried up to the neck in the soil.
              </p>
              <p>
                <strong>Architectural Challenge:</strong> How could one access the contents of the jars? If the jars are 2 meters high and buried in the floor, their mouths are located at a height higher than human height. Kleiss, with precision in the remains of the side walls, recorded holes that are the key to solving this puzzle.
              </p>
              <button 
                onClick={() => setModelByName('Pithos Bench')}
                className="not-prose text-bastam-accent hover:text-bastam-dark underline decoration-1 underline-offset-4 font-serif italic transition-colors"
              >
                Inspect Pithos Bench Structure →
              </button>

              <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">04. Bone Rooms: Catastrophe and Ritual Architecture</h3>
              <p>
                Perhaps the most dramatic section of the Bastam II reports is the discovery of strange spaces near the citadel gate known as the "Bone Rooms." These spaces, analyzed by Paul Zimansky, contained thousands of pieces of animal bones and hundreds of clay seal impressions (Bulla).
              </p>
              
              <div className="not-prose grid grid-cols-2 gap-4 my-8">
                 <div onClick={() => setModelByName('Bone Room Floor Tile')} className="cursor-pointer group relative aspect-square bg-black overflow-hidden rounded-sm">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80')] bg-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                   <div className="absolute bottom-4 left-4 text-white z-10">
                     <span className="text-[10px] uppercase tracking-widest bg-black/50 px-2 py-0.5">Figure 4</span>
                     <p className="font-serif mt-1">Bone Room</p>
                   </div>
                 </div>
                 <div onClick={() => setModelByName('Bulla (Clay Sealing)')} className="cursor-pointer group relative aspect-square bg-black overflow-hidden rounded-sm">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599940824399-b87987ced72a?auto=format&fit=crop&q=80')] bg-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                   <div className="absolute bottom-4 left-4 text-white z-10">
                     <span className="text-[10px] uppercase tracking-widest bg-black/50 px-2 py-0.5">Figure 5</span>
                     <p className="font-serif mt-1">Clay Bulla</p>
                   </div>
                 </div>
              </div>

              <p>
                <strong>Spatial Analysis:</strong> Warehouse or Slaughterhouse? From an architectural perspective, these spaces have specific characteristics: Strategic location next to the gate, compact plan, and lack of proper lighting. The bones were found amidst thick layers of ash and roof debris.
              </p>
            </section>

             {/* CHAPTER THREE */}
             <section className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:font-normal prose-p:font-sans prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none pt-12 border-t border-bastam-dark/10">
               <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6">Chapter Three</span>
               <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8">Modeling and Verification (Technical Critique)</h2>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">01. Digital Lab: Reconstruction to Discover the Truth</h3>
               <p>
                 After studying the documents, our team decided to convert Kleiss's 2D drawings and sections into a Building Information Model (BIM). The goal was to find "Geometric Contradictions" and "Structural Flaws." The modeling process revealed amazing results.
               </p>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">02. Analyzing "Access Galleries"</h3>
               <p>
                 In the section of the warehouses (Pithos Halls), during the modeling process, we initially tried to build the space without any overhead elements. The result revealed a "Functional Contradiction": Access to the jars was impossible.
               </p>
               <p>
                 <strong>Modeling Verification Result:</strong> Here we must explicitly emphasize that the solution of the "Suspended Wooden Gallery" is not our team's invention. Rather, it is the evidence Kleiss pointed to in Bastam II that we have made three-dimensional.
               </p>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">03. Structural Critique: The Challenge of Wide Spans</h3>
               <p>
                 In the structural analysis of the "East Building" (Ostbau), we faced spans with a width of about 4.20 meters in the middle nave. The structural modeling showed that this span is not "impossible" from an engineering point of view, but it is "challenging."
               </p>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">04. Execution Details: The Logic of Protection from Mudbrick</h3>
               <p>
                 When we modeled the walls without a roof overhang (Overhang) and simulated the precipitation conditions of Azerbaijan, we noticed a severe vulnerability. The mudbrick walls without canopies are defenseless against the washing of driving rains.
               </p>
               <p>
                 Here, Kleiss's precision of observation became apparent. In his sketches, he always extended the roof beyond the edge of the wall. Our modeling proved that these "Protective Cantilevers" were a vital necessity for the survival of the mudbrick structure in that climate.
               </p>
               <button 
                  onClick={() => setModelByName('Roof Module')} 
                  className="not-prose w-full p-4 border border-bastam-dark/10 text-center text-sm font-bold uppercase tracking-widest text-bastam-dark hover:bg-bastam-dark hover:text-white transition-colors mt-4"
               >
                 View Roof & Console Details
               </button>
            </section>


             {/* CHAPTER FOUR */}
             <section className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:font-normal prose-p:font-sans prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none pt-12 border-t border-bastam-dark/10 mb-24">
               <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6">Chapter Four</span>
               <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8">Conclusion and Execution Manual</h2>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">01. Final Answer: Did We Find an Error?</h3>
               <p>
                 At the beginning of this research, we entered the Bastam fortress with doubt and skepticism. Now, after hours of structural and spatial modeling, the final answer is clear: No, we did not find a fundamental error in Kleiss's spatial and structural understanding. Conversely, the modeling process made us admirers of his precision. What we built in the 3D environment confirmed the correctness of his decisions: The thickness of the walls was proportional to the load, the placement of columns followed a precise modulation, and the elevational sections on the slope were resolved correctly.
               </p>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">02. The Necessity of the "Archaeologist-Architect" Approach</h3>
               <p>
                 The experience of Bastam proves to us that for complex sites, the presence of an archaeologist with an "Architectural Mindset" is a necessity. Wolfram Kleiss was successful because he considered Bastam alive; he knew it as "Static," meaning stable.
               </p>
               
               <div className="not-prose bg-bastam-dark text-white p-8 rounded-sm my-8">
                  <h4 className="font-serif text-xl mb-6">Execution Manual: Architectural Documentation</h4>
                  <ul className="space-y-4 text-sm font-sans opacity-90">
                    <li className="flex gap-3">
                      <span className="font-bold text-bastam-gold">01</span>
                      <span><strong>Thinking in Section.</strong> Archaeology is usually the science of the "Plan," but architecture happens in the "Section."</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-bastam-gold">02</span>
                      <span><strong>Statics & Tectonics Analysis.</strong> Every line drawn on paper must, in reality, bear weight.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-bastam-gold">03</span>
                      <span><strong>Function Follows Details.</strong> The usage of space is hidden in the details (soil chemistry, type of flooring).</span>
                    </li>
                     <li className="flex gap-3">
                      <span className="font-bold text-bastam-gold">04</span>
                      <span><strong>Layer Separation.</strong> In sites with continued habitation, the visual separation of layers is vital.</span>
                    </li>
                     <li className="flex gap-3">
                      <span className="font-bold text-bastam-gold">05</span>
                      <span><strong>Reconstruction via Reasoning.</strong> Do not draw what is not there, unless there is a reason for it to be there.</span>
                    </li>
                  </ul>
               </div>

               <h3 className="font-serif text-xl mt-12 mb-4 text-bastam-dark">03. Closing Words</h3>
               <p>
                 The project of re-reading Bastam taught us that Architecture and Archaeology are two sides of the same coin. Archaeology provides the "Matter" and Architecture breathes "Spirit and Space" into it. Wolfram Kleiss, with his unparalleled precision, built a bridge between these two worlds.
               </p>
            </section>
            
            <footer className="text-xs text-bastam-text/40 pt-12 border-t border-bastam-dark/10 pb-8">
               <p className="mb-2 uppercase tracking-widest font-bold">References</p>
               <p>Kleiss, Wolfram. Bastam I: Ausgrabungen in den Urartäischen Anlagen 1972-1975. Teheraner Forschungen, Band IV. Gebr. Mann Verlag, Berlin, 1979.</p>
               <p>Kleiss, Wolfram. Bastam II: Ausgrabungen in den Urartäischen Anlagen 1977-1978. Teheraner Forschungen, Band V. Gebr. Mann Verlag, Berlin, 1988.</p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;