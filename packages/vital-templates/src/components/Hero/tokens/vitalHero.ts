import { asFluidToken } from '@bodiless/vital-elements';
import { on, Img } from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';
import { CardStatic, vitalCardStatic } from '@bodiless/vital-card';
import { asBodilessChameleon } from '@bodiless/components';

const heroDefaultData = {
  component: 'Image',
};

const heroUseOverrides = () => ({
  groupLabel: 'Hero'
});

const Default = asFluidToken({
  Core: {
    _: asBodilessChameleon('component', heroDefaultData, heroUseOverrides),
  },
  Components: {
    Image: on(Img)(vitalImage.Hero),
    Video: on(YouTubeClean)(vitalYouTube.Hero),
    HeroCard: on(CardStatic)(vitalCardStatic.Hero),
  },
});

export default {
  Default,
};
