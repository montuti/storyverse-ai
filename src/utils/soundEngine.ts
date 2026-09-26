// Web Audio API Synthesizer for ambient spatial storytelling and UI harmonic feedback

class StorySoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingAmbient = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private currentPlaybackRate = 1.0;
  private currentVolume = 0.6;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public startAmbientDrone(baseFreq = 110): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.stopAmbientDrone();

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(this.currentVolume * 0.18, ctx.currentTime + 1.2);
    master.connect(ctx.destination);
    this.masterGain = master;

    // Create warm cosmic chord (Root, Fifth, Octave, Major Ninth)
    const ratios = [1, 1.498, 2, 2.25];
    this.oscillators = ratios.map((ratio, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * ratio * this.currentPlaybackRate, ctx.currentTime);

      oscGain.gain.setValueAtTime(idx === 0 ? 0.45 : 0.18 / idx, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(master);
      osc.start();
      return osc;
    });

    this.isPlayingAmbient = true;
  }

  public stopAmbientDrone(): void {
    if (!this.ctx) return;
    if (this.masterGain) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      } catch {
        // ignore
      }
    }
    const oldOscs = [...this.oscillators];
    this.oscillators = [];
    setTimeout(() => {
      oldOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
    }, 420);
    this.isPlayingAmbient = false;
  }

  public setVolume(vol: number): void {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.isPlayingAmbient) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume * 0.18, this.ctx.currentTime, 0.1);
    }
  }

  public setPlaybackSpeed(rate: number, baseFreq = 110): void {
    this.currentPlaybackRate = rate;
    if (this.ctx && this.isPlayingAmbient) {
      const ratios = [1, 1.498, 2, 2.25];
      this.oscillators.forEach((osc, idx) => {
        osc.frequency.setTargetAtTime(
          baseFreq * (ratios[idx] || 1) * this.currentPlaybackRate,
          this.ctx!.currentTime,
          0.15
        );
      });
    }
  }

  public playChime(type: 'choice' | 'bookmark' | 'discover' = 'choice'): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    const now = ctx.currentTime;
    if (type === 'choice') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.25);
    } else if (type === 'bookmark') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.18);
    } else {
      osc.frequency.setValueAtTime(329.63, now);
      osc.frequency.exponentialRampToValueAtTime(493.88, now + 0.22);
    }

    gain.gain.setValueAtTime(0.08 * this.currentVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }
}

export const soundEngine = new StorySoundEngine();
