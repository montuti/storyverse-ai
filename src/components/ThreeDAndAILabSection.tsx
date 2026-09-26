import React, { useState, useEffect, useRef } from 'react';
import {
  Rotate3d,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Story, StoryCategory, StoryMood } from '../types/story';
import { BRAND_ASSETS } from '../data/stories';
import { soundEngine } from '../utils/soundEngine';

interface ThreeDAndAILabSectionProps {
  onOpenGeneratedStory: (story: Story) => void;
}

export const ThreeDAndAILabSection: React.FC<ThreeDAndAILabSectionProps> = ({
  onOpenGeneratedStory,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [lightMode, setLightMode] = useState<'amber' | 'cyan' | 'violet'>('amber');
  const [cameraDepth, setCameraDepth] = useState(320);
  const [userRotation, setUserRotation] = useState({ x: 0.3, y: 0.5 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angleY = userRotation.y;
    let angleX = userRotation.x;

    const vertices = [
      [0, 1.3, 0],
      [1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [-1, 0, 1],
      [0, -1.3, 0],
      [0, 0.65, 1.2],
      [1.2, 0.65, 0],
      [0, -0.65, -1.2],
      [-1.2, -0.65, 0],
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
      [0, 6], [6, 1], [6, 4],
      [0, 7], [7, 1], [7, 2],
      [5, 8], [8, 2], [8, 3],
      [5, 9], [9, 3], [9, 4],
    ];

    const particles = Array.from({ length: 65 }, (_, i) => ({
      x: Math.sin(i * 12.3) * 2.4,
      y: Math.cos(i * 7.7) * 2.0,
      z: Math.sin(i * 4.1) * 2.4,
      size: (i % 3) + 1,
    }));

    const colorMap = {
      amber: { primary: '#ffc174', glow: 'rgba(245, 158, 11, 0.25)' },
      cyan: { primary: '#7bd0ff', glow: 'rgba(56, 189, 248, 0.25)' },
      violet: { primary: '#d0bcff', glow: 'rgba(139, 92, 246, 0.25)' },
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const palette = colorMap[lightMode];

      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        width * 0.45
      );
      grad.addColorStop(0, palette.glow);
      grad.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      angleY += 0.006 * rotationSpeed;
      angleX += 0.002 * rotationSpeed;

      const project = (vx: number, vy: number, vz: number) => {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = vx * cosY - vz * sinY;
        const z1 = vz * cosY + vx * sinY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = vy * cosX - z1 * sinX;
        const z2 = z1 * cosX + vy * sinX;

        const scale = cameraDepth / (4.2 + z2);
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          z: z2,
          scale,
        };
      };

      particles.forEach((p) => {
        const proj = project(p.x, p.y, p.z);
        ctx.beginPath();
        ctx.arc(
          proj.x,
          proj.y,
          Math.max(0.6, (p.size * proj.scale) / 95),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = palette.primary;
        ctx.globalAlpha = Math.max(0.15, Math.min(0.85, (2.5 - proj.z) / 4));
        ctx.fill();
      });

      const projectedVerts = vertices.map(([vx, vy, vz]) => project(vx, vy, vz));

      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = palette.primary;
      ctx.lineWidth = 1.2;
      edges.forEach(([i, j]) => {
        const p1 = projectedVerts[i];
        const p2 = projectedVerts[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      const center = project(0, 0, 0);
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = palette.primary;
      ctx.fill();

      projectedVerts.forEach((pv) => {
        ctx.beginPath();
        ctx.arc(pv.x, pv.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#f4f2ed';
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rotationSpeed, lightMode, cameraDepth, userRotation]);

  // --- AI Story Lab State ---
  const [topic, setTopic] = useState('The Last Quantum Lighthouse');
  const [genre, setGenre] = useState<StoryCategory>('Science');
  const [mood, setMood] = useState<StoryMood>('Mysterious');
  const [character, setCharacter] = useState('Lyra, a Deep-Time Cartographer');
  const [lengthMinutes, setLengthMinutes] = useState(15);
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    soundEngine.playChime('discover');

    setTimeout(() => {
      const cleanTopic = topic.trim() || 'The Silent Horizon';
      const cleanChar = character.trim() || 'The Nameless Traveler';

      const newStory: Story = {
        id: `ai-lab-${Date.now()}`,
        title: cleanTopic,
        subtitle: `AI Story Lab · ${genre} Odyssey`,
        description: `Synthesized in the Storyverse AI Lab: ${cleanChar} ventures into the heart of ${cleanTopic}, confronting a ${mood.toLowerCase()} convergence of memory and consequence.`,
        category: genre,
        format: 'AI Lab',
        mood: mood,
        difficulty: 'Intermediate',
        durationMinutes: lengthMinutes,
        author: {
          name: 'Storyverse AI Story Lab',
          role: 'Deterministic Prototype Synthesis',
        },
        coverUrl: BRAND_ASSETS.readerOrbScene,
        coverAlt: cleanTopic,
        tags: [genre, mood, 'AILabGenerated', 'Branching'],
        metrics: {
          views: 1,
          saves: 1,
          completionRate: 100,
          engagementScore: 98,
          likes: 1,
          interpretations: 1,
        },
        dna: {
          emotion: mood === 'Emotional' ? 98 : 88,
          mystery: mood === 'Mysterious' ? 99 : 86,
          learning: genre === 'Science' || genre === 'Technology' ? 95 : 84,
          visual: 94,
          interaction: 96,
          audio: 90,
          depth: 93,
        },
        context: {
          setting: `The outer perimeter of ${cleanTopic}.`,
          timeline: 'Cycle 01 of the Lab Simulation.',
          coreTheme: `How ${cleanChar} navigates ${mood.toLowerCase()} unknowns through conscious choice.`,
          characters: [
            {
              name: cleanChar,
              role: 'Primary Protagonist',
              description: `Equipped with harmonic telemetry to chart ${cleanTopic}.`,
            },
          ],
          whatHappenedBefore: `An anomalous signal from ${cleanTopic} summoned ${cleanChar} across the frontier.`,
          whyItMatters: 'Every decision recorded here shapes the emergent archive.',
          keyTakeaways: [
            'Deterministic prototype architecture ready for server-side LLM integration.',
            'Choices alter narrative resonance in real time.',
          ],
        },
        chapters: [
          {
            id: 'gen-1',
            number: 1,
            stageName: 'BEGINNING',
            title: `Arrival at ${cleanTopic}`,
            subtitle: 'Chapter I · The First Signal',
            paragraphs: [
              `For months, ${cleanChar} had studied the coordinates in silence. Now, standing before the threshold of ${cleanTopic}, the air hummed with a ${mood.toLowerCase()} resonance that no instrument could fully quantify.`,
              `Every surface reflected a subtle amber filament—proof that this place was not merely built, but grown from recorded memory.`,
            ],
            visualUrl: BRAND_ASSETS.readerOrbScene,
            visualCaption: `Fig. I — ${cleanChar} approaching the core of ${cleanTopic}.`,
          },
          {
            id: 'gen-2',
            number: 2,
            stageName: 'DISCOVERY',
            title: 'The Resonance Chamber',
            subtitle: 'Chapter II · Hidden Architecture',
            paragraphs: [
              `Inside the central vault, ${cleanChar} discovers a suspended prism encoding the history of ${genre.toLowerCase()} pioneers who stood here centuries ago.`,
            ],
          },
          {
            id: 'gen-3',
            number: 3,
            stageName: 'CONFLICT',
            title: 'The Divergence Point',
            subtitle: 'Chapter III · The Threshold',
            paragraphs: [
              `The chamber’s harmonic field begins to shift. ${cleanChar} must decide whether to amplify the signal across the sector or preserve it inside a private capsule.`,
            ],
            choicePrompt: 'THE SIGNAL IS REACHING CRITICAL RESONANCE.',
            choices: [
              {
                id: 'amplify',
                label: 'AMPLIFY THE BEACON',
                description: `Broadcast the discovery of ${cleanTopic} to all listening vessels.`,
                consequenceText: `Beacon Amplified: A wave of golden light ripples outward from ${cleanTopic}, awakening dormant relays across the sector.`,
                accentColor: 'amber',
              },
              {
                id: 'archive',
                label: 'SEAL INSIDE THE PRIVATE CODEX',
                description: 'Protect the fragile equilibrium from external interference.',
                consequenceText: `Equilibrium Preserved: ${cleanChar} secures the crystalline record, ensuring ${cleanTopic} remains unspoiled.`,
                accentColor: 'cyan',
              },
            ],
          },
          {
            id: 'gen-4',
            number: 4,
            stageName: 'ENDING',
            title: 'Horizon of New Worlds',
            subtitle: 'Chapter IV · Epilogue',
            paragraphs: [
              `As the instruments settle, ${cleanChar} looks out toward the stars—knowing that ${cleanTopic} has permanently changed the map.`,
            ],
          },
        ],
      };

      setGeneratedStory(newStory);
      setIsGenerating(false);
    }, 450);
  };

  return (
    <section
      id="3d-and-ai"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 bg-[#090a0f] border-t border-white/[0.08]"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08] mb-14">
        <div className="lg:col-span-7">
          <div className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174] mb-3">
            06 / SPATIAL 3D &amp; GENERATIVE AI LAB
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#f4f2ed] font-normal tracking-tight leading-none">
             Volumetric geometry &amp;{' '}
            <span className="italic text-[#ffc174]">emergent</span> worlds.
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-base text-[#b8b0a4] font-light leading-relaxed">
            Inspect the 3D crystalline memory core of Sol-9 or synthesize a new playable narrative arc inside the experimental AI Story Lab.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT 6 COLUMNS: 3D SPATIAL ARTIFACT VIEWPORT */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-wider text-[#7bd0ff]">
            <span>ARTIFACT 01 · THE AURELIA MEMORY LATTICE</span>
            <span>60 FPS VOLUMETRIC PROJECTION</span>
          </div>

          <div
            onMouseDown={(e) => {
              isDraggingRef.current = true;
              lastMouseRef.current = { x: e.clientX, y: e.clientY };
            }}
            onMouseMove={(e) => {
              if (!isDraggingRef.current) return;
              const dx = (e.clientX - lastMouseRef.current.x) * 0.01;
              const dy = (e.clientY - lastMouseRef.current.y) * 0.01;
              lastMouseRef.current = { x: e.clientX, y: e.clientY };
              setUserRotation((prev) => ({ x: prev.x + dy, y: prev.y + dx }));
            }}
            onMouseUp={() => {
              isDraggingRef.current = false;
            }}
            onMouseLeave={() => {
              isDraggingRef.current = false;
            }}
            className="relative h-80 sm:h-96 w-full bg-[#050507] border border-white/15 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              width={560}
              height={360}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-mono-tabular uppercase tracking-wider text-[#b8b0a4] pointer-events-none">
              <Rotate3d className="w-4 h-4 text-[#ffc174]" />
              <span>Drag to rotate · Interactive 3D Polyhedron</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tabular">
            <div className="flex items-center gap-2">
              <span className="text-[#b8b0a4] uppercase">SPECTRUM:</span>
              {(['amber', 'cyan', 'violet'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLightMode(mode)}
                  className={`px-3 py-1 uppercase cursor-pointer border ${
                    lightMode === mode
                      ? 'bg-[#ffc174] text-[#1a0f00] border-[#ffc174] font-bold'
                      : 'border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <label className="text-[#b8b0a4] flex items-center gap-2">
                <span>DEPTH</span>
                <input
                  type="range"
                  min={200}
                  max={440}
                  value={cameraDepth}
                  onChange={(e) => setCameraDepth(Number(e.target.value))}
                  className="w-24 accent-[#ffc174] cursor-pointer"
                />
              </label>
              <button
                type="button"
                onClick={() => setRotationSpeed((s) => (s === 0 ? 1 : 0))}
                className="px-3 py-1 border border-white/15 text-[#f4f2ed] hover:border-[#ffc174] cursor-pointer uppercase"
              >
                {rotationSpeed === 0 ? 'Resume' : 'Freeze'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT 6 COLUMNS: AI STORY LAB */}
        <div className="lg:col-span-6 bg-[#050507] border border-white/15 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-wider text-[#ffc174] border-b border-white/10 pb-3">
            <span>AI STORY LAB · NARRATIVE SYNTHESIS</span>
            <span className="text-[#b8b0a4]">PROTOTYPE ENGINE</span>
          </div>

          <form onSubmit={handleGenerateStory} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1.5">
                  01 / TOPIC OR WORLD TITLE
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 px-3.5 py-2.5 text-sm text-[#f4f2ed] focus:outline-none focus:border-[#ffc174]"
                  placeholder="e.g. The Last Quantum Lighthouse"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1.5">
                  02 / CENTRAL CHARACTER
                </label>
                <input
                  type="text"
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 px-3.5 py-2.5 text-sm text-[#f4f2ed] focus:outline-none focus:border-[#ffc174]"
                  placeholder="e.g. Lyra, Deep-Time Cartographer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1.5">
                  03 / GENRE DOMAIN
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value as StoryCategory)}
                  className="w-full bg-[#090a0f] border border-white/15 px-3 py-2.5 text-xs text-[#f4f2ed] focus:outline-none cursor-pointer"
                >
                  <option value="Science">Science &amp; Cosmos</option>
                  <option value="Technology">Technology &amp; AI</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Mystery">Cosmic Mystery</option>
                  <option value="History">History &amp; Relics</option>
                  <option value="Environment">Environment</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1.5">
                  04 / MOOD
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value as StoryMood)}
                  className="w-full bg-[#090a0f] border border-white/15 px-3 py-2.5 text-xs text-[#f4f2ed] focus:outline-none cursor-pointer"
                >
                  <option value="Mysterious">Mysterious</option>
                  <option value="Futuristic">Futuristic</option>
                  <option value="Emotional">Emotional</option>
                  <option value="Curious">Curious</option>
                  <option value="Inspiring">Inspiring</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1.5">
                  05 / LENGTH ({lengthMinutes} MIN)
                </label>
                <input
                  type="range"
                  min={8}
                  max={30}
                  value={lengthMinutes}
                  onChange={(e) => setLengthMinutes(Number(e.target.value))}
                  className="w-full accent-[#ffc174] mt-2.5 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] font-bold text-xs uppercase tracking-[0.18em] py-4 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isGenerating ? 'SYNTHESIZING CHRONICLE...' : 'GENERATE STORY'}
              </span>
            </button>
          </form>

          {generatedStory && (
            <div className="pt-5 border-t border-[#ffc174]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174]">
                  SYNTHESIS COMPLETE · 4 CHAPTERS &amp; BRANCHING CHOICE
                </div>
                <h4 className="font-serif-editorial text-2xl text-[#f4f2ed] mt-0.5">
                  {generatedStory.title}
                </h4>
                <p className="text-xs text-[#b8b0a4] line-clamp-1">
                  {generatedStory.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenGeneratedStory(generatedStory)}
                className="shrink-0 border border-[#ffc174] text-[#ffc174] hover:bg-[#ffc174] hover:text-[#1a0f00] px-5 py-2.5 text-xs font-mono-tabular font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Enter Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
