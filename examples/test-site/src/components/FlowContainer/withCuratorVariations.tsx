import { CuratorClean, asCurator } from '@bodiless/curator';
import { asToken, replaceWith, withDesign } from '@bodiless/fclasses';
import { withDesc } from '@bodiless/layouts';
import { withType } from './Categories';

const curatorVariation = {
  Curator: asToken(
    replaceWith(CuratorClean),
    withDesc('A way to promote a Social wall'),
    withType('Curator')(asCurator),
  ),
};

export default withDesign(
  curatorVariation,
);
