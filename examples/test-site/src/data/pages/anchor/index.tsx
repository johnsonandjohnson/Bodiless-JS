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
/* eslint-disable max-len */
import React, { ComponentType } from 'react';
import { flow } from 'lodash';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { asBodilessAnchor, asBodilessList } from '@bodiless/components';
import { withSidecarNodes, withNode } from '@bodiless/core';
import {
  A, H1, H2, H4, P, Ul, Li, addClasses, withDesign, replaceWith,
} from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import {
  asHeader1, asHeader2, asEditableLink, asEditable, asBold,
} from '../../../components/Elements.token';

const BackToTopH1 = flow(
  asHeader1,
  asBodilessAnchor(),
)(H1) as ComponentType;

const AnchorTitle = flow(
  asHeader2,
  asBodilessAnchor(),
  addClasses('mt-10'),
)(H2) as ComponentType;

const AnchorSubtitle = flow(
  asBodilessAnchor(),
  asBold,
  addClasses('my-2'),
)(H4);

const TextSection = addClasses('my-4')(P) as ComponentType;

const asAnchorLink = flow(
  replaceWith(A),
  withSidecarNodes(
    asBodilessAnchor('anchor'),
    asEditableLink('link'),
    asEditable('text', 'Anchor Link'),
  ),
  withNode,
);

