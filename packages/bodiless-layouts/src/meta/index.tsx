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

import React, { ComponentType as CT } from 'react';
import {
  mergeWith,
  isArray,
  flow,
} from 'lodash';

type MetaCategory = {
  [cat:string]: string[],
};
type WithMeta = {
  title?: string,
  displayName?: string,
  description?: string,
  categories?: MetaCategory,
};
type CTWM = CT & WithMeta;
export type HOC = (Component:CTWM) => CTWM;

function customizer(objValue:any, srcValue:any) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
}
const asPassThough = (Component:CTWM) => Component;
/**
 * Creates an HOC use it to attach meta data in an hoc.
 * @param Component The component to wrap.
 */
const withOutMeta = <P extends Object> (Component:CTWM) => (props:P) => (<Component {...props} />);
/**
 * withMeta creates an HOC that will add meta data to a React Component
 * @param meta the data to be side loaded in to the component
 */
const withMeta = (meta:Object) => (Component:CTWM) => {
  const newMeta = mergeWith({}, Component, meta, customizer);
  return Object.assign(withOutMeta(Component), newMeta);
};
/**
 * with Title returns an HOC that sideloads a title to a component
 * @param title The title to be added
 */
const withTitle = (title: string) => (Component: CTWM) => (
  withMeta({ title })(Component)
);
/**
 * withAppendTitle returns an HOC that appends to the sideload title of the component
 * Note it appends to the title with a space.
 * @param title The title to be appended
 */
const withAppendTitle = (newTitle: string) => (Component: CTWM) => {
  const { title } = Component;
  if (title) {
    return withTitle(`${title} ${newTitle}`)(Component);
  }
  return withTitle(newTitle)(Component);
};
/**
 * withDisplayName returns an HOC that sideloads a displayName to a component
 * @param displayName The displayName to be added
 */
const withDisplayName = (displayName: string) => (Component: CTWM) => (
  withMeta({ displayName })(Component)
);
/**
 * withAppendDisplayName returns a HOC that appends a name to the sideloaded DisplayName
 * @param newDisplayName the Display name to append
 */
const withAppendDisplayName = (newDisplayName: string) => (Component: CTWM) => {
  const { displayName } = Component;
  if (displayName) {
    return withDisplayName(displayName + newDisplayName)(Component);
  }
  return withDisplayName(newDisplayName)(Component);
};
/**
 * withDesc returns an HOC that sideloads the provided discription to the component.
 * @param description the discription to add
 */
const withDesc = (description: string) => (Component: CTWM):CTWM => (
  withMeta({ description })(Component)
);
/**
 * withAppendDesc returns an HOC that appends a description to the component sideload description.
 * @param newDescription the description to be appened
 */
const withAppendDesc = (newDescription: string) => (Component: CTWM):CTWM => {
  const description = Component.description
    ? Component.description + newDescription
    : newDescription;
  return withDesc(description)(Component);
};
/**
 * withTerm returns a function that then takes a term and that returns an HOC that side loads
 * the category and term on to the component.
 * @param cat that category to use in adding a term
 * @param term the term to add
 */
const withTerm = (cat: string) => (term: string) => (Component: CTWM):CTWM => (
  withMeta({ categories: { [cat]: [term] } })(Component)
);

/**
 * preserveMeta returns takes an hoc and returns another one that will apply the hoc but preserve
 * theMeta data from the component.
 * @param hoc the hoc to wrap.
 */
const perserveMeta = (hoc:HOC) => (Component:CTWM):CTWM => (
  withMeta(Component)(hoc(Component))
);

/**
 * withFacet is expect to be passed to an on function and takes a term and and hoc (using curring)
 *  and returns a Varient that can be used in the on function
 * @param cat Category that the Component will be apart
 * @param term the Term in the Category associated with the Component
 * @param hocs the HOC to apply to the Component
 */
const withFacet = (cat: string) => (term: string) => (...hocs: HOC[]) => flow(
  perserveMeta(flow(...hocs)),
  withTerm(cat)(term),
  withAppendTitle(term),
  withAppendDisplayName(term.replace(/ /, '')),
  withAppendDesc(`${cat}: ${term}\n`),
);

export {
  withMeta,
  withTitle,
  withDisplayName,
  withTerm,
  withAppendTitle,
  withAppendDisplayName,
  withDesc,
  withAppendDesc,
  perserveMeta,
  asPassThough,
  withFacet,
};
