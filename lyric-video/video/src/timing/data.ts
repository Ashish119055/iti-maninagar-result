// FROZEN inputs. Re-generate them with alignment/, never by editing here.
import phrasesJson from '../../public/phrases.json';
import beatMap from '../../public/beat-map.json';
import type {Phrase} from './words';

export const phrases = phrasesJson as Phrase[];
export const beats: number[] = beatMap.beats;
export const bassEntry: number = beatMap.bassEntry;
export const energyAt = (t: number) => {
	const v = beatMap.energy.values;
	const i = Math.min(v.length - 1, Math.max(0, Math.floor(t * beatMap.energy.fps)));
	return v[i];
};

export const SONG_SECONDS = 13.24;

// Every "डंका" is a drum strike.
export const strikes = phrases.flatMap((p) => p.words.filter((w) => w.word === 'डंका').map((w) => w.start));
