// The talwar curve under "बंका", the shockwave behind "डंका", sound arcs off "वाग्या".
import {ease, progress} from '../utils/easing';

export const Talwar = ({t, start, mirror}: {t: number; start: number; mirror: boolean}) => {
	const p = ease.ink(progress(t, start, 0.55));
	if (p <= 0) return null;
	const len = 900;
	return (
		<svg width={1080} height={1920} style={{position: 'absolute', transform: mirror ? 'scaleX(-1)' : undefined}}>
			<path d="M70 655 C 300 700, 560 680, 790 560 L 812 542" fill="none" stroke="#c81d25" strokeWidth={11} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
			<path d="M78 647 C 300 688, 556 668, 784 551" fill="none" stroke="#ffd27a" strokeWidth={2.5} strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8} />
			{/* hilt */}
			<path d="M70 625 L70 685 M48 655 L92 655" stroke="#ffd27a" strokeWidth={6} strokeLinecap="round" opacity={p} />
		</svg>
	);
};

export const Shockwave = ({t, at, cx, cy}: {t: number; at: number; cx: number; cy: number}) => {
	const p = progress(t, at, 0.9);
	if (p <= 0 || p >= 1) return null;
	const r = 80 + ease.settle(p) * 820;
	return (
		<svg width={1080} height={1920} style={{position: 'absolute'}}>
			<circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffb347" strokeWidth={36 * (1 - p) ** 2} opacity={(1 - p) * 0.9} />
			<circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke="#fff1d6" strokeWidth={6 * (1 - p)} opacity={(1 - p) * 0.6} />
		</svg>
	);
};

export const SoundArcs = ({t, start, cx, cy}: {t: number; start: number; cx: number; cy: number}) => (
	<svg width={1080} height={1920} style={{position: 'absolute'}}>
		{[0, 1, 2].map((k) => {
			const p = progress(t, start + k * 0.12, 0.8);
			if (p <= 0 || p >= 1) return null;
			const r = 170 + ease.settle(p) * 260;
			const o = (1 - p) * 0.85;
			return (
				<g key={k} fill="none" stroke="#ffd27a" strokeWidth={7} strokeLinecap="round" opacity={o}>
					<path d={`M${cx - r} ${cy - r * 0.45} A ${r} ${r} 0 0 0 ${cx - r} ${cy + r * 0.45}`} />
					<path d={`M${cx + r} ${cy - r * 0.45} A ${r} ${r} 0 0 1 ${cx + r} ${cy + r * 0.45}`} />
				</g>
			);
		})}
	</svg>
);
