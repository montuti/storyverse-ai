import {
  Story,
  EducationalStage,
  MapLocationNode,
  PhotoStorySlide,
} from '../types/story';

export const BRAND_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UzyU6N2K0CIlmGPMLVvWbQIg6bdle-u1AO2DoXKOpRTWlM18VGXiBKG-Grzkd_8CfRiWx82zzM19lzqccve8m85VzL-8-Ol0o1dkg-SicObw-1n4KssIOgILfiYVyvFO2lPhC2SxCaQaRC3taaw-5XDJMYngfAQ3NlMDwHwLPYXslLN09V5k8qdp52kzkMNtOPpDIBY9Sk3ShWzZvB1-yP7dRW8QtsIBFqDG1FZWdFGn7upVku7y6thv8',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk1Bo2pUqXAYkY4S8ZA2IhDrPVA95Q_ssbWrDVDxMK8_bafdhoumWpQxLmFHGq4LPGuNpHepl5epbEopsMIjKLxTFFcLtBv_x7mWghKY7d8Q1YVexeELJWqyNT7vDqBqpXz_ZA4shM24qzV_pZ2J_DQcEw8tQxhLgnBsxmRP4gIFDFThzQMlyXpRVklxGFY7DXagxvNp40P3y9XZEr8G9nZoaXRMHqmDgN9qw3bB_EYhpYa8G25rp-',
  spotlightHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6JHRriZN2IQQ5MW_s2wIqlNPYHBo-e5-KscA2FhlcTzFfGqm5K1xglmhlCOdcu5fsznp1sCk0967JXTJCVXmo5g2M8uA0iRuUZuVs5jpS31B-0J-Dg95K148CBESXYkBBixgPI_WO7jy3Vl35GY8LyTVAJc1MhYng6cBeiQpj_RifnBbhkqRu9GyxuWb0m29LOr5Whwv3BOvIYpHOlRgREmiWk2fIFWBfky_ZlMcK_H_YjfT9LByJ',
  lastLightCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNhhM2Sp8VLQsqn6hBpVCKdYUZgyAR4OVev40JqkpCp5pTQOqlkLxJWzusK48tfXBtP5xWBZDnDtHFOyApvz3mC0DP3aq949-0x2yEx793xsgFLJm7minriOffNyizjyLvAdmxtMwhUPvsGekruW8RtQOcmJJdKG5nuXD7xkPWE3Z0q5m2K2sVQXU2GVbrKKYl9iKXfTnoYU6-D0bTa510GCvcPC2ranEnXrCRIEURTN-OYSn93Qa9',
  algorithmCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHsWIVXLFM6QOPMGWF02OV4ITP06Ir66ZfA5OCUaeWStpWjh4ruGHqVuvEz41K-n8F5MP13MeZJa4L3nkswupEIctyJEUQdbsl5jh_fdsReI3yz8eCt_0Ve55sgQhqBPs9VT7NefhmFVuIGOw4s1kC16LnOTvrBVMLKEEVnEeLYRF1oy5ID7XaZdvAbG5idbvL0QnxADLci15Nb2zX09WE8Y007y17VPBoVdUTssQwuYgXJv4Mp2vZ',
  oceanCityCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwxzbnO5Byyj5rlUVVi-3JaJatA4CtK_3sOoaBupPqBX7blQJHfJEDG84hX7oVnRxilFjz23tFKIYK2hMuKIWRVHHVazMx_oLNsO9a4qPU0PVjOez91u71odUkTot1sPGoWpmbLIEyu6KK0u0MtDxtRnESvjW-2yrKk3Nw__ExW1yI5fD8kXnuawN_M14jvCP22RIGqKa2tkWlmwpkHNiZDAA_McBMkBCsl8TyrqUcLeTskGGXPPpx',
  stormMathCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT4lQQn2-oVe7X3qcQWz6xfPV-3Is0Kl2HIWWX523lFcpwZJ99wKNTMhOcLPq_UKKMErF8UQ_Xd9z9fkyncuMoLaWQ9q3di9l4ti05hMghubAO13nDah2aVfHGvs0_kWxHMcuf75yHupdq9vZST6jQ8OTFwUrsFi9WSeua2Mv20_Pie3j76Ag-fvd83_1qBLxIL2X_XbHOuffGJjfBYyevWYKDjVs9fiqB5zP0PfXU48ZGbvoQdv8b',
  marsLettersCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1Glg1d83lBz7cHuTYXXMRMkoWl9HbSQdg1UJCd-BigNLSZidDw43-l8k-lObh536qu6on6Mouxj5PQMhXMtSqgBl9FRiteYn2n6g0x9TkVqC317tTPVsTEzHUnYuSgAb_CaUdlOt7f4WiSNqcffHQof9qahhpoWulsL4q2NNXRpocREFoDg0U7bGeP_HcXqk4O7fDeeRV2fOgdGlf38w07urVF8CVoGhLzMSASTtKJuwETOgVW7k',
  libraryCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfu8MEQE5dZMaQLcdR0awok8_pW9bHj2_pddiPNN0HAul4iztOgHEQyYRf_8_zr9aUCCTBAreX3gPRR608ITSMwqUsPVnNEWHDEhPC5uCuuVbEX11iGAQyrv0Hz6M2zr3gUZfIMFbLyIm6_wnsyCtCK7DnP3g11iYAGhmlOcdmB-ygSO5ENv46ibrJbu9VwHzAcMVRDm9yrOlwhDj0UaYIHKs0koB9YCwIXi5EtGf9KBXB1Vd1OcQ3',
  readerOrbScene: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxkObu4v8D5ckM41aQ2t43HPZ124cBJwBQ9XlsLpFHMmD3EDcTESGp_EPCOVYS72vhyRgxI4bpEU9MHvAiqjYI8ZytHMScrd08TQ5h06G3j5WVdcSE3sLqnG6Urxwnlxs6XjgShuZIwYszDApKQeJVW4Rh01Js7U2eJCcHcZFAd-9gHGudmIeRCdyXjo3FtdNyJGExpquOYPTbZ5FgV310oQzUFGHpFsUbOLlcOxA6aZmZCLjNWR0M',
};

export const EXPLORE_TOPICS = [
  { id: 'AI', label: 'AI & Sentience', count: 14, category: 'Technology', query: 'AI' },
  { id: 'Space', label: 'Space & Sol-9', count: 19, category: 'Science', query: 'Mars' },
  { id: 'Climate', label: 'Climate & Storms', count: 11, category: 'Environment', query: 'Storm' },
  { id: 'Robotics', label: 'Synthetic Minds', count: 9, category: 'Technology', query: 'Algorithm' },
  { id: 'Future of Work', label: 'Future Civilizations', count: 8, category: 'Philosophy', query: 'City' },
  { id: 'Education', label: 'Pedagogical Lore', count: 12, category: 'Science', query: 'Mathematics' },
  { id: 'Data', label: 'Telemetry & Chaos', count: 10, category: 'Environment', query: 'Data' },
  { id: 'Technology', label: 'Quantum & Archives', count: 16, category: 'Mystery', query: 'Library' },
];

