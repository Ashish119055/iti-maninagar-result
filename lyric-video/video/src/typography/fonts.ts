import {continueRender, delayRender, staticFile} from 'remotion';

export const SERIF = 'NotoSerifDeva';
export const SANS = 'NotoSansDeva';

const faces: [string, string, string][] = [
	[SERIF, 'fonts/NotoSerifDevanagari-Bold.ttf', '700'],
	[SERIF, 'fonts/NotoSerifDevanagari-Regular.ttf', '400'],
	[SANS, 'fonts/NotoSansDevanagari-Bold.ttf', '700'],
];

const handle = delayRender('fonts', {timeoutInMilliseconds: 120000});
Promise.all(
	faces.map(([family, file, weight]) => {
		const f = new FontFace(family, `url(${staticFile(file)})`, {weight});
		document.fonts.add(f);
		return f.load();
	}),
)
	// Never leave the render waiting: fall back to system Noto if a face fails.
	.catch((err) => console.warn('font load failed', err))
	.finally(() => continueRender(handle));
