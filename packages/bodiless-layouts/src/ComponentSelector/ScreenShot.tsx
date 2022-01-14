/**
 * Copyright © 2019 Johnson & Johnson
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

import React from 'react';
import html2canvas from 'html2canvas';
import BackendClient from './BackendClient';
import { COMPONENTS_PREVIEW_BASE_URL } from './config';

const BASE_URL_NO_PREFIX_SLASH = COMPONENTS_PREVIEW_BASE_URL.split('/').filter(Boolean).join('/');

// Converts component title to a formatted file name
export function titleToImageName(componentTitle: string) {
  return `${componentTitle.replace(/\s/g, '').toLowerCase()}.jpeg`;
}

// This function takes a component and node
// Mounts the Component to the DOM
function RenderCanvas(props: any) {
  const { node, MyComponent } = props;
  return (
    <div
      id={MyComponent.title}
      className="bl-w-xl-grid-2 bl-min-h-xl-grid-2 grid_item_selector__item"
    >
      <MyComponent node={node} className="bl-mb-2 bl-mt-grid-2 bl-w-third bl-mx-grid-3" />
    </div>
  );
}

function dataURItoBlob(dataURI: any) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  const typedArray = new Uint8Array(byteString.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteString.length; i++) {
    typedArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([typedArray], { type: mimeString });
}

// After the Image is mounted onto the DOM
// This function will grab the image by its unqiue ID
// Convert the image and send it to the backend
function GetComponentThumbnail(callbackFxn: Function, myId: string) {
  html2canvas(document.getElementById(myId) as HTMLElement, {
    scale: 2,
  }).then((canvas: any) => {
    // Convert canvas to DataURL
    const myImage = canvas.toDataURL('image/jpeg');
    // Create Blob
    const blob = dataURItoBlob(myImage);
    // Create Image File
    const file = new File(
      [blob],
      `${BASE_URL_NO_PREFIX_SLASH}/${titleToImageName(myId)}`,
      {
        type: 'image/jpeg',
        lastModified: Date.now(),
      },
    );
    // Post Image File
    (new BackendClient()).saveFile(file).finally(() => callbackFxn());
  });
}

/**
 * ScreenShotClass
 *
 * ScreenShotClass default state has renderMe as true, the class is invoked with a component and
 * node.
 * ScreenShotClass checks to see the status of renderMe (it will be true at first since that is
 * default).
 * RenderCanvas() will be initiated and render the component onto the DOM.
 * ComponentDidMount() will execute once the ScreenShotClass render completes.
 * ComponentDidMount() will call getComponentThumbnail() which will save a picture of our component.
 * ComponentDidMount() will then set the renderMe state to false.
 * ScreenShotClass will rerender due to the change in state.
 * ScreenShotClass will return null and the image will disappear from the DOM.
 */
export class ScreenShot extends React.Component<any> {
  constructor(props: any) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { renderMe: true };
  }

  componentDidMount() {
    const { Component: { title: componentTitle } } = this.props;
    GetComponentThumbnail(
      // eslint-disable-next-line react/no-unused-state
      () => this.setState({ renderMe: false }),
      componentTitle,
    );
  }

  render() {
    const { node, Component } = this.props;
    if ((this.state as any).renderMe) {
      return (
        <RenderCanvas
          node={node}
          MyComponent={Component}
        />
      );
    }
    return null;
  }
}