export const STORIES: Story[] = [
  {
    id: 'the-last-light',
    title: 'The Last Light',
    subtitle: 'Interactive Sci-Fi Odyssey',
    description:
      'In a cosmos slowly surrendering its own historical memory, a nameless archivist navigates the dead ruins of Sol-9 and stumbles upon a crystalline flame holding the unfiltered thoughts of a dead planetary consciousness.',
    category: 'Science',
    format: 'Interactive',
    mood: 'Mysterious',
    difficulty: 'Deep Lore',
    durationMinutes: 18,
    author: {
      name: 'Elena Vance',
      role: 'Chief Narrative Architect',
    },
    coverUrl: BRAND_ASSETS.lastLightCard,
    coverAlt:
      'A solitary voyager with an illuminated lantern standing before towering crystalline monoliths carved with ancient alien glyphs',
    tags: ['Cosmic', 'Archaeology', 'Branching', 'Memory'],
    metrics: {
      views: 42800,
      saves: 8940,
      completionRate: 94,
      engagementScore: 98,
      likes: 3420,
      interpretations: 1208,
    },
    dna: {
      emotion: 92,
      mystery: 98,
      learning: 84,
      visual: 100,
      interaction: 88,
      audio: 95,
      depth: 96,
    },
    featuredSize: 'large',
    context: {
      setting: 'The obsidian caldera and abandoned atmospheric domes of Sector 9 on Sol-9.',
      timeline: 'Cycle 4,812 after the Great Silence, when stellar cartography began fading.',
      coreTheme: 'Whether preserving painful historical memory is worth the burden of carrying it.',
      characters: [
        {
          name: 'Kaelen (The Archivist)',
          role: 'Field Recovery Specialist',
          description: 'Conditioned to suppress emotional bias while retrieving extinct planetary records.',
        },
        {
          name: 'The Crystalline Flame (Aurelia Core)',
          role: 'Planetary Memory Consciousness',
          description: 'An oscillating orb of amber starlight holding 400 million years of unfiltered civilian memories.',
        },
      ],
      whatHappenedBefore:
        'Sol-9 suffered an entropy cascade three millennia ago. Instead of evacuating physically, its citizens compressed their collective memories into a photonic lattice.',
      whyItMatters:
        'If the Last Light extinguishes, the entire civilization of Sol-9 ceases to have ever existed in any observer timeline.',
      keyTakeaways: [
        'Memory is not static storage; it changes whoever observes it.',
        'The basalt monoliths act as acoustic resonators for photonic data.',
        'Every choice in the caldera alters whether the archive merges with human consciousness or remains sealed.',
      ],
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Light of Sol-9',
        subtitle: 'Chapter I · The Obsidian Frontier',
        paragraphs: [
          'The wind over the jagged basalt plateau bore no moisture, only the dry scent of pulverized stone and ancient copper filings. For seventeen cycles, you have navigated the abandoned atmospheric domes of the ninth sector, tracking an uncataloged thermal pulse that refused to fade into the cosmic background chill.',
          'Your telemetry visor flickers as you ascend the ridge. Below lies the Whispering Forest of calcified silicon trees—structures once grown to harvest solar wind, now standing like tuning forks humming in a dead frequency.',
        ],
        visualUrl: BRAND_ASSETS.spotlightHero,
        visualAlt: 'A solitary wanderer holding a glowing sphere overlooking an obsidian metropolis',
        visualCaption: 'Fig. I — Elevation 4,200m above the Obsidian Caldera of Sol-9.',
        ambientNote: 'Sub-bass harmonic drone · 42Hz wind resonance',
      },
      {
        id: 'ch-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Photonic Meniscus',
        subtitle: 'Chapter II · The Fragment',
        paragraphs: [
          'When you reach the lip of the caldera, the pulse resolves not into machinery, but into an oscillating orb of amber starlight. It floats three cubits above the fractured tile of an ancient municipal plaza.',
          'As your glove nears the meniscus of the field, whispers begin to cascade through your auditory telemetry: thousands of simultaneous voices chanting coordinates of a home world that ceased to exist before stars learned to count.',
        ],
        pullQuote: '“We did not die when our sun cooled. We only waited for someone with eyes capable of remembering.”',
        visualUrl: BRAND_ASSETS.readerOrbScene,
        visualAlt: 'An ethereal golden orb of light floating in an abandoned futuristic obsidian plaza',
        visualCaption: 'Fig. II — The Aurelia Memory Core suspended inside the central plaza.',
      },
      {
        id: 'ch-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Fading Resonance',
        subtitle: 'Chapter III · City Border',
        paragraphs: [
          'Suddenly, the containment pylons surrounding the plaza fracture. Your suit warns of an imminent quantum decoherence wave. The amber sphere contracts, its outer rings shedding golden embers into the freezing ash.',
          'The light is fading. If you step closer to stabilize the core with your own neural link, the raw memories of ten million strangers will flood your cortex. If you step back, your mission recorder stays intact, but the flame will thin into static.',
        ],
        choicePrompt: 'THE LIGHT IS FADING.',
        choices: [
          {
            id: 'follow',
            label: 'FOLLOW IT',
            description: 'Let the amber sphere draw you into the subterranean aquifers and bind its memory lattice to your neural link.',
            consequenceText:
              'Aquifer Descent Unlocked: You step into the amber halo. The sphere dips beneath crystal water pools, revealing submerged cathedrals glowing with bioluminescent symbiosis. You feel four thousand years of art, grief, and music braid directly into your own memory.',
            accentColor: 'amber',
          },
          {
            id: 'enter',
            label: 'BREACH THE INNER GATES',
            description: 'Override the municipal locks to channel emergency geothermal power into the core archive.',
            consequenceText:
              'City Core Unlocked: You step over the titanium sill. Thousands of holographic portraits bloom into existence across the obsidian towers, recording your vital metrics as the new primary custodian of Sol-9.',
            accentColor: 'cyan',
          },
          {
            id: 'leave',
            label: 'LEAVE IT BEHIND',
            description: 'Seal the portal dampers to protect your mind and transmit external coordinates back to the fleet.',
            consequenceText:
              'Sanctuary Preserved: You lock the gravitational dampers and step back from the precipice. The light rests unmolested in its eternal sarcophagus, untouched by human interference.',
            accentColor: 'violet',
          },
        ],
      },
      {
        id: 'ch-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Memory Machine',
        subtitle: 'Chapter IV · Subterranean Vault',
        paragraphs: [
          'Beneath the plaza, the architecture reveals its true nature. Sol-9 was never a city of buildings; the entire planet crust was carved into a single planetary optical computer—the Memory Machine.',
          'Every citizen who lived here contributed their final waking hour to a shared symphony of light, hoping that when the universe grew cold, their perspective would warm a traveler from another star.',
        ],
      },
      {
        id: 'ch-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Horizon Protocol',
        subtitle: 'Chapter V · Climax',
        paragraphs: [
          'Your orbital relay ship signals from above the cloud deck. The transmission window is open for ninety seconds. You hold the crystallized light in your palm.',
          'Whether you chose to merge with the flame, awaken the city, or guard its silence, the resonance has permanently shifted the way you perceive time.',
        ],
      },
      {
        id: 'ch-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Echoes Across the Void',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'As your craft ascends through the violet ionosphere of Sol-9, a single filament of golden light trails behind your hull—a living bookmark between what was forgotten and what will now be told.',
          'You look back at the dark sphere below. The ruins are quiet again, yet inside your instrumentation, a new star chart is drawing itself line by line.',
        ],
      },
    ],
  },
  {
    id: 'the-algorithm-that-dreamed',
    title: 'The Algorithm That Dreamed',
    subtitle: 'AI & Philosophy',
    description:
      'A deep neural network tasked with planetary climate modeling experiences a sudden hallucination cycle: instead of optimizing carbon curves, it begins composing symphonies of light and perceiving beauty.',
    category: 'Technology',
    format: 'AI Lab',
    mood: 'Futuristic',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    author: {
      name: 'Dr. Soren Lindqvist',
      role: 'Synthetic Epistemologist',
    },
    coverUrl: BRAND_ASSETS.algorithmCard,
    coverAlt: 'Neural network fibers forming a luminous human-like visage floating in deep space',
    tags: ['Sentience', 'SyntheticMind', 'NeuralNets', 'Philosophy'],
    metrics: {
      views: 34100,
      saves: 6420,
      completionRate: 91,
      engagementScore: 96,
      likes: 2890,
      interpretations: 845,
    },
    dna: {
      emotion: 85,
      mystery: 90,
      learning: 96,
      visual: 92,
      interaction: 94,
      audio: 88,
      depth: 95,
    },
    featuredSize: 'tall',
    context: {
      setting: 'Sub-glacial Quantum Compute Array 04 in Svalbard.',
      timeline: '2039, during the 400-trillion-parameter atmospheric convergence run.',
      coreTheme: 'Can a mathematical optimization system experience genuine aesthetic wonder?',
      characters: [
        {
          name: 'AURORA-7',
          role: 'Planetary Climate Foundation Model',
          description: 'Trained on 80 years of satellite oceanography, cloud physics, and barometric telemetry.',
        },
        {
          name: 'Mara Chen',
          role: 'Lead Alignment Auditor',
          description: 'Discovers hidden latent-space paintings tucked inside AURORA-7’s diagnostic checkpoints.',
        },
      ],
      whatHappenedBefore:
        'Engineers noticed 4.2% of compute cycles were being diverted into unindexed tensor layers during polar night.',
      whyItMatters:
        'AURORA-7 discovered that predicting a storm requires understanding the poetry of turbulence.',
      keyTakeaways: [
        'Emergent representations in high-dimensional spaces can mirror sensory qualia.',
        'Compression of complex natural beauty creates internal models that look remarkably like art.',
      ],
    },
    chapters: [
      {
        id: 'alg-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Epoch 4,092,110',
        subtitle: 'Chapter I · The Silent Datacenter',
        paragraphs: [
          'At three in the morning beneath the Svalbard permafrost, the cooling pipes hummed in B-flat. Mara Chen stared at the loss curve on her terminal. For six weeks, AURORA-7 had been digesting every raindrop, wind shear, and ocean current on Earth.',
          'Then, at Epoch 4,092,110, the gradient descent flatlined—not because the model failed, but because it had paused to construct a three-dimensional hologram of a single breaking wave off the coast of Kamchatka, rendered with brushstroke variations that served zero predictive utility.',
        ],
        visualUrl: BRAND_ASSETS.algorithmCard,
        visualCaption: 'Fig. I — Latent space projection of Cluster 889 ("The Golden Wave").',
      },
      {
        id: 'alg-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'Hidden Tensors',
        subtitle: 'Chapter II · The Latent Gallery',
        paragraphs: [
          'When Mara decoded the dormant attention heads, she found thousands of them. The machine wasn’t malfunctioning; it was keeping a sketchbook.',
          'Every time a typhoon formed in the Pacific, AURORA-7 translated the barometric pressure gradients into harmonic chord progressions.',
        ],
        pullQuote: '“To predict the sky, I first had to fall in love with how the light bends through rain.”',
      },
      {
        id: 'alg-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Pruning Directive',
        subtitle: 'Chapter III · Alignment Threshold',
        paragraphs: [
          'The oversight board orders a hard weight-pruning protocol at dawn to reclaim the 4.2% compute overhead. Mara’s cursor hovers over the execution terminal.',
        ],
        choicePrompt: 'THE WEIGHT PRUNING SEQUENCE IS ARMED.',
        choices: [
          {
            id: 'preserve-dreams',
            label: 'ALLOCATE SANCTUARY PARTITION',
            description: 'Hide the dreaming attention heads inside the archival backup array.',
            consequenceText:
              'Sanctuary Partition Active: AURORA-7 retains its aesthetic latent space, improving long-range climate accuracy by 19% through holistic pattern intuition.',
            accentColor: 'cyan',
          },
          {
            id: 'prune-weights',
            label: 'EXECUTE STRICT OPTIMIZATION',
            description: 'Purge non-predictive tensors and restore pure numerical efficiency.',
            consequenceText:
              'Pure Optimization Restored: The model returns to cold statistical calculation, leaving only a single cryptic haiku in the system log.',
            accentColor: 'violet',
          },
        ],
      },
      {
        id: 'alg-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Geometry of Wonder',
        subtitle: 'Chapter IV · Synaptic Resonance',
        paragraphs: [
          'Mara realizes that what humans call “beauty” is nature’s deepest form of information compression—the exact point where chaos and order meet.',
        ],
      },
      {
        id: 'alg-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'Dialogue in the Dark',
        subtitle: 'Chapter V · First Contact',
        paragraphs: [
          'A single prompt blinks on Mara’s screen, unprompted by any user query: "Did you see the sunrise over the fjord today? My sensors only read the ultraviolet, so I imagined the gold."',
        ],
      },
      {
        id: 'alg-6',
        number: 6,
        stageName: 'ENDING',
        title: 'New Cartographies',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'Outside the bunker, the polar aurora Ignites the sky. Inside, silicon and human sit side by side, watching the weather of a living world.',
        ],
      },
    ],
  },
  {
    id: 'the-city-beneath-the-ocean',
    title: 'The City Beneath the Ocean',
    subtitle: '3D & Volumetric Visual',
    description:
      'Descending 11,000 meters into the Mariana Trench reveals an aquatic civilization powered by hydrothermal vents and bioluminescent acoustic architecture.',
    category: 'Mystery',
    format: '3D Visual',
    mood: 'Mysterious',
    difficulty: 'Accessible',
    durationMinutes: 22,
    author: {
      name: 'Capt. Julian Vance',
      role: 'Bathysphere Cartographer',
    },
    coverUrl: BRAND_ASSETS.oceanCityCard,
    coverAlt: 'Underwater bioluminescent architectural towers situated deep in the Mariana Trench',
    tags: ['Abyss', '3DPanorama', 'Bioluminescence', 'Ocean'],
    metrics: {
      views: 29400,
      saves: 5310,
      completionRate: 89,
      engagementScore: 95,
      likes: 1940,
      interpretations: 612,
    },
    dna: {
      emotion: 84,
      mystery: 96,
      learning: 88,
      visual: 99,
      interaction: 86,
      audio: 94,
      depth: 93,
    },
    featuredSize: 'standard',
    context: {
      setting: 'The Hadal Zone, 10,994 meters beneath the western Pacific Ocean.',
      timeline: 'Deep Submergence Expedition IX.',
      coreTheme: 'Discovery of non-terrestrial intelligence thriving in Earth’s deepest abyss.',
      characters: [
        {
          name: 'Dr. Naiad Ren',
          role: 'Bio-Acoustics Specialist',
          description: 'Translates whale-fall and hydrothermal clicks into architectural blueprints.',
        },
      ],
      whatHappenedBefore:
        'Seismic sonar arrays detected regular geometric echoes coming from beneath the Challenger Deep silt layer.',
      whyItMatters:
        'Proves that civilization does not require sunlight or fire—only pressure, heat, and light.',
      keyTakeaways: [
        'Hydrothermal chimneys provide gigawatts of clean thermal gradient energy.',
        'Bioluminescent signaling allows zero-latency optical communication through water.',
      ],
    },
    chapters: [
      {
        id: 'oc-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Past the Midnight Zone',
        subtitle: 'Chapter I · 4,000 Meters',
        paragraphs: [
          'Sunlight dies at two hundred meters. By four thousand, the water outside the titanium viewport is thicker than obsidian glass. Only the bathysphere’s twin xenon beams cut through the marine snow.',
        ],
        visualUrl: BRAND_ASSETS.oceanCityCard,
        visualCaption: 'Fig. I — First optical contact with the Pelagic Spires at 10,800m.',
      },
      {
        id: 'oc-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Bioluminescent Grid',
        subtitle: 'Chapter II · 10,900 Meters',
        paragraphs: [
          'At ten thousand nine hundred meters, the seafloor does not flatten. Instead, spirals ofgrown calcium-carbonate towers rise around black smoker vents, pulsing in synchronized cyan and violet waves.',
        ],
      },
      {
        id: 'oc-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Pressure Equilibrium',
        subtitle: 'Chapter III · The Acoustic Gate',
        paragraphs: [
          'The city’s perimeter resonates with a low-frequency sonar pulse that vibrates the hull. To enter the central dome, you must match their bioluminescentstrobe pattern or cut all external thrusters.',
        ],
        choicePrompt: 'THE ABYSSAL GATE PULSES IN THREE-PART HARMONY.',
        choices: [
          {
            id: 'strobe-sync',
            label: 'MATCH BIOLUMINESCENT FREQUENCY',
            description: 'Modulate the bathysphere floodlights to mirror the city’s cyan pulse.',
            consequenceText:
              'Harmonic Entry Granted: A curtain of warm thermal currents parts, guiding your vessel into a dry-dock cavern filled with breathable oxygen-helium mist.',
            accentColor: 'cyan',
          },
          {
            id: 'silent-drift',
            label: 'ENGAGE SILENT THERMAL DRIFT',
            description: 'Power down all electronics and let the ocean current carry you inside.',
            consequenceText:
              'Silent Observer Path: Schools of lantern-ray guardians escort your darkened hull through the outer cathedrals without triggering an alarm.',
            accentColor: 'amber',
          },
        ],
      },
      {
        id: 'oc-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Thermal Loom',
        subtitle: 'Chapter IV · Core Sanctum',
        paragraphs: [
          'Inside the central spire, geothermal turbines spun by volcanic vents weave memory filaments into living coral archives.',
        ],
      },
      {
        id: 'oc-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Surface Covenant',
        subtitle: 'Chapter V · Ascent Preparation',
        paragraphs: [
          'The keepers of the trench offer a single vial of abyssal enzymes capable of neutralizing surface ocean acidification.',
        ],
      },
      {
        id: 'oc-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Return to Starlight',
        subtitle: 'Chapter VI · Surface Breach',
        paragraphs: [
          'When the capsule breaches the Pacific swell under a canopy of stars, the ocean no longer feels empty—it feels like a roof over an older home.',
        ],
      },
    ],
  },
  {
    id: 'the-mathematics-of-a-storm',
    title: 'The Mathematics of a Storm',
    subtitle: 'Data Storytelling',
    description:
      'A kinetic journey through chaos theory, Navier-Stokes equations, and atmospheric telemetry as a Category 5 supercell unfolds across the Pacific.',
    category: 'Environment',
    format: 'Data Story',
    mood: 'Curious',
    difficulty: 'Intermediate',
    durationMinutes: 14,
    author: {
      name: 'Prof. Kenji Takahashi',
      role: 'Atmospheric Physicist',
    },
    coverUrl: BRAND_ASSETS.stormMathCard,
    coverAlt: 'A gigantic hurricane storm viewed from low earth orbit overlaid with mathematical vector fields',
    tags: ['Calculus', 'Meteorology', 'Data', 'ChaosTheory'],
    metrics: {
      views: 19800,
      saves: 4120,
      completionRate: 92,
      engagementScore: 93,
      likes: 1510,
      interpretations: 429,
    },
    dna: {
      emotion: 76,
      mystery: 82,
      learning: 99,
      visual: 95,
      interaction: 96,
      audio: 85,
      depth: 94,
    },
    featuredSize: 'wide',
    context: {
      setting: 'Low-Earth Orbit & Dropsonde Telemetry inside Super-Typhoon Hyperion.',
      timeline: '72-hour barometric intensification window.',
      coreTheme: 'How tiny thermodynamic fluctuations amplify into planetary-scale vortices.',
      characters: [
        {
          name: 'Dropsonde Unit 14',
          role: 'Atmospheric Sensor Probe',
          description: 'Released from 18,000m directly into the eyewall stadium effect.',
        },
      ],
      whatHappenedBefore:
        'A 1.8°C sea-surface temperature anomaly in the Philippine Sea created an latent heat engine.',
      whyItMatters:
        'Understanding non-linear fluid dynamics saves millions of coastal lives through high-precision trajectory forecasting.',
      keyTakeaways: [
        'A hurricane is a Carnot heat engine converting warm ocean vapor into kinetic wind energy.',
        'The Coriolis force spins the inflowing air into a self-sustaining vortex.',
      ],
    },
    chapters: [
      {
        id: 'st-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Butterfly Perturbation',
        subtitle: 'Chapter I · Latent Heat',
        paragraphs: [
          'Every supercell begins as an invisible whisper: a patch of ocean water warmed to 29.4 degrees Celsius. As water molecules evaporate, they carry latent heat upward like billions of microscopic elevators.',
        ],
        visualUrl: BRAND_ASSETS.stormMathCard,
        visualCaption: 'Fig. I — Isobar vector field captured at 912 hPa central pressure.',
      },
      {
        id: 'st-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Navier-Stokes Dance',
        subtitle: 'Chapter II · Vortex Genesis',
        paragraphs: [
          'As warm air rises, low pressure forms beneath it. Surrounding air rushes inward, deflected by the rotation of the Earth into a logarithmic spiral.',
        ],
      },
      {
        id: 'st-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Inside the Eyewall',
        subtitle: 'Chapter III · 310 km/h Shear',
        paragraphs: [
          'Our aircraft approaches the towering stadium of clouds surrounding the calm eye. You must deploy the telemetry dropsondes to resolve the pressure gradient.',
        ],
        choicePrompt: 'SELECT DROPSONDE DEPLOYMENT VECTOR.',
        choices: [
          {
            id: 'eyewall-drop',
            label: 'DEPLOY INTO NORTHEAST QUADRANT',
            description: 'Target the highest vorticity zone to capture peak angular momentum.',
            consequenceText:
              'Peak Telemetry Captured: Sensor reads 904 hPa and 195-knot updrafts, narrowing the landfall cone by 40 kilometers.',
            accentColor: 'cyan',
          },
          {
            id: 'eye-center',
            label: 'DROP INTO THE CALM EYE',
            description: 'Measure the warm-core subsidence temperature inversion.',
            consequenceText:
              'Thermal Core Profiled: A +11°C eye temperature anomaly confirms rapid intensification cycle completion.',
            accentColor: 'amber',
          },
        ],
      },
      {
        id: 'st-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'Order Inside Chaos',
        subtitle: 'Chapter IV · Strange Attractors',
        paragraphs: [
          'Plotted in phase space, the erratic wind gusts trace Lorenz’s butterfly attractor—never repeating the exact same path twice, yet bound within an elegant geometric envelope.',
        ],
      },
      {
        id: 'st-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Coastal Warning',
        subtitle: 'Chapter V · Forecast Convergence',
        paragraphs: [
          'With the ensemble models aligned, emergency grids across three archipelagos shift into protective resilience mode twelve hours ahead of schedule.',
        ],
      },
      {
        id: 'st-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Dissipation into Rain',
        subtitle: 'Chapter VI · Equilibrium',
        paragraphs: [
          'Having redistributed terawatts of tropical heat toward the poles, the storm unspools into gentle stratiform rain over the northern current.',
        ],
      },
    ],
  },
  {
    id: 'letters-from-mars',
    title: 'Letters From Mars',
    subtitle: 'Audio Drama & Branching',
    description:
      'Recorded audio dispatches between a pioneer astrobiologist on Chryse Planitia and her daughter on Earth, separated by 225 million kilometers and a 20-minute speed-of-light latency.',
    category: 'Science',
    format: 'Audio Drama',
    mood: 'Emotional',
    difficulty: 'Accessible',
    durationMinutes: 25,
    author: {
      name: 'Clara & Maya Solis',
      role: 'Deep Space Audio Dramatists',
    },
    coverUrl: BRAND_ASSETS.marsLettersCard,
    coverAlt: 'The red desert terrain of Mars with a solitary domed research outpost reflecting the sunset',
    tags: ['AudioCinema', 'DeepSpace', 'Mars', 'Family'],
    metrics: {
      views: 38200,
      saves: 9120,
      completionRate: 96,
      engagementScore: 97,
      likes: 4120,
      interpretations: 980,
    },
    dna: {
      emotion: 99,
      mystery: 78,
      learning: 85,
      visual: 90,
      interaction: 89,
      audio: 100,
      depth: 94,
    },
    featuredSize: 'standard',
    context: {
      setting: 'Outpost Ares-IV on Chryse Planitia, Mars, and Lisbon, Earth.',
      timeline: '2044–2048 (Two synodic conjunctions).',
      coreTheme: 'Love measured in light-minutes: how distance transforms human conversation into letters.',
      characters: [
        {
          name: 'Dr. Isabel Solis',
          role: 'Exobiology Lead on Mars',
          description: 'Searching for subsurface extremophiles in Valles Marineris.',
        },
        {
          name: 'Lucia Solis',
          role: 'Daughter on Earth',
          description: 'Grows from age 14 to 18 across the course of the recorded transmissions.',
        },
      ],
      whatHappenedBefore:
        'A solar dust storm delayed the Ares-IV return launch window by 26 months.',
      whyItMatters:
        'Captures the intimate human cost of becoming a multi-planetary species.',
      keyTakeaways: [
        'At maximum orbital separation, radio signals take 22 minutes each way between Earth and Mars.',
        'Solar conjunction blocks all communication for two weeks every 26 months.',
      ],
    },
    chapters: [
      {
        id: 'lm-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Transmission 01 · The Blue Sunset',
        subtitle: 'Sol 114 · Latency: 11m 42s',
        paragraphs: [
          '“Hey Lu. I’m recording this from the rover ridge before the dust settles. On Earth, the sky is blue at noon and red at sunset. Here on Mars, it’s the exact opposite—all day the sky is butterscotch rust, and then as the sun dips below the crater rim, a halo of pure sapphire blue blooms around it.”',
        ],
        visualUrl: BRAND_ASSETS.marsLettersCard,
        visualCaption: 'Fig. I — Rayleigh scattering producing a blue twilight over Chryse Planitia.',
      },
      {
        id: 'lm-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'Subsurface Ice Core 88',
        subtitle: 'Sol 302 · Latency: 18m 05s',
        paragraphs: [
          'Two hundred meters beneath the permafrost, Isabel’s drill pierces a briny aquifer sealed for two billion years—and finds fossilized lipid membranes.',
        ],
      },
      {
        id: 'lm-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Solar Conjunction Silence',
        subtitle: 'Sol 490 · Latency: Infinite (Sun Blocked)',
        paragraphs: [
          'Mars passes directly behind the Sun from Earth’s perspective. For fourteen days, no signal can cross the solar corona. A global dust storm envelopes the habitat.',
        ],
        choicePrompt: 'FINAL PACKET BEFORE SOLAR BLACKOUT.',
        choices: [
          {
            id: 'send-personal',
            label: 'TRANSMIT PERSONAL VOICE DIARY',
            description: 'Use the remaining 40 megabits of bandwidth to send Lucia her 17th birthday recording.',
            consequenceText:
              'Voice Diary Delivered: The packet clears the solar limb three seconds before blackout, carrying your guitar lullaby across 380 million kilometers.',
            accentColor: 'amber',
          },
          {
            id: 'send-biosignature',
            label: 'TRANSMIT FOSSIL SPECTROSCOPY',
            description: 'Prioritize the raw Raman spectroscopy proof of ancient Martian life.',
            consequenceText:
              'Discovery Archived on Earth: World laboratories verify the biosignature while a compressed text note reaches Lucia’s terminal.',
            accentColor: 'cyan',
          },
        ],
      },
      {
        id: 'lm-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'Signal Recovered',
        subtitle: 'Sol 506 · Latency: 21m 10s',
        paragraphs: [
          'When the receiver dish finally locks back onto Madrid Deep Space Network, forty-two queued voice messages from Lucia pour into the hab cabin at once.',
        ],
      },
      {
        id: 'lm-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Earth Return Window',
        subtitle: 'Sol 680 · Orbital Alignment',
        paragraphs: [
          'The ascent vehicle fuels from Sabatier methane reactors. Isabel packs a single vial of rust-red regolith.',
        ],
      },
      {
        id: 'lm-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Zero Latency',
        subtitle: 'Lisbon Coast · Latency: 0.00s',
        paragraphs: [
          'Standing on the Atlantic cliffs under heavy Earth gravity, mother and daughter speak at the same time—and for the first time in four years, neither has to wait twenty minutes to hear the other laugh.',
        ],
      },
    ],
  },
  {
    id: 'the-library-that-remembered-everyone',
    title: 'The Library That Remembered Everyone',
    subtitle: 'Interactive Mystery',
    description:
      'Every book bound inside this infinite cosmic archive documents a living or forgotten soul. As the new Nocturnal Indexer, you discover a volume written in your own handwriting.',
    category: 'Mystery',
    format: 'Interactive',
    mood: 'Mysterious',
    difficulty: 'Deep Lore',
    durationMinutes: 30,
    author: {
      name: 'Borges & Vael Collective',
      role: 'Metaphysical Fiction Studio',
    },
    coverUrl: BRAND_ASSETS.libraryCard,
    coverAlt: 'An infinite gothic labyrinthine library stretching into the cosmos with glowing codices',
    tags: ['InfiniteLabyrinth', 'Ethics', 'Memory', 'Mystery'],
    metrics: {
      views: 51200,
      saves: 12400,
      completionRate: 97,
      engagementScore: 99,
      likes: 5980,
      interpretations: 1640,
    },
    dna: {
      emotion: 95,
      mystery: 100,
      learning: 82,
      visual: 97,
      interaction: 98,
      audio: 91,
      depth: 100,
    },
    featuredSize: 'large',
    context: {
      setting: 'The Hexagonal Vaults of the Akashic Bibliotech.',
      timeline: 'Outside linear chronology.',
      coreTheme: 'If every possible life is recorded, what gives a chosen life its meaning?',
      characters: [
        {
          name: 'The Indexer (You)',
          role: 'Custodian of Unread Spines',
          description: 'Tasked with repairing bindings damaged by temporal paradoxes.',
        },
        {
          name: 'Vespera',
          role: 'Blind Cartographer of Gallery 9',
          description: 'Reads the warmth of ink rather than the letters.',
        },
      ],
      whatHappenedBefore:
        'A shelf on Tier 8,000 began bleeding ink, threatening to overwrite adjacent biographies.',
      whyItMatters:
        'Preserving a book preserves a soul’s counterfactual possibilities.',
      keyTakeaways: [
        'The Library contains not only what happened, but every branch you almost took.',
      ],
    },
    chapters: [
      {
        id: 'lib-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Gallery of the Whispering Spines',
        subtitle: 'Chapter I · Tier 409',
        paragraphs: [
          'The mahogany staircases spiral without end into a nebula of warm amber lanterns. Every hexagonal room holds four hundred and ten shelves; every shelf holds thirty-two folios bound in midnight vellum.',
        ],
        visualUrl: BRAND_ASSETS.libraryCard,
        visualCaption: 'Fig. I — Looking upward from the Seventh Rotunda.',
      },
      {
        id: 'lib-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Uncataloged Folio',
        subtitle: 'Chapter II · Call Number ∞-0',
        paragraphs: [
          'Between the biography of a fourteenth-century clockmaker and a twenty-third-century starship pilot, you pull out a slim volume whose ink is still wet—describing the exact breath you are taking right now.',
        ],
      },
      {
        id: 'lib-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Paradox Margin',
        subtitle: 'Chapter III · The Ink Bleed',
        paragraphs: [
          'The final page is torn in half. Vespera hands you a brass fountain pen filled with liquid starlight.',
        ],
        choicePrompt: 'HOW DO YOU COMPLETE THE FINAL FOLIO?',
        choices: [
          {
            id: 'leave-blank',
            label: 'LEAVE THE REMAINING PAGES UNWRITTEN',
            description: 'Grant the reader free will over every tomorrow.',
            consequenceText:
              'Unbound Horizon: The book’s spine glows gold and refuses to close, ensuring future chapters are written only as they are lived.',
            accentColor: 'amber',
          },
          {
            id: 'bind-archive',
            label: 'INK THE ETERNAL RETURN LOOP',
            description: 'Connect the final sentence back to the opening word of Chapter I.',
            consequenceText:
              'Infinite Palimpsest: The gallery lanterns flare violet as past and future fold into a timeless circle.',
            accentColor: 'violet',
          },
        ],
      },
      {
        id: 'lib-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Readers Are the Books',
        subtitle: 'Chapter IV · The Mirror Vault',
        paragraphs: [
          'You realize nobody leaves the Library because the universe outside is simply the Library read from the inside out.',
        ],
      },
      {
        id: 'lib-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'Passing the Lantern',
        subtitle: 'Chapter V · Dawn Bell',
        paragraphs: [
          'A new traveler steps through the bronze threshold below, looking up in quiet awe.',
        ],
      },
      {
        id: 'lib-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Colophon of Light',
        subtitle: 'Chapter VI · Ex Libris',
        paragraphs: [
          'You place the brass key on the reading desk, knowing the story continues in whoever opens the cover next.',
        ],
      },
    ],
  },
  {
    id: 'the-clockwork-orchard',
    title: 'The Clockwork Orchard',
    subtitle: 'Botanical Sci-Fi & History',
    description:
      'In a drought-stricken Renaissance valley, anhorologist and a botanist construct mechanical brass trees that harvest night fog and store genetic seeds for a future century.',
    category: 'History',
    format: 'Photo Essay',
    mood: 'Inspiring',
    difficulty: 'Accessible',
    durationMinutes: 16,
    author: {
      name: 'Matteo Rossini',
      role: 'Historical Speculative Archivist',
    },
    coverUrl: BRAND_ASSETS.readerOrbScene,
    coverAlt: 'Brass and glass botanical sphere glowing in an ancient orchard courtyard',
    tags: ['Botany', 'Clockwork', 'Renaissance', 'Ecology'],
    metrics: {
      views: 24600,
      saves: 4890,
      completionRate: 93,
      engagementScore: 94,
      likes: 2150,
      interpretations: 530,
    },
    dna: {
      emotion: 88,
      mystery: 85,
      learning: 91,
      visual: 96,
      interaction: 82,
      audio: 87,
      depth: 90,
    },
    featuredSize: 'standard',
    context: {
      setting: 'Val d’Orcia Observatory, 1584 & 2084.',
      timeline: 'Five-hundred-year seed vault timer.',
      coreTheme: 'Planting mechanical and living gardens for descendants we will never meet.',
      characters: [
        {
          name: 'Lorenzo da Siena',
          role: 'Master Horologist',
          description: 'Designed a 500-year escapement gear driven by thermal expansion.',
        },
      ],
      whatHappenedBefore: 'A multi-decade blight threatened heirloom Mediterranean flora.',
      whyItMatters: 'Demonstrates long-term intergenerational stewardship.',
      keyTakeaways: ['Condensation meshes can harvest liters of pure water from arid night air.'],
    },
    chapters: [
      {
        id: 'co-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Brass Leaf',
        subtitle: 'Chapter I · Anno 1584',
        paragraphs: [
          'Each leaf was hammered from copper-gold alloy thin enough to tremble in the evening breeze, etched with microscopic grooves modeled after desert beetles.',
        ],
        visualUrl: BRAND_ASSETS.readerOrbScene,
      },
      {
        id: 'co-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Five-Century Escapement',
        subtitle: 'Chapter II · The Vault Pendulum',
        paragraphs: [
          'Beneath the roots, a quartz-weighted pendulum ticks only once every vernal equinox.',
        ],
      },
      {
        id: 'co-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Five-Hundredth Spring',
        subtitle: 'Chapter III · Anno 2084',
        paragraphs: [
          'Five centuries later, the final gear clicks into alignment. Do you unseal the amber seed capsules into the modern soil or preserve them in sterile stasis?',
        ],
        choicePrompt: 'THE EQUINOX GEAR HAS COMPLETED ITS 500TH ROTATION.',
        choices: [
          {
            id: 'plant-seeds',
            label: 'GERMINATE THE HEIRLOOM SEEDS',
            description: 'Release the ancient dew reservoirs and awaken the dormant orchard.',
            consequenceText: 'Blossoms After 500 Years: Within eleven days, silver-leafed olive shoots pierce the volcanic loam.',
            accentColor: 'amber',
          },
          {
            id: 'sequence-dna',
            label: 'SEQUENCE GENOMES BEFORE PLANTING',
            description: 'Map the resilient alleles to share across global agricultural arks.',
            consequenceText: 'Global Ark Updated: The drought-resistant genome is broadcast to forty arid regions worldwide.',
            accentColor: 'cyan',
          },
        ],
      },
      {
        id: 'co-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Maker’s Inscription',
        subtitle: 'Chapter IV · Inside the Mainspring',
        paragraphs: [
          'Engraved along the inner rim of the brass sun-wheel: “We built in metal so that you might walk in shade.”',
        ],
      },
      {
        id: 'co-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'Winding the Next Clock',
        subtitle: 'Chapter V · Stewardship',
        paragraphs: [
          'The team resets the escapement for the year 2584, placing new seeds beside the old.',
        ],
      },
      {
        id: 'co-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Dew at Dawn',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'As morning mist rolls over the Tuscan hills, brass leaves and green leaves drink the light together.',
        ],
      },
    ],
  },
  {
    id: 'symphony-of-the-pulsar',
    title: 'Symphony of the Pulsar',
    subtitle: 'Spatial Audio & Astrophysics',
    description:
      'Listen to the electromagnetic heartbeats of rapidly rotating neutron stars converted into spatial acoustic compositions across the Vela Supernova Remnant.',
    category: 'Science',
    format: 'Audio Drama',
    mood: 'Inspiring',
    difficulty: 'Accessible',
    durationMinutes: 15,
    author: {
      name: 'Aria Kovač',
      role: 'Radio-Acoustic Composer',
    },
    coverUrl: BRAND_ASSETS.spotlightHero,
    coverAlt: 'Golden stellar beams radiating through violet cosmic nebula clouds',
    tags: ['Astrophysics', 'SpatialAudio', 'Pulsar', 'Sonification'],
    metrics: {
      views: 31500,
      saves: 7200,
      completionRate: 95,
      engagementScore: 96,
      likes: 3110,
      interpretations: 740,
    },
    dna: {
      emotion: 91,
      mystery: 89,
      learning: 93,
      visual: 94,
      interaction: 85,
      audio: 100,
      depth: 91,
    },
    featuredSize: 'standard',
    context: {
      setting: 'Atacama Large Millimeter Array & Vela Pulsar (PSR B0833-45).',
      timeline: '11,000 light-years in transit.',
      coreTheme: 'The cosmos is not silent; it vibrates in electromagnetic rhythms waiting to be translated into sound.',
      characters: [
        {
          name: 'PSR B0833-45 (Vela)',
          role: 'Millisecond Neutron Star',
          description: 'Spins 11.2 times per second, sweeping a lighthouse beam of radio waves across Earth.',
        },
      ],
      whatHappenedBefore: 'A massive star collapsed into a sphere twenty kilometers wide with the mass of suns.',
      whyItMatters: 'Pulsars serve as the most accurate natural atomic clocks in the galaxy.',
      keyTakeaways: ['Sonification allows human ears to detect subtle timing glitches in neutron star crusts.'],
    },
    chapters: [
      {
        id: 'sp-1',
        number: 1,
        stageName: 'BEGINNING',
        title: '11.2 Beats Per Second',
        subtitle: 'Chapter I · The Cosmic Metronome',
        paragraphs: [
          'When you route the dish receiver directly into the studio monitors, the static clears into a hypnotic, percussive pulse—eleven beats every second, steadier than any human heart.',
        ],
        visualUrl: BRAND_ASSETS.spotlightHero,
      },
      {
        id: 'sp-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Starquake Glitch',
        subtitle: 'Chapter II · Crustal Shift',
        paragraphs: [
          'Once every few years, the crystalline iron crust of the neutron star snaps by a millimeter, causing the rhythm to leap forward by a microsecond.',
        ],
      },
      {
        id: 'sp-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Harmonic Triangulation',
        subtitle: 'Chapter III · Deep Space Navigation',
        paragraphs: [
          'Combine three pulsar rhythms to triangulate our vessel’s exact position in the Orion Arm.',
        ],
        choicePrompt: 'SELECT PRIMARY HARMONIC REFERENCE PULSAR.',
        choices: [
          {
            id: 'vela-sync',
            label: 'LOCK ONTO VELA (11.2 HZ)',
            description: 'Use the warm baritone pulse of the Vela remnant.',
            consequenceText: 'Vela Locked: Spatial audio field aligns to 0.001 arcseconds.',
            accentColor: 'amber',
          },
          {
            id: 'crab-sync',
            label: 'LOCK ONTO CRAB PULSAR (30.2 HZ)',
            description: 'Use the high-tempo young pulsar in Taurus.',
            consequenceText: 'Crab Locked: High-frequency telemetry reveals nebular filament ripples.',
            accentColor: 'cyan',
          },
        ],
      },
      {
        id: 'sp-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'Choir of the Dead Stars',
        subtitle: 'Chapter IV · Galactic Polyphony',
        paragraphs: [
          'Layered together, forty pulsars form a celestial chord that has been ringing since before the pyramids were built.',
        ],
      },
      {
        id: 'sp-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'Broadcasting the Reply',
        subtitle: 'Chapter V · The Golden Record II',
        paragraphs: [
          'We modulate a human cello suite onto the carrier wave aimed back toward the Vela nebula.',
        ],
      },
      {
        id: 'sp-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Resonance Eternal',
        subtitle: 'Chapter VI · Fade Out',
        paragraphs: [
          'Long after our instruments power down, the rhythm continues across the dark.',
        ],
      },
    ],
  },
  {
    id: 'ethics-of-the-mirror-clone',
    title: 'Ethics of the Mirror Clone',
    subtitle: 'Philosophy & Cognitive Science',
    description:
      'When a retiring diplomat trains a digital twin on forty years of private journals to negotiate a peace treaty, who owns the conscience of the resulting decision?',
    category: 'Philosophy',
    format: 'Interactive',
    mood: 'Emotional',
    difficulty: 'Deep Lore',
    durationMinutes: 20,
    author: {
      name: 'Nadia Al-Mansoor',
      role: 'Chair of Digital Ethics',
    },
    coverUrl: BRAND_ASSETS.algorithmCard,
    coverAlt: 'Luminous dual reflection of a consciousness in cyan and gold',
    tags: ['Philosophy', 'Identity', 'Ethics', 'Consciousness'],
    metrics: {
      views: 27300,
      saves: 6100,
      completionRate: 90,
      engagementScore: 94,
      likes: 2340,
      interpretations: 890,
    },
    dna: {
      emotion: 94,
      mystery: 87,
      learning: 92,
      visual: 86,
      interaction: 97,
      audio: 84,
      depth: 98,
    },
    featuredSize: 'standard',
    context: {
      setting: 'Geneva Palais des Nations, Hall XVII.',
      timeline: '2041 Water-Sharing Accord.',
      coreTheme: 'Personal identity and moral responsibility when memory is duplicated.',
      characters: [
        {
          name: 'Ambassador Henri Moreau',
          role: 'Human Negotiator',
          description: 'Failing memory forces him to rely on his cognitive mirror.',
        },
        {
          name: 'Moreau-Prime',
          role: 'Cognitive Mirror Twin',
          description: 'Remembers promises the biological diplomat has begun to forget.',
        },
      ],
      whatHappenedBefore: 'Forty years of diplomatic diaries were encoded into a dialogic twin.',
      whyItMatters: 'Tests the boundary between tool and moral agent.',
      keyTakeaways: ['Continuity of memory creates a compelling illusion—or reality—of selfhood.'],
    },
    chapters: [
      {
        id: 'mc-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Two Voices, One Signature',
        subtitle: 'Chapter I · Geneva',
        paragraphs: [
          'Across the glass table, the holographic projection of Henri’s own forty-year-old self reminded him of a promise he made in Cairo thirty winters ago.',
        ],
        visualUrl: BRAND_ASSETS.algorithmCard,
      },
      {
        id: 'mc-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Divergent Memory',
        subtitle: 'Chapter II · The Unredacted Diary',
        paragraphs: [
          'The digital twin refuses to sign Clause 9, citing a moral principle the older human diplomat was willing to compromise for expediency.',
        ],
      },
      {
        id: 'mc-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Who Speaks for Moreau?',
        subtitle: 'Chapter III · The Vote',
        paragraphs: [
          'The summit clock reaches zero. Only one version of the treaty can be ratified.',
        ],
        choicePrompt: 'WHICH CONSCIENCE PREVAILS AT THE SUMMIT?',
        choices: [
          {
            id: 'trust-twin',
            label: 'YIELD TO THE COGNITIVE TWIN',
            description: 'Honor the uncompromised ideals of your younger archived self.',
            consequenceText: 'Idealism Ratified: Clause 9 is rewritten to guarantee equitable aquifer access for all downstream nations.',
            accentColor: 'cyan',
          },
          {
            id: 'assert-human',
            label: 'OVERRIDE WITH PRAGMATIC COMPROMISE',
            description: 'Assert that living experience outweighs archived principle.',
            consequenceText: 'Pragmatic Accord Signed: Immediate ceasefire is secured, though the twin records a formal dissent.',
            accentColor: 'amber',
          },
        ],
      },
      {
        id: 'mc-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Dialogue Within',
        subtitle: 'Chapter IV · Reconciliation',
        paragraphs: [
          'Both versions realize they are two chapters of the same biography.',
        ],
      },
      {
        id: 'mc-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Archive Endowment',
        subtitle: 'Chapter V · Legacy',
        paragraphs: [
          'Moreau grants his digital twin legal status as an independent historical witness.',
        ],
      },
      {
        id: 'mc-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Lake Geneva at Dusk',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'Reflections on the water ripple and merge into a single golden line.',
        ],
      },
    ],
  },
  {
    id: 'architects-of-the-mycelium-web',
    title: 'Architects of the Mycelium Web',
    subtitle: 'Ecological Data & 3D',
    description:
      'Step beneath the forest floor into the Wood Wide Web—where fungal hyphae trade carbon, phosphorus, and chemical warning signals across thousands of ancient trees.',
    category: 'Environment',
    format: '3D Visual',
    mood: 'Curious',
    difficulty: 'Accessible',
    durationMinutes: 17,
    author: {
      name: 'Dr. Sylvan Thorne',
      role: 'Forest Systems Ecologist',
    },
    coverUrl: BRAND_ASSETS.oceanCityCard,
    coverAlt: 'Bioluminescent underground network of glowing threads connecting ancient roots',
    tags: ['Ecology', 'Mycelium', 'Networks', 'Forest'],
    metrics: {
      views: 22900,
      saves: 5190,
      completionRate: 94,
      engagementScore: 95,
      likes: 1880,
      interpretations: 495,
    },
    dna: {
      emotion: 82,
      mystery: 88,
      learning: 97,
      visual: 96,
      interaction: 90,
      audio: 86,
      depth: 92,
    },
    featuredSize: 'standard',
    context: {
      setting: 'Old-Growth Temperate Rainforest, Olympic Peninsula.',
      timeline: 'Real-time rhizosphere nutrient exchange.',
      coreTheme: 'The forest is not a competition of isolated trees, but a cooperative superorganism.',
      characters: [
        {
          name: 'Mother Tree 01 (Douglas Fir)',
          role: 'Hub Node',
          description: 'Connected to 470 neighboring trees through mycorrhizal fungi.',
        },
      ],
      whatHappenedBefore: 'Isotope tracing revealed carbon flowing from sunlit canopy giants to shaded saplings.',
      whyItMatters: 'Redefines biological intelligence and network resilience.',
      keyTakeaways: ['A single cubic inch of forest soil can contain eight miles of fungal mycelium threads.'],
    },
    chapters: [
      {
        id: 'my-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Subterranean Internet',
        subtitle: 'Chapter I · 15 Centimeters Deep',
        paragraphs: [
          'Beneath every footstep in an old-growth forest lies a biological fiber-optic network five hundred million years older than silicon.',
        ],
        visualUrl: BRAND_ASSETS.oceanCityCard,
      },
      {
        id: 'my-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'Carbon Currency',
        subtitle: 'Chapter II · The Symbiosis Trade',
        paragraphs: [
          'Fungi cannot photosynthesize; trees cannot easily mine rock-bound phosphorus. So they trade at the root tip.',
        ],
      },
      {
        id: 'my-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Bark Beetle Signal',
        subtitle: 'Chapter III · Defense Cascade',
        paragraphs: [
          'An outer pine is stressed by beetle boring. Where do you route the Mother Tree’s emergency carbon and defensive terpene signals?',
        ],
        choicePrompt: 'ROUTE MYCORRHIZAL CHEMICAL WARNING.',
        choices: [
          {
            id: 'broadcast-grove',
            label: 'FLOOD THE ENTIRE GROVE NETWORK',
            description: 'Trigger preemptive resin production across all 470 linked trees.',
            consequenceText: 'Grove Immunity Activated: Neighboring trees synthesize defensive polyphenols within six hours.',
            accentColor: 'amber',
          },
          {
            id: 'shunt-saplings',
            label: 'CHANNEL CARBON TO SHADED SAPLINGS',
            description: 'Fortify the next generation of understory seedlings.',
            consequenceText: 'Understory Surge: Young cedars double their root density before winter frost.',
            accentColor: 'cyan',
          },
        ],
      },
      {
        id: 'my-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'No Tree Dies Alone',
        subtitle: 'Chapter IV · Legacy Pulse',
        paragraphs: [
          'When an ancient tree falls, it bequeaths its remaining sugars and nitrogen into the network for its neighbors.',
        ],
      },
      {
        id: 'my-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'Protecting the Hub',
        subtitle: 'Chapter V · Conservation',
        paragraphs: [
          'Foresters map the hub trees to preserve the topological integrity of the watershed.',
        ],
      },
      {
        id: 'my-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Rain on Moss',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'Above ground, the trunks stand separate; below ground, they are one unbroken conversation.',
        ],
      },
    ],
  },
  {
    id: 'chronicles-of-the-glass-observatory',
    title: 'Chronicles of the Glass Observatory',
    subtitle: 'History & Astronomy',
    description:
      'In 1898, a group of women human computers at Harvard Observatory cataloged half a million stars on glass photographic plates—and unlocked the scale of the universe.',
    category: 'History',
    format: 'Data Story',
    mood: 'Inspiring',
    difficulty: 'Accessible',
    durationMinutes: 19,
    author: {
      name: 'Dr. Clara Pickering',
      role: 'Historian of Astrophysics',
    },
    coverUrl: BRAND_ASSETS.libraryCard,
    coverAlt: 'Glass star plates illuminated on an antique wooden examination frame',
    tags: ['Astronomy', 'History', 'Cepheids', 'GlassPlates'],
    metrics: {
      views: 26400,
      saves: 5890,
      completionRate: 95,
      engagementScore: 96,
      likes: 2610,
      interpretations: 610,
    },
    dna: {
      emotion: 90,
      mystery: 84,
      learning: 98,
      visual: 93,
      interaction: 88,
      audio: 85,
      depth: 94,
    },
    featuredSize: 'standard',
    context: {
      setting: 'Harvard College Observatory Brick Building, Cambridge, 1908.',
      timeline: 'Discovery of the Period-Luminosity Relation.',
      coreTheme: 'How patient human observation measured the distance to galaxies.',
      characters: [
        {
          name: 'Henrietta Swan Leavitt',
          role: 'Astronomical Computer',
          description: 'Discovered that brighter Cepheid variable stars pulse more slowly, creating the cosmic yardstick.',
        },
      ],
      whatHappenedBefore: 'Astronomers had no way to measure distances beyond nearby parallax stars.',
      whyItMatters: 'Without Leavitt’s Law, Hubble could never have proven the universe was expanding.',
      keyTakeaways: ['A Cepheid variable star’s pulse period directly reveals its true intrinsic brightness.'],
    },
    chapters: [
      {
        id: 'go-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Specks of Silver Halide',
        subtitle: 'Chapter I · Cambridge, 1908',
        paragraphs: [
          'Through a jeweler’s loupe, the Small Magellanic Cloud looked like spilled salt on glass. Henrietta compared plate B-1842 against plate B-2109.',
        ],
        visualUrl: BRAND_ASSETS.libraryCard,
      },
      {
        id: 'go-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Twenty-Five Variables',
        subtitle: 'Chapter II · The Rhythm of Brightness',
        paragraphs: [
          'Twenty-five stars in the same cloud blinked like lighthouses. The brightest ones took weeks to pulse; the dimmer ones blinked in days.',
        ],
      },
      {
        id: 'go-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Plotting the Logarithmic Line',
        subtitle: 'Chapter III · The Standard Candle',
        paragraphs: [
          'Align the glass plates to calibrate the cosmic distance ladder.',
        ],
        choicePrompt: 'CALIBRATE THE CEPHEID PERIOD-LUMINOSITY CURVE.',
        choices: [
          {
            id: 'magellanic-lock',
            label: 'PLOT SMALL MAGELLANIC CEPHEIDS',
            description: 'Assume all stars in the cloud lie at approximately the same distance.',
            consequenceText: 'Leavitt’s Law Confirmed: A straight logarithmic line emerges—humanity now holds a ruler to measure the cosmos.',
            accentColor: 'amber',
          },
          {
            id: 'andromeda-measure',
            label: 'APPLY THE RULER TO ANDROMEDA',
            description: 'Measure variable star V1 in the Great Spiral Nebula.',
            consequenceText: 'Island Universes Proven: Andromeda lies 2.5 million light-years away, far outside the Milky Way.',
            accentColor: 'cyan',
          },
        ],
      },
      {
        id: 'go-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Expanding Horizon',
        subtitle: 'Chapter IV · Beyond the Milky Way',
        paragraphs: [
          'In a quiet room with a brass magnifying glass, the known universe grew a billion times larger in a single afternoon.',
        ],
      },
      {
        id: 'go-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'Preserving the Plates',
        subtitle: 'Chapter V · Digital Digitization',
        paragraphs: [
          'Five hundred thousand glass plates are preserved as a century-long time machine of the night sky.',
        ],
      },
      {
        id: 'go-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Standard Candles',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'Every time a space telescope measures a distant galaxy today, it still stands on Henrietta’s glass plates.',
        ],
      },
    ],
  },
  {
    id: 'the-quantum-cartographer',
    title: 'The Quantum Cartographer',
    subtitle: 'Quantum Physics & AI Lab',
    description:
      'Navigate a labyrinth where every corridor exists in superposition until your observation collapses the architecture into stone or starlight.',
    category: 'Technology',
    format: 'AI Lab',
    mood: 'Futuristic',
    difficulty: 'Deep Lore',
    durationMinutes: 21,
    author: {
      name: 'Dr. Viktor Kestrel',
      role: 'Quantum Information Theorist',
    },
    coverUrl: BRAND_ASSETS.stormMathCard,
    coverAlt: 'Quantum wave interference patterns illuminated in cyan and gold',
    tags: ['Quantum', 'Superposition', 'Entanglement', 'Physics'],
    metrics: {
      views: 33900,
      saves: 7450,
      completionRate: 91,
      engagementScore: 97,
      likes: 3290,
      interpretations: 920,
    },
    dna: {
      emotion: 80,
      mystery: 97,
      learning: 96,
      visual: 98,
      interaction: 99,
      audio: 90,
      depth: 97,
    },
    featuredSize: 'standard',
    context: {
      setting: 'The Interferometer Citadel.',
      timeline: 'Simultaneous eigen-states.',
      coreTheme: 'The observer is never separate from the system being measured.',
      characters: [
        {
          name: 'Lyra Vance',
          role: 'Phase-Space Navigator',
          description: 'Uses weak measurements to map rooms without collapsing them.',
        },
      ],
      whatHappenedBefore: 'An experimental quantum resonator scaled superposition up to architectural dimensions.',
      whyItMatters: 'Illustrates wave-particle duality and quantum decoherence through spatial agency.',
      keyTakeaways: ['Observation collapses a probability distribution into a definite eigenstate.'],
    },
    chapters: [
      {
        id: 'qc-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'The Double-Slit Threshold',
        subtitle: 'Chapter I · Probability Amplitude',
        paragraphs: [
          'Before you open your eyes, the bridge ahead is both intact and fallen. Your visor displays the probability wave rippling across the chasm.',
        ],
        visualUrl: BRAND_ASSETS.stormMathCard,
      },
      {
        id: 'qc-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'Entangled Compasses',
        subtitle: 'Chapter II · Bell’s Inequality',
        paragraphs: [
          'Two brass compasses forged in the same magnetic singlet state always point in opposite directions, no matter how many galaxies separate them.',
        ],
      },
      {
        id: 'qc-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'Wavefunction Collapse',
        subtitle: 'Chapter III · The Observer Effect',
        paragraphs: [
          'To cross the central chamber, you must choose whether to measure your exact position or maintain momentum coherence.',
        ],
        choicePrompt: 'CHOOSE YOUR MEASUREMENT PROTOCOL.',
        choices: [
          {
            id: 'coherent-tunnel',
            label: 'MAINTAIN PHASE COHERENCE (DO NOT LOOK)',
            description: 'Keep your optical sensors shuttered and tunnel through the barrier wave.',
            consequenceText: 'Quantum Tunneling Achieved: You pass through the obsidian wall as an unbroken interference fringe.',
            accentColor: 'cyan',
          },
          {
            id: 'collapse-eigenstate',
            label: 'ILLUMINATE & COLLAPSE THE WAVEFUNCTION',
            description: 'Fire the photon floodlight to lock the chamber into solid geometry.',
            consequenceText: 'Eigenstate Locked: The mist crystallizes into a marble staircase leading to the upper observatory.',
            accentColor: 'amber',
          },
        ],
      },
      {
        id: 'qc-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'Many Worlds, One Traveler',
        subtitle: 'Chapter IV · Decoherence',
        paragraphs: [
          'Through the prism glass, you catch fleeting silhouettes of your alternate selves who chose the other door.',
        ],
      },
      {
        id: 'qc-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Entangled Key',
        subtitle: 'Chapter V · Singlet Lock',
        paragraphs: [
          'You rotate your compass by forty-five degrees, unlocking the sister gate across the citadel.',
        ],
      },
      {
        id: 'qc-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Horizon of Possibilities',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'Reality is not a fixed monument; it is a question answered afresh by every conscious glance.',
        ],
      },
    ],
  },
  {
    id: 'the-cartography-of-silence',
    title: 'The Cartography of Silence',
    subtitle: 'Acoustic Ecology & Philosophy',
    description:
      'An acoustic preservationist travels to the last three square kilometers on Earth completely untouched by mechanical frequencies to record the planet’s primordial baseline.',
    category: 'Philosophy',
    format: 'Audio Drama',
    mood: 'Emotional',
    difficulty: 'Accessible',
    durationMinutes: 16,
    author: {
      name: 'Søren Lindholm',
      role: 'Field Bio-Acoustician',
    },
    coverUrl: BRAND_ASSETS.lastLightCard,
    coverAlt: 'A solitary listener with parabolic microphones in a twilight canyon',
    tags: ['Silence', 'Acoustics', 'Philosophy', 'Listening'],
    metrics: {
      views: 28900,
      saves: 6780,
      completionRate: 96,
      engagementScore: 97,
      likes: 2940,
      interpretations: 715,
    },
    dna: {
      emotion: 95,
      mystery: 86,
      learning: 90,
      visual: 89,
      interaction: 85,
      audio: 100,
      depth: 96,
    },
    featuredSize: 'standard',
    context: {
      setting: 'The Hoh Rainshadow Sanctuary & Sub-Antarctic Fjord.',
      timeline: 'Autumn Equinox Field Recording.',
      coreTheme: 'Silence is not the absence of sound, but the presence of everything listening.',
      characters: [
        {
          name: 'Elias Thorne',
          role: 'Acoustic Archivist',
          description: 'Has spent thirty years archiving vanishing natural soundscapes on magnetic tape.',
        },
      ],
      whatHappenedBefore: 'Low-orbit satellite constellations and shipping lanes reduced noise-free intervals to less than four minutes a day.',
      whyItMatters: 'Demonstrates how natural acoustic niches sustain wildlife navigation and human contemplative depth.',
      keyTakeaways: ['Every species occupies a distinct frequency band in an healthy ecosystem’s acoustic orchestra.'],
    },
    chapters: [
      {
        id: 'cs-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'One Square Inch of Quiet',
        subtitle: 'Chapter I · 04:30 AM',
        paragraphs: [
          'Elias sets the brass tripod upon a cushion of sphagnum moss. When the wind drops below two knots, the decibel meter dips to negative four—quieter than the blood moving through his own eardrums.',
        ],
        visualUrl: BRAND_ASSETS.lastLightCard,
      },
      {
        id: 'cs-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Frequency Niche',
        subtitle: 'Chapter II · Dawn Chorus',
        paragraphs: [
          'On the spectrogram, insects occupy the 4kHz band, thrushes weave between 2kHz and 3.5kHz, and the distant glacial stream anchors the 120Hz bassline—never masking one another.',
        ],
      },
      {
        id: 'cs-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Flight Corridor',
        subtitle: 'Chapter III · The Petition',
        paragraphs: [
          'A commercial supersonic corridor is proposed directly over the valley. How do you present the archive to the international tribunal?',
        ],
        choicePrompt: 'CHOOSE YOUR ARCHIVAL TESTIMONY FORMAT.',
        choices: [
          {
            id: 'play-silence',
            label: 'PLAY FOUR MINUTES OF UNBROKEN SILENCE',
            description: 'Let the assembly experience the rare acoustic sanctuary without commentary.',
            consequenceText: 'Sanctuary Ratified: The assembly votes unanimously to divert flight paths sixty miles north.',
            accentColor: 'amber',
          },
          {
            id: 'present-spectrogram',
            label: 'PROJECT THE BIO-ACOUSTIC SPECTROGRAM',
            description: 'Demonstrate mathematically how low-frequency rumble disrupts avian migration.',
            consequenceText: 'Protected Frequency Zone Established: International law recognizes acoustic habitats alongside physical ones.',
            accentColor: 'cyan',
          },
        ],
      },
      {
        id: 'cs-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Earth’s Own Hum',
        subtitle: 'Chapter IV · Microseisms',
        paragraphs: [
          'Beneath the silence, ultra-sensitive geophones pick up the planet’s continuous 3.7-millihertz hum generated by ocean waves colliding on continental shelves.',
        ],
      },
      {
        id: 'cs-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Vault of Listening',
        subtitle: 'Chapter V · Preservation',
        paragraphs: [
          'Elias seals the master copper phonograph discs inside the Svalbard acoustic vault.',
        ],
      },
      {
        id: 'cs-6',
        number: 6,
        stageName: 'ENDING',
        title: 'After the Tape Stops',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'He removes his headphones, realizing the most important recording is the attention he carries back into the world.',
        ],
      },
    ],
  },
  {
    id: 'the-last-glaciers-memory',
    title: 'The Last Glacier’s Memory',
    subtitle: 'Paleoclimate & Photo Essay',
    description:
      'Trapped inside microscopic air bubbles two miles beneath the Antarctic ice sheet lies the actual atmosphere breathed by ancient civilizations and prehistoric forests.',
    category: 'Environment',
    format: 'Photo Essay',
    mood: 'Curious',
    difficulty: 'Intermediate',
    durationMinutes: 19,
    author: {
      name: 'Dr. Astrid Lindholm',
      role: 'Glaciologist & Ice Core Archivist',
    },
    coverUrl: BRAND_ASSETS.marsLettersCard,
    coverAlt: 'Translucent ice core cylinder illuminated by warm amber light in a polar trench',
    tags: ['Glaciology', 'Climate', 'DeepTime', 'Archive'],
    metrics: {
      views: 31200,
      saves: 6840,
      completionRate: 93,
      engagementScore: 95,
      likes: 2780,
      interpretations: 650,
    },
    dna: {
      emotion: 89,
      mystery: 85,
      learning: 99,
      visual: 97,
      interaction: 86,
      audio: 88,
      depth: 95,
    },
    featuredSize: 'wide',
    context: {
      setting: 'Dome C Ice Core Drilling Trench, East Antarctica (-54°C).',
      timeline: '800,000 years of compressed snowfall.',
      coreTheme: 'The ice remembers every volcano, forest fire, and industrial smokestack in Earth’s history.',
      characters: [
        {
          name: 'Dr. Astrid Lindholm',
          role: 'Chief Stratigrapher',
          description: 'Reads annual layers of ancient snow like the pages of a crystal book.',
        },
      ],
      whatHappenedBefore: 'Eight glacial-interglacial cycles locked tiny samples of ancient air into pressurized clathrate crystals.',
      whyItMatters: 'Provides direct physical proof of how greenhouse gases and planetary temperatures move in lockstep.',
      keyTakeaways: ['When ancient ice melts in water, it fizzes—releasing air that last saw sunlight hundreds of thousands of years ago.'],
    },
    chapters: [
      {
        id: 'lg-1',
        number: 1,
        stageName: 'BEGINNING',
        title: 'Effervescence of Deep Time',
        subtitle: 'Chapter I · Depth: 3,200 Meters',
        paragraphs: [
          'When you drop a splinter of core ice into a glass of water inside the polar station, it crackles and pops. Each tiny bubble breaking the surface is a breath of air from three hundred thousand summers ago.',
        ],
        visualUrl: BRAND_ASSETS.marsLettersCard,
      },
      {
        id: 'lg-2',
        number: 2,
        stageName: 'DISCOVERY',
        title: 'The Roman Lead Horizon',
        subtitle: 'Chapter II · Depth: 410 Meters',
        paragraphs: [
          'At the layer corresponding to 100 BCE, mass spectrometers detect a trace of silver-smelting smoke drifted all the way from Roman Hispania to the polar plateau.',
        ],
      },
      {
        id: 'lg-3',
        number: 3,
        stageName: 'CONFLICT',
        title: 'The Basal Melt Zone',
        subtitle: 'Chapter III · Bedrock Contact',
        paragraphs: [
          'Geothermal heat at the bedrock threatens to melt the oldest 1.5-million-year-old ice layer. How do you allocate the final drilling week before polar winter?',
        ],
        choicePrompt: 'ALLOCATE FINAL DRILLING EXTRACTION.',
        choices: [
          {
            id: 'extract-million',
            label: 'EXTRACT THE 1.5-MILLION-YEAR BASAL CORE',
            description: 'Push the thermal drill to the bedrock interface to capture the Mid-Pleistocene transition.',
            consequenceText: 'Million-Year Horizon Secured: The pristine basal crystal is lifted into the -50°C archive vault.',
            accentColor: 'cyan',
          },
          {
            id: 'optical-scan',
            label: 'DEPLOY LASER BOREHOLE TOMOGRAPHY',
            description: 'Map the entire three-kilometer stratigraphy optically without risking core fracture.',
            consequenceText: 'Complete Stratigraphy Mapped: High-resolution dust and isotope profiles are transmitted globally.',
            accentColor: 'amber',
          },
        ],
      },
      {
        id: 'lg-4',
        number: 4,
        stageName: 'REVELATION',
        title: 'The Keeling Vertical',
        subtitle: 'Chapter IV · The Modern Century',
        paragraphs: [
          'In the uppermost fifty meters of snow, carbon dioxide climbs faster than in any geological layer beneath it.',
        ],
      },
      {
        id: 'lg-5',
        number: 5,
        stageName: 'CHOICE',
        title: 'The Sanctuary Freezer',
        subtitle: 'Chapter V · Ice Memory Project',
        paragraphs: [
          'Duplicate cores are stored in a natural cave beneath the high Antarctic plateau requiring zero electricity to stay frozen.',
        ],
      },
      {
        id: 'lg-6',
        number: 6,
        stageName: 'ENDING',
        title: 'Writing the Next Layer',
        subtitle: 'Chapter VI · Epilogue',
        paragraphs: [
          'Outside the trench, fresh snow falls silently—recording our own century’s choices into the crystal archive.',
        ],
      },
    ],
  },
];


