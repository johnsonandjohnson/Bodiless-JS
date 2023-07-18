import { withNodeKey } from '@bodiless/data';
import { asYouTubeToken } from './YouTubeClean';

export {
  StaticBlock as YouTubeClean
} from '@bodiless/hydration';

export const vitalYouTube = new Proxy({}, {
  get: () => asYouTubeToken({
    Schema: {
      _: withNodeKey('youtube'),
    },
  })
});
export { asYouTubeToken };