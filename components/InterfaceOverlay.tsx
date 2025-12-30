import React from 'react';
import { 
  Play, 
  Anchor, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  Box, 
  BookOpen, 
  Maximize2,
  Info 
} from 'lucide-react';
import { CameraMode, Artifact, ViewMode } from '../types';

interface InterfaceOverlayProps {
  artifact: Artifact;
  cameraMode: CameraMode;
  onModeToggle: (mode: CameraMode) => void;
  artifacts: Artifact[];
  onSelectArtifact: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isDescriptionVisible: boolean;
  onToggleDescription: () => void;
}

export const InterfaceOverlay: React.FC<InterfaceOverlayProps> = ({
  artifact,
  cameraMode,
  onModeToggle,
  artifacts,
  onSelectArtifact,
  onNext,
  onPrev,
  currentIndex,
  viewMode,
  onViewModeChange,
  isDescriptionVisible,
  onToggleDescription
}) => {

  const handleResearchClick = () => {
    if (viewMode === ViewMode.ARTICLE) {
      onViewModeChange(ViewMode.CINEMA);
    } else {
      onViewModeChange(ViewMode.ARTICLE);
    }
  };

  return (
    <>
      {/* Floating Dock - Bottom of Screen */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="bg-[#f4f1ea]/80 backdrop-blur-xl border border-bastam-dark/10 shadow-2xl shadow-bastam-dark/10 rounded-2xl p-2 flex items-center gap-2 sm:gap-4 pointer-events-auto transition-all hover:scale-[1.01] max-w-3xl w-full mx-6">
          
          {/* Left: Mode Switcher */}
          <div className="flex bg-bastam-dark/5 rounded-xl p-1">
            <button 
              onClick={handleResearchClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === ViewMode.ARTICLE ? 'bg-white shadow-sm text-bastam-dark' : 'text-bastam-text/50 hover:text-bastam-dark'}`}
              title={viewMode === ViewMode.ARTICLE ? "Switch to Cinema Mode" : "Read Research Article"}
            >
              <BookOpen size={16} />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Research</span>
            </button>
            <button 
              onClick={() => onViewModeChange(ViewMode.ARCHIVE)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === ViewMode.ARCHIVE ? 'bg-white shadow-sm text-bastam-dark' : 'text-bastam-text/50 hover:text-bastam-dark'}`}
            >
              <Grid size={16} />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Archive</span>
            </button>
          </div>

          <div className="w-[1px] h-6 bg-bastam-dark/10" />

          {/* Center: Navigation */}
          <div className="flex-1 flex items-center justify-between px-2 min-w-0">
            <button 
              onClick={onPrev}
              className="p-3 rounded-full hover:bg-white text-bastam-text/60 hover:text-bastam-dark transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex flex-col items-center min-w-0 text-center px-4">
              <span className="text-[9px] text-bastam-text/40 uppercase tracking-widest font-mono mb-0.5">
                {String(currentIndex + 1).padStart(2, '0')} / {String(artifacts.length).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-serif font-bold text-bastam-dark truncate w-[120px] sm:w-auto">
                {artifact.name}
              </span>
            </div>

            <button 
              onClick={onNext}
              className="p-3 rounded-full hover:bg-white text-bastam-text/60 hover:text-bastam-dark transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-bastam-dark/10" />

          {/* Right: Camera Controls & Info */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
               onClick={onToggleDescription}
               className={`p-3 rounded-xl transition-colors relative group ${isDescriptionVisible ? 'bg-white text-bastam-dark shadow-sm' : 'hover:bg-white text-bastam-text/70'}`}
               title="Toggle Description Card"
            >
              <Info size={18} />
            </button>
            <button 
               onClick={() => onModeToggle(cameraMode === CameraMode.CINEMATIC ? CameraMode.ORBIT : CameraMode.CINEMATIC)}
               className={`p-3 rounded-xl transition-colors relative group ${cameraMode === CameraMode.ORBIT ? 'bg-bastam-accent text-white shadow-lg shadow-bastam-accent/30' : 'hover:bg-white text-bastam-text/70'}`}
               title={cameraMode === CameraMode.CINEMATIC ? "Enable Manual Control" : "Enable Cinematic Mode"}
            >
              {cameraMode === CameraMode.CINEMATIC ? <Play size={18} /> : <Anchor size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Archive Grid Overlay */}
      {viewMode === ViewMode.ARCHIVE && (
        <div className="fixed inset-0 z-40 bg-[#f4f1ea] animate-in fade-in zoom-in-95 duration-500 flex flex-col pt-24 pb-32 overflow-hidden">
          
          <div className="w-full max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end border-b border-bastam-dark/10 pb-8">
             <div>
                <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-2">Digital Collection</span>
                <h2 className="font-serif text-4xl md:text-5xl text-bastam-dark">Artifact Index</h2>
             </div>
             <div className="text-right hidden sm:block">
               <div className="text-3xl font-serif text-bastam-dark/20">20 Items</div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pb-24">
                {artifacts.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectArtifact(item.id);
                      onViewModeChange(ViewMode.ARTICLE); // Auto switch back to view it contextually
                    }}
                    className={`group relative flex flex-col text-left transition-all duration-300 p-4 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-bastam-dark/5 ${
                      item.id === artifact.id ? 'bg-white shadow-md ring-1 ring-bastam-accent' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Thumbnail Placeholder */}
                    <div className="aspect-[4/3] bg-bastam-dark/5 rounded-lg overflow-hidden mb-4 relative flex items-center justify-center group-hover:bg-bastam-dark/10 transition-colors">
                       {item.url ? (
                         <Box size={32} className="text-bastam-dark/40" />
                       ) : (
                         <div className="text-center p-4">
                           <Box size={32} className="text-bastam-dark/20 mx-auto mb-2" />
                           <span className="text-[10px] text-bastam-dark/40 uppercase tracking-widest">Digital Restoration Pending</span>
                         </div>
                       )}
                       
                       <div className="absolute top-3 left-3 text-[10px] font-mono text-bastam-dark/40">
                         {(idx + 1).toString().padStart(2, '0')}
                       </div>

                       {item.id === artifact.id && (
                         <div className="absolute bottom-3 right-3 px-2 py-1 bg-bastam-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">
                           Active
                         </div>
                       )}
                    </div>

                    <h3 className="font-serif text-lg text-bastam-dark leading-tight mb-2 group-hover:text-bastam-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-bastam-text/60 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-bastam-text/40 group-hover:text-bastam-accent transition-colors">
                      <span>Inspect</span>
                      <Maximize2 size={10} />
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      )}
    </>
  );
};