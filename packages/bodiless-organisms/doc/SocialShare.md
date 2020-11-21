# Social Share

## Overview
  Bodiless Social Share component provides sharing feature for social networks during site build. The SocialShare base component and SocialShareProvider type are defined in @bodiless/organisms package. In order to add the social share feature to the site, site builder needs to create social share provider components and pass to styled SocialShare base component.


## Usage

### 1. Add social share component to page

Import SocialShare base component and providers type from Bodiless package

```
import { SocialShare } from '@bodiless/organisms';
import type { SocialShareProvider } from '@bodiless/organisms';
```

Create Social Share providers, i.e. FaceBook, Twitter, etc
```
/**
 * `element` is a component to render the provider icon and click event handler.
 */
const facebook: SocialShareProvider = {
  id: 'facebook',
  element: <Provider
    name="FaceBook"
    icon={imgFacebook}
    onclick={facebookShare}
  />,
};

// ... define other providers ...

const providers: SocialShareProvider[] = [
  facebook,
  twitter,
  email,
];
```


Next, add some styles to `SocialShare` component:
```
const asSimpleSocialShare = withDesign({
  SocialShareWrapper: addClasses('my-4 flex flex-row-reverse'),
  SocialShareButton: addClasses('m-2 py-2 px-4 bg-teal-500 rounded text-white cursor-pointer'),
  SocialShareProdviders: withDesign(providersDesign),
});

const StyledSocialShare = flow(asSimpleSocialShare)(SocialShare);
```

Then, the created providers can be insert into this styled SocialShare component and place it on the page:
```
<Page {...props}>
  <Layout>
    <StyledSocialShare providers={providers} buttonContent={IconWithLabel('share', 'Share')} />
    ...
```

### 2. Adding Social Share Meta Data To Page

#### 2.1 Page-level meta data.

Most social media websites support Open Graph (OG) Protocol, which requires some information to be added to meta tags on webpages. The BodilessJS social share feature comes with a default meta data edit form, allowing site editors to add page-level OG meta data, i.e. `og:title`, `og:description`, `og:image` etc. 

Site builders can also add additional meta data tag, by following the examples from `examples/test-site/src/components/SocialShare/index.tsx`.

For example, to support OG video sharing, we are going to add a new meta data tag on page head, i.e.
```
<meta property="og:video" content="https//youtube.com/j3fs2k" >
```
 
First, create a `withSocialShareVideo` HOC:

```
const withSocialShareVideo = withMeta({
  name: 'og:video',
  label: 'Video',
  attribute: 'property',
});
```

And apply it to Helmet component, i.e.

```
const SocialShareHelmet = flowRight(
  withMetaForm(useMenuOptions, socialShareFormHeader),
  asBodilessHelmet('meta'),
  ...
  withSocialShareVideo('og-video', ''),
  ...
)(Helmet);
```

By doing this, the video edit field will show up on Social Share form and the corresponding meta tag will be rendered on page head.

#### 2.2 Cross site meta data

Non-editable cross site meta data can also be added to the page using `withMetaStatic` HOC. These meta data will be rendered on HTML head like page-level meta data, but will not show on Social Share form.

To add cross site meta data, site builder needs to create a HOC:

```
const withSocialShareSiteVideo = withMetaStatic({
  name: 'og:site_video',
});
```

Then apply it to Helmet,

```
const SocialShareHelmet = flowRight(
  withMetaForm(useMenuOptions, socialShareFormHeader),
  asBodilessHelmet('meta'),
  ...
  withSocialShareSiteVideo({ nodeKey: 'og:site-video', nodeCollection: 'site' }),
  ...
)(Helmet);
```



