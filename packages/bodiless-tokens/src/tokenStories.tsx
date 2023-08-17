/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  flowHoc, HOC,
} from '@bodiless/fclasses';
import React, { FC, useContext, ComponentType } from 'react';
import omit from 'lodash/omit';
// this addon is included in @storybook/addon-essentials
// eslint-disable-next-line import/no-extraneous-dependencies
import { DocsContext } from '@storybook/addon-docs';
// @TODO Use StoryFn instead. Use StoryObj if you want to migrate to CSF3, which uses objects
// instead of functions to represent stories. You can read more about the CSF3 format here:
// https://storybook.js.org/blog/component-story-format-3-0/
import type { Story } from '@storybook/react';
import union from 'lodash/union';
import withTokensFromProps from './withTokensFromProps';
import TokenMap from './TokenMap';
import { SbEditProvider } from './SbEditProvider';
import type { TokenDemoSpec } from './types';

/**
 * Generates the storybook argTypes descriptor from a token map.
 *
 * @param tokenMap
 */
export const getSbArgTypes = (tokenMap: TokenMap) => (
  tokenMap.groups.reduce((acc, cat) => ({
    ...acc,
    [cat]: {
      options: tokenMap.namesFor(cat),
      control: {
        // type: 'multi-select',
        type: 'check',
      },
    },
  }), {})
);

/**
 * Creates an HOC which converts storybook template props (grouped collections
 * of token names) to an array of token HOCs.
 *
 * Each "group" in the token map becomes a prop to the template. Here, we
 * pull the token names out of those props and use them to select token HOCs
 * token HOCs from the supplied map.
 *
 * @param tokenMap
 */
const withTokensPropFromSbTemplateProps = (tokenMap: TokenMap): HOC => Component => {
  const WithTokensPropFromSbTemplateProps: FC<any> = props => {
    // Filter out props which are not defined in the token map.
    const groups: string[] = Object.keys(props).filter(
      // eslint-disable-next-line react/destructuring-assignment
      group => tokenMap.groups.includes(group) && Array.isArray(props[group])
    );
    // Create a single array of all token names.
    const tokenNames: string[] = groups.reduce(
      (names, next) => [
        ...names,
        // eslint-disable-next-line react/destructuring-assignment
        ...props[next],
      ],
      [] as string[],
    );
    // We flow all the tokens together here and pass a single token.
    const tokens: HOC[] = [tokenMap.flow(tokenNames)];
    // Update the key to force component to remount if selected tokens change.
    // const key = createHash('md5').update(tokenNames.join(',')).digest('hex');
    const key = tokenNames.join(';');
    return <Component {...omit(props, groups) as any} tokens={tokens} key={key} />;
  };
  return WithTokensPropFromSbTemplateProps;
};

/**
 * Creates an HOC which creates a storybook token story template from
 * a component, using the supplied token map.
 *
 * @param tokenMap
 */
export const asSbTemplate = (tokenMap: TokenMap) => flowHoc(
  withTokensFromProps,
  withTokensPropFromSbTemplateProps(tokenMap)
);

/**
 * Extends the Storybook Meta type to include tokens.
 */

type BuildSourceParams = {
  tokenNames: string[],
  componentName: string,
  tokenCollectionName: string,
};

const buildSource = ({
  tokenNames,
  componentName,
  tokenCollectionName,
}: BuildSourceParams) => {
  const lines = [];
  lines.push('as(');
  tokenNames.forEach(
    n => lines.push(`  ${tokenCollectionName}.${n},`)
  );
  lines.push(`)(${componentName});`);
  return lines.join('\n');
};

/**
 * Creates the Storybook template and story metadata for a component
 * and a set of tokens.
 *
 * @param def
 */
export const createTokenStories = <D extends object>(def: TokenDemoSpec<D>) => {
  const {
    tokens, tokensExportName, componentExportName, defaultTokens = [], ...meta
  } = def;
  const { component } = meta;
  const tokenMap = new TokenMap().add(tokens);
  const Template = asSbTemplate(tokenMap)(component as FC<any>) as Story;

  const withEditProvider = (Story: ComponentType<any>) => (
    <SbEditProvider slug={componentExportName}>
      <Story />
    </SbEditProvider>
  );

  const story = (...tokenNamesParam: string[]) => {
    const tokenNames = union(tokenNamesParam, defaultTokens);
    const Story = Template.bind({});
    Story.parameters = {
      docs: {
        transformSource: (input: string, story: any) => {
          const context = useContext(DocsContext);
          const storyContext = context.getStoryContext(story);
          const { args } = storyContext;
          // console.log('sc', args);
          const tokenNames = Object.values(args).reduce(
            (acc, next) => [
              ...acc,
              ...next,
            ],
            [],
          );
          return buildSource({
            tokenNames,
            tokenCollectionName: tokensExportName,
            componentName: componentExportName,
          });

          // const cleanInput = input.toLowerCase().replace('\n', ' ');
          // console.log(JSON.stringify(cleanInput));
          // const cleanInput = `<Stylable Other={['default']} />`;
          // try {
          //   const parsed = JSXParser(cleanInput);
          //   console.log(parsed);
          // } catch(e) {
          //   console.log('could not parse', cleanInput, e);
          // }
          // const sc = React.useContext(SourceContext);
          // console.log('sc', sc);
          // console.log(input, story);
          // return 'FOO' + input;
        },
      },
    };
    // Story.parameters = {
    //   docs: {
    //     source: {
    //       code: buildSource({
    //         tokenNames,
    //         tokenCollectionName,
    //         componentName,
    //       }),
    //     },
    //   },
    // };
    Story.args = tokenNames.reduce(
      (args, name) => {
        const groups = tokenMap.groupsFor(name);

        if (!groups.length) return args;
        const groupName = groups[0];
        const tokens = args?.[groupName] ? [...args[groupName], name] : [name];
        return {
          ...args,
          [groupName]: tokens,
        };
      },
      {} as typeof Story.args,
    );
    return Story;
  };

  return {
    meta: {
      ...meta,
      argTypes: getSbArgTypes(tokenMap),
      decorators: [withEditProvider],
    },
    Template,
    story,
  };
};
