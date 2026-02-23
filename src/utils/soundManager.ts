// Web Audio API based sound effects
class SoundManager {
  private audioContext: AudioContext | null = null

  private initAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  playMeow(): void {
    try {
      const ctx = this.initAudioContext()
      const now = ctx.currentTime

      // Create a cat meow sound with two oscillators
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.frequency.setValueAtTime(150, now)
      osc1.frequency.exponentialRampToValueAtTime(100, now + 0.2)

      osc2.frequency.setValueAtTime(400, now)
      osc2.frequency.exponentialRampToValueAtTime(200, now + 0.2)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.2)
      osc2.stop(now + 0.2)
    } catch (e) {
      console.log('Audio context not available')
    }
  }

  playRoar(): void {
    try {
      const ctx = this.initAudioContext()
      const now = ctx.currentTime

      // Deep roar sound with multiple frequencies
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const osc3 = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, now)

      osc1.frequency.setValueAtTime(80, now)
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.5)

      osc2.frequency.setValueAtTime(200, now)
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.5)

      osc3.frequency.setValueAtTime(300, now)
      osc3.frequency.exponentialRampToValueAtTime(100, now + 0.5)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

      osc1.connect(gain)
      osc2.connect(gain)
      osc3.connect(gain)
      gain.connect(filter)
      filter.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc3.start(now)
      osc1.stop(now + 0.5)
      osc2.stop(now + 0.5)
      osc3.stop(now + 0.5)
    } catch (e) {
      console.log('Audio context not available')
    }
  }

  playSuccess(): void {
    try {
      const ctx = this.initAudioContext()
      const now = ctx.currentTime

      // Cheerful success beeps
      const frequencies = [523.25, 659.25, 783.99] // C, E, G

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        const startTime = now + index * 0.1

        osc.frequency.setValueAtTime(freq, startTime)
        gain.gain.setValueAtTime(0.2, startTime)
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.15)
      })
    } catch (e) {
      console.log('Audio context not available')
    }
  }
}

export const soundManager = new SoundManager()
