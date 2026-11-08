// Reads the FROZEN timing files. Never edit word-timestamps.json / phrases.json by hand
// after the sync test is approved.
export type Word = {word: string; start: number; end: number};
export type Phrase = {line: number; text: string; start: number; end: number; words: Word[]};

export const activeWord = (words: Word[], t: number) =>
	words.findIndex((w) => t >= w.start && t < w.end);

export const activePhrase = (phrases: Phrase[], t: number) =>
	phrases.findIndex((p) => t >= p.start && t < p.end);
