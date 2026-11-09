import {Easing} from 'remotion';

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const progress = (t: number, start: number, dur: number) => clamp01((t - start) / dur);

// Different materials, different motion.
export const ease = {
	ink: Easing.bezier(0.65, 0, 0.35, 1),
	slam: Easing.bezier(0.7, 0, 0.84, 0),
	settle: Easing.bezier(0.16, 1, 0.3, 1),
	drift: Easing.bezier(0.45, 0, 0.55, 1),
};

// Heavy object hitting a surface: fast fall, squash, small rebound.
export const impact = (p: number) => {
	if (p < 0.35) return ease.slam(p / 0.35);
	const q = (p - 0.35) / 0.65;
	return 1 + Math.sin(q * Math.PI * 2.5) * 0.08 * (1 - q) ** 2;
};

// Decaying pulse after an event at time e; 0 before it.
export const pulse = (t: number, e: number, decay = 6) => (t < e ? 0 : Math.exp(-(t - e) * decay));
