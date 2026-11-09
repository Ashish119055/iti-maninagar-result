import {Composition} from 'remotion';
import {FPS, HEIGHT, WIDTH} from './timing/constants';
import {SONG_SECONDS} from './timing/data';
import {SyncTest} from './SyncTest';
import {BankaDanka} from './sequences/BankaDanka';

const frames = Math.ceil(SONG_SECONDS * FPS);

export const RemotionRoot = () => {
	return (
		<>
			<Composition id="SyncTest" component={SyncTest} durationInFrames={frames} fps={FPS} width={WIDTH} height={HEIGHT} />
			<Composition id="BankaDanka" component={BankaDanka} durationInFrames={frames} fps={FPS} width={WIDTH} height={HEIGHT} />
		</>
	);
};
