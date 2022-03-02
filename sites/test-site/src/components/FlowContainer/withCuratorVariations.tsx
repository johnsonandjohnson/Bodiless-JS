import { CuratorClean, asCurator } from '@bodiless/curator';
import { flowHoc, replaceWith, withDesign } from '@bodiless/fclasses';
import { withDesc } from '@bodiless/layouts';
import { withType } from './Categories';

const curatorVariation = {
  Curator: flowHoc(
    replaceWith(CuratorClean),
    withDesc('A way to promote a Social wall'),
    withType('Curator')(asCurator),
  ),
};

export default withDesign(
  curatorVariation,
);
