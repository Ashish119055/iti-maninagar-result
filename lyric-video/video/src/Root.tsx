import {Composition} from 'remotion';
import {FPS, HEIGHT, WIDTH} from './timing/constants';
import {SyncTest} from './SyncTest';

export const RemotionRoot = () => {
	return (
		<>
			<Composition
				id="SyncTest"
				component={SyncTest}
				durationInFrames={FPS * 10}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
			/>
		</>
	);
};
