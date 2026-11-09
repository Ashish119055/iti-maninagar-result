import {seeded} from '../utils/random';
import {pulse} from '../utils/easing';

// Sum of decaying, seeded jolts for every strike already fired.
export const shake = (t: number, events: number[], amp = 26) => {
	let x = 0;
	let y = 0;
	let r = 0;
	events.forEach((e, i) => {
		const k = pulse(t, e, 9);
		if (k < 0.001) return;
		const rnd = seeded(i * 97 + 13);
		const w = Math.sin((t - e) * 55);
		x += (rnd() - 0.5) * 2 * amp * k * w;
		y += amp * k * Math.abs(w);
		r += (rnd() - 0.5) * 1.6 * k * w;
	});
	return {x, y, r};
};
