import React, { useState, useEffect, useRef } from 'react';
import { Environment3D } from './components/Environment3D';
import { InterfaceOverlay } from './components/InterfaceOverlay';
import { CameraMode, Artifact, ViewMode, Language } from './types';
import { ArrowRight, Maximize2, FileText, MousePointer2, X } from 'lucide-react';

const GITHUB_BASE = 'https://raw.githubusercontent.com/sirkianmj/BastamMuseum/main/3dmodels/';

const CONTENT = {
  en: {
    title: "BASTAM",
    subtitle: "Digital Archive",
    labels: {
      research: "Research",
      archive: "Archive",
      inspect: "Inspect",
      pending: "Digital Restoration Pending",
      active: "Active",
      artifact: "Artifact",
      figure: "Figure"
    },
    artifacts: [
      {
        name: 'Standard Wall Segment',
        description: 'A modular wall section representing the standard fortification architecture of the Bastam citadel. Based on the Schalenbauweise (shell construction) technique described in the excavation reports, this model features a robust double-faced stone socle (base) filled with rubble, designed to support a mudbrick superstructure. This was the primary method used to enclose the vast 800-meter length of the fortress.'
      },
      {
        name: 'Stepped Slope Wall',
        description: 'Designed for the steep topography of the Bastam citadel, this module replicates the specific architecture of the Hangbebauung (Slope Construction). As detailed in Bastam II, Urartian architects cut stepped foundations (Felsabtreppungen) directly into the bedrock. This asset allows you to place walls that naturally step down angled terrain, connecting the upper citadel to the lower settlement.'
      },
      {
        name: 'Cyclopean Tower Block',
        description: 'A massive masonry block representing the heavy defensive architecture of the citadel’s lower fortifications. Based on the Risalit structures described in Bastam I, these large, rough-hewn blocks form the base of the projecting defensive towers and buttresses that protected the perimeter of Rusai-URU.TUR against siege.'
      },
      {
        name: 'Fortress Corner Block',
        description: 'A specialized structural asset representing the Eckbollwerk (Corner Bulwark). As described in the excavations of the Östliche Vorburg (Eastern Fortress), these heavy stone blocks were used to construct the reinforced, often sharp-angled corners of the defensive walls, providing critical structural integrity at turning points in the fortification line.'
      },
      {
        name: 'Limestone Paving Module',
        description: 'A textured floor module depicting the Steinplattenpflaster (stone slab paving) found in high-traffic areas of the fortress. Excavations revealed these paved surfaces in the monumental South Gate, the ramps leading to the Upper Castle, and the side aisles of the great pillared halls (Hallenbauten).'
      },
      {
        name: 'Pithos Bench',
        description: 'A storage room asset recreating the bankartigen Erhöhungen (bench-like elevations) found in the citadel’s magazines. Based on findings in the Unterburg and settlement, these stone and mudbrick benches were designed to support rows of massive Pithoi jars, stabilizing them for the storage of wine and grain.'
      },
      {
        name: 'Urartian Wooden Column',
        description: 'A reconstruction of the vertical supports used in the great Hallenbauten (Halls). Based on the stone bases found in situ and the charred remains of timber, this model depicts the thick wooden columns that supported the heavy roofs of the royal stables and reception halls described in Bastam II.'
      },
      {
        name: 'Ashlar Stone',
        description: 'A high-quality dressed stone block featuring the bossierte Quadern (bossed ashlar) technique. Unlike the rough fieldstones used in common walls, these precisely cut stones were found in the elite sections of the Middle Castle (Mittelburg), signifying high-status royal or religious architecture.'
      },
      {
        name: 'Bulla (Clay Sealing)',
        description: 'A small but significant artifact asset representing a Tonbulla (clay sealing). Thousands of these stamped clay pieces were excavated in the "Bone Rooms" (Knochenräume). They served as administrative tags or receipts for goods delivered to the fortress, often bearing the seal of the King or royal officials.'
      },
      {
        name: 'Destruction Debris Tile',
        description: 'A textured ground asset depicting the Brandschutt (fire destruction debris). This tile represents the layer of ash, charred timber, and baked mud found throughout the site, preserving the moment Rusai-URU.TUR was destroyed by fire around 590 BC. It adds historical realism to ruined or post-siege scenes.'
      },
      {
        name: 'Domestic Doorway Module',
        description: 'A residential architectural element designed for the settlement (Siedlung) area at the foot of the fortress. Unlike the monumental gates, this doorway module reflects the domestic architecture of the private houses excavated in Area S2, featuring a simple lintel and jambs suited for mudbrick construction.'
      },
      {
        name: 'Fortress Corner Segment',
        description: 'A large modular section representing a complete Eckrisalit (Corner Projection). This asset allows for the construction of the jagged, saw-tooth perimeter walls typical of Urartian fortification design, which maximized flanking fire coverage for the defenders as described in Bastam I.'
      },
      {
        name: 'Monumental Gate Entrance',
        description: 'A grand architectural asset representing the Southern and Northern Gates (Südtor / Nordtor). Based on the excavation plans, this model captures the imposing nature of the main fortress entrances, featuring heavy flanking towers and stone thresholds that controlled access to the citadel.'
      },
      {
        name: 'Peykan (Arrowhead)',
        description: 'A detailed prop representing the iron arrowheads and lance tips (Eisen-Lanzenspitzen) excavated at the site. "Peykan" (Persian for arrowhead) refers to the military remnants found in the destruction layers, testifying to the garrison\'s weaponry and the final battle for the fortress.'
      },
      {
        name: 'Urartian Pot',
        description: 'A ceramic prop representing the distinctive Urartian pottery found throughout the site. This model is based on the fine red polished ware and utilitarian vessels found in the settlement and store rooms (Bastam I), essential for dressing scenes in magazines and domestic quarters.'
      },
      {
        name: 'Roof Module',
        description: 'A structural module depicting the flat Urartian roof construction. Based on clay impressions found in the destruction debris (Bastam II), this model features closely laid round timber beams covered with reed mats and a thick layer of tamped earth, a distinct style of the ancient Near East.'
      },
      {
        name: 'Slope Connector',
        description: 'A utility architectural piece designed to bridge the gap between different terrace levels. Essential for the Hangbebauung (Slope Building) areas, this connector allows for the seamless transition of walls across the jagged, irregular bedrock topography characteristic of the Bastam site.'
      },
      {
        name: 'Stable Manger',
        description: 'A functional interior prop based on Wolfram Kleiss\'s interpretation of the pillared halls. As detailed in Bastam II, the long stone benches (Bänke) lining the walls of the halls were likely used as Futtertröge (mangers), identifying these large buildings as royal horse stables for the cavalry.'
      },
      {
        name: 'Stone Staircase',
        description: 'A structural module representing the internal stone staircases (Treppenhaus) found in multi-story buildings like the Hallenbau. These stairs provided access to upper floors or the roof, constructed from rough-hewn stone slabs to connect the varying elevations of the terraced architecture.'
      },
      {
        name: 'Bone Room Floor Tile',
        description: 'A ground texture asset recreating the unique archaeological phenomenon of the "Bone Rooms" found in the Middle Castle (Mittelburg). As detailed in Bastam II, excavations in Room MB 2,1 revealed a massive layer containing nearly 500,000 animal bones mixed with ash and clay bullae. This tile depicts that specific destruction horizon.'
      }
    ]
  },
  fa: {
    title: "بسطام",
    subtitle: "آرشیو دیجیتال",
    labels: {
      research: "پژوهش",
      archive: "آرشیو",
      inspect: "بررسی",
      pending: "در انتظار بازسازی دیجیتال",
      active: "فعال",
      artifact: "اثر",
      figure: "تصویر"
    },
    artifacts: [
      {
        name: 'قطعه دیوار استاندارد',
        description: 'یک بخش ماژولار از دیوار که نشان‌دهنده معماری استحکامات استاندارد ارگ بسطام است. بر اساس تکنیک پوسته‌ای (Schalenbauweise) که در گزارش‌های حفاری توصیف شده، این مدل دارای یک پایه سنگی دو‌رویه و مستحکم است که با لاشه‌سنگ پر شده و برای تحمل سازه خشتی طراحی شده است. این روش اصلی‌ترین شیوه برای محصور کردن طول ۸۰۰ متری دژ بوده است.'
      },
      {
        name: 'دیوار شیب‌دار پله‌ای',
        description: 'این ماژول برای توپوگرافی تند ارگ بسطام طراحی شده و معماری خاص ساخت‌وساز در شیب (Hangbebauung) را بازسازی می‌کند. همانطور که در بسطام ۲ ذکر شده، معماران اورارتویی پی‌های پله‌ای را مستقیماً در بستر صخره‌ای تراش می‌دادند. این قطعه به شما امکان می‌دهد دیوارهایی قرار دهید که به طور طبیعی در زمین‌های زاویه‌دار پله می‌خورند و ارگ بالا را به سکونتگاه پایین متصل می‌کنند.'
      },
      {
        name: 'بلوک برج سایکلوپین',
        description: 'یک بلوک بنایی عظیم که نشان‌دهنده معماری دفاعی سنگین استحکامات پایین ارگ است. بر اساس ساختارهای ریسالیت (Risalit) توصیف شده در بسطام ۱، این بلوک‌های بزرگ و نتراشیده پایه برج‌های دفاعی پیش‌آمده و پشت‌بندهایی را تشکیل می‌دادند که از محیط روسای-اُرو.تور در برابر محاصره محافظت می‌کردند.'
      },
      {
        name: 'بلوک گوشه دژ',
        description: 'یک قطعه سازه‌ای تخصصی که نشان‌دهنده سنگ‌بست گوشه (Eckbollwerk) است. همانطور که در حفاری‌های قلعه شرقی (Vorburg) توصیف شده، این بلوک‌های سنگی سنگین برای ساخت گوشه‌های تقویت‌شده و اغلب تیز دیوارهای دفاعی استفاده می‌شدند و یکپارچگی سازه‌ای حیاتی را در نقاط چرخش خط استحکامات فراهم می‌کردند.'
      },
      {
        name: 'ماژول سنگ‌فرش آهکی',
        description: 'یک ماژول کف بافت‌دار که سنگ‌فرش‌های اسلب (Steinplattenpflaster) یافت شده در مناطق پرتردد دژ را به تصویر می‌کشد. حفاری‌ها این سطوح سنگ‌فرش شده را در دروازه جنوبی عظیم، رمپ‌های منتهی به قلعه بالا و راهروهای جانبی تالارهای ستون‌دار بزرگ (Hallenbauten) آشکار کردند.'
      },
      {
        name: 'سکوی خمره‌های پیتوس',
        description: 'یک قطعه مربوط به انبار که ارتفاعات نیمکت‌مانند یافت شده در مجلات ارگ را بازسازی می‌کند. بر اساس یافته‌ها در ارگ پایین و سکونتگاه، این نیمکت‌های سنگی و خشتی برای نگه داشتن ردیف‌هایی از خمره‌های عظیم پیتوس طراحی شده بودند تا آنها را برای ذخیره شراب و غلات تثبیت کنند.'
      },
      {
        name: 'ستون چوبی اورارتویی',
        description: 'بازسازی پایه‌های عمودی مورد استفاده در تالارهای بزرگ (Hallenbauten). بر اساس پایه‌های سنگی یافت شده در محل و بقایای زغال‌شده چوب، این مدل ستون‌های چوبی ضخیمی را نشان می‌دهد که سقف‌های سنگین اصطبل‌های سلطنتی و تالارهای پذیرایی توصیف شده در بسطام ۲ را تحمل می‌کردند.'
      },
      {
        name: 'سنگ تراش‌خورده (اشلار)',
        description: 'یک بلوک سنگی با کیفیت بالا که تکنیک سنگ‌تراشی باس‌دار (bossierte Quadern) را نشان می‌دهد. برخلاف سنگ‌های لاشه‌ای که در دیوارهای معمولی استفاده می‌شدند، این سنگ‌های دقیقاً برش‌خورده در بخش‌های نخبگان قلعه میانی (Mittelburg) یافت شدند که نشان‌دهنده معماری سلطنتی یا مذهبی با وضعیت بالا است.'
      },
      {
        name: 'مُهر گلی (بولا)',
        description: 'یک اثر کوچک اما مهم که نشان‌دهنده یک مهر گلی (Tonbulla) است. هزاران قطعه از این مهرهای گلی در "اتاق‌های استخوان" (Knochenräume) حفاری شدند. آنها به عنوان برچسب‌های اداری یا رسید کالاهای تحویل داده شده به دژ عمل می‌کردند و اغلب دارای مهر پادشاه یا مقامات سلطنتی بودند.'
      },
      {
        name: 'تایل آوار تخریب',
        description: 'یک دارایی بافت زمین که آوار ناشی از آتش‌سوزی (Brandschutt) را به تصویر می‌کشد. این تایل لایه‌ای از خاکستر، چوب زغال‌شده و گل پخته شده را نشان می‌دهد که در سراسر سایت یافت شده و لحظه نابودی روسای-اُرو.تور توسط آتش در حدود ۵۹۰ قبل از میلاد را حفظ کرده است.'
      },
      {
        name: 'ماژول درگاه داخلی',
        description: 'یک عنصر معماری مسکونی طراحی شده برای منطقه سکونتگاه (Siedlung) در پای دژ. برخلاف دروازه‌های عظیم، این ماژول درگاه معماری داخلی خانه‌های شخصی حفاری شده در منطقه S2 را منعکس می‌کند که دارای سردر و قاب‌های ساده مناسب برای ساخت‌وساز خشتی است.'
      },
      {
        name: 'قطعه گوشه دژ',
        description: 'یک بخش ماژولار بزرگ که نشان‌دهنده یک پیش‌آمدگی گوشه کامل (Eckrisalit) است. این قطعه امکان ساخت دیوارهای محیطی دندانه‌دار و اره‌ای شکل را که مشخصه طراحی استحکامات اورارتویی است، فراهم می‌کند که پوشش آتش جانبی را برای مدافعان به حداکثر می‌رساند.'
      },
      {
        name: 'ورودی دروازه عظیم',
        description: 'یک دارایی معماری باشکوه که دروازه‌های جنوبی و شمالی (Südtor / Nordtor) را نشان می‌دهد. بر اساس نقشه‌های حفاری، این مدل ماهیت با ابهت ورودی‌های اصلی دژ را با برج‌های جانبی سنگین و آستانه‌های سنگی که دسترسی به ارگ را کنترل می‌کردند، به تصویر می‌کشد.'
      },
      {
        name: 'پیکان (سرنیزه)',
        description: 'یک مدل دقیق که سرنیزه‌های آهنی و نوک نیزه‌ها (Eisen-Lanzenspitzen) حفاری شده در سایت را نشان می‌دهد. "پیکان" به بقایای نظامی یافت شده در لایه‌های تخریب اشاره دارد که گواهی بر تسلیحات پادگان و نبرد نهایی برای دژ است.'
      },
      {
        name: 'کوزه اورارتویی',
        description: 'یک مدل سرامیکی که سفال‌های متمایز اورارتویی یافت شده در سراسر سایت را نشان می‌دهد. این مدل بر اساس ظروف قرمز صیقلی ظریف و ظروف کاربردی یافت شده در سکونتگاه و اتاق‌های ذخیره‌سازی (بسطام ۱) ساخته شده است که برای فضاسازی صحنه‌ها در انبارها و محله‌های داخلی ضروری است.'
      },
      {
        name: 'ماژول سقف',
        description: 'یک ماژول سازه‌ای که ساختار سقف تخت اورارتویی را به تصویر می‌کشد. بر اساس اثرات خاک رس یافت شده در آوار تخریب (بسطام ۲)، این مدل دارای تیرهای چوبی گرد است که با حصیرهای نی و لایه‌ای ضخیم از خاک کوبیده شده پوشیده شده‌اند، سبکی متمایز از خاور نزدیک باستان.'
      },
      {
        name: 'اتصال‌دهنده شیب',
        description: 'یک قطعه معماری کاربردی که برای پر کردن شکاف بین سطوح مختلف تراس طراحی شده است. برای مناطق ساخت‌وساز در شیب (Hangbebauung) ضروری است، این اتصال‌دهنده امکان انتقال بدون درز دیوارها را در توپوگرافی صخره‌ای نامنظم و دندانه‌دار مشخصه سایت بسطام فراهم می‌کند.'
      },
      {
        name: 'آخور اصطبل',
        description: 'یک مدل داخلی کاربردی بر اساس تفسیر ولفرام کلایس از تالارهای ستون‌دار. همانطور که در بسطام ۲ به تفصیل آمده است، نیمکت‌های سنگی طولانی (Bänke) که دیوارهای تالارها را پوشانده بودند، احتمالاً به عنوان آخور (Futtertröge) استفاده می‌شدند و این ساختمان‌های بزرگ را به عنوان اصطبل‌های اسب سلطنتی برای سواره‌نظام شناسایی می‌کردند.'
      },
      {
        name: 'پلکان سنگی',
        description: 'یک ماژول سازه‌ای که پلکان‌های سنگی داخلی (Treppenhaus) یافت شده در ساختمان‌های چند طبقه مانند Hallenbau را نشان می‌دهد. این پله‌ها دسترسی به طبقات بالا یا سقف را فراهم می‌کردند و از اسلب‌های سنگی نتراشیده برای اتصال ارتفاعات متغیر معماری تراس‌بندی شده ساخته شده بودند.'
      },
      {
        name: 'تایل کف اتاق استخوان',
        description: 'یک دارایی بافت زمین که پدیده باستان‌شناختی منحصر به فرد "اتاق‌های استخوان" یافت شده در قلعه میانی را بازسازی می‌کند. همانطور که در بسطام ۲ به تفصیل آمده است، حفاری‌ها در اتاق MB 2,1 لایه‌ای عظیم حاوی نزدیک به ۵۰۰،۰۰۰ استخوان حیوان مخلوط با خاکستر و مهرهای گلی را آشکار کرد.'
      }
    ]
  }
};