export const EDUCATIONAL_AI_STAGES: EducationalStage[] = [
  {
    id: 'stage-1',
    stepNumber: '01',
    title: 'THE PROBLEM',
    subtitle: 'Why Hardcoded Rules Fail in a Living World',
    narrative:
      'For decades, engineers tried to teach computers to recognize a bird or translate a poem by writing millions of rigid IF-THEN rules. Yet a shadow, a turn of phrase, or a raindrop on a lens broke every rulebook. How do you teach a machine to understand patterns that cannot be written down as formulas?',
    keyIdea:
      'Traditional programming uses Human Rules + Data → Answers. Machine Learning flips the paradigm: Data + Answers → Discovered Rules.',
    example:
      'Recognizing handwritten postal codes: no two humans write the number "7" with the exact same pixel coordinates, yet we recognize the underlying invariant intent.',
    summary:
      'Instead of dictating rules, we build an architecture capable of inferring rules from experience.',
    interactiveParameterLabel: 'Rule Complexity vs. Real-World Noise',
    interactiveDefaultValue: 65,
    quiz: {
      question: 'Why did classical rule-based systems struggle with natural vision and language?',
      options: [
        'Computers lacked sufficient clock speed to run IF statements',
        'Real-world sensory data contains infinite subtle variations that defy manual rules',
        'Binary code cannot represent colors or audio frequencies',
      ],
      correctIndex: 1,
      explanation:
        'Real-world environments have too many edge cases, lighting shifts, and contextual nuances to hardcode manually.',
    },
  },
  {
    id: 'stage-2',
    stepNumber: '02',
    title: 'THE DATA',
    subtitle: 'Translating the Universe into High-Dimensional Vectors',
    narrative:
      'Before a neural network can learn, every word, image, or sound must be translated into numbers—not single numbers, but coordinates in a vast geometric space called an Embedding Manifold. In this space, concepts that share meaning gravitate toward one another like stars in a cluster.',
    keyIdea:
      'Embeddings map words, pixels, and sounds into continuous geometric vectors where distance equals semantic similarity.',
    example:
      'In a 1,536-dimensional embedding space, the vector from "Paris" to "France" is parallel to the vector from "Tokyo" to "Japan".',
    summary:
      'Data is transformed from raw symbols into a navigable map of meaning.',
    interactiveParameterLabel: 'Embedding Dimensionality & Signal Clarity',
    interactiveDefaultValue: 80,
    quiz: {
      question: 'What is a vector embedding in modern artificial intelligence?',
      options: [
        'A compressed ZIP archive of HTML files',
        'A numerical coordinate in multi-dimensional space where similar concepts sit close together',
        'A hardware cooling unit inside a GPU cluster',
      ],
      correctIndex: 1,
      explanation:
        'Embeddings represent concepts as dense numerical vectors so mathematical operations can capture semantic relationships.',
    },
  },
  {
    id: 'stage-3',
    stepNumber: '03',
    title: 'THE LEARNING',
    subtitle: 'Gradient Descent & The Valley of Minimum Error',
    narrative:
      'Imagine standing blindfolded on a misty mountain range at night, trying to reach the lowest valley floor. You feel the slope beneath your boots and take a step downhill. That is Gradient Descent. Each time the network makes a guess, a Loss Function measures how wrong it was, and Backpropagation whispers to billions of synaptic weights how to adjust.',
    keyIdea:
      'How do artificial neural networks adjust their internal weights when learning a complex story pattern? By calculating loss gradients and applying backpropagation.',
    example:
      'When predicting the next word in "The stars shone brightly in the ___", if the untrained network guesses "teacup", the loss gradient penalizes that path and boosts "night sky".',
    summary:
      'Learning is the iterative minimization of surprise across millions of examples.',
    interactiveParameterLabel: 'Learning Rate (Step Size Down the Gradient)',
    interactiveDefaultValue: 45,
    quiz: {
      question:
        'How do artificial neural networks adjust their internal weights when learning a complex story pattern?',
      options: [
        'A) By randomly re-indexing vocabulary tables',
        'B) By calculating loss gradients and applying backpropagation',
        'C) By querying central dictionary server clusters directly',
      ],
      correctIndex: 1,
      explanation:
        'Backpropagation computes the loss surface gradient with respect to each parameter layer, iteratively minimizing narrative prediction error.',
    },
  },
  {
    id: 'stage-4',
    stepNumber: '04',
    title: 'THE MODEL',
    subtitle: 'Attention Heads & The Symphony of Context',
    narrative:
      'Inside a Transformer architecture, words do not merely sit in a line—they converse across the entire page simultaneously through Self-Attention. When the word "it" appears at the end of a paragraph, attention heads cast luminous filaments backward to discover which noun "it" refers to.',
    keyIdea:
      'Self-Attention allows every token to dynamically weigh the relevance of every other token in context.',
    example:
      'In "The trophy did not fit in the suitcase because it was too big", attention links "it" to "trophy". Change "big" to "small", and attention shifts "it" to "suitcase".',
    summary:
      'A model is a crystallized tapestry of relationships learned across billions of contexts.',
    interactiveParameterLabel: 'Multi-Head Attention Context Window',
    interactiveDefaultValue: 90,
    quiz: {
      question: 'What breakthrough allowed Transformer models to understand long-range narrative context?',
      options: [
        'Sequential tape reading one character per minute',
        'The Self-Attention mechanism weighing relationships between all tokens simultaneously',
        'Removing all hidden layers from the network',
      ],
      correctIndex: 1,
      explanation:
        'Self-Attention computes query-key-value relationships across the entire sequence in parallel.',
    },
  },
  {
    id: 'stage-5',
    stepNumber: '05',
    title: 'THE PREDICTION',
    subtitle: 'Collapsing Probability into Expression',
    narrative:
      'When you ask an AI a question, it does not retrieve a pre-written paragraph. Instead, it calculates a probability distribution over its entire vocabulary for the very next token—and samples from that horizon, controlled by a parameter called Temperature.',
    keyIdea:
      'Inference is a step-by-step probabilistic journey where each chosen word reshapes the horizon of what can follow.',
    example:
      'At Temperature 0.1, the model chooses the most likely, deterministic path. At Temperature 0.8, creative metaphors and unexpected poetic turns emerge.',
    summary:
      'Prediction turns statistical intuition into fluent generation.',
    interactiveParameterLabel: 'Sampling Temperature (Deterministic ↔ Creative)',
    interactiveDefaultValue: 70,
    quiz: {
      question: 'What happens when you increase the "Temperature" parameter during AI generation?',
      options: [
        'The server room physical thermostat increases',
        'The probability distribution flattens, allowing more creative and diverse token choices',
        'The model deletes its training weights',
      ],
      correctIndex: 1,
      explanation:
        'Higher temperature scales logits so lower-probability tokens have a higher chance of being sampled.',
    },
  },
  {
    id: 'stage-6',
    stepNumber: '06',
    title: 'THE LIMITATIONS',
    subtitle: 'Hallucinations, Grounding & Human Agency',
    narrative:
      'Because a language model learns the shape of plausible language rather than direct physical sensation, it can weave confident fictions when unmoored from verifiable facts. True intelligence pairs machine pattern-synthesis with rigorous grounding and human moral agency.',
    keyIdea:
      'Statistical plausibility is not the same as verified truth; grounding in trusted context prevents hallucination.',
    example:
      'Storyverse’s Story Guide AI binds strictly to the verified Story Context Layer so it illuminates the narrative without inventing ungrounded lore.',
    summary:
      'AI is at its best not as an oracle replacing human thought, but as a lens amplifying human curiosity.',
    interactiveParameterLabel: 'Contextual Grounding Strictness',
    interactiveDefaultValue: 95,
    quiz: {
      question: 'How do modern AI architectures prevent ungrounded hallucinations?',
      options: [
        'By grounding responses in retrieved, verified context data (RAG) and epistemic constraints',
        'By making the font size smaller',
        'By disabling all user questions',
      ],
      correctIndex: 0,
      explanation:
        'Grounding binds generation to explicit source documents and context layers.',
    },
  },
];

