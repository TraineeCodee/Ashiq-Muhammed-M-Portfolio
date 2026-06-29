let isMutedState = localStorage.getItem('portfolio_sound_muted') === 'true';
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    console.log('[AudioManager] Created AudioContext. State:', audioCtx.state);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      console.log('[AudioManager] AudioContext resumed. State:', audioCtx.state);
    }).catch(err => {
      console.warn('[AudioManager] Failed to resume AudioContext:', err);
    });
  }
  return audioCtx;
}

// Auto-unlock Web Audio on first user interaction anywhere on the screen
if (typeof window !== 'undefined') {
  const initAudioOnGesture = () => {
    try {
      console.log('[AudioManager] User interaction detected. Initializing context...');
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      // Remove listeners once active
      window.removeEventListener('click', initAudioOnGesture);
      window.removeEventListener('keydown', initAudioOnGesture);
      window.removeEventListener('touchstart', initAudioOnGesture);
    } catch (e) {
      console.warn('[AudioManager] Gesture init failed:', e);
    }
  };
  window.addEventListener('click', initAudioOnGesture);
  window.addEventListener('keydown', initAudioOnGesture);
  window.addEventListener('touchstart', initAudioOnGesture);
}

export const isMuted = () => isMutedState;

export const toggleMute = () => {
  isMutedState = !isMutedState;
  localStorage.setItem('portfolio_sound_muted', isMutedState.toString());
  console.log('[AudioManager] Toggled mute. New state:', isMutedState);
  window.dispatchEvent(new CustomEvent('mute_toggle', { detail: { isMuted: isMutedState } }));
  return isMutedState;
};

const playSound = (setupFn, name) => {
  if (isMutedState) {
    console.log('[AudioManager] Sound blocked (muted):', name);
    return;
  }
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    setupFn(ctx);
  } catch (e) {
    console.warn('[AudioManager] Web Audio error playing ' + name + ':', e);
  }
};

// 1. Coin Click (8-bit classic double-tone chime)
export const playCoin = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    
    // Tone 1: B5 (987.77 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(987.77, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.linearRampToValueAtTime(0, now + 0.08);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Tone 2: E6 (1318.51 Hz) starting slightly after
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1318.51, now + 0.08);
    gain2.gain.setValueAtTime(0.12, now + 0.08);
    gain2.gain.linearRampToValueAtTime(0, now + 0.25);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.25);
  }, 'coin');
};

// 2. Gem Collect Sound (Synthesized harp rising chime)
export const playGem = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }, 'gem');
};

// 3. Hover Tick (Subtle woodblock-like click)
export const playHover = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);
    
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.02);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.02);
  }, 'hover');
};

// 4. Click Pop (Satisfying interface press)
export const playClick = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.06);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.06);
  }, 'click');
};

// 5. Start Game Intro (A rapid 8-bit sweep ending in a full chord)
export const playStart = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    const step = 0.06;
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = idx === notes.length - 1 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * step);
      
      const startVolume = idx === notes.length - 1 ? 0.15 : 0.08;
      const duration = idx === notes.length - 1 ? 0.5 : 0.12;
      
      gain.gain.setValueAtTime(startVolume, now + idx * step);
      gain.gain.linearRampToValueAtTime(0, now + idx * step + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * step);
      osc.stop(now + idx * step + duration);
    });
  }, 'start');
};

// 6. Level Up Fanfare (Triumphant retro arcade scale)
export const playLevelUp = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const steps = [0, 0.08, 0.16, 0.24];
    const durations = [0.1, 0.1, 0.1, 0.45];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + steps[idx]);
      
      gain.gain.setValueAtTime(0.12, now + steps[idx]);
      gain.gain.linearRampToValueAtTime(0, now + steps[idx] + durations[idx]);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + steps[idx]);
      osc.stop(now + steps[idx] + durations[idx]);
    });
  }, 'levelUp');
};

// 7. Message Notification chirp (Dual-tone gentle notification chime)
export const playMessage = () => {
  playSound((ctx) => {
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(783.99, now); // G5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1); // C6
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }, 'message');
};
