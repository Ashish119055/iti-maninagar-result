// NIGHT world: deep maroon dark, one saffron firelight that rises with the drum.
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {bassEntry, energyAt, strikes} from '../timing/data';
import {clamp01, pulse} from '../utils/easing';

const DRUM_Y = 1430;

const Jaali = ({opacity, rotate, scale}: {opacity: number; rotate: number; scale: number}) => (
	<svg width={1080} height={1920} style={{position: 'absolute', opacity}}>
		<defs>
			<pattern id="star" width={120} height={120} patternUnits="userSpaceOnUse">
				<g fill="none" stroke="#f4a23c" strokeWidth={1.4}>
					<rect x={35} y={35} width={50} height={50} />
					<rect x={35} y={35} width={50} height={50} transform="rotate(45 60 60)" />
					<circle cx={60} cy={60} r={8} />
					<path d="M0 60 H25 M95 60 H120 M60 0 V25 M60 95 V120" />
				</g>
			</pattern>
			<radialGradient id="jaaliFade" cx="50%" cy="72%" r="65%">
				<stop offset="0%" stopColor="white" />
				<stop offset="100%" stopColor="black" />
			</radialGradient>
			<mask id="jaaliMask">
				<rect width={1080} height={1920} fill="url(#jaaliFade)" />
			</mask>
		</defs>
		<g mask="url(#jaaliMask)">
			<rect
				x={-600}
				y={-600}
				width={2280}
				height={3120}
				fill="url(#star)"
				transform={`rotate(${rotate} 540 ${DRUM_Y}) scale(${scale})`}
				style={{transformOrigin: `540px ${DRUM_Y}px`}}
			/>
		</g>
	</svg>
);

export const NightDesert = () => {
	const frame = useCurrentFrame();
	const t = frame / 30;
	const lit = clamp01((t - bassEntry) / 0.6);
	const hit = strikes.reduce((a, s) => a + pulse(t, s, 5), 0);
	const glow = 0.25 + lit * 0.45 + energyAt(t) * 0.2 + hit * 0.35;
	return (
		<AbsoluteFill style={{background: '#0a0305'}}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse 85% 55% at 50% 76%, rgba(214,92,24,${glow}) 0%, rgba(120,22,18,${glow * 0.7}) 38%, rgba(10,3,5,0) 75%)`,
				}}
			/>
			<Jaali opacity={0.05 + lit * 0.13 + hit * 0.1} rotate={t * 2.2} scale={1 + hit * 0.04} />
			{/* film grain, re-seeded every other frame */}
			<svg width={1080} height={1920} style={{position: 'absolute', mixBlendMode: 'overlay', opacity: 0.35}}>
				<filter id="grain">
					<feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={Math.floor(frame / 2)} />
					<feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0" />
				</filter>
				<rect width={1080} height={1920} filter="url(#grain)" />
			</svg>
			{/* vignette */}
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 75% 60% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)'}} />
		</AbsoluteFill>
	);
};
