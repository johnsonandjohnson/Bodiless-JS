/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { ComponentType, FC } from 'react';
import flow from 'lodash/flow';
import { AsBodiless, asBodilessComponent, useEditContext } from '@bodiless/core';
import {
  designable, A, Div, flowHoc, ComponentWithMeta
} from '@bodiless/fclasses';
import { useCuratorFormOptions, withCuratorFormSnippet } from './CuratorFormOptions';
import CuratorProvider from './CuratorProvider';
import { CuratorComponents, CuratorData, CuratorProps } from './types';
import CuratorPlaceholder from './CuratorPlaceHolder';

const CuratorComponentsStart: CuratorComponents = {
  Container: Div,
};

const withCuratorTransformer = (Component: ComponentType<any>) => {
  const WithCuratorTransformer = (props: any) => {
    const { feedId } = props;
    const src = `https://cdn.curator.io/published/${feedId}.js`;
    return <Component {...props} curatorSrc={src} />;
  };

  return WithCuratorTransformer;
};

const CuratorBase: FC<CuratorProps> = ({
  components,
  ...props
}) => {
  const { isEdit } = useEditContext();
  const { Container } = components;
  // @ts-ignore non-defined props.
  const { curatorSrc, containerId } = props;

  const script = (
    `(function(){
        var i, e, d = document, s = "script";i = d.createElement("script");i.async = 1;
        i.src = "${curatorSrc}";
        e = d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);
      })();`
  );
  if (isEdit) {
    return (
      <CuratorPlaceholder {...props} />
    );
  }
  return (
    <CuratorProvider scriptFunction={script}>
      <Container id={containerId}>
        <A href="https://curator.io" target="_blank" className="crt-logo crt-tag">Powered by Curator.io</A>
      </Container>
    </CuratorProvider>
  );
};

const asBodilessCurator: AsBodiless<CuratorProps, CuratorData> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flow(
  withCuratorTransformer,
  withCuratorFormSnippet,
  asBodilessComponent(useCuratorFormOptions())(nodeKeys, defaultData, useOverrides),
);

const CuratorClean: ComponentWithMeta = flowHoc(
  designable(CuratorComponentsStart, 'Curator'),
  asBodilessCurator(),
)(CuratorBase);

export {
  asBodilessCurator,
  CuratorBase,
  CuratorClean,
};
