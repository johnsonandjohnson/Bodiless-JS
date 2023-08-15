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

import { useNode } from '@bodiless/data';
import { addProps } from '@bodiless/fclasses';
import { PageTypeNodeData } from './types';

export const asSchemaSource = (name: String) => addProps({
  'data-schema-source': name,
});

export const getSchemaSourceData = (source: Array<Object>) => {
  const data: { [index: string]: any } = {};
  source.forEach((element:any) => {
    const schemaSource = document.querySelectorAll(`[data-schema-source=${element.name}]`);
    const key = element.name;
    if (schemaSource && schemaSource !== undefined) {
      switch (element.type) {
        case 'text':
          if (element.unique) {
            data[key] = (schemaSource[0]) ? schemaSource[0].textContent : null;
          } else {
            data[key] = Array.from(schemaSource).map((eachElement: any) => (
              eachElement.textContent
            ));
          }
          break;
        case 'html':
          data[key] = Array.from(schemaSource).map((eachElement: any) => eachElement.innerHTML);
          break;
        case 'img':
        case 'iframe':
          data[key] = Array.from(schemaSource).map((eachElement: any) => eachElement.getAttribute('src'));
          break;
        case 'node':
        default:
          data[key] = Array.from(schemaSource).map((eachElement: any) => eachElement);
          break;
      }
    }
  });
  return data;
};

/**
 * isHomePage verify if the page is a home page.
 *
 * @return true or false if the page to be a home page.
 */
export const useIsHomePage = () => {
  const { node } = useNode();
  const pageTypeNode = node.peer<PageTypeNodeData>(['Page', 'meta', 'page-type']);
  return pageTypeNode.data?.content === 'home';
};