const BASE_ARTIFACTS_DATA = [
    { url: `${GITHUB_BASE}Standard_Wall_Segment_opt.glb` },
    { url: `${GITHUB_BASE}Stepped_Slope_Wall_Hangbebauung%20Module_opt.glb` },
    { url: `${GITHUB_BASE}The_Cyclopean_Tower_Block_opt.glb` },
    { url: `${GITHUB_BASE}The_Fortress_Corner_Block_opt.glb` },
    { url: `${GITHUB_BASE}The_Limestone_Paving_Module_opt.glb` },
    { url: `${GITHUB_BASE}The_Pithos_Bench_opt.glb` },
    { url: `${GITHUB_BASE}Urartian_Wooden_Column_opt.glb` },
    { url: `${GITHUB_BASE}Ashlar_Stone_opt.glb` },
    { url: `${GITHUB_BASE}Bulla_opt.glb` },
    { url: `${GITHUB_BASE}Destruction_Debris_Tile_opt.glb` },
    { url: `${GITHUB_BASE}Ddway_opt.glb` },
    { url: `${GITHUB_BASE}Fortress_Corner_Segment_opt.glb` },
    { url: `${GITHUB_BASE}Monumental_Gate_Entrance_opt.glb` },
    { url: `${GITHUB_BASE}arrow_head_opt.glb` },
    { url: `${GITHUB_BASE}pot_opt.glb` },
    { url: `${GITHUB_BASE}rood_opt.glb` },
    { url: `${GITHUB_BASE}Slope_Connector_opt.glb` },
    { url: `${GITHUB_BASE}Stable_Manger_1opt.glb` },
    { url: `${GITHUB_BASE}staircase_stone_opt.glb` },
    { url: `${GITHUB_BASE}Bone_RoomFloorTile_opt.glb` }
];

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  // Initialize artifacts based on default language 'en'
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [activeArtifactId, setActiveArtifactId] = useState<string>('artifact-0');
  const [cameraMode, setCameraMode] = useState<CameraMode>(CameraMode.CINEMATIC);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ARTICLE);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update artifacts when language changes
  useEffect(() => {
    const newArtifacts = BASE_ARTIFACTS_DATA.map((base, index) => {
      const content = CONTENT[language].artifacts[index];
      return {
        id: `artifact-${index}`,
        url: base.url,
        name: content.name,
        description: content.description,
        fileName: base.url.split('/').pop()
      };
    });
    setArtifacts(newArtifacts);
  }, [language]);

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
    // We check against the current language names first, or fallback to english logic if needed
    // Simple logic: check includes
    const found = artifacts.find(a => a.name.toLowerCase().includes(name.toLowerCase()));
    
    // Fallback for hardcoded English keys in the article text if we are in Persian mode but using English keys
    if (!found && language === 'fa') {
        // Map English keys to index and find
        const enIndex = CONTENT.en.artifacts.findIndex(a => a.name.includes(name));
        if (enIndex !== -1) {
             setActiveArtifactId(`artifact-${enIndex}`);
             return;
        }
    }

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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fa' : 'en');
  };

  const isRTL = language === 'fa';
  const labels = CONTENT[language].labels;

  return (
    <div className={`relative w-full h-screen bg-[#f4f1ea] text-bastam-text overflow-hidden selection:bg-bastam-accent/30 selection:text-bastam-dark ${isRTL ? 'font-persian' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 3D Background - Responsive width based on mode */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${viewMode === ViewMode.ARTICLE ? 'w-full lg:w-[55%]' : 'w-full'} ${isRTL && viewMode === ViewMode.ARTICLE ? 'right-0 lg:right-[45%]' : 'right-0'}`}>
        <Environment3D 
          modelUrl={activeArtifact ? activeArtifact.url : null} 
          mode={cameraMode}
          fileName={activeArtifact?.fileName}
          scrollProgress={scrollProgress}
        />
        
        {/* Vignette Overlay (Only in Article mode) */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-gradient-to-r from-transparent via-transparent to-[#f4f1ea] ${viewMode === ViewMode.ARTICLE ? 'opacity-100' : 'opacity-0'}`} />

        {/* Artifact Description Card (Visible in Article & Cinema mode) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 max-w-[320px] md:max-w-md p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-xl shadow-xl text-bastam-dark transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 pointer-events-auto ${
            isDescriptionVisible && (viewMode === ViewMode.ARTICLE || viewMode === ViewMode.CINEMA) 
            ? 'opacity-100' 
            : 'opacity-0 pointer-events-none'
          } ${isRTL ? 'right-8 md:right-12 text-right' : 'left-8 md:left-12 text-left'} ${!isDescriptionVisible && (isRTL ? 'translate-x-12' : '-translate-x-12')}`}
        >
           <div className={`flex items-center gap-3 mb-4 opacity-60 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
             <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-bastam-accent">{labels.artifact} {String(currentIndex + 1).padStart(2, '0')}</div>
             <div className="h-[1px] flex-1 bg-bastam-dark/20"></div>
           </div>
           
           <h2 className={`text-3xl md:text-4xl mb-4 leading-none text-bastam-dark ${isRTL ? 'font-persian font-bold' : 'font-serif'}`}>
               {activeArtifact?.name}
           </h2>
           
           <div className="max-h-[300px] overflow-y-auto no-scrollbar">
             <p className={`text-sm leading-relaxed text-bastam-text/90 font-medium ${isRTL ? 'font-persian' : 'font-sans'}`}>
               {activeArtifact?.description}
             </p>
           </div>
           
           {activeArtifact?.url === null && (
              <div className={`mt-4 pt-4 border-t border-bastam-dark/10 text-[10px] text-bastam-text/50 uppercase tracking-widest flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="w-2 h-2 rounded-full bg-bastam-accent/50 animate-pulse"></span>
                {labels.pending}
              </div>
           )}
        </div>
      </div>

      {/* Header - Minimal & Brand Centric */}
      <nav className={`fixed top-0 z-50 p-8 flex justify-between items-start pointer-events-none ${isRTL ? 'right-0' : 'left-0'}`}>
        <div className="flex flex-col gap-1 pointer-events-auto">
           <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
             <h1 className={`text-2xl font-bold tracking-widest text-bastam-dark ${isRTL ? 'font-persian' : 'font-serif'}`}>{CONTENT[language].title}</h1>
             <span className="h-4 w-[1px] bg-bastam-dark/20"></span>
             <span className={`text-[10px] tracking-[0.3em] text-bastam-text/60 uppercase ${isRTL ? 'font-persian' : 'font-sans'}`}>{CONTENT[language].subtitle}</span>
           </div>
        </div>
      </nav>

      {/* Interface Controls */}
      {activeArtifact && (
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
            language={language}
            onLanguageToggle={toggleLanguage}
            labels={labels}
        />
      )}

      {/* ARTICLE SIDEBAR - The Core Content */}
      <div 
        className={`absolute top-0 h-full z-10 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] bg-[#f4f1ea]/95 backdrop-blur-md shadow-2xl ${
            viewMode === ViewMode.ARTICLE ? 'w-full lg:w-[45%]' : 'w-full lg:w-[45%]'
          } ${isRTL ? 
            `left-0 border-r border-bastam-dark/5 ${viewMode === ViewMode.ARTICLE ? 'translate-x-0' : '-translate-x-full'}` : 
            `right-0 border-l border-bastam-dark/5 ${viewMode === ViewMode.ARTICLE ? 'translate-x-0' : 'translate-x-full'}`
          }
        `}
      >
        {/* CLOSE BUTTON - Switches to CINEMA view */}
        <button 
          onClick={() => setViewMode(ViewMode.CINEMA)}
          className={`absolute top-6 z-50 p-2 rounded-full bg-white/80 text-bastam-dark/40 hover:text-bastam-accent hover:bg-white transition-all duration-300 shadow-sm ${isRTL ? 'left-6' : 'right-6'}`}
          title="Close Article / Enter Cinema Mode"
        >
          <X size={20} />
        </button>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={`h-full w-full overflow-y-auto no-scrollbar ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div className="p-8 md:p-16 flex flex-col gap-20 pb-48 min-h-full max-w-2xl mx-auto">
            
            {/* ARTICLE HERO */}
            <section className="pt-24">
               <div className={`inline-flex items-center gap-3 text-bastam-accent mb-8 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="h-[1px] w-12 bg-bastam-accent"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.25em]">{isRTL ? 'پروفایل پژوهشی' : 'Research Profile'}</span>
               </div>
               <h1 className={`text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-bastam-dark mb-10 ${isRTL ? 'font-persian font-bold' : 'font-serif'}`}>
                 {language === 'en' 
                   ? "Digital Reconstruction of Bastam Fortress: An Architectural Critique"
                   : "بازسازی دیجیتال دژ بسطام: نقدی معمارانه"}
               </h1>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-bastam-text/70 border-t border-bastam-dark/10 pt-8">
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-bastam-text/40 mb-1">{isRTL ? 'استاد راهنما' : 'Supervisor'}</span>
                   <p className={`text-bastam-dark ${isRTL ? 'font-persian' : 'font-serif'}`}>{isRTL ? 'دکتر محمدخانی' : 'Dr. Mohammadkhani'}</p>
                 </div>
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-bastam-text/40 mb-1">{isRTL ? 'تیم پژوهش' : 'Research Team'}</span>
                   <p className={`text-bastam-dark ${isRTL ? 'font-persian' : 'font-serif'}`}>{isRTL ? 'کیان منصوری جمشیدی، امیر عرفان بسطامی، علیرضا صمدیان' : 'Kian Mansouri Jamshidi, Amir Erfan Bastami, Alireza Samadian'}</p>
                 </div>
                 <div className="md:col-span-2">
                   <span className="block text-[10px] uppercase tracking-widest text-bastam-text/40 mb-1">{isRTL ? 'بر اساس' : 'Based On'}</span>
                   <p className={`italic text-bastam-dark ${isRTL ? 'font-persian' : 'font-serif'}`}>{isRTL ? 'گزارش‌های حفاری بسطام ۱ (۱۹۷۹) و بسطام ۲ (۱۹۸۸)' : 'Excavation Reports Bastam I (1979) and Bastam II (1988)'}</p>
                 </div>
               </div>

               <div className={`mt-16 flex items-center gap-4 text-xs font-medium text-bastam-text/40 uppercase tracking-widest animate-pulse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                 <MousePointer2 size={16} />
                 <span>{isRTL ? 'برای خواندن اسکرول کنید' : 'Scroll to Read'}</span>
               </div>
            </section>

            {/* FULL ARTICLE TEXT START - Localized */}
            {language === 'en' ? (
                <>
                {/* CHAPTER ONE - EN */}
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
                </>
            ) : (
                <>
                {/* CHAPTER ONE - FA */}
                <section className="prose prose-lg prose-stone prose-headings:font-persian prose-headings:font-bold prose-p:font-persian prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none">
                <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6 font-persian">فصل اول</span>
                <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8 font-persian font-bold">مبانی و خوانش زمینه‌ای</h2>
                
                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۱. روایت آغازین: چرا معماران به سراغ باستان‌شناسان رفتند؟</h3>
                <p className="font-persian text-justify">
                    در این پژوهش، ما با یک پرسش بنیادین و جسورانه وارد سایت باستانی بسطام شدیم: آیا آنچه باستان‌شناسان روی کاغذ ترسیم کرده‌اند، در واقعیت فیزیکی و مهندسی "پایدار" و "قابل ساخت" است؟ ما به سراغ اسناد حجیم ولفرام کلایس نرفتیم تا صرفاً تاریخ را مرور کنیم؛ بلکه با نگاهی مهندسی و انتقادی، قصد داشتیم خطوطی را که او به عنوان دیوار، سقف و فضاهای معماری معرفی کرده، به آزمون بگذاریم.
                </p>
                <p className="font-persian text-justify">
                    هدف ما در این مقاله، تحلیل کیفیت کار کلایس است. می‌خواهیم بدانیم آیا یک باستان‌شناس آلمانی در دهه ۱۹۷۰ توانسته منطق سازه‌ای و فضایی یک کلان‌سازه کوهستانی را به درستی درک کند؟ برای پاسخ به این پرسش، ما روشی معکوس را در پیش گرفتیم: <strong className="text-bastam-dark font-medium">بازسازی دیجیتال و مدل‌سازی اطلاعات ساختمان (BIM)</strong>. ما با این فرض پیش رفتیم که اگر سازه‌های ترسیم شده توسط کلایس در نرم‌افزارهای مدل‌سازی قابل ساخت باشند و اتصالاتشان منطقی باشد، کار او دقیق است. در غیر این صورت، ما با "حفره‌های معماری" در گزارش‌های باستان‌شناسی مواجه خواهیم بود.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۲. پیچیدگی‌های محیطی: معماری در نبرد با طبیعت</h3>
                <p className="font-persian text-justify">
                    پیش از آنکه بتوانیم معماری بسطام را نقد کنیم، باید بدانیم این معماری در چه شرایطی شکل گرفته است. استفاده از واژه ساده "توپوگرافی" برای توصیف بستر بسطام، حق مطلب را ادا نمی‌کند. در اینجا ما با مجموعه‌ای از پیچیدگی‌های محیطی و اقلیمی روبرو هستیم که مستقیماً فرم معماری را دیکته کرده‌اند.
                </p>
                <p className="font-persian text-justify">
                    بسطام، یا "روسای-اُرو.تور" (به معنی شهر کوچک روسا)، بر روی یک تیغه صخره‌ای و پرتگاه‌مانند در آذربایجان غربی ساخته شده است. این بستر دارای ویژگی‌های محدودکننده زیر است:
                </p>
                <ul className="list-none pr-0 space-y-6 my-8 font-persian">
                    <li className="pr-6 border-r-2 border-bastam-accent/30">
                    <strong className="text-bastam-dark block mb-1">شیب‌های تند و رانش زمین</strong>
                    بستر سنگی دژ یک سطح صاف نیست؛ بلکه تیغه‌ای با شیب‌های تند است که معماران اورارتویی را مجبور کرد تراس‌های عظیم و دیوارهای حائل سنگین بسازند. هر بنا در بسطام، پیش از آنکه فضا باشد، یک سازه نگهبان خاک است.
                    </li>
                    <li className="pr-6 border-r-2 border-bastam-accent/30">
                    <strong className="text-bastam-dark block mb-1">اقلیم خشن و بادخیز</strong>
                    قرارگیری در ارتفاعات بالا و مواجهه با بادهای سرد و شدید، معماری را به سمت درون‌گرایی، دیوارهای خشتی ضخیم (به عنوان عایق حرارتی) و بازشوهای حداقل سوق داده است.
                    </li>
                    <li className="pr-6 border-r-2 border-bastam-accent/30">
                    <strong className="text-bastam-dark block mb-1">دسترسی دشوار</strong>
                    فرم کشیده و خطی سایت (۸۰۰ متر طول و ۴۰۰ متر عرض) باعث شده سازماندهی فضایی وابسته به یک محور طولی واحد باشد و سلسله‌مراتب دسترسی را کاملاً امنیتی و کنترل‌شده کند.
                    </li>
                </ul>
                
                <button 
                    onClick={() => setModelByName('Monumental Gate Entrance')}
                    className="w-full not-prose group flex items-center justify-between p-6 bg-white border border-bastam-dark/5 shadow-sm hover:shadow-md hover:border-bastam-accent/50 transition-all rounded-sm my-8 flex-row-reverse"
                >
                    <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="p-3 bg-bastam-bg text-bastam-accent rounded-full"><Maximize2 size={18} /></div>
                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-bastam-text/50 block font-persian">تصویر ۱</span>
                        <span className="font-persian font-bold text-lg text-bastam-dark">ساختمان شرقی (نمای کلی)</span>
                    </div>
                    </div>
                    <ArrowRight className="text-bastam-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 rotate-180" />
                </button>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۳. بسطام چیست؟ آناتومی یک "دژ-شهر"</h3>
                <p className="font-persian text-justify">
                    برای مخاطبی که نام بسطام را نشنیده، باید تصویری روشن ترسیم کرد. بسطام صرفاً یک قلعه نظامی نیست؛ بلکه یک دژ-شهر کامل است که در قرن هفتم پیش از میلاد توسط پادشاه قدرتمند اورارتویی، "روسای دوم" بنیان‌گذاری شد.
                </p>
                <p className="font-persian">چرا "دژ-شهر"؟ زیرا این مجموعه متشکل است از:</p>
                <ul className="font-persian">
                    <li><strong>ارگ (Burgberg):</strong> واقع در بالای صخره، شامل اقامتگاه حاکم، معابد، انبارها و پادگان نظامی.</li>
                    <li><strong>سکونتگاه پایین (Siedlung):</strong> گسترده شده در پای کوه، شامل محل زندگی مردم عادی، صنعتگران و بازرگانان.</li>
                </ul>
                </section>

                <section className="prose prose-lg prose-stone prose-headings:font-persian prose-headings:font-bold prose-p:font-persian prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none pt-12 border-t border-bastam-dark/10">
                <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6 font-persian">فصل دوم</span>
                <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8 font-persian font-bold">تحلیل فضایی (خوانش کالبدی و تحلیل عملکردی)</h2>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۴. تکتونیک و منطق ساخت: زبان مصالح در بسطام</h3>
                <p className="font-persian text-justify">
                    یکی از بخش‌های کلیدی نقد ما، بررسی "تکنیک ساخت" است. کلایس در گزارش‌هایش با دقت بالا به مصالح اشاره کرده و ما در مدل‌سازی دریافتیم که انتخاب این مصالح از یک منطق مهندسی دقیق پیروی می‌کرده است. سیستم ساختمانی بسطام بر سه رکن استوار است:
                </p>

                <div className="not-prose grid grid-cols-1 gap-4 my-8 font-persian">
                    <button onClick={() => setModelByName('Ashlar Stone')} className="text-right p-6 bg-white/50 border border-bastam-dark/5 hover:bg-white hover:border-bastam-accent transition-all">
                        <h4 className="font-bold text-lg text-bastam-dark mb-2">الف) کرسی‌چینی سنگی (Stone Socle)</h4>
                        <p className="text-sm text-bastam-text/70 leading-relaxed text-justify">تمام دیوارها در بسطام، بدون استثنا، بر روی یک پایه سنگی عظیم قرار دارند. این سنگ‌ها دو کارکرد حیاتی داشتند: اول، انتقال بار دیوارهای خشتی سنگین به بستر ناهموار صخره. دوم، عمل کردن به عنوان عایق رطوبتی صعودی.</p>
                    </button>
                    <button onClick={() => setModelByName('Standard Wall Segment')} className="text-right p-6 bg-white/50 border border-bastam-dark/5 hover:bg-white hover:border-bastam-accent transition-all">
                        <h4 className="font-bold text-lg text-bastam-dark mb-2">ب) روبنای خشتی</h4>
                        <p className="text-sm text-bastam-text/70 leading-relaxed text-justify">بر روی پایه‌های سنگی، دیوارهای ضخیم خشتی (گاهی با ضخامت ۴ متر) بالا می‌رفتند. خشت به عنوان بهترین عایق حرارتی موجود استفاده می‌شد.</p>
                    </button>
                    <button onClick={() => setModelByName('Urartian Wooden Column')} className="text-right p-6 bg-white/50 border border-bastam-dark/5 hover:bg-white hover:border-bastam-accent transition-all">
                        <h4 className="font-bold text-lg text-bastam-dark mb-2">ج) سیستم کلاف چوبی</h4>
                        <p className="text-sm text-bastam-text/70 leading-relaxed text-justify">بدون وجود کلاف‌های چوبی افقی و عمودی، این دیوارهای بلند در برابر زلزله دوام نمی‌آوردند. چوب انعطاف‌پذیری لازم را به خشت فشاری می‌بخشید.</p>
                    </button>
                </div>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۵. نگاه کلی به فضاها: روایتی از پایین به بالا</h3>
                <p className="font-persian text-justify">
                    برای درک معماری بسطام، باید مسیری را تصور کرد که یک بازدیدکننده در بسطام طی می‌کند. این مسیر سفری است از عمومی‌ترین بخش‌ها به خصوصی‌ترین و امن‌ترین لایه‌ها:
                </p>
                <ul className="font-persian">
                    <li><strong>سکونتگاه (Siedlung):</strong> در پایین‌ترین سطح، خانه‌های مردم عادی قرار دارد.</li>
                    <li><strong>ارگ پایین (Unterburg):</strong> از طریق دروازه جنوبی، ورودی اصلی نظامی است. در اینجا مهمان‌سراها، اصطبل‌ها و انبارهای اولیه قرار دارند.</li>
                    <li><strong>ارگ میانی (Mittelburg):</strong> با صعود به ارتفاع بالاتر، به قلب اقتصادی و مذهبی دژ می‌رسیم. تالارهای ستون‌دار برای ذخیره غذا و معابد در اینجا قرار دارند.</li>
                    <li><strong>ارگ بالا (Oberburg):</strong> در اوج صخره، ارگ حاکم قرار دارد. حصارهای دوگانه و فضاهای خصوصی از ویژگی‌های این بخش است.</li>
                </ul>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۶. ولفرام کلایس: باستان‌شناسی با ذهن معمار</h3>
                <p className="font-persian text-justify">
                    آنچه گزارش‌های بسطام را برای ما ارزشمند می‌کند، شخصیت خود ولفرام کلایس است. در مرور "بسطام ۱" و "بسطام ۲"، دریافتیم که کلایس یک باستان‌شناس معمولی نیست. او ذهنیتی کاملاً معماری دارد. برخلاف بسیاری از باستان‌شناسان که تنها به توالی لایه‌ها ( چینه‌شناسی) اهمیت می‌دهند، کلایس دغدغه "فضا" و "توده" دارد.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۱. بازخوانی معماری: وقتی خاک سخن می‌گوید</h3>
                <p className="font-persian text-justify">
                    در فصل قبل، بستر کالبدی دژ را شناختیم. اما هنر ولفرام کلایس در تحلیل دقیق تک‌بناها آشکار می‌شود. در گزارش بسطام ۱، بسیاری از فضاها صرفاً با نام‌های کلی مانند "ساختمان شرقی" معرفی شده بودند. اما در بسطام ۲، با ورود روش‌های میان‌رشته‌ای (شیمی خاک و استخوان‌شناسی)، درک ما از معماری بسطام دگرگون شد.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۲. بازتعریف "ساختمان شرقی" (Ostbau): اصطبل‌های سلطنتی</h3>
                <p className="font-persian text-justify">
                    یکی از درخشان‌ترین تغییرات تفسیری در گزارش‌های کلایس مربوط به دو ساختمان عظیم ستون‌دار در پایین دژ است. در نگاه اول، "ساختمان شرقی" شبیه به انبار یا پادگان به نظر می‌رسید. اما کلایس در جلد دوم، با استفاده از شواهد شیمیایی، این فضا را بازتعریف کرد.
                </p>
                
                <div className="not-prose bg-bastam-gold/10 border-r-4 border-bastam-gold p-8 my-8 rounded-l-lg font-persian">
                    <div className="flex items-center gap-2 mb-3 text-bastam-gold italic flex-row-reverse justify-end">
                    <span className="font-bold">یادداشت تحلیلی: گذار از باستان‌شناسی به معماری</span>
                    <FileText size={18} />
                    </div>
                    <p className="text-bastam-dark text-sm leading-relaxed text-justify">
                    آزمایش‌های فسفات روی خاک این تالارها غلظت بالای اوره و فضولات حیوانی را نشان داد. یافتن این موضوع، در کنار کشف سکوهای سنگی کوتاه (که پیش‌تر نیمکت پنداشته می‌شدند)، ثابت کرد که این‌ها "آخور" بوده‌اند و این تالارهای باشکوه در واقع "اصطبل‌های سلطنتی" و کمپ سواره‌نظام بوده‌اند.
                    </p>
                    <button 
                    onClick={() => setModelByName('Stable Manger')} 
                    className="mt-4 px-4 py-2 bg-white text-bastam-dark text-xs uppercase font-bold tracking-widest rounded-sm shadow-sm hover:text-bastam-accent transition-colors"
                    >
                    مشاهده آخور اصطبل
                    </button>
                </div>

                <p className="font-persian text-justify">
                    تأثیر تغییر کاربری بر نقد معماری: این تغییر کاربری (از دژ به اصطبل) نگاه ما را به جزئیات معماری این بناها تغییر می‌دهد:
                </p>
                <ul className="font-persian">
                    <li><strong>کف‌سازی هوشمند:</strong> کلایس در مقاطع نشان می‌دهد که راهروهای سرویس (محل ایستادن اسب‌ها) با سنگ‌های تخت فرش شده بودند تا در برابر ضربه سم مقاوم باشند، در حالی که راهروی میانی (محل تردد مهترها) خاکی باقی مانده بود.</li>
                    <li><strong>مسئله تهویه:</strong> نگهداری حدود ۶۰ اسب جنگی در یک فضای بسته نیاز به سیستم تهویه قوی دارد.</li>
                    <li><strong>مدولاسیون سازه‌ای:</strong> ریتم ستون‌ها در این تالارها (فواصل ۳ متر) دقیقاً مدول مورد نیاز برای بستن دو اسب در هر دهانه است.</li>
                </ul>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۳. تالارهای پیتوس: مهندسی ذخیره‌سازی</h3>
                <p className="font-persian text-justify">
                    بخش میانی دژ (Mittelburg) میزبان انبارهای عظیم آذوقه و شراب است. ویژگی متمایز این فضاها وجود خمره‌های غول‌پیکر (Pithoi) است که تا گردن در خاک دفن شده‌اند.
                </p>
                <p className="font-persian text-justify">
                    <strong>چالش معماری:</strong> چگونه می‌توان به محتویات خمره‌ها دسترسی داشت؟ اگر خمره‌ها ۲ متر ارتفاع داشته و در کف دفن شده باشند، دهانه آن‌ها در ارتفاعی بالاتر از قد انسان قرار می‌گیرد. کلایس با دقت در بقایای دیوارهای جانبی، سوراخ‌هایی را ثبت کرد که کلید حل این معما هستند.
                </p>
                <button 
                    onClick={() => setModelByName('Pithos Bench')}
                    className="not-prose text-bastam-accent hover:text-bastam-dark underline decoration-1 underline-offset-4 font-persian font-bold italic transition-colors"
                >
                    بررسی ساختار سکوی پیتوس ←
                </button>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۴. اتاق‌های استخوان: فاجعه و معماری آیینی</h3>
                <p className="font-persian text-justify">
                    شاید دراماتیک‌ترین بخش گزارش‌های بسطام ۲، کشف فضاهای عجیب نزدیک دروازه ارگ معروف به "اتاق‌های استخوان" باشد. این فضاها که توسط پل زیمانسکی تحلیل شدند، حاوی هزاران قطعه استخوان حیوان و صدها اثر مهر گلی (Bulla) بودند.
                </p>
                
                <div className="not-prose grid grid-cols-2 gap-4 my-8 font-persian">
                    <div onClick={() => setModelByName('Bone Room Floor Tile')} className="cursor-pointer group relative aspect-square bg-black overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80')] bg-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                    <div className="absolute bottom-4 right-4 text-white z-10 text-right">
                        <span className="text-[10px] uppercase tracking-widest bg-black/50 px-2 py-0.5">تصویر ۴</span>
                        <p className="font-bold mt-1">اتاق استخوان</p>
                    </div>
                    </div>
                    <div onClick={() => setModelByName('Bulla (Clay Sealing)')} className="cursor-pointer group relative aspect-square bg-black overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599940824399-b87987ced72a?auto=format&fit=crop&q=80')] bg-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                    <div className="absolute bottom-4 right-4 text-white z-10 text-right">
                        <span className="text-[10px] uppercase tracking-widest bg-black/50 px-2 py-0.5">تصویر ۵</span>
                        <p className="font-bold mt-1">مهر گلی (بولا)</p>
                    </div>
                    </div>
                </div>

                <p className="font-persian text-justify">
                    <strong>تحلیل فضایی:</strong> انبار یا کشتارگاه؟ از دیدگاه معماری، این فضاها ویژگی‌های خاصی دارند: موقعیت استراتژیک کنار دروازه، پلان فشرده و عدم وجود نورگیری مناسب. استخوان‌ها در میان لایه‌های ضخیم خاکستر و آوار سقف یافت شدند.
                </p>
                </section>

                <section className="prose prose-lg prose-stone prose-headings:font-persian prose-headings:font-bold prose-p:font-persian prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none pt-12 border-t border-bastam-dark/10">
                <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6 font-persian">فصل سوم</span>
                <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8 font-persian font-bold">مدل‌سازی و راستی‌آزمایی (نقد فنی)</h2>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۱. آزمایشگاه دیجیتال: بازسازی برای کشف حقیقت</h3>
                <p className="font-persian text-justify">
                    پس از مطالعه اسناد، تیم ما تصمیم گرفت نقشه‌های ۲ بعدی و مقاطع کلایس را به مدل اطلاعات ساختمان (BIM) تبدیل کند. هدف یافتن "تناقضات هندسی" و "اشکالات سازه‌ای" بود. فرآیند مدل‌سازی نتایج شگفت‌انگیزی را آشکار کرد.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۲. تحلیل "گالری‌های دسترسی"</h3>
                <p className="font-persian text-justify">
                    در بخش انبارها (تالارهای پیتوس)، در حین فرآیند مدل‌سازی، ابتدا سعی کردیم فضا را بدون هیچ عنصر بالاسری بسازیم. نتیجه یک "تناقض عملکردی" را آشکار کرد: دسترسی به خمره‌ها غیرممکن بود.
                </p>
                <p className="font-persian text-justify">
                    <strong>نتیجه راستی‌آزمایی مدل‌سازی:</strong> در اینجا باید صراحتاً تأکید کنیم که راه‌حل "گالری چوبی معلق" اختراع تیم ما نیست. بلکه این شواهدی است که کلایس در بسطام ۲ به آن اشاره کرده و ما آن را سه‌بعدی کرده‌ایم.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۳. نقد سازه‌ای: چالش دهانه‌های وسیع</h3>
                <p className="font-persian text-justify">
                    در تحلیل سازه‌ای "ساختمان شرقی" (Ostbau)، ما با دهانه‌هایی به عرض حدود ۴.۲۰ متر در ناو میانی مواجه شدیم. مدل‌سازی سازه‌ای نشان داد که این دهانه از نظر مهندسی "غیرممکن" نیست، اما "چالش‌برانگیز" است.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۴. جزئیات اجرایی: منطق حفاظت از خشت</h3>
                <p className="font-persian text-justify">
                    وقتی دیوارها را بدون پیش‌آمدگی سقف (Overhang) مدل کردیم و شرایط بارندگی آذربایجان را شبیه‌سازی کردیم، متوجه آسیب‌پذیری شدید شدیم. دیوارهای خشتی بدون سایبان در برابر شستشوی باران‌های کج‌باران بی‌دفاع هستند.
                </p>
                <p className="font-persian text-justify">
                    در اینجا، دقت مشاهده کلایس آشکار شد. در اسکیس‌هایش، او همیشه سقف را فراتر از لبه دیوار امتداد می‌داد. مدل‌سازی ما ثابت کرد که این "کنسول‌های حفاظتی" یک ضرورت حیاتی برای بقای سازه خشتی در آن اقلیم بوده‌اند.
                </p>
                <button 
                    onClick={() => setModelByName('Roof Module')} 
                    className="not-prose w-full p-4 border border-bastam-dark/10 text-center text-sm font-bold uppercase tracking-widest text-bastam-dark hover:bg-bastam-dark hover:text-white transition-colors mt-4 font-persian"
                >
                    مشاهده جزئیات سقف و کنسول
                </button>
                </section>


                <section className="prose prose-lg prose-stone prose-headings:font-persian prose-headings:font-bold prose-p:font-persian prose-p:text-bastam-text/80 prose-p:leading-loose max-w-none pt-12 border-t border-bastam-dark/10 mb-24">
                <span className="text-bastam-accent text-xs font-bold uppercase tracking-widest block mb-6 font-persian">فصل چهارم</span>
                <h2 className="text-3xl md:text-4xl text-bastam-dark mb-8 font-persian font-bold">نتیجه‌گیری و دستورالعمل اجرایی</h2>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۱. پاسخ نهایی: آیا خطایی پیدا کردیم؟</h3>
                <p className="font-persian text-justify">
                    در ابتدای این پژوهش، ما با شک و تردید وارد دژ بسطام شدیم. اکنون، پس از ساعت‌ها مدل‌سازی سازه‌ای و فضایی، پاسخ نهایی روشن است: خیر، ما خطای بنیادینی در درک فضایی و سازه‌ای کلایس نیافتیم. برعکس، فرآیند مدل‌سازی ما را به تحسین‌کنندگان دقت او تبدیل کرد. آنچه ما در محیط سه‌بعدی ساختیم، صحت تصمیمات او را تایید کرد: ضخامت دیوارها متناسب با بار بود، جایگذاری ستون‌ها از مدولاسیون دقیقی پیروی می‌کرد و مقاطع ارتفاعی در شیب به درستی حل شده بودند.
                </p>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۲. ضرورت رویکرد "باستان‌شناس-معمار"</h3>
                <p className="font-persian text-justify">
                    تجربه بسطام به ما ثابت می‌کند که برای سایت‌های پیچیده، حضور یک باستان‌شناس با "ذهنیت معماری" یک ضرورت است. ولفرام کلایس موفق بود زیرا بسطام را زنده می‌پنداشت؛ او آن را "ایستا" می‌دانست، به معنی پایدار.
                </p>
                
                <div className="not-prose bg-bastam-dark text-white p-8 rounded-sm my-8 font-persian">
                    <h4 className="font-bold text-xl mb-6">دستورالعمل اجرایی: مستندسازی معماری</h4>
                    <ul className="space-y-4 text-sm opacity-90">
                        <li className="flex gap-3 flex-row-reverse justify-end">
                        <span><strong>تفکر در مقطع.</strong> باستان‌شناسی معمولاً علم "پلان" است، اما معماری در "مقطع" اتفاق می‌افتد.</span>
                        <span className="font-bold text-bastam-gold">۰۱</span>
                        </li>
                        <li className="flex gap-3 flex-row-reverse justify-end">
                        <span><strong>تحلیل ایستایی و تکتونیک.</strong> هر خطی که روی کاغذ کشیده می‌شود باید در واقعیت بار تحمل کند.</span>
                        <span className="font-bold text-bastam-gold">۰۲</span>
                        </li>
                        <li className="flex gap-3 flex-row-reverse justify-end">
                        <span><strong>عملکرد تابع جزئیات است.</strong> کاربری فضا در جزئیات (شیمی خاک، نوع کفسازی) نهفته است.</span>
                        <span className="font-bold text-bastam-gold">۰۳</span>
                        </li>
                        <li className="flex gap-3 flex-row-reverse justify-end">
                        <span><strong>تفکیک لایه‌ها.</strong> در سایت‌هایی با تداوم سکونت، تفکیک بصری لایه‌ها حیاتی است.</span>
                        <span className="font-bold text-bastam-gold">۰۴</span>
                        </li>
                        <li className="flex gap-3 flex-row-reverse justify-end">
                        <span><strong>بازسازی از طریق استدلال.</strong> آنچه نیست را نکشید، مگر اینکه دلیلی برای بودنش باشد.</span>
                        <span className="font-bold text-bastam-gold">۰۵</span>
                        </li>
                    </ul>
                </div>

                <h3 className="font-persian font-bold text-xl mt-12 mb-4 text-bastam-dark">۰۳. سخن پایانی</h3>
                <p className="font-persian text-justify">
                    پروژه بازخوانی بسطام به ما آموخت که معماری و باستان‌شناسی دو روی یک سکه‌اند. باستان‌شناسی "ماده" را فراهم می‌کند و معماری به آن "روح و فضا" می‌دمد. ولفرام کلایس با دقت بی‌نظیرش، پلی میان این دو جهان ساخت.
                </p>
                </section>
                </>
            )}
            
            <footer className="text-xs text-bastam-text/40 pt-12 border-t border-bastam-dark/10 pb-8">
               <p className={`mb-2 uppercase tracking-widest font-bold ${isRTL ? 'font-persian' : 'font-sans'}`}>{isRTL ? 'منابع' : 'References'}</p>
               <p dir="ltr" className={isRTL ? 'text-right' : 'text-left'}>Kleiss, Wolfram. Bastam I: Ausgrabungen in den Urartäischen Anlagen 1972-1975. Teheraner Forschungen, Band IV. Gebr. Mann Verlag, Berlin, 1979.</p>
               <p dir="ltr" className={isRTL ? 'text-right' : 'text-left'}>Kleiss, Wolfram. Bastam II: Ausgrabungen in den Urartäischen Anlagen 1977-1978. Teheraner Forschungen, Band V. Gebr. Mann Verlag, Berlin, 1988.</p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;