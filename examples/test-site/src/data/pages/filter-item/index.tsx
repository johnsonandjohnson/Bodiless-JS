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
import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { TagType } from '@bodiless/core';
import { H2 } from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import TaggableFilterableItem, { TagButton } from '../../../components/Filter';

const getSuggestions = () => [
  { id: 'fooId', name: 'foo' },
  { id: 'barId', name: 'bar' },
  { id: 'batId', name: 'bat' },
  { id: 'bazId', name: 'baz' },
];
const TaggableFilterSelector = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const FilterButtons = getSuggestions().map(tag => (
    <TagButton key={tag.id} onClick={() => setTags([tag])}>
      {tag.name}
    </TagButton>
  ));
  const props = {
    getSuggestions,
    placeholder: 'Add or create',
    formTitle: 'Groups',
    seeAllText: 'See all groups',
    formBodyText: 'Select from available tags:',
    allowNew: true,
    noSuggestionsText: 'No suggestions found',
  };
  return (
    <div>
      <div>
        <H2>Select a tag to filter by</H2>
        {FilterButtons}
        <TagButton id="show-all" onClick={() => setTags([])}>
          All
        </TagButton>
      </div>
      <div>
        <h2>Filtered Components</h2>
        <TaggableFilterableItem {...props} id="item1" nodeKey="item1" key="item1" selectedTags={tags}>Item 1</TaggableFilterableItem>
        <TaggableFilterableItem {...props} id="item2" nodeKey="item2" key="item2" selectedTags={tags}>Item 2</TaggableFilterableItem>
        <TaggableFilterableItem {...props} id="item3" nodeKey="item3" key="item3" selectedTags={tags}>Item 3</TaggableFilterableItem>
        <TaggableFilterableItem {...props} id="item4" nodeKey="item4" key="item4" selectedTags={tags}>Item 4</TaggableFilterableItem>
      </div>
    </div>
  );
};
export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Metadata (tags) Group Demo Page</h1>
      <div className="my-3">
        <TaggableFilterSelector />
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
