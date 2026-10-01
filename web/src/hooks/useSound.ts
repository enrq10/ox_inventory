import { useCallback, useRef } from 'react';

// Sound file paths
const SOUNDS = {
  click: 'sounds/click.mp3',
  hover: 'sounds/over.wav',
  transition: 'sounds/transition.ogg',
} as const;

// Volume levels
const VOLUMES = {
  click: 0.03,
  hover: 0.05,
  transition: 0.1,
} as const;

type SoundType = keyof typeof SOUNDS;

export const useSound = () => {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    hover: null,
    transition: null,
  });

  const getAudio = useCallback((type: SoundType): HTMLAudioElement => {
    if (!audioRefs.current[type]) {
      const audio = new Audio(SOUNDS[type]);
      audio.volume = VOLUMES[type];
      audioRefs.current[type] = audio;
    }
    return audioRefs.current[type]!;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    const audio = getAudio(type);
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore errors (e.g., user hasn't interacted with page yet)
    });
  }, [getAudio]);

  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playHover = useCallback(() => playSound('hover'), [playSound]);
  const playTransition = useCallback(() => playSound('transition'), [playSound]);

  return {
    playClick,
    playHover,
    playTransition,
    playSound,
  };
};

// Singleton instance for global use
let globalAudioInstances: Record<SoundType, HTMLAudioElement | null> = {
  click: null,
  hover: null,
  transition: null,
};

export const playGlobalSound = (type: SoundType) => {
  if (!globalAudioInstances[type]) {
    globalAudioInstances[type] = new Audio(SOUNDS[type]);
    globalAudioInstances[type]!.volume = VOLUMES[type];
  }
  const audio = globalAudioInstances[type]!;
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

export const playClickSound = () => playGlobalSound('click');
export const playHoverSound = () => playGlobalSound('hover');
export const playTransitionSound = () => playGlobalSound('transition');
