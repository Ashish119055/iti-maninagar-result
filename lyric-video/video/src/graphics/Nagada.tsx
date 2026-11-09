// The war drum. Skin squashes on each strike; rings travel across the ground plane.
import {useCurrentFrame} from 'remotion';
import {beats, strikes} from '../timing/data';
import {impact, progress, pulse} from '../utils/easing';
import {seeded} from '../utils/random';

export const DRUM = {x: 540, y: 1430, rx: 330, ry: 96};

const Rings = ({t, events, strength}: {t: number; events: number[]; strength: number}) => (
	<>
		{events.map((e, i) => {
			const p = progress(t, e, 1.1);
			if (p <= 0 || p >= 1) return null;
			const k = 1 + p * 2.6;
			return (
				<ellipse
					key={i}
					cx={DRUM.x}
					cy={DRUM.y}
					rx={DRUM.rx * k}
					ry={DRUM.ry * k}
					fill="none"
					stroke="#ffb347"
					strokeWidth={10 * (1 - p) * strength}
					opacity={(1 - p) ** 1.5 * strength}
				/>
			);
		})}
	</>
);

const Sparks = ({t}: {t: number}) => (
	<>
		{strikes.flatMap((s, si) => {
			const dt = t - s;
			if (dt < 0 || dt > 1.2) return [];
			const rnd = seeded(si * 31 + 7);
			return Array.from({length: 28}, (_, i) => {
				const a = Math.PI * (1.05 + rnd() * 0.9);
				const v = 700 + rnd() * 900;
				const x = DRUM.x + Math.cos(a) * v * dt;
				const y = DRUM.y - 20 + Math.sin(a) * v * dt + 1300 * dt * dt;
				const life = 1 - dt / 1.2;
				return <circle key={`${si}-${i}`} cx={x} cy={y} r={2 + rnd() * 4 * life} fill={rnd() > 0.4 ? '#ffd27a' : '#ff6a2b'} opacity={life} />;
			});
		})}
	</>
);

export const Nagada = ({rise}: {rise: number}) => {
	const frame = useCurrentFrame();
	const t = frame / 30;
	const hit = strikes.reduce((a, s) => a + pulse(t, s, 7), 0);
	const lastStrike = [...strikes].reverse().find((s) => s <= t);
	const squash = lastStrike === undefined ? 1 : 1 - 0.08 * (1 - Math.min(1, impact(progress(t, lastStrike, 0.35)))) ;
	const softBeats = beats.filter((b) => !strikes.some((s) => Math.abs(s - b) < 0.2));
	const ropes = Array.from({length: 13}, (_, i) => {
		const x0 = DRUM.x - DRUM.rx + (i * 2 * DRUM.rx) / 12;
		return `M${x0} ${DRUM.y + 20} L${x0 + DRUM.rx / 12} ${DRUM.y + 330}`;
	});
	return (
		<svg width={1080} height={1920} style={{position: 'absolute', transform: `translateY(${(1 - rise) * 500}px)`}}>
			<defs>
				<radialGradient id="skin" cx="50%" cy="40%" r="60%">
					<stop offset="0%" stopColor={`rgb(${236 + hit * 19},${196 + hit * 40},${140 + hit * 60})`} />
					<stop offset="70%" stopColor="#a8693a" />
					<stop offset="100%" stopColor="#5a2a16" />
				</radialGradient>
				<linearGradient id="shell" x1="0" x2="1">
					<stop offset="0%" stopColor="#2a0c08" />
					<stop offset="50%" stopColor="#7a2a14" />
					<stop offset="100%" stopColor="#2a0c08" />
				</linearGradient>
			</defs>
			<Rings t={t} events={softBeats.filter((b) => b > 2.1)} strength={0.35} />
			<Rings t={t} events={strikes} strength={1} />
			<path
				d={`M${DRUM.x - DRUM.rx} ${DRUM.y} Q${DRUM.x - DRUM.rx + 30} ${DRUM.y + 420} ${DRUM.x - 120} ${DRUM.y + 560} H${DRUM.x + 120} Q${DRUM.x + DRUM.rx - 30} ${DRUM.y + 420} ${DRUM.x + DRUM.rx} ${DRUM.y} Z`}
				fill="url(#shell)"
			/>
			<g stroke="#e9b26a" strokeWidth={4} opacity={0.75}>
				{ropes.map((d, i) => (
					<path key={i} d={d} />
				))}
			</g>
			<g transform={`translate(${DRUM.x} ${DRUM.y}) scale(1 ${squash}) translate(${-DRUM.x} ${-DRUM.y})`}>
				<ellipse cx={DRUM.x} cy={DRUM.y} rx={DRUM.rx + 14} ry={DRUM.ry + 10} fill="#3b130b" />
				<ellipse cx={DRUM.x} cy={DRUM.y} rx={DRUM.rx} ry={DRUM.ry} fill="url(#skin)" />
				<ellipse cx={DRUM.x} cy={DRUM.y} rx={DRUM.rx * 0.32} ry={DRUM.ry * 0.32} fill="#5a2a16" opacity={0.35} />
			</g>
			<Sparks t={t} />
		</svg>
	);
};
