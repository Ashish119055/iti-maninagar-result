// Stage 2: synchronization QA only. No styling, no effects.
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {phrases} from './timing/data';
import {activePhrase, activeWord} from './timing/words';
import './typography/fonts';
import {SANS} from './typography/fonts';

const clock = (t: number) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(3).padStart(6, '0')}`;

export const SyncTest = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	let pi = activePhrase(phrases, t);
	if (pi < 0) pi = Math.max(0, phrases.findIndex((p) => p.start > t) - 1);
	const p = phrases[pi];
	const wi = activeWord(p.words, t);
	const w = p.words[wi];
	return (
		<AbsoluteFill style={{background: 'black', fontFamily: SANS}}>
			<Audio src={staticFile('song.mp3')} />
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 22, padding: 80, fontSize: 76}}>
				{p.words.map((x, i) => (
					<span key={i} style={{color: i === wi ? '#ffd23f' : '#9a9a9a', borderBottom: i === wi ? '6px solid #ffd23f' : '6px solid transparent'}}>{x.word}</span>
				))}
			</AbsoluteFill>
			<div style={{position: 'absolute', left: 70, bottom: 110, fontFamily: 'monospace', fontSize: 38, color: '#ddd', lineHeight: 1.5}}>
				<div>LINE {p.line} / {phrases.length}</div>
				<div>{clock(t)}</div>
				<div style={{color: '#ffd23f', fontFamily: SANS}}>{w ? `"${w.word}"` : '—'}</div>
				<div>{w ? `${w.start.toFixed(3)} → ${w.end.toFixed(3)}` : ''}</div>
				<div style={{fontSize: 24, color: '#666'}}>frame {frame} · t = frame / {fps}</div>
			</div>
		</AbsoluteFill>
	);
};
