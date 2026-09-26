import React from 'react';
import { StoryScene } from '../types/story';

interface IllustratedSceneCanvasProps {
  scene: StoryScene;
  storyTitle: string;
}

/**
 * Consistent Stylized Vector / Cartoon Illustration Engine (Section 7).
 * Renders cohesive graphic-novel / animated-film style illustrations synchronized
 * to the active scene, structured so an AI Image Generation API URL (`scene.illustratedImage`)
 * can override or augment the vector stage at any time.
 */
export const IllustratedSceneCanvas: React.FC<IllustratedSceneCanvasProps> = ({
  scene,
  storyTitle,
}) => {
  const theme = scene.illustratedTheme || 'astronaut-launch';

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0b0d19] select-none">
      {/* Graphic Novel Halftone & Cel-Shaded Sky */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Illustrated scene ${scene.sceneNumber}: ${scene.title} from ${storyTitle}`}
      >
        <defs>
          <linearGradient id="marsSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b0c2e" />
            <stop offset="55%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="oceanAbys" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#02182b" />
            <stop offset="60%" stopColor="#053b5c" />
            <stop offset="100%" stopColor="#081c24" />
          </linearGradient>
          <linearGradient id="cyberWorkshop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#141129" />
            <stop offset="60%" stopColor="#2e1b46" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>

        {/* SCENE 1: CARTOON ASTRONAUT (LAUNCH / ORBITAL HELMET) */}
        {theme === 'astronaut-launch' && (
          <g>
            <rect width="800" height="450" fill="url(#marsSky)" />
            {/* Stylized Cel-Shaded Stars & Twin Moons */}
            <circle cx="640" cy="95" r="42" fill="#fde68a" opacity="0.9" />
            <circle cx="160" cy="75" r="16" fill="#fed7aa" opacity="0.75" />
            <circle cx="260" cy="50" r="3" fill="#ffffff" />
            <circle cx="480" cy="65" r="2.5" fill="#ffffff" />
            <circle cx="710" cy="180" r="3" fill="#ffffff" />
            {/* Distant Martian Mesa */}
            <polygon points="0,360 190,260 360,360" fill="#451a03" />
            <polygon points="460,360 640,240 800,360" fill="#5b2106" />
            <rect x="0" y="350" width="800" height="100" fill="#2e1002" />
            {/* Illustrated Cartoon Astronaut Silhouette & Glowing Visor */}
            <g transform="translate(335, 130)">
              {/* Backpack life-support */}
              <rect x="10" y="75" width="110" height="130" rx="18" fill="#cbd5e1" stroke="#0f172a" strokeWidth="5" />
              {/* Suit torso */}
              <path d="M20,220 C20,140 110,140 110,220 Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="5" />
              <rect x="45" y="165" width="40" height="28" rx="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="3" />
              {/* Cartoon Helmet */}
              <circle cx="65" cy="85" r="58" fill="#f8fafc" stroke="#0f172a" strokeWidth="5" />
              {/* Golden Reflective Visor */}
              <ellipse cx="70" cy="85" rx="42" ry="34" fill="#f59e0b" stroke="#0f172a" strokeWidth="4" />
              <path d="M45,68 Q70,54 95,68" fill="none" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round" />
              {/* Antenna */}
              <line x1="22" y1="45" x2="22" y2="8" stroke="#f8fafc" strokeWidth="5" />
              <circle cx="22" cy="8" r="7" fill="#ef4444" />
            </g>
          </g>
        )}

        {/* SCENE 2: ASTRONAUT WALKING ON MARS */}
        {theme === 'mars-walk' && (
          <g>
            <rect width="800" height="450" fill="url(#marsSky)" />
            <circle cx="140" cy="100" r="55" fill="#fb923c" opacity="0.85" />
            {/* Sweeping Red Dunes */}
            <path d="M0,310 Q260,240 520,310 T800,290 L800,450 L0,450 Z" fill="#9a3412" />
            <path d="M0,355 Q310,300 610,360 T800,350 L800,450 L0,450 Z" fill="#431407" />
            {/* Trail of Bootprints */}
            <ellipse cx="140" cy="395" rx="14" ry="5" fill="#270902" />
            <ellipse cx="210" cy="385" rx="14" ry="5" fill="#270902" />
            <ellipse cx="280" cy="378" rx="14" ry="5" fill="#270902" />
            <ellipse cx="350" cy="372" rx="14" ry="5" fill="#270902" />
            {/* Walking Cartoon Astronaut with Rover */}
            <g transform="translate(420, 235)">
              <circle cx="40" cy="35" r="28" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
              <ellipse cx="48" cy="35" rx="18" ry="14" fill="#38bdf8" stroke="#0f172a" strokeWidth="3" />
              <rect x="20" y="62" width="40" height="55" rx="12" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
              <line x1="28" y1="115" x2="12" y2="155" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
              <line x1="50" y1="115" x2="68" y2="155" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" />
              {/* Walking staff beacon */}
              <line x1="78" y1="40" x2="78" y2="158" stroke="#fde047" strokeWidth="4" />
              <circle cx="78" cy="36" r="9" fill="#38bdf8" />
            </g>
          </g>
        )}

        {/* SCENE 3: MARS CITY DOMES */}
        {theme === 'mars-city' && (
          <g>
            <rect width="800" height="450" fill="url(#marsSky)" />
            <rect x="0" y="340" width="800" height="110" fill="#3b0f03" />
            {/* Geodesic Biosphere Domes */}
            <path d="M120,340 A140,130 0 0,1 400,340 Z" fill="#38bdf8" fillOpacity="0.28" stroke="#7dd3fc" strokeWidth="4" />
            <path d="M320,340 A190,175 0 0,1 700,340 Z" fill="#f59e0b" fillOpacity="0.24" stroke="#fde68a" strokeWidth="5" />
            {/* Stylized Towers Inside Dome */}
            <rect x="450" y="220" width="28" height="120" fill="#fde68a" opacity="0.85" />
            <rect x="495" y="195" width="34" height="145" fill="#38bdf8" opacity="0.85" />
            <rect x="545" y="240" width="26" height="100" fill="#f8fafc" opacity="0.85" />
            <rect x="230" y="250" width="32" height="90" fill="#7dd3fc" opacity="0.8" />
          </g>
        )}

        {/* SCENE 4: SPACE / DUST STORM */}
        {theme === 'space-storm' && (
          <g>
            <rect width="800" height="450" fill="#1e0918" />
            {/* Swirling Dust Clouds */}
            <circle cx="240" cy="210" r="180" fill="#7c2d12" opacity="0.55" />
            <circle cx="520" cy="220" r="210" fill="#9a3412" opacity="0.5" />
            <circle cx="670" cy="160" r="150" fill="#581c87" opacity="0.45" />
            {/* Electrostatic Lightning Bolts */}
            <polyline
              points="280,20 230,140 310,165 210,330"
              fill="none"
              stroke="#c084fc"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <polyline
              points="570,40 520,170 590,190 490,360"
              fill="none"
              stroke="#fde047"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* SCENE 5: MYSTERIOUS ARTIFACT / DISCOVERY */}
        {(theme === 'alien-artifact' || theme === 'quantum-loom') && (
          <g>
            <rect width="800" height="450" fill="#070a14" />
            {/* Cavern / Monolith Frame */}
            <polygon points="0,0 240,0 110,450 0,450" fill="#111827" />
            <polygon points="800,0 560,0 690,450 800,450" fill="#111827" />
            {/* Glowing Crystalline Octahedron */}
            <circle cx="400" cy="210" r="115" fill="#f59e0b" opacity="0.16" />
            <circle cx="400" cy="210" r="75" fill="#38bdf8" opacity="0.22" />
            <polygon
              points="400,90 490,210 400,330 310,210"
              fill="#ffc174"
              fillOpacity="0.85"
              stroke="#ffffff"
              strokeWidth="4"
            />
            <circle cx="400" cy="210" r="145" fill="none" stroke="#7bd0ff" strokeWidth="2" strokeDasharray="8 6" />
          </g>
        )}

        {/* OCEAN DOME / SUBMARINE */}
        {(theme === 'ocean-dome' || theme === 'sub-descent') && (
          <g>
            <rect width="800" height="450" fill="url(#oceanAbys)" />
            {/* Bioluminescent Underwater Domes & Submersible */}
            <path d="M80,390 A180,160 0 0,1 440,390 Z" fill="#0ea5e9" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="4" />
            <path d="M380,390 A150,130 0 0,1 680,390 Z" fill="#a855f7" fillOpacity="0.2" stroke="#c084fc" strokeWidth="4" />
            {/* Cartoon Submersible with Headlight Beam */}
            <polygon points="500,150 220,240 220,90" fill="#fde047" opacity="0.22" />
            <ellipse cx="540" cy="150" rx="68" ry="28" fill="#f59e0b" stroke="#0f172a" strokeWidth="4" />
            <circle cx="515" cy="150" r="11" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
            <circle cx="548" cy="150" r="11" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
          </g>
        )}

        {/* ROBOT WORKSHOP / NEURAL FOREST */}
        {(theme === 'robot-workshop' || theme === 'neural-forest') && (
          <g>
            <rect width="800" height="450" fill="url(#cyberWorkshop)" />
            {/* Expressive Cartoon Robot Companion */}
            <g transform="translate(320, 125)">
              <rect x="20" y="30" width="120" height="95" rx="22" fill="#38bdf8" stroke="#0f172a" strokeWidth="5" />
              <circle cx="55" cy="75" r="18" fill="#fef08a" stroke="#0f172a" strokeWidth="4" />
              <circle cx="105" cy="75" r="18" fill="#fef08a" stroke="#0f172a" strokeWidth="4" />
              <line x1="80" y1="30" x2="80" y2="2" stroke="#f59e0b" strokeWidth="5" />
              <circle cx="80" cy="2" r="8" fill="#f59e0b" />
              <rect x="35" y="135" width="90" height="85" rx="16" fill="#e2e8f0" stroke="#0f172a" strokeWidth="5" />
            </g>
          </g>
        )}
      </svg>

      {/* Top-Left Illustrated Mode Badge */}
      <div className="absolute top-4 left-4 bg-[#050507]/85 backdrop-blur-md border border-[#ffc174] px-3 py-1 text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
        ILLUSTRATED STORY MODE · SCENE 0{scene.sceneNumber}
      </div>
    </div>
  );
};
