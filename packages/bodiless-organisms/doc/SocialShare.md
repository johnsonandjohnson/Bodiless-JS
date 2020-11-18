# Social Share

## Overview
  Bodiless Social Share component provides sharing feature for social networks during site build. The SocialShare base component and SocialShareProvider type are defined in @bodiless/organisms package. In order to add the social share feature to the site, site builder needs to create social share provider components and pass to styled SocialShare base component.


## Usage

Import SocialShare base component and type from Bodiless package

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