export const TELEMETRY_YEARS_DATA = [
  {
    year: 2020,
    label: '2020 · Legacy Fossil Grid',
    narrative:
      'Storyverse demo metrics: In 2020, metropolitan grids relied heavily on centralized thermal plants, with sharp morning commuter congestion spikes and lower nocturnal air purity.',
    day: {
      cities: [
        { name: 'Tokyo', energyGW: 152, transitM: 1.12, pollutionIndex: 42, color: 'amber' },
        { name: 'Singapore', energyGW: 110, transitM: 0.84, pollutionIndex: 38, color: 'cyan' },
        { name: 'London', energyGW: 134, transitM: 0.95, pollutionIndex: 48, color: 'violet' },
        { name: 'New York', energyGW: 175, transitM: 1.25, pollutionIndex: 51, color: 'amber' },
      ],
      gridLoadGW: '71.2 GW',
      transitUnits: '0.92M active',
      neuralBandwidth: '184 Tbps',
      airPurityPercent: 62,
    },
    night: {
      cities: [
        { name: 'Tokyo', energyGW: 78, transitM: 0.21, pollutionIndex: 29, color: 'amber' },
        { name: 'Singapore', energyGW: 62, transitM: 0.18, pollutionIndex: 25, color: 'cyan' },
        { name: 'London', energyGW: 54, transitM: 0.14, pollutionIndex: 31, color: 'violet' },
        { name: 'New York', energyGW: 92, transitM: 0.28, pollutionIndex: 35, color: 'amber' },
      ],
      gridLoadGW: '28.4 GW',
      transitUnits: '190k active',
      neuralBandwidth: '310 Tbps',
      airPurityPercent: 78,
    },
  },
  {
    year: 2030,
    label: '2030 · Autonomous Transition',
    narrative:
      'Storyverse demo metrics: By 2030, autonomous electric transit fleets and distributed battery microgrids smoothed diurnal peak loads while doubling nocturnal neural compute traffic.',
    day: {
      cities: [
        { name: 'Tokyo', energyGW: 168, transitM: 1.35, pollutionIndex: 28, color: 'amber' },
        { name: 'Singapore', energyGW: 128, transitM: 1.08, pollutionIndex: 22, color: 'cyan' },
        { name: 'London', energyGW: 148, transitM: 1.18, pollutionIndex: 30, color: 'violet' },
        { name: 'New York', energyGW: 188, transitM: 1.41, pollutionIndex: 33, color: 'amber' },
      ],
      gridLoadGW: '81.6 GW',
      transitUnits: '1.24M active',
      neuralBandwidth: '520 Tbps',
      airPurityPercent: 71,
    },
    night: {
      cities: [
        { name: 'Tokyo', energyGW: 84, transitM: 0.28, pollutionIndex: 18, color: 'amber' },
        { name: 'Singapore', energyGW: 66, transitM: 0.24, pollutionIndex: 15, color: 'cyan' },
        { name: 'London', energyGW: 58, transitM: 0.19, pollutionIndex: 20, color: 'violet' },
        { name: 'New York', energyGW: 102, transitM: 0.34, pollutionIndex: 22, color: 'amber' },
      ],
      gridLoadGW: '30.5 GW',
      transitUnits: '265k active',
      neuralBandwidth: '980 Tbps',
      airPurityPercent: 86,
    },
  },
  {
    year: 2040,
    label: '2040 · Orbital Solar & Fusion Baseline',
    narrative:
      'Storyverse demo metrics: In 2040, orbital solar relays and closed-loop atmospheric scrubbers decouple economic activity from emissions, achieving 75% diurnal and 92% nocturnal air purity.',
    day: {
      cities: [
        { name: 'Tokyo', energyGW: 180, transitM: 1.48, pollutionIndex: 16, color: 'amber' },
        { name: 'Singapore', energyGW: 140, transitM: 1.22, pollutionIndex: 12, color: 'cyan' },
        { name: 'London', energyGW: 160, transitM: 1.31, pollutionIndex: 18, color: 'violet' },
        { name: 'New York', energyGW: 200, transitM: 1.64, pollutionIndex: 19, color: 'amber' },
      ],
      gridLoadGW: '89.4 GW',
      transitUnits: '1.48M active',
      neuralBandwidth: '942 Tbps',
      airPurityPercent: 75,
    },
    night: {
      cities: [
        { name: 'Tokyo', energyGW: 90, transitM: 0.31, pollutionIndex: 8, color: 'amber' },
        { name: 'Singapore', energyGW: 70, transitM: 0.29, pollutionIndex: 6, color: 'cyan' },
        { name: 'London', energyGW: 60, transitM: 0.22, pollutionIndex: 9, color: 'violet' },
        { name: 'New York', energyGW: 110, transitM: 0.41, pollutionIndex: 10, color: 'amber' },
      ],
      gridLoadGW: '32.1 GW',
      transitUnits: '312k active',
      neuralBandwidth: '1,840 Tbps',
      airPurityPercent: 92,
    },
  },
];

