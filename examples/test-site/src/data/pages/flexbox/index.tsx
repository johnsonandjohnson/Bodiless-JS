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
import { graphql } from 'gatsby';
import { getSnapFrom, withTailwindClasses } from '@bodiless/layouts';
import {
  NodeViewer,
} from '@bodiless/components';
import { Page } from '@bodiless/gatsby-theme-bodiless';

import Layout from '../../../components/Layout';
import tailWindConfig from '../../../../tailwind.config';
import { FlexBoxDefault } from '../../../components/Flexbox';

const FLEXBOX_PAGE_PATH = 'flexbox';

const options = getSnapFrom(
  withTailwindClasses(tailWindConfig)('w-full sm:w-1/2 sm:w-full lg:w-1/2 lg:w-full'),
);
const FlexboxPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Flexbox</h1>
      <FlexBoxDefault
        nodeKey={FLEXBOX_PAGE_PATH}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey={FLEXBOX_PAGE_PATH} />
      <h1 className="text-3xl font-bold mt-4">Flexbox grid with constrained widths</h1>
      <FlexBoxDefault
        nodeKey="constrained_widths"
        snapData={options}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="constrained_widths" />
      <h1 className="text-3xl font-bold mt-4">Flexbox restricted to 1 item</h1>
      <FlexBoxDefault
        nodeKey="restricted"
        maxComponents={1}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="restricted" />

      <div className="mt-8">
        <p className="p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dignissimos vitae ipsum sequi blanditiis ipsam nisi quo deleniti explicabo similique harum facere rem suscipit temporibus rerum facilis enim, repellendus, distinctio quae aliquam a nostrum libero! Id doloremque, error eius molestias. Debitis vero adipisci autem, fuga unde totam ipsa, natus eius.</p>
        <p className="p-4">Animi eum aut tenetur, perferendis inventore enim vitae quos illo nihil temporibus placeat dolorum iste veniam perspiciatis, cupiditate quo incidunt ad beatae nam non ducimus adipisci, reprehenderit sequi facere. Sit libero autem perferendis repellat explicabo tenetur numquam ipsa non molestias voluptas, esse et omnis voluptates cum dolore impedit quod accusantium.</p>
        <p className="p-4">Quod est incidunt, totam quibusdam molestiae optio perspiciatis sit iure id voluptas, eum odio! Ullam suscipit nemo, sunt nihil nesciunt, voluptates architecto eos doloribus, qui dolorum adipisci! Consequuntur, fugiat earum quia eveniet soluta, doloremque repudiandae. Tempore, odio nam eveniet dolores provident, facilis distinctio veritatis in assumenda nihil temporibus libero possimus.</p>
        <p className="p-4">Officia fugiat inventore rerum aperiam dolor mollitia quo non asperiores natus doloremque officiis voluptates quae aliquam qui amet at consequatur, voluptate ducimus cum delectus odit, ullam itaque deserunt maxime? Corporis fugiat consectetur possimus, provident deserunt, beatae corrupti asperiores earum sequi tenetur rem illo pariatur ea eius neque commodi rerum unde.</p>
        <p className="p-4">Iste architecto neque enim unde nobis, dicta. Doloremque vero, natus harum. Maiores, rem, quo vitae laudantium aperiam neque eos at dicta. Voluptatem architecto, rerum provident. Repellat ut cupiditate recusandae, quas debitis magnam voluptatibus alias dignissimos at voluptates laborum, vitae eaque voluptas modi quam, sit dicta fugiat officia esse rem placeat.</p>
        <p className="p-4">Sint neque magni magnam tempora unde aut eius explicabo assumenda adipisci, temporibus! Reprehenderit aperiam in voluptatem, at exercitationem ex quisquam. Veritatis doloribus officiis laudantium itaque quis corporis! Vel, voluptates enim in inventore et necessitatibus est aliquid error, architecto, repellat magni sed. Expedita modi, omnis atque, quidem aperiam ratione quae sequi!</p>
        <p className="p-4">Facilis quae, necessitatibus repudiandae nihil. Sint possimus, ipsam ipsa tenetur harum enim voluptatibus a! Maiores minus, tempore facilis nesciunt aut iusto nam. Quibusdam nemo at earum accusantium nesciunt deserunt quas provident mollitia, eaque ut, laborum, quam quo commodi ipsam qui assumenda nihil ullam? Voluptates blanditiis illum eaque, officiis tempore nesciunt.</p>
        <p className="p-4">Odit obcaecati ipsam fugit provident temporibus ex optio, harum quia ut, fuga, dolores. Assumenda saepe, non optio. Maxime ratione dolorum iste sed aspernatur dicta voluptatum placeat, libero tempora, quaerat, quas ad mollitia tempore eos. Minima ipsam consequatur architecto id dicta, doloribus facere, unde hic repudiandae, assumenda esse. In, dolorem, placeat.</p>
        <p className="p-4">Laboriosam voluptates ipsum eaque necessitatibus, illum nemo at fuga totam quae quaerat quod unde accusantium expedita ea iste libero earum molestias culpa. Amet fuga voluptates fugiat dolores exercitationem consequuntur. Impedit ut modi soluta porro similique nihil, eius nisi assumenda tempore natus at magni minus autem optio hic dignissimos fugit vitae!</p>
        <p className="p-4">Amet quas, eos quia dignissimos vero iusto delectus itaque eveniet veniam fugiat libero earum mollitia animi facere, obcaecati ea quod sapiente tempore doloribus, nemo nulla! Libero consequuntur, nesciunt ratione ex. Iusto nulla doloribus atque laboriosam, quibusdam illum ratione veniam ipsam quos distinctio ea neque, culpa nihil ullam iste eligendi minima.</p>
        <p className="p-4">Hic aut illo ducimus, doloribus laboriosam sed, maxime dignissimos molestias et mollitia incidunt veritatis, dicta nisi, nihil illum consequuntur eos voluptate ea provident suscipit omnis maiores labore iusto? Ad, totam. Recusandae harum, porro tempore esse atque doloremque fugit a dolor voluptas, fugiat consequatur quae sapiente error neque? Tempore, laborum possimus.</p>
        <p className="p-4">Animi aliquam dolor ullam, distinctio repellat cupiditate ducimus pariatur saepe obcaecati expedita perspiciatis nostrum deserunt tempore accusantium doloribus, laboriosam? Ea perferendis, quae, consectetur asperiores dolore inventore tempora dicta maiores, atque vitae quas, cupiditate iste? Odit necessitatibus quaerat eveniet eum, quis totam consequatur veniam sequi culpa delectus provident impedit, illo nisi.</p>
        <p className="p-4">Consectetur inventore voluptatibus mollitia, dolorum, libero esse perspiciatis nobis officiis praesentium labore, cupiditate earum veniam sapiente. Sit, quidem unde sunt perspiciatis similique nisi nobis vero, excepturi quasi assumenda debitis blanditiis odio expedita, cumque. At aliquid veritatis minima possimus saepe fugit deserunt, a ipsum, debitis architecto laboriosam reiciendis eaque, veniam obcaecati?</p>
        <p className="p-4">Cum aperiam architecto at, deleniti libero repellendus ipsa ex facilis repellat laborum. Eius fuga eum aut magnam beatae excepturi non, eligendi doloremque ex. Nobis, nihil accusamus, aut recusandae sint mollitia modi neque necessitatibus hic, iste deserunt error voluptatem pariatur sunt commodi nisi repellat et eum dolorum doloribus nemo repellendus impedit!</p>
        <p className="p-4">Eveniet architecto, natus hic quaerat quidem commodi nobis exercitationem, veniam animi, inventore cum enim error magni labore, quasi cupiditate facere atque consectetur sint nesciunt nostrum ab. Obcaecati neque ut explicabo eveniet. Asperiores voluptatum error, quaerat pariatur reiciendis nemo modi, a! Perferendis quidem veniam dolor dolore non delectus nam ab nesciunt!</p>
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
export default FlexboxPage;
