# Iframe Component

  One can use this to compose and place an iframe on the page, that uses
  the BodilessJS edit system.

  Lets compose a base BodilessJS iframe component.

  ``` js
  import React from 'react';
  import { asBodilessIframe } from '@bodiless/components';

  const Iframe = asBodilessIframe()('iframe');
  ```

  Then, we can render the iframe component passing nodeKey prop, which tells where to store the data see [Data](Architecture/Data.md), and src prop, which tells the default iframe src used when the src is not defined in Data. We may pass other html element iframe props to the component.

  ``` jsx
  <Iframe nodeKey="iframe" src="https://johnsonandjohnson.github.io/Bodiless-JS/" />
 ```

  By default, src and height fields are editable. One can compose its own BodilessJS iframe component defining custom editable fields. For example, lets make src and width editable. In order to do it, we will import src snippet from @bodiless/components, compose width snippet ourself and compose our custom `EditableWidthIframe` component.

  ``` js
  import {
    withNodeKey,
    withNode,
    withNodeDataHandlers,
    withEditFormSnippet,
    withoutProps,
    withData,
    useMenuOptionUI,
  } from '@bodiless/core';
  import { asBaseBodilessIframe, withIframeFormSrcSnippet, } from '@bodiless/components';
  import { flowRight } from 'lodash';

  const withIframeWidthSnippet = flowRight(
    withNodeKey('width'),
    withNode,
    withNodeDataHandlers({width: '100%'}),
    withEditFormSnippet({
      renderForm: () => {
        const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
        return (
          <React.Fragment key="width">
            <ComponentFormLabel htmlFor="width">Width</ComponentFormLabel>
            <ComponentFormText field="width" />
          </React.Fragment>
        );
      },
    }),
    withoutProps('setComponentData'),
    withData,
  );

  const EditableWidthIframe = flowRight(
    asBaseBodilessIframe(),
    withIframeFormSrcSnippet,
    withIframeWidthSnippet,
  )('iframe');

  ```

  Then, we can render `EditableWidthIframe`

``` jsx
<EditableWidthIframe nodeKey="iframe" src="https://johnsonandjohnson.github.io/Bodiless-JS/" />
```