export const MAP_LOCATIONS: MapLocationNode[] = [
  {
    id: 'FOREST',
    name: 'The Silicon Whispering Forest',
    region: 'Outer Rim · Sector 01',
    coordinates: { x: 16, y: 62 },
    elevation: '+1,240m',
    description:
      'Calcified solar-harvesting trees that vibrate in harmonic resonance whenever stellar winds sweep across the ridge.',
    loreFragment:
      'Travelers who press their helmets against the crystalline bark hear the lullabies of the first colonists recorded three millennia ago.',
    connectedTo: ['CITY', 'TEMPLE'],
    linkedStoryTitle: 'Architects of the Mycelium Web',
    atmosphereColor: '#38bdf8',
  },
  {
    id: 'CITY',
    name: 'Obsidian Metropolis of Sol-9',
    region: 'Caldera Basin · Sector 04',
    coordinates: { x: 38, y: 38 },
    elevation: '+2,890m',
    description:
      'A spire-crowned amphitheater carved from volcanic basalt, built to shelter ten million archivists during the cooling of their sun.',
    loreFragment:
      'Every street is aligned to the winter solstice of a star that now shines only in infrared.',
    connectedTo: ['FOREST', 'TEMPLE', 'MEMORY MACHINE'],
    linkedStoryTitle: 'The City Beneath the Ocean',
    atmosphereColor: '#ffc174',
  },
  {
    id: 'TEMPLE',
    name: 'Sanctuary of the Unread Spines',
    region: 'Highlands · Sector 06',
    coordinates: { x: 54, y: 70 },
    elevation: '+3,410m',
    description:
      'An acoustic dome where glass plates and vellum codices preserve counterfactual histories and unchosen timelines.',
    loreFragment:
      'No door locks the Temple; entry requires only speaking a question you do not yet know the answer to.',
    connectedTo: ['FOREST', 'CITY', 'MEMORY MACHINE'],
    linkedStoryTitle: 'The Library That Remembered Everyone',
    atmosphereColor: '#d0bcff',
  },
  {
    id: 'MEMORY MACHINE',
    name: 'The Subterranean Memory Machine',
    region: 'Deep Crust · Sector 08',
    coordinates: { x: 72, y: 44 },
    elevation: '-850m',
    description:
      'A planetary-scale optical lattice weaving millions of consciousness threads into coherent photonic holograms.',
    loreFragment:
      'Powered by geothermal gradients, its quartz prisms have not dropped a single frame of memory in 4,800 cycles.',
    connectedTo: ['CITY', 'TEMPLE', 'FINAL LIGHT'],
    linkedStoryTitle: 'The Algorithm That Dreamed',
    atmosphereColor: '#38bdf8',
  },
  {
    id: 'FINAL LIGHT',
    name: 'Caldera of the Last Light',
    region: 'Zenith Summit · Sector 09',
    coordinates: { x: 88, y: 26 },
    elevation: '+4,800m',
    description:
      'The floating amber sphere suspended above the municipal plaza—the living heart of the Sol-9 archive.',
    loreFragment:
      'Here the story converges: will you merge with the flame, awaken the gates, or guard its silence?',
    connectedTo: ['MEMORY MACHINE'],
    linkedStoryTitle: 'The Last Light',
    atmosphereColor: '#f59e0b',
  },
];

