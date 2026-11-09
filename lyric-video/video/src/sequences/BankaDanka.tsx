// "बंका ना डंका वाग्या" — the brave one's war drum has sounded.
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import '../typography/fonts';
import {NightDesert} from '../backgrounds/NightDesert';
import {shake} from '../camera/shake';
import {Shockwave, SoundArcs, Talwar} from '../effects/Strokes';
import {DRUM, Nagada} from '../graphics/Nagada';
import {bassEntry, phrases, strikes} from '../timing/data';
import {LyricRows, Row} from '../typography/LyricRows';
import {clamp01, ease, impact, progress, pulse} from '../utils/easing';

const CREAM = '#f6e7cf';
const SAFFRON = '#ffa630';

// Words: [बंका, ना, डंका, वाग्या] optionally preceded by [बाती, जी, का].
const layout = (withLabel: boolean, mirror: boolean): Row[] => {
	const o = withLabel ? 3 : 0;
	const side = mirror ? 'right' : 'left';
	const other = mirror ? 'left' : 'right';
	const rows: Row[] = [
		{y: 430, align: side, cells: [{i: o, size: 210, color: CREAM, kind: 'rise'}, {i: o + 1, size: 92, color: CREAM, kind: 'rise'}]},
		{y: 735, align: side, x: mirror ? 950 : 60, cells: [{i: o + 2, size: 300, color: SAFFRON, kind: 'slam'}]},
		{y: 1080, align: other, x: mirror ? 110 : 930, cells: [{i: o + 3, size: 150, color: CREAM, kind: 'rise'}]},
	];
	if (withLabel) {
		rows.unshift({
			y: 300,
			align: side,
			x: mirror ? 990 : 96,
			cells: [0, 1, 2].map((i) => ({i, size: 60, color: SAFFRON, kind: 'label' as const})),
		});
	}
	return rows;
};

const LAYOUTS: Row[][] = [
	layout(false, false),
	layout(true, false),
	layout(false, true),
	layout(true, true),
	[{y: 690, align: 'center', cells: [{i: 0, size: 380, color: SAFFRON, kind: 'slam'}]}],
];

const CHALO = phrases[4].start;

export const BankaDanka = () => {
	const frame = useCurrentFrame();
	const t = frame / 30;
	const cam = shake(t, strikes, 24);
	const push = ease.slam(progress(t, CHALO - 0.25, 0.5));
	const breath = 1 + t * 0.004;
	const rise = ease.settle(progress(t, 0.9, bassEntry - 0.9 + 0.3));
	const flash = pulse(t, CHALO, 5) + strikes.reduce((a, s) => a + pulse(t, s, 14) * 0.25, 0);

	return (
		<AbsoluteFill style={{background: '#0a0305', overflow: 'hidden'}}>
			<Audio src={staticFile('song.mp3')} />
			<AbsoluteFill
				style={{
					transformOrigin: `${DRUM.x}px ${DRUM.y}px`,
					transform: `translate(${cam.x}px, ${cam.y}px) rotate(${cam.r}deg) scale(${breath * (1 + push * 2.4)})`,
				}}
			>
				<NightDesert />
				<Nagada rise={rise} />
			</AbsoluteFill>

			<AbsoluteFill style={{transform: `translate(${cam.x * 0.6}px, ${cam.y * 0.6}px)`}}>
				{phrases.map((p, li) => {
					const next = phrases[li + 1]?.start ?? 99;
					if (t < p.start - 0.1 || t > next) return null;
					const exit = li === 4 ? 0 : clamp01((t - (next - 0.24)) / 0.24);
					const mirror = li === 2 || li === 3;
					const o = p.words.length === 7 ? 3 : 0;
					const danka = p.words[o + 2];
					return (
						<AbsoluteFill key={li} style={{opacity: li === 0 ? 0.92 : 1}}>
							{li < 4 && (
								<>
									<Shockwave t={t} at={danka.start} cx={540} cy={895} />
									<SoundArcs t={t} start={p.words[o + 3].start} cx={mirror ? 330 : 750} cy={1170} />
									<div style={{opacity: 1 - exit}}>
										<Talwar t={t} start={p.words[o].start} mirror={mirror} />
									</div>
								</>
							)}
							{li === 4 && <Shockwave t={t} at={p.start} cx={540} cy={900} />}
							<LyricRows rows={LAYOUTS[li]} words={p.words} t={t} exit={exit} />
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>

			<AbsoluteFill style={{background: '#ffb347', mixBlendMode: 'screen', opacity: Math.min(0.85, flash * 0.6)}} />
			{/* final settle: a thin red line under चलो, the march begins */}
			<svg width={1080} height={1920} style={{position: 'absolute'}}>
				<line x1={540 - 300 * impact(progress(t, CHALO + 0.15, 0.4))} x2={540 + 300 * impact(progress(t, CHALO + 0.15, 0.4))} y1={1150} y2={1150} stroke="#c81d25" strokeWidth={10} strokeLinecap="round" opacity={t > CHALO + 0.15 ? 1 : 0} />
			</svg>
		</AbsoluteFill>
	);
};
