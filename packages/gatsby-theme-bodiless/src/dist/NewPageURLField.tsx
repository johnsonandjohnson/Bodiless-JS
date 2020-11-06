/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { useCallback } from 'react';
import { useMenuOptionUI, useNode } from '@bodiless/core';
import {
  withDesign,
  replaceWith,
  addProps,
} from '@bodiless/fclasses';
import { useFormState } from 'informed';
import { flow } from 'lodash';
import LockedEditableField from '@bodiless/components/src/LockedEditableField';

const usePagePath = () => useNode().node.pagePath;

const PageURLPreview = () => {
  const basePath = usePagePath();
  const { errors } = useFormState();
  const {
    ComponentFormLabel,
    ComponentFormText,
    ComponentFormDescription,
    ComponentFormWarning,
  } = useMenuOptionUI();
  /*const validate = useCallback(
    (value: string) => (!value || !RegExp(/^[a-z0-9_-]+$/i).test(value)
      ? 'No special characters or spaces allowed'
      : undefined),
    [],
  );*/
  const validate = useCallback(
    (value: string) => (!RegExp(/^[a-z0-9_-]+$/i).test(value)
      ? 'No special characters or spaces allowed'
      : undefined),
    [],
  );
  return (
    <>
      <ComponentFormLabel htmlFor="new-page-path">Page Path</ComponentFormLabel>
      <ComponentFormDescription>{`${basePath}`}</ComponentFormDescription>
      <ComponentFormText
        id="new-page-path"
        key="pagePath"
        field="pagePath"
        keepState
        validate={validate}
        validateOnChange
        validateOnBlur
      />
      {errors && errors.pagePath && (
        <ComponentFormWarning>{errors.pagePath}</ComponentFormWarning>
      )}   
    </>
  );
};

const PageURLInput = () => {
  const basePath = usePagePath();
  const { errors, values } = useFormState();
  const pagePath = values['pageURL'] || '';  
  const pageURLInitialValue = `${basePath}${pagePath}`;
  const {
    ComponentFormLabel,
    ComponentFormText,
    ComponentFormWarning,
  } = useMenuOptionUI();
  const validate = useCallback(
    (value: string) => (!value || !RegExp(/^[a-z0-9/_-]+$/i).test(value)
      ? 'No special characters or spaces allowed'
      : undefined),
    [],
  );
  return (
    <>
      <ComponentFormLabel>URL</ComponentFormLabel>
      <ComponentFormText
        key="pageURL"
        field="pageURL"
        initialValue={pageURLInitialValue}
        validate={validate}
        validateOnChange
        validateOnBlur
      />
      {errors && errors.pageURL && (
        <ComponentFormWarning>{errors.pageURL}</ComponentFormWarning>
      )}   
    </>
  );
};

const asComponentFormLink = () => (props: any) => {
  const { ComponentFormLink } = useMenuOptionUI();
  return <ComponentFormLink {...props} />
};

const NewPageURLField = withDesign({
  Input: replaceWith(PageURLInput),
  CancelLink: replaceWith(React.Fragment),
  EditLink: flow(
    asComponentFormLink,
    addProps({
      children: 'Edit',
    }),
  ),
  Preview: replaceWith(PageURLPreview),
})(LockedEditableField);

export default NewPageURLField;
export { usePagePath };
