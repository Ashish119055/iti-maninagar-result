// Places a phrase's words into art-directed rows. Words are kept whole so
// Devanagari conjuncts and matras are never split.
import type {CSSProperties} from 'react';
import type {Word} from '../timing/words';
import {clamp01, ease, impact, progress} from '../utils/easing';
import {SANS, SERIF} from './fonts';

export type Kind = 'label' | 'rise' | 'slam';
export type Cell = {i: number; size: number; color: string; kind: Kind; font?: 'serif' | 'sans'};
export type Row = {y: number; align: 'left' | 'right' | 'center'; x?: number; cells: Cell[]};

const enter = (kind: Kind, p: number): CSSProperties => {
	if (kind === 'slam') {
		const s = impact(p);
		return {
			transform: `scale(${1.9 - 0.9 * Math.min(s, 1.2)}) translateY(${(1 - Math.min(1, s)) * -40}px)`,
			opacity: clamp01(p * 4),
			filter: `blur(${(1 - clamp01(p * 2.5)) * 14}px)`,
		};
	}
	if (kind === 'label') {
		return {opacity: clamp01(p * 3), letterSpacing: `${(1 - ease.settle(p)) * 30 + 6}px`};
	}
	const e = ease.settle(p);
	return {
		transform: `translateY(${(1 - e) * 70}px)`,
		clipPath: `inset(${(1 - ease.ink(clamp01(p * 1.6))) * 100}% 0 0 0)`,
	};
};

export const LyricRows = ({rows, words, t, exit}: {rows: Row[]; words: Word[]; t: number; exit: number}) => {
	const out = ease.ink(exit);
	return (
		<>
			{rows.map((row, ri) => {
				const pos: CSSProperties =
					row.align === 'left'
						? {left: row.x ?? 90}
						: row.align === 'right'
							? {right: 1080 - (row.x ?? 930)}
							: {left: 0, right: 0, justifyContent: 'center'};
				return (
					<div
						key={ri}
						style={{
							position: 'absolute',
							top: row.y,
							display: 'flex',
							alignItems: 'baseline',
							gap: 28,
							...pos,
							transform: `translateY(${-out * (90 + ri * 25)}px)`,
							opacity: 1 - out,
							filter: `blur(${out * 10}px)`,
						}}
					>
						{row.cells.map((c) => {
							const w = words[c.i];
							const p = progress(t, w.start - 0.04, c.kind === 'slam' ? 0.42 : 0.38);
							const sung = t >= w.start && t < w.end;
							return (
								<span
									key={c.i}
									style={{
										display: 'inline-block',
										fontFamily: c.font === 'sans' || c.kind === 'label' ? SANS : SERIF,
										fontWeight: 700,
										fontSize: c.size,
										lineHeight: 1.15,
										color: c.color,
										textShadow: sung && c.kind !== 'label' ? '0 0 38px rgba(255,150,60,0.55)' : '0 6px 24px rgba(0,0,0,0.6)',
										opacity: p <= 0 ? 0 : 1,
										whiteSpace: 'nowrap',
										...(p > 0 ? enter(c.kind, p) : {}),
									}}
								>
									{w.word}
								</span>
							);
						})}
					</div>
				);
			})}
		</>
	);
};
