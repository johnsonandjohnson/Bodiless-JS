import { flowHoc } from '@bodiless/fclasses';
import { ContentNodePath, withDefaultContent, withResetButton } from '@bodiless/core';
import { getImageContentFrom } from '@bodiless/gatsby-theme-bodiless';

/**
* Util function generating an HOC which adds default content from
* the specified node path.
*
* @param nodePath
* The full path to th node which will provide the default content.
*
* @return
* HOC which adds the default content to an image.
*/
const withImageContentFrom = (nodePath: ContentNodePath) => flowHoc(
  withDefaultContent({
    image: getImageContentFrom(nodePath),
  }),
  withResetButton('image'),
);

export {
  withImageContentFrom,
};
