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
  Info,
  Languages
} from 'lucide-react';
import { CameraMode, Artifact, ViewMode, Language } from '../types';

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
  language: Language;
  onLanguageToggle: () => void;
  labels: {
    research: string;
    archive: string;
    inspect: string;
    pending: string;
    active: string;
  };
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
  onToggleDescription,
  language,
  onLanguageToggle,
  labels
}) => {

  const handleResearchClick = () => {
    if (viewMode === ViewMode.ARTICLE) {
      onViewModeChange(ViewMode.CINEMA);
    } else {
      onViewModeChange(ViewMode.ARTICLE);
    }
  };

  const isRTL = language === 'fa';

  return (
    <>
      {/* Floating Dock - Responsive Design */}
      <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div 
          className={`
            bg-[#f4f1ea]/90 backdrop-blur-xl border border-bastam-dark/10 shadow-2xl shadow-bastam-dark/10 
            rounded-2xl p-2 md:p-2 
            flex items-center gap-2 pointer-events-auto transition-all duration-300 
            w-full max-w-[95%] md:max-w-3xl
            ${isRTL ? 'flex-row-reverse' : 'flex-row'}
          `}
        >
          
          {/* Left: Mode Switcher */}
          <div className={`flex bg-bastam-dark/5 rounded-xl p-1 shrink-0 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button 
              onClick={handleResearchClick}
              className={`
                flex items-center justify-center gap-2 px-3 md:px-4 py-3 md:py-2 rounded-lg transition-all duration-300 
                ${viewMode === ViewMode.ARTICLE ? 'bg-white shadow-sm text-bastam-dark' : 'text-bastam-text/50 hover:text-bastam-dark'} 
                ${isRTL ? 'flex-row-reverse font-persian' : 'font-sans'}
              `}
              title={labels.research}
            >
              <BookOpen size={18} />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">{labels.research}</span>
            </button>
            <button 
              onClick={() => onViewModeChange(ViewMode.ARCHIVE)}
              className={`
                flex items-center justify-center gap-2 px-3 md:px-4 py-3 md:py-2 rounded-lg transition-all duration-300 
                ${viewMode === ViewMode.ARCHIVE ? 'bg-white shadow-sm text-bastam-dark' : 'text-bastam-text/50 hover:text-bastam-dark'} 
                ${isRTL ? 'flex-row-reverse font-persian' : 'font-sans'}
              `}
              title={labels.archive}
            >
              <Grid size={18} />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">{labels.archive}</span>
            </button>
          </div>

          <div className="w-[1px] h-8 bg-bastam-dark/10 hidden md:block" />

          {/* Center: Navigation */}
          <div className={`flex-1 flex items-center justify-between px-1 md:px-2 min-w-0 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button 
              onClick={isRTL ? onNext : onPrev}
              className="p-3 md:p-3 rounded-full hover:bg-white text-bastam-text/60 hover:text-bastam-dark transition-colors active:scale-95"
            >
              <ChevronLeft size={22} className={isRTL ? "rotate-180" : ""} />
            </button>

            <div className="flex flex-col items-center min-w-0 text-center px-2">
              <span className="text-[9px] text-bastam-text/40 uppercase tracking-widest font-mono mb-0.5">
                {String(currentIndex + 1).padStart(2, '0')} / {String(artifacts.length).padStart(2, '0')}
              </span>
              <span className={`text-xs md:text-sm font-bold text-bastam-dark truncate w-[80px] xs:w-[120px] md:w-auto ${isRTL ? 'font-persian' : 'font-serif'}`}>
                {artifact.name}
              </span>
            </div>

            <button 
              onClick={isRTL ? onPrev : onNext}
              className="p-3 md:p-3 rounded-full hover:bg-white text-bastam-text/60 hover:text-bastam-dark transition-colors active:scale-95"
            >
              <ChevronRight size={22} className={isRTL ? "rotate-180" : ""} />
            </button>
          </div>

          <div className="w-[1px] h-8 bg-bastam-dark/10 hidden md:block" />

          {/* Right: Camera Controls & Lang */}
          <div className={`flex items-center gap-1 shrink-0 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
               onClick={onLanguageToggle}
               className="p-3 md:p-3 rounded-xl transition-colors hover:bg-white text-bastam-text/70 active:scale-95"
               title="Switch Language / تغییر زبان"
            >
               <Languages size={20} />
            </button>
            <button 
               onClick={onToggleDescription}
               className={`p-3 md:p-3 rounded-xl transition-colors relative group active:scale-95 hidden xs:block ${isDescriptionVisible ? 'bg-white text-bastam-dark shadow-sm' : 'hover:bg-white text-bastam-text/70'}`}
               title="Toggle Description Card"
            >
              <Info size={20} />
            </button>
            <button 
               onClick={() => onModeToggle(cameraMode === CameraMode.CINEMATIC ? CameraMode.ORBIT : CameraMode.CINEMATIC)}
               className={`p-3 md:p-3 rounded-xl transition-colors relative group active:scale-95 ${cameraMode === CameraMode.ORBIT ? 'bg-bastam-accent text-white shadow-lg shadow-bastam-accent/30' : 'hover:bg-white text-bastam-text/70'}`}
               title={cameraMode === CameraMode.CINEMATIC ? "Enable Manual Control" : "Enable Cinematic Mode"}
            >
              {cameraMode === CameraMode.CINEMATIC ? <Play size={20} /> : <Anchor size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Archive Grid Overlay */}
      {viewMode === ViewMode.ARCHIVE && (
        <div className={`fixed inset-0 z-40 bg-[#f4f1ea] animate-in fade-in zoom-in-95 duration-500 flex flex-col pt-24 pb-32 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
          
          <div className={`w-full max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-bastam-dark/10 pb-8 ${isRTL ? 'md:flex-row-reverse font-persian' : ''}`}>
             <div>
                <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-2">{isRTL ? 'مجموعه دیجیتال' : 'Digital Collection'}</span>
                <h2 className={`text-3xl md:text-5xl text-bastam-dark ${isRTL ? 'font-persian font-bold' : 'font-serif'}`}>
                   {isRTL ? 'فهرست آثار' : 'Artifact Index'}
                </h2>
             </div>
             <div className="mt-4 md:mt-0">
               <div className={`text-2xl md:text-3xl text-bastam-dark/20 ${isRTL ? 'font-persian' : 'font-serif'}`}>
                   {isRTL ? '۲۰ اثر' : '20 Items'}
               </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
                {artifacts.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectArtifact(item.id);
                      onViewModeChange(ViewMode.ARTICLE);
                    }}
                    className={`group relative flex flex-col transition-all duration-300 p-4 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-bastam-dark/5 ${
                      item.id === artifact.id ? 'bg-white shadow-md ring-1 ring-bastam-accent' : 'opacity-80 hover:opacity-100'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {/* Thumbnail Placeholder */}
                    <div className="aspect-[4/3] bg-bastam-dark/5 rounded-lg overflow-hidden mb-4 relative flex items-center justify-center group-hover:bg-bastam-dark/10 transition-colors w-full">
                       {item.url ? (
                         <Box size={32} className="text-bastam-dark/40" />
                       ) : (
                         <div className="text-center p-4">
                           <Box size={32} className="text-bastam-dark/20 mx-auto mb-2" />
                           <span className={`text-[10px] text-bastam-dark/40 uppercase tracking-widest ${isRTL ? 'font-persian' : 'font-sans'}`}>
                             {labels.pending}
                           </span>
                         </div>
                       )}
                       
                       <div className={`absolute top-3 text-[10px] font-mono text-bastam-dark/40 ${isRTL ? 'right-3' : 'left-3'}`}>
                         {(idx + 1).toString().padStart(2, '0')}
                       </div>

                       {item.id === artifact.id && (
                         <div className={`absolute bottom-3 px-2 py-1 bg-bastam-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm ${isRTL ? 'left-3 font-persian' : 'right-3'}`}>
                           {labels.active}
                         </div>
                       )}
                    </div>

                    <h3 className={`text-lg text-bastam-dark leading-tight mb-2 group-hover:text-bastam-accent transition-colors ${isRTL ? 'font-persian font-bold' : 'font-serif'}`}>
                      {item.name}
                    </h3>
                    <p className={`text-xs text-bastam-text/60 line-clamp-2 leading-relaxed ${isRTL ? 'font-persian' : 'font-sans'}`}>
                      {item.description}
                    </p>
                    
                    <div className={`mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-bastam-text/40 group-hover:text-bastam-accent transition-colors ${isRTL ? 'flex-row-reverse font-persian' : 'flex-row'}`}>
                      <span>{labels.inspect}</span>
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