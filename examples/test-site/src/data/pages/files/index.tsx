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
import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  A,
  addClasses,
  addProps,
  H1,
  Div,
  P,
} from '@bodiless/fclasses';
import { FileUploadStatus } from '@bodiless/components';
import { truncateFileName } from '@bodiless/components-ui';
import type { UploadStatusProps } from '@bodiless/components';
import flow from 'lodash/flow';

import Layout from '../../../components/Layout';
import {
  asEditableLink, asLink, asHeader1,
} from '../../../components/Elements.token';

const Title = asHeader1(H1);

const Section = flow(
  addClasses('my-2'),
)(Div);

const Paragraph = P;

const DefaultLink = flow(
  asEditableLink('default'),
  asLink,
)(A);

const CustomAllowedTypesLink = flow(
  asEditableLink('allowedType', undefined, () => ({
    fileUpload: {
      accept: [
        // pdf
        'application/pdf',
        // doc
        'application/msword',
        // docx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        // xls
        'application/vnd.ms-excel',
        // xlsx
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    },
  })),
  asLink,
)(A);

const CUSTOM_FILE_REJECTED_MESSAGE = 'File type is not accepted, the acceptable file types are Word (doc/docx) and PDFs';
const UPLOAD_STATUS_MAX_FILENAME_LENGTH = 30;

const CustomUploadStatus = ({ status, selectedFile }: UploadStatusProps) => {
  let statusText;
  const selectedFile$ = selectedFile ? truncateFileName(selectedFile, UPLOAD_STATUS_MAX_FILENAME_LENGTH) : '';
  switch (status) {
    case FileUploadStatus.FileAccepted:
      statusText = `File "${selectedFile$}" selected`;
      break;
    case FileUploadStatus.FileRejected:
      statusText = CUSTOM_FILE_REJECTED_MESSAGE;
      break;
    default:
      statusText = '';
  }
  return (
    <div>{statusText}</div>
  );
};

const CustomValidationMessageLink = flow(
  asEditableLink('validationMessage'),
  addProps({
    ui: {
      fileUpload: {
        DragRejected: flow(
          addClasses('bl-text-red'),
          addProps({
            children: CUSTOM_FILE_REJECTED_MESSAGE,
          }),
        )(Div),
        UploadStatus: CustomUploadStatus,
      },
    },
  }),
  asLink,
)(A);

const NewTabLink = flow(
  asEditableLink('newTab', undefined, () => ({
    target: '_blank',
  })),
  asLink,
)(A);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <Title>Link to Downloadable Files Demo Page</Title>
      <Section>
        <Paragraph>
          Below is a link that can target a file.
          To upload a file, open the link context menu and click `Edit`.
          Then drag or upload a file using File Upload form field.
        </Paragraph>
        <DefaultLink>Default Link</DefaultLink>
      </Section>
      <Section>
        <Paragraph>
          Below is an example in which allowed file types are customized.
          Allowed file types are `pdf, doc, docx, xls, xlsx`.
        </Paragraph>
        <CustomAllowedTypesLink>Custom allowed file types link</CustomAllowedTypesLink>
      </Section>
      <Section>
        <Paragraph>
          Below is an example in which form field validation message is customized.
        </Paragraph>
        <CustomValidationMessageLink>Custom validation message link</CustomValidationMessageLink>
      </Section>
      <Section>
        <Paragraph>
          Below is an example in which the link is opened in a new browser tab.
        </Paragraph>
        <NewTabLink>New tab link</NewTabLink>
      </Section>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
