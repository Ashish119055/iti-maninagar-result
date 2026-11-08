// Stage 2 placeholder: replace the sample data with your frozen phrases.json and add <Audio>.
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {activePhrase, activeWord, Phrase} from './timing/words';

const sample: Phrase[] = [
	{
		line: 1,
		text: 'तो तेरे पे मैंने आके',
		start: 0,
		end: 10,
		words: ['तो', 'तेरे', 'पे', 'मैंने', 'आके'].map((word, i) => ({word, start: i * 2, end: i * 2 + 2})),
	},
];

export const SyncTest = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const p = sample[activePhrase(sample, t)];
	const wi = p ? activeWord(p.words, t) : -1;
	return (
		<AbsoluteFill style={{background: 'black', color: '#888', fontFamily: 'Noto Sans Devanagari, sans-serif'}}>
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontSize: 72, gap: 18, flexDirection: 'row'}}>
				{p?.words.map((w, i) => (
					<span key={i} style={{color: i === wi ? '#ffd23f' : '#ddd'}}>{w.word}</span>
				))}
			</AbsoluteFill>
			<div style={{position: 'absolute', left: 60, bottom: 120, fontFamily: 'monospace', fontSize: 34, color: '#ccc'}}>
				LINE {p?.line ?? '-'} · {t.toFixed(3)}s · {wi >= 0 ? `${p.words[wi].start} → ${p.words[wi].end}` : ''}
			</div>
		</AbsoluteFill>
	);
};