const AnchorLinkList = flow(
  asBodilessList(),
  withDesign({
    Title: asAnchorLink,
    Wrapper: addClasses('mx-6 list-disc'),
  }),
)(Ul);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <BackToTopH1 nodeKey="anchor-top">Anchor Link Demo Page</BackToTopH1>
      <TextSection>
        On this page it is possible to configure an Anchor link for each title.
        When the anchor is set for a Title it adds the id attribute to it so that it can be used
        to navigate to this element by adding the hash to the page url. Note that link URL and anchor ID
        are independent. Anchor ID serves as a pointer to the particular element located on the page.
      </TextSection>

      <TextSection>
        This page is filled with the random blocks of text to showcase the anchor links.
      </TextSection>
      <Ul className="mx-6 list-disc">
        <Li>Each H1, H2 and H4 tags on the page can be configured as anchor.</Li>
        <Li>Simple Navigation List is added to create TOC-like navigation.</Li>
        <Li>There is a list of Editable Links that can be configured as anchor in the end of each chapter.</Li>
      </Ul>

      <AnchorTitle nodeKey="navigation-list">Navigation List</AnchorTitle>
      <TextSection>
        You can use this list to create links and assign an Anchor IDs as the URL value to test Anchor navigation.
      </TextSection>
      <AnchorLinkList nodeKey="toc-list" />

      <AnchorTitle nodeKey="chapter-one">Chapter I</AnchorTitle>
      <TextSection>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam eligendi dicta non qui quibusdam voluptas?
        Vel laborum esse qui sit incidunt nesciunt molestiae odio fugiat rerum molestias natus unde quas dignissimos atque veniam,
        voluptas assumenda, quam omnis velit fuga soluta labore numquam, amet, quisquam. Quas tempora sit magni officiis optio,
        voluptatibus reprehenderit at accusantium vero eaque nobis, ipsa natus omnis autem asperiores quaerat fuga,
        ducimus expedita nisi beatae similique commodi quod eveniet, ex. Rem sint fugiat minima nesciunt nisi et minus sunt.
        Doloribus excepturi dolor, saepe neque eum quos, reiciendis architecto eaque consectetur provident atque voluptates rerum
        libero eveniet aut voluptate delectus. Ullam facilis voluptatibus temporibus magni fuga dolores repudiandae consequatur
        recusandae voluptate veritatis praesentium quia ex nihil quidem, modi! Alias praesentium odio, perspiciatis numquam nesciunt
        deleniti dolore architecto nobis doloribus labore facere cumque itaque reprehenderit doloremque, consectetur fugit voluptatibus
        provident laborum atque? Nobis harum porro, fugit quia cupiditate maiores officiis nam sapiente hic totam itaque saepe accusantium
        perferendis necessitatibus earum sint exercitationem amet. Expedita maiores libero, itaque et enim, fugiat accusantium laborum
        atque? Eligendi consectetur optio voluptatibus tempore! Pariatur ullam voluptatum neque quas, libero rem? Unde reiciendis dolorum
        pariatur magni soluta! Deserunt iusto provident quis corrupti ex est, quisquam beatae! Impedit earum quas, quod animi.
        Porro dolor quam fugiat quasi consectetur dicta, labore. Ut culpa eum excepturi similique earum laboriosam cumque reprehenderit,
        cum facilis animi repellendus molestiae accusamus dolor nostrum! Tenetur quia ipsam officia debitis quod quibusdam mollitia ullam unde.
        Corrupti in veritatis id sit exercitationem repellendus quas ducimus.
      </TextSection>
      <TextSection>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus neque, vitae, illo voluptas libero eveniet sequi
        pariatur voluptates illum architecto exercitationem placeat eligendi quod odit earum, consequatur corporis suscipit?
        Exercitationem dolorum vero necessitatibus illo voluptate harum neque recusandae beatae, ipsam cumque aliquam vitae et quos
        explicabo repudiandae odit maiores commodi magnam inventore. Praesentium magnam, asperiores quos accusantium sapiente,
        vitae ducimus odit modi officia minima dolores delectus omnis repellendus ullam molestiae adipisci, nisi aut distinctio.
        Quasi molestiae quibusdam non id debitis praesentium amet, ex magni. Saepe, facilis eius corrupti optio aliquid assumenda perferendis
        iusto consectetur, possimus suscipit cum accusamus voluptas ea voluptatem necessitatibus cumque modi dolore magni?
        A at, perferendis commodi similique. Quas nam, expedita accusantium, commodi, consectetur laborum libero blanditiis accusamus
        neque quos voluptatum a repudiandae laboriosam reiciendis! Deserunt officia quidem maxime magnam ex, obcaecati, quo doloremque voluptas
        rem consequatur. Iusto laboriosam eaque modi deserunt, doloribus beatae eum ab distinctio sed accusamus eveniet maiores aliquid rem quam,
        eius cupiditate molestiae, corrupti nam, inventore fugiat aspernatur? Aliquam illo necessitatibus commodi adipisci animi, eos eaque sapiente
        recusandae quos quas placeat obcaecati repellendus ipsum officiis non ipsam odio? Suscipit officiis saepe reprehenderit?
        Illum nostrum eaque aperiam, eligendi, officia est accusamus maxime atque esse ea iste, libero, quod. Neque eum vero sit suscipit
        quod corrupti voluptate eligendi temporibus natus, omnis quidem repellat? A, quisquam, doloremque aspernatur similique perferendis
        animi ad dolore est maxime unde possimus voluptatibus numquam sit reprehenderit, fugiat iure nulla sunt deleniti at. Hic aliquid
        sapiente quisquam, inventore eaque cumque quod ea.
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque iste ab expedita maiores deserunt, veniam dolore obcaecati,
        temporibus et nihil, exercitationem. Delectus distinctio id tempora placeat, vero cum ea provident fugiat quia nostrum a eligendi
        facere ratione amet quidem, ipsum. Amet, qui. Quo, doloremque, at. Earum, quidem possimus perferendis saepe quibusdam debitis atque
        recusandae voluptatibus, beatae. Esse vero doloribus nobis nihil quisquam facere numquam omnis dicta sit consequuntur accusantium, non minus.
        Placeat quasi excepturi sequi eaque! A tempora, fuga? Asperiores qui exercitationem dolorum ab? Ex voluptatum magnam omnis cum harum eligendi
        exercitationem vero distinctio sed, maxime tempore nostrum facilis reiciendis alias eum cumque, quas illum dolore at corrupti debitis
        ad explicabo quod, dolores. Distinctio dolores, iusto reiciendis accusamus at architecto modi eos velit! Sed consequuntur corporis,
        nemo consequatur culpa tempora. Magnam libero, rerum sunt nostrum quae, autem voluptate repudiandae ipsa? Neque atque alias sint
        minus accusantium ea accusamus libero ipsam sunt dolorum quo dicta et commodi eum amet rerum cupiditate, beatae dignissimos enim
        ratione ab iste iusto quos? Voluptatem vel, nostrum dolore sed eaque magni iste aliquam obcaecati quos, totam.
      </TextSection>

      <AnchorSubtitle nodeKey="chapter-one-links">Chapter I - Links That Can Be Made Anchors:</AnchorSubtitle>
      <AnchorLinkList nodeKey="chapter-one-links-list" />

      <AnchorTitle nodeKey="chapter-two">Chapter II</AnchorTitle>
      <TextSection>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam asperiores ratione aliquid veritatis voluptatum iure totam
        consequuntur explicabo maiores eaque, nisi aut aspernatur nam laudantium rerum excepturi dicta deleniti culpa? Nostrum
        temporibus provident, numquam veritatis earum, vitae laboriosam deleniti autem, ipsam recusandae vel ut quas dolorem officiis
        commodi excepturi debitis et. Eligendi eius quisquam doloribus, fugiat quasi praesentium sed ut nam repellendus aut similique
        ad iure placeat facilis, laboriosam, nemo cum repellat ullam odit quo blanditiis consequuntur sequi tenetur autem.
        Inventore, magni repellat soluta expedita id repellendus, dolor. Optio inventore, recusandae mollitia illo porro,
        eum necessitatibus officia iste alias impedit!
      </TextSection>
      <TextSection>
        Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Dignissimos fugit exercitationem excepturi cum,
        esse facere repellat sint explicabo ipsa neque amet, natus quisquam ex vel voluptatem molestias.
        Voluptatibus animi eligendi dignissimos earum illo magnam veniam nostrum cumque quaerat. Nostrum illum, nemo animi
        dolorum architecto nobis provident, deserunt harum reprehenderit itaque! Vero corporis quam, ea provident necessitatibus
        commodi facere corrupti deleniti tempore vel fugiat, consectetur, eveniet omnis illum, quaerat ratione!
        Illo aliquam nihil est numquam iure eveniet error officia neque dignissimos doloremque ratione exercitationem asperiores,
        minima cumque, ea atque voluptates maiores consequatur, necessitatibus vitae, ad dolores consectetur deleniti fuga!
        Accusantium, similique ipsam animi tenetur distinctio ex qui culpa asperiores ad aspernatur. Repudiandae, velit dolorum,
        sit accusamus alias qui sed inventore facilis eos nisi dolor quo ex fugit dolorem sequi quaerat sunt, iusto,
        aperiam ipsa esse porro repellendus vel. Veniam a, corporis necessitatibus quod temporibus omnis magnam deserunt quisquam
        obcaecati consequatur inventore molestiae aut incidunt sint. Maxime dicta temporibus accusamus voluptatum nemo ipsa exercitationem
        libero tenetur explicabo ea ad deserunt officia a, dolor iure id maiores? At corrupti delectus voluptate magni quia illo recusandae
        debitis minus fugiat doloremque ipsam, veritatis libero officia fuga voluptatem nobis quos. Molestias ea, nesciunt ex,
        rem sequi illum facilis vero est dolores cum atque, incidunt deserunt quisquam nulla delectus culpa consequuntur veritatis
        dolore distinctio. Aspernatur incidunt esse explicabo, enim, nostrum sed facere qui possimus fuga omnis officiis, voluptates!
        Cumque numquam hic maiores beatae dolorum accusamus, earum id dignissimos, quidem enim, dicta natus delectus molestias!
        Quo sed sit, facere commodi provident inventore tenetur esse quisquam animi nulla repudiandae nihil aliquam molestias at repellat
        deserunt fuga perferendis vero cupiditate. Porro, tempore saepe non sequi ullam architecto quae laborum nobis voluptas,
        molestiae odio numquam eaque? Culpa ipsa delectus iste sit repellendus nihil modi numquam obcaecati, explicabo,
        perferendis quibusdam quaerat, officia provident at illum a iure eaque distinctio. Voluptate accusantium quae porro impedit,
        non optio hic cum qui ipsam consectetur recusandae pariatur debitis, tenetur quisquam laudantium itaque iusto vitae rem dolores voluptatum?
        Illo magni fugiat laboriosam ipsam distinctio. Itaque tempore esse, quo. Laudantium, molestias libero, commodi impedit amet
        incidunt minus dolorum nemo pariatur ipsum! Officia blanditiis perspiciatis, vitae corrupti nesciunt labore possimus, saepe.
        Ducimus perspiciatis consectetur cupiditate quibusdam libero obcaecati quaerat architecto at cum quo, praesentium optio,
        ad a, dolor accusamus culpa illum impedit labore maxime voluptate, illo perferendis excepturi totam aliquid.
        Nesciunt exercitationem cumque perspiciatis repudiandae molestias voluptatem veniam esse.
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ullam, praesentium, voluptatem ex
        possimus vel obcaecati alias, illo vitae laudantium at in accusantium repellendus nam assumenda.
        Eum repellendus vel, excepturi sint recusandae voluptatem perferendis maxime. Qui nulla culpa id autem
        sit modi sapiente obcaecati ducimus, non, architecto animi esse nam officia quasi eos sequi repellat.
        Pariatur accusantium beatae officiis tempore iure quia, sapiente aliquid, repellendus eos autem harum quidem, nulla!
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro doloribus nobis quos? Facilis quo voluptas ut qui,
        dolore accusamus, illum ad ipsam odit, accusantium aperiam?
      </TextSection>

      <AnchorSubtitle nodeKey="chapter-two-links">Chapter II - Links That Can Be Made Anchors:</AnchorSubtitle>
      <AnchorLinkList nodeKey="chapter-two-links-list" />

      <AnchorTitle nodeKey="chapter-three">Chapter III</AnchorTitle>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui error sed maxime impedit eius et.
        Error mollitia, quis tempore quidem sit vero! Magni, qui. Rem molestias, cupiditate nobis quam voluptas.
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi placeat repellat,
        similique excepturi commodi cum enim, animi error beatae veniam laboriosam neque vel eos tempore exercitationem, rerum.
        Voluptatum officiis quod fugiat sunt accusantium aliquam veritatis dignissimos dicta eum placeat amet autem sequi
        sit pariatur, dolor voluptatem explicabo vitae debitis alias aperiam ut molestiae. Ipsa voluptatum, debitis fuga,
        unde error corrupti similique, ad minus, impedit dolore libero repellendus minima consequuntur. Numquam nobis, minus!
        Explicabo, quas neque dolor consequuntur alias, tenetur deserunt reiciendis ipsam temporibus vitae quam cupiditate odio accusamus inventore, animi.
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione necessitatibus minus fugit cumque
        sequi doloremque nobis molestiae quisquam eum amet, excepturi quaerat, commodi magnam odio unde.
        Accusamus quae praesentium, fuga molestias officia esse adipisci possimus debitis dolores.
        Quidem, iusto nihil rerum minus vitae deserunt laboriosam tenetur aperiam explicabo ex possimus placeat
        odio voluptates voluptate qui, blanditiis amet saepe deleniti ipsam. Quam porro ab quis similique quas
        rem libero laboriosam fugiat incidunt voluptatem consequuntur sint sapiente aliquam veniam autem accusamus
        dolorum facere, illum nesciunt totam ipsa. Debitis mollitia autem maxime dolorum rerum et.
        Vel quam voluptate reprehenderit, ratione explicabo et. Velit sit similique quam sapiente veritatis.
        Rem, fugit, molestiae. Saepe hic iusto corporis adipisci similique, nemo tenetur dolorum harum expedita
        excepturi nesciunt cum quod consectetur molestias quam dicta ut nobis, architecto ipsam officiis possimus,
        quidem impedit fuga! Tempore natus debitis sint dolore soluta possimus provident quisquam consectetur
        obcaecati enim vel nemo optio asperiores unde, repellendus. Amet possimus ad animi, esse nam aperiam iure sunt
        suscipit nihil corrupti sit non quaerat officiis odit aut repellat, alias quam culpa harum. Enim, eum, eos.
      </TextSection>
      <TextSection>
        Lorem ipsum, dolor, sit amet consectetur adipisicing elit. Consequuntur ipsam illo iste ex, eligendi,
        natus nemo ratione ullam, maiores dicta labore sapiente aliquam earum aut doloribus obcaecati nulla officiis odio.
        Autem provident nulla nobis laboriosam voluptatibus sit praesentium voluptatem corrupti alias consequatur non perferendis,
        commodi recusandae atque eum velit! Minima, quo fuga voluptatem voluptates odio eaque quis dolorem corporis rerum
        ducimus illum deserunt! Minima qui, assumenda, praesentium dolorem deserunt similique in, cum tempore sapiente
        aspernatur officiis iure laboriosam voluptatibus dignissimos quo, neque dolores consectetur amet est nisi placeat impedit.
        Accusamus magnam corporis, cumque ipsam perferendis neque! Dolorum natus commodi ut reprehenderit facilis doloribus,
        nobis minima nisi vitae aspernatur cumque quos? Modi reiciendis praesentium pariatur expedita nam quo nesciunt necessitatibus laboriosam?
      </TextSection>

      <AnchorSubtitle nodeKey="chapter-three-links">Chapter III - Links That Can Be Made Anchors:</AnchorSubtitle>
      <AnchorLinkList nodeKey="chapter-three-links-list" />

      <AnchorTitle nodeKey="chapter-four">Chapter IV</AnchorTitle>
      <TextSection>
        Lorem ipsum dolor sit, amet, consectetur adipisicing elit. A quidem odit veniam vel, ad, officia dolorum quasi
        cupiditate maiores, quos expedita distinctio. Doloribus nulla quaerat tempora, fuga.
        Alias aspernatur sint vero porro rerum, nulla eveniet eaque minus pariatur similique aperiam voluptas quae modi
        qui laboriosam! Sed, laudantium earum optio rerum enim eum voluptatem ea cumque accusantium, debitis ipsum, magnam totam,
        incidunt. Voluptate nam consequuntur facere, fugiat atque. Laudantium esse eius saepe voluptate delectus ea dicta nam!
        Maxime voluptatibus, reprehenderit dolorem quisquam iste at minima mollitia commodi dolor quaerat temporibus qui?
      </TextSection>
      <TextSection>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt illo reprehenderit delectus,
        accusamus ipsam ex temporibus hic ducimus quis modi dignissimos quaerat fugiat deserunt, omnis soluta, quidem?
        Officiis rerum quaerat doloribus error eius praesentium ipsa ipsum iure harum laboriosam non aut autem,
        quis neque minus esse, eum ab? Esse, officiis. Necessitatibus, numquam dolor earum incidunt. Cupiditate ex corrupti,
        totam deserunt sunt est vero, inventore laboriosam beatae enim doloremque adipisci praesentium? Doloremque mollitia
        beatae perspiciatis nemo dolores perferendis qui eum sint temporibus placeat ipsam tenetur enim nisi consequuntur
        voluptate consequatur quidem optio nam tempora consectetur ea minus voluptatibus, vel quod. Molestias dicta, obcaecati?
        In exercitationem ut ratione ea blanditiis asperiores, veniam omnis quia nobis, et, fugiat enim accusantium laboriosam eius praesentium.
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptate possimus veniam,
        ullam sequi obcaecati maiores architecto provident tempore quisquam molestias sit numquam voluptatem suscipit
        inventore natus. Eos rem aut ducimus dolor natus aspernatur laudantium officiis iure repellendus sapiente ut,
        adipisci, totam repellat nobis cum fugiat vero deserunt ex doloribus nisi nostrum? Unde ex accusamus cum,
        doloremque error quasi, quae doloribus inventore quia itaque, corporis. Blanditiis, molestiae sed eos
        velit provident hic ipsa sint voluptate earum nostrum quisquam quam aliquid magni cum quae eaque distinctio
        temporibus voluptates tenetur optio quia. Quibusdam quas eum, dolorem numquam soluta pariatur asperiores illo aliquam,
        dolores blanditiis minima quidem a cupiditate, molestiae id magnam necessitatibus, maxime commodi!
        Assumenda atque hic nesciunt vel explicabo reiciendis quis aliquam fugit a! Temporibus perferendis
        non ea at recusandae cupiditate deleniti, iusto inventore ipsa. At necessitatibus unde provident alias
        dignissimos deserunt repellendus. Ipsam enim sint commodi, cum saepe, eaque, nam adipisci nulla voluptatem id quod.
      </TextSection>
      <TextSection>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex atque eius deserunt pariatur sunt
        consectetur deleniti et unde nostrum facere, cumque odit quasi, minima reiciendis!
      </TextSection>

      <AnchorSubtitle nodeKey="chapter-four-links">Chapter IV - Links That Can Be Made Anchors:</AnchorSubtitle>
      <AnchorLinkList nodeKey="chapter-four-links-list" />
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
