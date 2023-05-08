/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { H2 } from '@bodiless/fclasses';
import { Tag, FilterTagType } from '@bodiless/filtering';
import Layout from '../../../components/Layout';
import TaggableFilterableItem, { TagButton } from '../../../components/Filter';

const getSuggestions = () => [
  new Tag('fooId', 'foo'),
  new Tag('barId', 'bar'),
  new Tag('batId', 'bat'),
  new Tag('bazId', 'baz'),
];
const TaggableFilterSelector = () => {
  const [tags, setTags] = useState<FilterTagType[]>([]);
  const [showAll, setShowAll] = useState(true);
  const FilterButtons = getSuggestions().map(tag => (
    <TagButton key={tag.value} onClick={() => setTags([tag])}>
      {tag.label}
    </TagButton>
  ));
  const props = {
    getSuggestions,
    registerSuggestions: () => {},
    placeholder: 'Add or Create',
    formTitle: 'Groups',
    seeAllText: 'View All Groups',
    formBodyText: 'Select from available groups:',
    allowNew: true,
    noOptionsText: 'No matching groups found.',
    showWhenNoTagSelected: showAll,
  };
  return (
    <div>
      <div>
        <H2>Select a tag to filter by</H2>
        <div>
          {FilterButtons}
          <TagButton id="foo-bar" onClick={() => setTags(getSuggestions().slice(0, 2))}>
            multiple (foo, bar)
          </TagButton>
          <TagButton id="all-tags-selected" onClick={() => setTags(getSuggestions())}>
            multiple (foo, bar, baz, bat)
          </TagButton>
          <TagButton id="show-all" onClick={() => setTags([])}>
            None
          </TagButton>
        </div>
      </div>
      <label className="py-4 block">
        <input className="mr-2" type="checkbox" defaultChecked={showAll} onClick={() => setShowAll(v => !v)} />
        Show all items when no tag selected.
      </label>
      <div>
        <h2>Selected Tags</h2>
        <p>
          {tags.map(t => t.label).join(' ')}
          &nbsp;
        </p>
      </div>
      <div className="pt-4">
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
    ...DefaultContentQuery
  }
`;
