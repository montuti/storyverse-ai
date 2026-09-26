export type StoryCategory =
  | 'Adventure'
  | 'Science'
  | 'Technology'
  | 'AI'
  | 'History'
  | 'Space'
  | 'Education'
  | 'Mystery'
  | 'Future'
  | 'Environment'
  | 'Human Stories'
  | 'Business'
  | 'Data'
  | 'Culture'
  | 'Innovation'
  | 'Biography'
  | 'Philosophy';

export type StoryFormat =
  | 'Cinematic Video'
  | 'Interactive'
  | 'AI Lab'
  | '3D Visual'
  | 'Data Story'
  | 'Audio Drama'
  | 'Photo Essay'
  | 'Illustrated';

export type StoryMood =
  | 'Mysterious'
  | 'Futuristic'
  | 'Emotional'
  | 'Curious'
  | 'Inspiring'
  | 'Dark';

export type StoryDifficulty = 'Accessible' | 'Intermediate' | 'Deep Lore';

export type SceneTransitionType =
  | 'crossfade'
  | 'kenburns'
  | 'zoom'
  | 'parallax'
  | 'slide'
  | 'blur';

export interface StoryScene {
  id: string;
  sceneNumber: number;
  startTime: number; // in seconds, e.g. 0
  endTime: number; // in seconds, e.g. 8
  video: string; // video source or procedural visual preset
  image: string; // photorealistic/cinematic scene image
  illustratedImage?: string; // cartoon/illustrated art variant or SVG theme key
  illustratedTheme?: 'astronaut-launch' | 'mars-walk' | 'mars-city' | 'space-storm' | 'alien-artifact' | 'ocean-dome' | 'sub-descent' | 'robot-workshop' | 'neural-forest' | 'quantum-loom';
  title: string; // e.g. "THE LAST CITY BELOW"
  subtitle: string; // e.g. "SCENE 01 · PACIFIC TRENCH"
  narration: string; // Full narration paragraph for this scene
  sentences: string[]; // Sentence-by-sentence breakdown for live synchronized highlighting
  transition: SceneTransitionType;
}

export interface StoryDNA {
  emotion: number;
  mystery: number;
  learning: number;
  visual: number;
  interaction: number;
  audio: number;
  depth: number;
  // Semantic DNA fields (Section 16)
  pace?: string; // e.g. "Slow → Fast"
  primaryEmotion?: string; // e.g. "Curiosity & Awe"
  formatSummary?: string; // e.g. "Cinematic + Audio + Illustration"
  topics?: string[]; // e.g. ["AI", "Future", "Humanity"]
}

export interface StoryChoiceOption {
  id: string;
  label: string;
  description: string;
  consequenceText: string;
  nextSceneOverride?: string;
  accentColor: 'amber' | 'cyan' | 'violet';
}

export interface StoryChapter {
  id: string;
  number: number;
  stageName: 'BEGINNING' | 'DISCOVERY' | 'CONFLICT' | 'REVELATION' | 'CHOICE' | 'ENDING';
  title: string;
  subtitle: string;
  paragraphs: string[];
  visualUrl?: string;
  visualAlt?: string;
  visualCaption?: string;
  ambientNote?: string;
  choicePrompt?: string;
  choices?: StoryChoiceOption[];
  pullQuote?: string;
}

export interface StoryCharacter {
  name: string;
  role: string;
  description: string;
}

export interface StoryContextData {
  setting: string;
  timeline: string;
  coreTheme: string;
  characters: StoryCharacter[];
  whatHappenedBefore: string;
  whyItMatters: string;
  keyTakeaways: string[];
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: StoryCategory;
  format: StoryFormat;
  mood: StoryMood;
  difficulty: StoryDifficulty;
  durationMinutes: number;
  author: {
    name: string;
    role: string;
  };
  coverUrl: string;
  coverAlt: string;
  tags: string[];
  metrics: {
    views: number;
    saves: number;
    completionRate: number;
    engagementScore: number;
    likes: number;
    interpretations: number;
  };
  dna: StoryDNA;
  chapters: StoryChapter[];
  context: StoryContextData;
  scenes?: StoryScene[];
  supportsCartoonMode?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  featuredSize?: 'large' | 'tall' | 'wide' | 'standard';
}

export interface EducationalStage {
  id: string;
  stepNumber: string;
  title: 'THE PROBLEM' | 'THE DATA' | 'THE LEARNING' | 'THE MODEL' | 'THE PREDICTION' | 'THE LIMITATIONS';
  subtitle: string;
  narrative: string;
  keyIdea: string;
  example: string;
  summary: string;
  interactiveParameterLabel: string;
  interactiveDefaultValue: number;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface MapLocationNode {
  id: 'FOREST' | 'CITY' | 'TEMPLE' | 'MEMORY MACHINE' | 'FINAL LIGHT';
  name: string;
  region: string;
  coordinates: { x: number; y: number };
  elevation: string;
  description: string;
  loreFragment: string;
  connectedTo: ('FOREST' | 'CITY' | 'TEMPLE' | 'MEMORY MACHINE' | 'FINAL LIGHT')[];
  linkedStoryTitle: string;
  atmosphereColor: string;
}

export interface PhotoStorySlide {
  id: string;
  title: string;
  caption: string;
  location: string;
  date: string;
  storyContext: string;
  imageUrl: string;
  cameraSpecs: string;
}

export interface UserJourneyState {
  storiesOpened: string[];
  storiesCompleted: string[];
  savedStories: string[];
  likedStories: string[];
  bookmarks: { storyTitle: string; chapterIndex: number; timestamp: string }[];
  readingPositions: Record<string, number>;
  watchProgress: Record<string, { sceneIndex: number; currentTime: number }>;
  choicesMade: Record<string, string>;
  categoriesExplored: StoryCategory[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export type ThemeMode = 'dark' | 'light';

export type PlayerMode = 'cinematic' | 'read' | 'listen' | 'immersive';
