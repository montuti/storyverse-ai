import { Story, StoryScene } from '../types/story';
import { STORIES as BASE_STORIES, BRAND_ASSETS } from './stories';

// Distinct high-resolution Unsplash photography & digital art plates so no two stories share the same cover image
export const DISTINCT_SCENE_IMAGES = {
  ocean1: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80',
  ocean2: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1400&q=80',
  ocean3: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
  ocean4: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  mars1: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1400&q=80',
  mars2: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1400&q=80',
  mars3: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
  forest2089: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
  gravityChanged: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
  silentSatellite: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80',
  humanData: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
  futureClassroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
  lastPhotograph: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
  girlRobot: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80',
  lastTree: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80',
  deepSpaceSignal: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80',
  myceliumCover: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1400&q=80',
  alexandriaCover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80',
  symphonyCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80',
  quantumCover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80',
  silenceCover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
  glacierCover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
};

const ADDITIONAL_STORIES: Story[] = [
  {
    id: '2089-the-last-forest',
    title: '2089: The Last Forest',
    subtitle: 'Bio-Architectural Documentary',
    description:
      'High above the flooded equator, a floating geodesic biosphere shelters the final old-growth redwoods—and the botanists decoding their chemical warnings.',
    category: 'Environment',
    format: 'Cinematic Video',
    mood: 'Inspiring',
    difficulty: 'Accessible',
    durationMinutes: 16,
    isTrending: true,
    isNew: true,
    supportsCartoonMode: true,
    author: {
      name: 'Dr. Mateo Silva',
      role: 'Canopy Systems Ecologist',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.forest2089,
    coverAlt: 'Sunlight streaming through towering emerald redwood trees in a misty biosphere',
    tags: ['Biosphere', '2089', 'Forest', 'Ecology'],
    metrics: {
      views: 38400,
      saves: 7420,
      completionRate: 93,
      engagementScore: 96,
      likes: 2910,
      interpretations: 840,
    },
    dna: {
      emotion: 94,
      mystery: 78,
      learning: 92,
      visual: 98,
      interaction: 85,
      audio: 91,
      depth: 90,
      pace: 'Measured → Urgent',
      primaryEmotion: 'Reverence & Hope',
      formatSummary: 'Cinematic Video + Bio-Telemetry + Audio',
      topics: ['Ecology', '2089', 'Botany', 'Survival'],
    },
    context: {
      setting: 'Canopy Ark-04 suspended 800 meters above the Pacific Equatorial Current.',
      timeline: 'Year 2089, during the Great Reforestation Accord.',
      coreTheme: 'Forests are not collections of single trees; they are distributed chemical supercomputers.',
      characters: [
        {
          name: 'Linnea Sato',
          role: 'Chief Dendro-Chemist',
          description: 'Translates volatile terpene signals emitted by ancient sequoias into predictive climate models.',
        },
      ],
      whatHappenedBefore:
        'Rising thermal anomalies forced ecologists to lift entire soil-and-root monoliths onto buoyant ocean platforms.',
      whyItMatters:
        'The seed bank inside Canopy Ark-04 holds the genetic blueprint to re-seed three continents.',
      keyTakeaways: [
        'Old-growth root networks share carbon and stress signals across kilometers.',
        'Preserving an ecosystem requires preserving its microscopic soil microbiome.',
      ],
    },
    chapters: [
      {
        id: 'lf-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Cathedral of Mist',
        subtitle: 'Chapter I · Canopy Ark-04',
        paragraphs: [
          'In 2089, the world’s tallest trees no longer stand on bedrock. They drift along the equator inside a three-kilometer geodesic hull that harvests rainwater directly from trade-wind clouds.',
          'Every morning at dawn, sensors woven into the redwood bark translate sap pressure and volatile organic compounds into an audible harmonic choir.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.forest2089,
        choicePrompt: 'THE ROOT SENSORS DETECT A SALINITY SPIKE.',
        choices: [
          {
            id: 'open-condensers',
            label: 'OPEN THE STRATOSPHERIC FOG HARVESTERS',
            description: 'Capture fresh monsoon vapor to flush the root beds.',
            consequenceText: 'Freshwater Deluge: The canopy drinks deeply as silver mist fills the dome.',
            accentColor: 'cyan',
          },
          {
            id: 'mycelial-buffer',
            label: 'ACTIVATE SYMBIOTIC FUNGAL FILTERS',
            description: 'Let engineered halophilic mycorrhizae sequester the salt crystals.',
            consequenceText: 'Biological Equilibrium: The root lattice crystallizes excess sodium into harmless mineral nodules.',
            accentColor: 'amber',
          },
        ],
      },
      {
        id: 'lf-2',
        number: 2,
        stageName: 'ENDING',
        title: 'The Continental Return',
        subtitle: 'Chapter II · Landfall Protocol',
        paragraphs: [
          'As coastal temperatures stabilize, the Ark prepares to anchor against the western escarpment—returning the ancient forest to solid earth after forty years at sea.',
        ],
      },
    ],
  },
  {
    id: 'the-day-gravity-changed',
    title: 'The Day Gravity Changed',
    subtitle: 'Hard Sci-Fi Physics Chronicle',
    description:
      'For forty-two seconds across the northern hemisphere, Earth’s gravitational constant fluctuated by 0.4%—leaving behind floating droplets, bent light, and a new law of physics.',
    category: 'Space',
    format: 'Interactive',
    mood: 'Curious',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    isTrending: true,
    author: {
      name: 'Prof. Julian Vance',
      role: 'Gravitational Interferometry Lead',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.gravityChanged,
    coverAlt: 'Luminous geometric spheres suspended weightlessly in a dark architectural hall',
    tags: ['Gravity', 'Physics', 'Anomaly', 'Relativity'],
    metrics: {
      views: 31900,
      saves: 6210,
      completionRate: 91,
      engagementScore: 95,
      likes: 2740,
      interpretations: 710,
    },
    dna: {
      emotion: 85,
      mystery: 97,
      learning: 94,
      visual: 95,
      interaction: 90,
      audio: 88,
      depth: 93,
      pace: 'Sudden → Analytical',
      primaryEmotion: 'Vertigo & Wonder',
      formatSummary: 'Cinematic + Physics Simulation + Audio',
      topics: ['Gravity', 'Spacetime', 'Physics', 'Discovery'],
    },
    context: {
      setting: 'The LIGO-Horizon Underground Interferometer in the Swiss Alps.',
      timeline: 'November 14, 2044 · 11:04:19 UTC.',
      coreTheme: 'What happens when a fundamental constant of nature reveals itself to be a variable.',
      characters: [
        {
          name: 'Dr.Nadia Okafor',
          role: 'Quantum Metrologist',
          description: 'First noticed atomic clocks drifting out of sync twelve minutes before the anomaly.',
        },
      ],
      whatHappenedBefore:
        'A primordial dark-matter soliton passed harmlessly through Earth’s mantle, momentarily warping local spacetime curvature.',
      whyItMatters:
        'Capturing the soliton’s signature proves that spacetime geometry can be engineered.',
      keyTakeaways: [
        'Gravity is not a force pulling across space, but the curvature of spacetime itself.',
        'Atomic clocks measure gravitational time dilation down to a single millimeter of elevation.',
      ],
    },
    chapters: [
      {
        id: 'gc-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Forty-Two Seconds of Weightlessness',
        subtitle: 'Chapter I · 11:04 UTC',
        paragraphs: [
          'Coffee rose from porcelain cups in Geneva. Pendulums in cathedral towers slowed mid-swing. Across three thousand kilometers, every seismograph drew a vertical line that defied Newtonian mechanics.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.gravityChanged,
        choicePrompt: 'THE LASER INTERFEROMETER ARMS ARE SATURATING.',
        choices: [
          {
            id: 'recalibrate-phase',
            label: 'SHIFT MIRROR PHASE TO WIDE-BAND',
            description: 'Sacrifice fine sensitivity to capture the full gravitational waveform.',
            consequenceText: 'Waveform Captured: The complete 42-second soliton transit is locked into memory.',
            accentColor: 'amber',
          },
          {
            id: 'sync-orbital',
            label: 'TRIANGULATE WITH LAGRANGE SATELLITES',
            description: 'Measure the exact velocity vector of the anomaly leaving Earth orbit.',
            consequenceText: 'Vector Locked: The soliton is tracked heading toward the Jupiter Trojans at 0.01c.',
            accentColor: 'cyan',
          },
        ],
      },
    ],
  },
  {
    id: 'the-silent-satellite',
    title: 'The Silent Satellite',
    subtitle: 'Orbital Mystery & Deep Telemetry',
    description:
      'Launched in 1974 and declared dead in 1981, Reconnaissance Craft Echo-7 suddenly begins broadcasting high-resolution portraits of cities that have not been built yet.',
    category: 'Mystery',
    format: 'Audio Drama',
    mood: 'Dark',
    difficulty: 'Deep Lore',
    durationMinutes: 19,
    author: {
      name: 'Soren Lindqvist',
      role: 'Orbital Archaeologist',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.silentSatellite,
    coverAlt: 'A solitary vintage satellite orbiting above the glowing curvature of Earth at night',
    tags: ['Orbit', 'Satellite', 'Radio', 'Time'],
    metrics: {
      views: 29400,
      saves: 5980,
      completionRate: 90,
      engagementScore: 94,
      likes: 2380,
      interpretations: 890,
    },
    dna: {
      emotion: 86,
      mystery: 99,
      learning: 80,
      visual: 92,
      interaction: 89,
      audio: 97,
      depth: 95,
      pace: 'Slow → Haunting',
      primaryEmotion: 'Suspense & Intrigue',
      formatSummary: 'Orbital Audio + Telemetry + Cinema',
      topics: ['Space', 'Cold War', 'Time', 'Signals'],
    },
    context: {
      setting: 'Svalbard High-Latitude Ground Receiving Station, 78° North.',
      timeline: 'Polar Night, Mid-Winter.',
      coreTheme: 'An echo from the past carrying an image of the future.',
      characters: [
        {
          name: 'Henrik Solberg',
          role: 'Night-Shift RF Engineer',
          description: 'Decodes legacy S-band analog scanlines from retired polar-orbiting craft.',
        },
      ],
      whatHappenedBefore:
        'Echo-7 was left in a graveyard orbit 1,400 km above Earth with a nuclear radioisotope battery.',
      whyItMatters:
        'The frames transmitted by Echo-7 show coastal seawalls and arcologies dated fifty years ahead.',
      keyTakeaways: [
        'Graveyard orbits preserve hardware untouched by atmospheric drag for centuries.',
      ],
    },
    chapters: [
      {
        id: 'ss-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Carrier Wave at 2205 MHz',
        subtitle: 'Chapter I · Polar Night',
        paragraphs: [
          'At 03:14 UTC, the twelve-meter dish at Svalbard locked onto a telemetry beacon that had been silent for half a century. Line by line, a monochrome raster image assembled on the phosphor monitor.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.silentSatellite,
      },
    ],
  },
  {
    id: 'the-human-behind-the-data',
    title: 'The Human Behind the Data',
    subtitle: 'Human Stories & Algorithmic Ethics',
    description:
      'Every morning, a hospital triage algorithm assigns risk scores to ten thousand patients—until one nurse traces a statistical outlier back to a single forgotten neighborhood.',
    category: 'Human Stories',
    format: 'Data Story',
    mood: 'Emotional',
    difficulty: 'Accessible',
    durationMinutes: 14,
    isNew: true,
    author: {
      name: 'Amara Osei',
      role: 'Public Health Journalist',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.humanData,
    coverAlt: 'Luminous data filaments reflecting in a human eye',
    tags: ['Ethics', 'Healthcare', 'Humanity', 'Data'],
    metrics: {
      views: 26800,
      saves: 5120,
      completionRate: 95,
      engagementScore: 93,
      likes: 2490,
      interpretations: 620,
    },
    dna: {
      emotion: 98,
      mystery: 74,
      learning: 95,
      visual: 88,
      interaction: 86,
      audio: 89,
      depth: 94,
      pace: 'Intimate → Revelatory',
      primaryEmotion: 'Empathy & Conviction',
      formatSummary: 'Data Documentary + Human Portrait',
      topics: ['Humanity', 'Data', 'Ethics', 'Medicine'],
    },
    context: {
      setting: 'St. Jude Metropolitan Civic Hospital & Ward 7 Clinic.',
      timeline: 'Present Day.',
      coreTheme: 'No dataset is neutral; every missing row is a human story waiting to be heard.',
      characters: [
        {
          name: 'Clara Mendez',
          role: 'Clinical Triage Nurse',
          description: 'Cross-referenced algorithmic risk scores with handwritten home-visit journals.',
        },
      ],
      whatHappenedBefore:
        'An automated resource model used historical billing spend as a proxy for medical need, inadvertently overlooking uninsured clinics.',
      whyItMatters:
        'Repairing the training target restored mobile care units to forty thousand residents.',
      keyTakeaways: [
        'Proxy variables in data models must be audited against lived human reality.',
      ],
    },
    chapters: [
      {
        id: 'hd-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Row 4,819',
        subtitle: 'Chapter I · The Quiet Outlier',
        paragraphs: [
          'On the dashboard, Patient 4,819 was a green dot—low priority, zero recent hospital claims. In reality, Arthur was eighty-two and lived four bus transfers away from the nearest pharmacy.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.humanData,
      },
    ],
  },
  {
    id: 'the-future-classroom',
    title: 'The Future Classroom',
    subtitle: 'Educational Innovation & Spatial Pedagogy',
    description:
      'Step inside a 2050 learning studio where history is walked through at 1:1 scale, geometry is sculpted with sound, and every child’s curiosity shapes the syllabus.',
    category: 'Education',
    format: 'Interactive',
    mood: 'Inspiring',
    difficulty: 'Accessible',
    durationMinutes: 13,
    supportsCartoonMode: true,
    author: {
      name: 'Dr. Kenji Takahashi',
      role: 'Architect of Experiential Learning',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.futureClassroom,
    coverAlt: 'Students interacting with luminous holographic planetary projections',
    tags: ['Education', 'Pedagogy', 'Future', 'Learning'],
    metrics: {
      views: 33100,
      saves: 6840,
      completionRate: 96,
      engagementScore: 95,
      likes: 2890,
      interpretations: 540,
    },
    dna: {
      emotion: 90,
      mystery: 72,
      learning: 100,
      visual: 94,
      interaction: 96,
      audio: 88,
      depth: 91,
      pace: 'Playful → Immersive',
      primaryEmotion: 'Curiosity & Joy',
      formatSummary: 'Interactive Pedagogy + Illustrated Mode',
      topics: ['Education', 'Future', 'Creativity', 'AI'],
    },
    context: {
      setting: 'The Kyoto Open-Horizon Learning Commons, Year 2050.',
      timeline: 'Morning Studio Session.',
      coreTheme: 'When students experience why a phenomenon matters first, mastery follows naturally.',
      characters: [
        {
          name: 'Sensei Haruka',
          role: 'Learning Orchestrator',
          description: 'Guides collaborative expeditions across history, physics, and ecology.',
        },
      ],
      whatHappenedBefore:
        'Rote memorization exams were replaced by collaborative simulation studios.',
      whyItMatters:
        'Curiosity retention across ages 8 to 18 rose from 34% to 94%.',
      keyTakeaways: [
        'Spatial storytelling turns abstract equations into tactile intuition.',
      ],
    },
    chapters: [
      {
        id: 'fc-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Walking Inside a Cell',
        subtitle: 'Chapter I · Morning Expedition',
        paragraphs: [
          'At 09:00, the classroom walls dissolve into the lipid bilayer of a living plant cell. Twelve-year-olds trace photon energy packets leaping across chlorophyll molecules with their own hands.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.futureClassroom,
      },
    ],
  },
  {
    id: 'the-last-photograph',
    title: 'The Last Photograph',
    subtitle: 'Archival Biography & Memory',
    description:
      'In an era of infinite synthetic imagery, an aging war photojournalist develops one final roll of silver-gelatin film that proves an erased treaty actually took place.',
    category: 'Biography',
    format: 'Photo Essay',
    mood: 'Emotional',
    difficulty: 'Accessible',
    durationMinutes: 17,
    author: {
      name: 'Miriam Kovacs',
      role: 'Archival Documentary Curator',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.lastPhotograph,
    coverAlt: 'A vintage mechanical rangefinder camera resting under warm amber darkroom light',
    tags: ['Photography', 'History', 'Truth', 'Analog'],
    metrics: {
      views: 27900,
      saves: 5640,
      completionRate: 93,
      engagementScore: 94,
      likes: 2610,
      interpretations: 730,
    },
    dna: {
      emotion: 97,
      mystery: 86,
      learning: 88,
      visual: 99,
      interaction: 82,
      audio: 90,
      depth: 95,
      pace: 'Deliberate → Poignant',
      primaryEmotion: 'Nostalgia & Integrity',
      formatSummary: 'Silver-Gelatin Photo Folio + Voice',
      topics: ['Photography', 'Truth', 'History', 'Memory'],
    },
    context: {
      setting: 'An underground amber-lit darkroom in Lisbon.',
      timeline: 'Year 2038.',
      coreTheme: 'Physical silver halides struck by real photons remain an incorruptible witness to history.',
      characters: [
        {
          name: 'Tomasz Novak',
          role: 'Analog Photojournalist',
          description: 'Carried a mechanical Leica M3 through forty years of geopolitical upheaval.',
        },
      ],
      whatHappenedBefore:
        'Digital cloud archives were altered during a disputed border armistice, erasing evidence of the peace handshake.',
      whyItMatters:
        'Frame 36 on Tomasz’s physical negative carries the authentic grain signature of that morning.',
      keyTakeaways: [
        'Provenance is the foundation of collective trust.',
      ],
    },
    chapters: [
      {
        id: 'lp-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Silver in the Developer Tray',
        subtitle: 'Chapter I · Frame 36',
        paragraphs: [
          'Under the crimson safelight, the paper rests in the chemical bath. Slowly, out of the blank ivory emulsion, two hands clasping across a cedar table emerge in silver shadow.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.lastPhotograph,
      },
    ],
  },
  {
    id: 'the-girl-who-built-a-robot',
    title: 'The Girl Who Built a Robot',
    subtitle: 'Illustrated Innovation & Adventure',
    description:
      'In a windswept scrapyard on the edge of Atacama, eleven-year-old Maya pieces together a solar-powered companion from discarded rover servos—and teaches it how to paint constellations.',
    category: 'Innovation',
    format: 'Illustrated',
    mood: 'Inspiring',
    difficulty: 'Accessible',
    durationMinutes: 15,
    isTrending: true,
    isNew: true,
    supportsCartoonMode: true,
    author: {
      name: 'Camila Rojas',
      role: 'Interactive Story Illustrator',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.girlRobot,
    coverAlt: 'A friendly expressive robot hand reaching toward warm golden light',
    tags: ['Robotics', 'Illustrated', 'Invention', 'Youth'],
    metrics: {
      views: 41200,
      saves: 9120,
      completionRate: 97,
      engagementScore: 98,
      likes: 3890,
      interpretations: 980,
    },
    dna: {
      emotion: 96,
      mystery: 80,
      learning: 91,
      visual: 100,
      interaction: 94,
      audio: 93,
      depth: 89,
      pace: 'Lively → Heartfelt',
      primaryEmotion: 'Wonder & Friendship',
      formatSummary: 'Illustrated Cartoon Mode + Voice + Cinema',
      topics: ['Robotics', 'Creativity', 'Adventure', 'Youth'],
    },
    context: {
      setting: 'San Pedro Observatory Scrapyard, Atacama Desert.',
      timeline: 'Clear Austral Autumn.',
      coreTheme: 'Technology becomes magical when guided by empathy and play.',
      characters: [
        {
          name: 'Maya',
          role: 'Young Inventor',
          description: 'Collects decommissioned telescope actuators and solar cells.',
        },
        {
          name: 'BEEP-09 ("Sol")',
          role: 'Artisan Companion Bot',
          description: 'Built from a welding arm and a camera lens; communicates through light projections.',
        },
      ],
      whatHappenedBefore:
        'An automated observatory upgraded its mirror actuators, leaving crates of precision motors in the town depot.',
      whyItMatters:
        'Maya’s improvised star-tracker spots a near-Earth comet missed by the main array.',
      keyTakeaways: [
        'Great engineering begins with curiosity and resourcefulness.',
      ],
    },
    chapters: [
      {
        id: 'gr-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Optical Heart',
        subtitle: 'Chapter I · The Tin Workshop',
        paragraphs: [
          'When Maya soldered the final copper lead onto the salvaged telescope lens, the little robot’s aperture blinked twice—projecting a map of the Southern Cross onto the corrugated tin ceiling.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.girlRobot,
      },
    ],
  },
  {
    id: 'the-last-tree-on-earth',
    title: 'The Last Tree on Earth',
    subtitle: 'Future Myth & Ecological Parable',
    description:
      'Centuries after Earth’s surface became an endless solar mirror array, a maintenance technician discovers a single ancient oak growing inside an abandoned cooling tower.',
    category: 'Future',
    format: 'Cinematic Video',
    mood: 'Emotional',
    difficulty: 'Accessible',
    durationMinutes: 16,
    supportsCartoonMode: true,
    author: {
      name: 'Jonas Lindholm',
      role: 'Environmental Futurist',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.lastTree,
    coverAlt: 'A solitary majestic oak tree standing bathed in golden twilight',
    tags: ['Ecology', 'Future', 'Hope', 'Renewal'],
    metrics: {
      views: 35600,
      saves: 7890,
      completionRate: 94,
      engagementScore: 96,
      likes: 3150,
      interpretations: 870,
    },
    dna: {
      emotion: 98,
      mystery: 84,
      learning: 86,
      visual: 97,
      interaction: 88,
      audio: 94,
      depth: 93,
      pace: 'Quiet → Transcendent',
      primaryEmotion: 'Solitude & Renewal',
      formatSummary: 'Cinematic + Audio + Illustrated Mode',
      topics: ['Nature', 'Future', 'Renewal', 'Earth'],
    },
    context: {
      setting: 'Helios Mirror Sector 44, Former Loire Valley.',
      timeline: 'Year 2194.',
      coreTheme: 'Life persists in the margins of our grandest machines.',
      characters: [
        {
          name: 'Eliot',
          role: 'Mirror Array Technician',
          description: 'Has never seen a living leaf outside archival holograms until entering Tower 12.',
        },
      ],
      whatHappenedBefore:
        'Continental solar fields covered the plains, while forgotten concrete cooling towers became micro-climates trapping rain and鳥-borne acorns.',
      whyItMatters:
        'Acorns from Tower 12 initiate the reclamation of the European soil belt.',
      keyTakeaways: [
        'Even a single surviving organism carries millions of years of evolutionary resilience.',
      ],
    },
    chapters: [
      {
        id: 'lt-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Green Beneath the Concrete Halo',
        subtitle: 'Chapter I · Cooling Tower 12',
        paragraphs: [
          'Looking up through the circular oculus of the hundred-meter tower, Eliot saw not silicon panels, but a crown of trembling green oak leaves catching the rain.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.lastTree,
      },
    ],
  },
  {
    id: 'the-signal-from-deep-space',
    title: 'The Signal From Deep Space',
    subtitle: 'Interstellar First-Contact Documentary',
    description:
      'When the Square Kilometre Array decodes a repeating prime-number pulse from Gliese 667C, linguists and astrophysicists realize the message is not a greeting—it is a musical score.',
    category: 'Space',
    format: 'Cinematic Video',
    mood: 'Mysterious',
    difficulty: 'Deep Lore',
    durationMinutes: 21,
    isTrending: true,
    isNew: true,
    supportsCartoonMode: true,
    author: {
      name: 'Dr. Carlotta Vega',
      role: 'SETI Xenolinguist',
    },
    coverUrl: DISTINCT_SCENE_IMAGES.deepSpaceSignal,
    coverAlt: 'Deep space nebula glowing with crimson and electric blue starlight',
    tags: ['SETI', 'Deep Space', 'First Contact', 'Music'],
    metrics: {
      views: 46200,
      saves: 10240,
      completionRate: 95,
      engagementScore: 99,
      likes: 4120,
      interpretations: 1540,
    },
    dna: {
      emotion: 94,
      mystery: 100,
      learning: 93,
      visual: 99,
      interaction: 92,
      audio: 100,
      depth: 98,
      pace: 'Suspenseful → Symphonic',
      primaryEmotion: 'Cosmic Awe',
      formatSummary: 'Cinematic Video + Spatial Audio + Telemetry',
      topics: ['Space', 'First Contact', 'Acoustics', 'SETI'],
    },
    context: {
      setting: 'Karoo Radio Telescope Array, South Africa & Atacama Millimeter Dish.',
      timeline: 'October 2036.',
      coreTheme: 'Mathematics gets a civilization’s attention; harmony communicates its soul.',
      characters: [
        {
          name: 'Dr. Carlotta Vega',
          role: 'Principal Xenolinguist',
          description: 'Discovered that the frequency ratios of the signal match overtone harmonics.',
        },
      ],
      whatHappenedBefore:
        'For forty years, radio astronomers searched narrow-band hydrogen frequencies for binary bitstreams.',
      whyItMatters:
        'Playing the frequency ratios as acoustic chords reveals a three-dimensional holographic star map.',
      keyTakeaways: [
        'Harmonic ratios are universal across physics, chemistry, and music.',
      ],
    },
    chapters: [
      {
        id: 'sds-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Hydrogen Overtone',
        subtitle: 'Chapter I · 1420.405 MHz',
        paragraphs: [
          'It began at 1,420 megahertz—the quiet spin-flip frequency of neutral hydrogen. Every 13.7 seconds, three overtones bloomed in exact fifth and octave intervals across all three thousand dishes in the Karoo desert.',
        ],
        visualUrl: DISTINCT_SCENE_IMAGES.deepSpaceSignal,
      },
    ],
  },
];

// Build synchronized 5-scene timeline for each story (Section 4, 5, 6, 7, 11)
export function buildScenesForStory(story: Story): StoryScene[] {
  if (story.id === 'the-city-beneath-the-ocean') {
    return [
      {
        id: `${story.id}-sc-1`,
        sceneNumber: 1,
        startTime: 0,
        endTime: 8,
        video: 'ocean-city',
        image: BRAND_ASSETS.oceanCityCard,
        illustratedTheme: 'ocean-dome',
        title: 'THE LAST CITY BELOW',
        subtitle: 'SCENE 01 · 0:00–0:08 · PACIFIC ABYSSAL PLAIN',
        narration:
          'The year was 2089. Humanity had built cities beneath the ocean to escape the scorching surface tempests. Four kilometers below the waves, bioluminescent domes glowed like artificial constellations.',
        sentences: [
          'The year was 2089.',
          'Humanity had built cities beneath the ocean to escape the scorching surface tempests.',
          'Four kilometers below the waves, bioluminescent domes glowed like artificial constellations.',
        ],
        transition: 'kenburns',
      },
      {
        id: `${story.id}-sc-2`,
        sceneNumber: 2,
        startTime: 8,
        endTime: 16,
        video: 'submarine-descent',
        image: DISTINCT_SCENE_IMAGES.ocean1,
        illustratedTheme: 'sub-descent',
        title: 'A NEW HOME IN THE DEEP',
        subtitle: 'SCENE 02 · 0:08–0:16 · BATHYSCAPHE TRANSIT CORRIDOR',
        narration:
          'Deep beneath the Pacific Ocean, silent bathyscaphes glided between titanium arches. Millions of citizens adapted to a world lit by synthetic kelp forests and geothermal currents.',
        sentences: [
          'Deep beneath the Pacific Ocean, silent bathyscaphes glided between titanium arches.',
          'Millions of citizens adapted to a world lit by synthetic kelp forests and geothermal currents.',
        ],
        transition: 'crossfade',
      },
      {
        id: `${story.id}-sc-3`,
        sceneNumber: 3,
        startTime: 16,
        endTime: 25,
        video: 'trench-pressure',
        image: DISTINCT_SCENE_IMAGES.ocean2,
        illustratedTheme: 'ocean-dome',
        title: 'THE OCEAN WAS RISING',
        subtitle: 'SCENE 03 · 0:16–0:25 · HYDROSTATIC BULKHEAD 09',
        narration:
          'But something was changing in the abyssal trench below the city. Acoustic sonar arrays detected a low harmonic pulse rising from the tectonic magma vents.',
        sentences: [
          'But something was changing in the abyssal trench below the city.',
          'Acoustic sonar arrays detected a low harmonic pulse rising from the tectonic magma vents.',
        ],
        transition: 'zoom',
      },
      {
        id: `${story.id}-sc-4`,
        sceneNumber: 4,
        startTime: 25,
        endTime: 34,
        video: 'leviathan-echo',
        image: DISTINCT_SCENE_IMAGES.ocean3,
        illustratedTheme: 'alien-artifact',
        title: 'VOICES OF THE TRENCH',
        subtitle: 'SCENE 04 · 0:25–0:34 · GEOTHERMAL VENT FIELD',
        narration:
          'The deep-sea ecosystem was not empty—it was communicating through bioluminescent light patterns. Every turbine vibration had been answered by the living trench.',
        sentences: [
          'The deep-sea ecosystem was not empty—it was communicating through bioluminescent light patterns.',
          'Every turbine vibration had been answered by the living trench.',
        ],
        transition: 'parallax',
      },
      {
        id: `${story.id}-sc-5`,
        sceneNumber: 5,
        startTime: 34,
        endTime: 44,
        video: 'ocean-symbiosis',
        image: DISTINCT_SCENE_IMAGES.ocean4,
        illustratedTheme: 'ocean-dome',
        title: 'THE ABYSSAL COVENANT',
        subtitle: 'SCENE 05 · 0:34–0:44 · HARMONIC EQUILIBRIUM',
        narration:
          'By tuning the city’s geothermal reactors to match the ocean’s natural acoustic frequency, Thalassa-Prime transformed from an intruder into a symbiotic reef.',
        sentences: [
          'By tuning the city’s geothermal reactors to match the ocean’s natural acoustic frequency, Thalassa-Prime transformed from an intruder into a symbiotic reef.',
        ],
        transition: 'blur',
      },
    ];
  }

  if (story.id === 'letters-from-mars') {
    return [
      {
        id: `${story.id}-sc-1`,
        sceneNumber: 1,
        startTime: 0,
        endTime: 8,
        video: 'mars-astronaut',
        image: BRAND_ASSETS.marsLettersCard,
        illustratedTheme: 'astronaut-launch',
        title: 'THE LONELY ASTRONAUT',
        subtitle: 'SCENE 01 · 0:00–0:08 · ARCADIA PLANITIA OUTPOST',
        narration:
          'Twenty-two light-minutes from Earth, Commander Elena Vance seals her helmet visor as the twin moons Phobos and Deimos cross the rust-colored twilight.',
        sentences: [
          'Twenty-two light-minutes from Earth, Commander Elena Vance seals her helmet visor.',
          'The twin moons Phobos and Deimos cross the rust-colored twilight.',
        ],
        transition: 'kenburns',
      },
      {
        id: `${story.id}-sc-2`,
        sceneNumber: 2,
        startTime: 8,
        endTime: 16,
        video: 'mars-walk',
        image: DISTINCT_SCENE_IMAGES.mars1,
        illustratedTheme: 'mars-walk',
        title: 'FOOTSTEPS ON THE RED DUST',
        subtitle: 'SCENE 02 · 0:08–0:16 · VALLES MARINERIS RIDGE',
        narration:
          'Walking across the iron-oxide dunes, every bootprint she leaves will remain untouched by rain for a million years. In her ear, a voice letter from her daughter arrives after a twenty-minute delay.',
        sentences: [
          'Walking across the iron-oxide dunes, every bootprint she leaves will remain untouched by rain for a million years.',
          'In her ear, a voice letter from her daughter arrives after a twenty-minute delay.',
        ],
        transition: 'slide',
      },
      {
        id: `${story.id}-sc-3`,
        sceneNumber: 3,
        startTime: 16,
        endTime: 25,
        video: 'mars-city',
        image: DISTINCT_SCENE_IMAGES.mars2,
        illustratedTheme: 'mars-city',
        title: 'THE GLASS DOMES OF ARES',
        subtitle: 'SCENE 03 · 0:16–0:25 · HABITAT RING 04',
        narration:
          'Inside the pressurized glass domes of the Mars colony, hydroponic orchards bloom beneath amber LED suns—a fragile island of green against the freezing vacuum outside.',
        sentences: [
          'Inside the pressurized glass domes of the Mars colony, hydroponic orchards bloom beneath amber LED suns.',
          'A fragile island of green endures against the freezing vacuum outside.',
        ],
        transition: 'crossfade',
      },
      {
        id: `${story.id}-sc-4`,
        sceneNumber: 4,
        startTime: 25,
        endTime: 34,
        video: 'space-storm',
        image: DISTINCT_SCENE_IMAGES.mars3,
        illustratedTheme: 'space-storm',
        title: 'THE GLOBAL DUST TEMPEST',
        subtitle: 'SCENE 04 · 0:25–0:34 · ELECTROSTATIC HORIZON',
        narration:
          'Suddenly, a planet-encircling dust storm rises over the Tharsis volcanoes. Violet electrostatic lightning dances across the communications dish, threatening to sever the link to Earth.',
        sentences: [
          'Suddenly, a planet-encircling dust storm rises over the Tharsis volcanoes.',
          'Violet electrostatic lightning dances across the communications dish, threatening to sever the link to Earth.',
        ],
        transition: 'zoom',
      },
      {
        id: `${story.id}-sc-5`,
        sceneNumber: 5,
        startTime: 34,
        endTime: 44,
        video: 'mars-discovery',
        image: BRAND_ASSETS.readerOrbScene,
        illustratedTheme: 'alien-artifact',
        title: 'THE SUBTERRANEAN DISCOVERY',
        subtitle: 'SCENE 05 · 0:34–0:44 · LAVA TUBE SANCTUARY',
        narration:
          'Taking shelter inside a volcanic lava tube, her headlamp illuminates fossilized microbial stromatolites and a subterranean glacier humming with ancient life.',
        sentences: [
          'Taking shelter inside a volcanic lava tube, her headlamp illuminates fossilized microbial stromatolites.',
          'A subterranean glacier hums with the memory of ancient life.',
        ],
        transition: 'blur',
      },
    ];
  }

  // Generic data-driven 5-scene synchronization builder for all other stories
  const altImages = [
    story.coverUrl,
    BRAND_ASSETS.spotlightHero,
    BRAND_ASSETS.readerOrbScene,
    DISTINCT_SCENE_IMAGES.deepSpaceSignal,
    DISTINCT_SCENE_IMAGES.quantumCover,
  ];

  const transitions: StoryScene['transition'][] = [
    'kenburns',
    'crossfade',
    'zoom',
    'parallax',
    'blur',
  ];

  const themes: NonNullable<StoryScene['illustratedTheme']>[] = [
    'astronaut-launch',
    'robot-workshop',
    'neural-forest',
    'quantum-loom',
    'alien-artifact',
  ];

  return [0, 1, 2, 3, 4].map((idx) => {
    const ch = story.chapters[idx % story.chapters.length];
    const rawParagraph =
      ch?.paragraphs?.[0] ||
      story.description ||
      'A new chapter unfolds across the Storyverse continuum.';

    const splitSentences = rawParagraph
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0);

    const startTime = idx * 8;
    const endTime = (idx + 1) * 8 + (idx === 4 ? 4 : 0);

    return {
      id: `${story.id}-sc-${idx + 1}`,
      sceneNumber: idx + 1,
      startTime,
      endTime,
      video: `${story.id}-stream-${idx + 1}`,
      image: ch?.visualUrl || altImages[idx % altImages.length],
      illustratedTheme: themes[idx % themes.length],
      title: ch?.title ? ch.title.toUpperCase() : `SCENE 0${idx + 1} · ${story.title.toUpperCase()}`,
      subtitle: `SCENE 0${idx + 1} · 0:${String(startTime).padStart(2, '0')}–0:${String(endTime).padStart(2, '0')} · ${ch?.stageName || 'CHRONICLE'}`,
      narration: rawParagraph,
      sentences: splitSentences.length > 0 ? splitSentences : [rawParagraph],
      transition: transitions[idx % transitions.length],
    };
  });
}

// Enhance base stories with distinct covers where needed, trending flags, semantic DNA, and scenes
const COVER_OVERRIDES: Record<string, string> = {
  'architects-of-the-mycelium-web': DISTINCT_SCENE_IMAGES.myceliumCover,
  'echoes-of-alexandria': DISTINCT_SCENE_IMAGES.alexandriaCover,
  'the-symphony-of-dark-matter': DISTINCT_SCENE_IMAGES.symphonyCover,
  'the-quantum-cartographer': DISTINCT_SCENE_IMAGES.quantumCover,
  'the-cartography-of-silence': DISTINCT_SCENE_IMAGES.silenceCover,
  'the-last-glaciers-memory': DISTINCT_SCENE_IMAGES.glacierCover,
};

const TRENDING_IDS = new Set([
  'the-last-light',
  'the-city-beneath-the-ocean',
  'the-algorithm-that-dreamed',
  'letters-from-mars',
  '2089-the-last-forest',
  'the-signal-from-deep-space',
  'the-girl-who-built-a-robot',
]);

const CARTOON_READY_IDS = new Set([
  'letters-from-mars',
  'the-girl-who-built-a-robot',
  'the-city-beneath-the-ocean',
  '2089-the-last-forest',
  'the-future-classroom',
  'the-last-tree-on-earth',
]);

export const ALL_STORIES: Story[] = [...BASE_STORIES, ...ADDITIONAL_STORIES].map(
  (story, idx) => {
    const coverUrl = COVER_OVERRIDES[story.id] || story.coverUrl;
    const enrichedStory: Story = {
      ...story,
      coverUrl,
      isTrending: story.isTrending ?? TRENDING_IDS.has(story.id),
      isNew: story.isNew ?? idx >= 10,
      supportsCartoonMode:
        story.supportsCartoonMode ?? CARTOON_READY_IDS.has(story.id),
      dna: {
        ...story.dna,
        pace: story.dna.pace || (story.durationMinutes > 18 ? 'Slow → Epic' : 'Measured → Fast'),
        primaryEmotion:
          story.dna.primaryEmotion ||
          (story.mood === 'Mysterious'
            ? 'Curiosity & Awe'
            : story.mood === 'Emotional'
            ? 'Empathy & Resonance'
            : 'Wonder & Discovery'),
        formatSummary:
          story.dna.formatSummary ||
          `${story.format} + Voice Narration + Scene Timeline`,
        topics: story.dna.topics || [story.category, ...story.tags.slice(0, 2)],
      },
    };
    enrichedStory.scenes = buildScenesForStory(enrichedStory);
    return enrichedStory;
  }
);