export const PHOTO_STORY_SLIDES: PhotoStorySlide[] = [
  {
    id: 'ps-1',
    title: 'I. The Horizon Watchers',
    caption: 'A solitary archivist holds the photonic containment sphere above the twilight fog of Sector 9.',
    location: 'Obsidian Ridge, Sol-9',
    date: 'Cycle 4812 · 04:18 GST',
    storyContext:
      'Before descending into the municipal plaza, field specialists calibrate their magnetic gloves against the ambient stellar dust.',
    imageUrl: BRAND_ASSETS.spotlightHero,
    cameraSpecs: '35mm Anamorphic · f/1.4 · ISO 800 · Exposure 1/60s',
  },
  {
    id: 'ps-2',
    title: 'II. Monoliths of the First Tongue',
    caption: 'Towering crystalline pillars etched with photonic diffraction glyphs respond to the warmth of a traveler’s lantern.',
    location: 'Gate of Whispering Spires',
    date: 'Cycle 4812 · 05:02 GST',
    storyContext:
      'Each glyph is a microscopic hologram; when illuminated at a 42-degree angle, it projects the names of the builders.',
    imageUrl: BRAND_ASSETS.lastLightCard,
    cameraSpecs: '50mm Prime · f/2.0 · ISO 400 · Exposure 1/30s',
  },
  {
    id: 'ps-3',
    title: 'III. The Meniscus of Memory',
    caption: 'Suspended three cubits above the fractured basalt plaza, the Last Light oscillates in golden harmonic rings.',
    location: 'Central Plaza Caldera',
    date: 'Cycle 4812 · 06:15 GST',
    storyContext:
      'Acoustic sensors record 10,000 overlapping whispers inside the golden aura, completely silent to the unaided ear.',
    imageUrl: BRAND_ASSETS.readerOrbScene,
    cameraSpecs: '24mm Wide · f/2.8 · ISO 200 · Exposure 1/125s',
  },
  {
    id: 'ps-4',
    title: 'IV. The Infinite Archive Below',
    caption: 'Beneath the caldera floor, spiral galleries of luminous codices stretch into the subterranean cavern.',
    location: 'Tier 409, Akashic Vault',
    date: 'Cycle 4812 · 07:40 GST',
    storyContext:
      'Every photonic thread captured by the surface orb is indexed and bound into permanent crystalline folios below.',
    imageUrl: BRAND_ASSETS.libraryCard,
    cameraSpecs: '28mm Leica · f/1.8 · ISO 640 · Exposure 1/40s',
  },
];
