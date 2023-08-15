# Vital YouTube Component

The Vital YouTube Component is based on the [BodilessJS YouTube Component](/Components/YouTube)
component. It adds features and styles to help meet typical site-use expectations.

By default, the Vital YouTube Component:

- Is set to a 16:9 aspect ratio;
- Has full-screen enablement;
- Displays the player controls;
- Has captions enabled;
- Has "modest branding" enabled — the YouTube logo won't be displayed in the control bar;
- Supports structured data (JSON-LD) using the `VideoObject` schema.

## Content Editor Details

Other than potentially seeing different style variations available, there is no change to the
general YouTube component experience by the Vital YouTube package, and, thus, you can refer to the
[Bodiless YouTube : Content Editor Details](/Components/YouTube#content-editor-details).

### Hero Video

The [Vital Generic Page Template](../VitalTemplates/Generic) uses a Hero Card in the _Top_ slot (or
Hero). Using the Edit Interface, you will have the option to swap between a Hero
[Card](../VitalCard/#hero-card), [Image](../VitalImage/#hero-image), or Video. Note: Your site may
be configured with additional Hero variants.

01. While in [Edit Mode](/ContenteditorUserGuide/#edit-mode), select the desired Hero Component,
    and, within its context menu, under "Hero," click **Swap**.  
    ![Hero Swap Video](./assets/HeroSwapVideo.jpg ':size=292')
01. In the _Choose a component_ form, select "Video."
01. Click the checkmark in the bottom-right of the form to confirm.
01. You can select the video URL as you would a typical YouTube component.  
    See: [Bodiless YouTube : Content Editor Details](/Components/YouTube#content-editor-details)

## Site Builder Details

As the Vital YouTube component is based on its BodilessJS counterpart, you may refer to the
[BodilessJS YouTube Component : Site Builder Details](/Components/YouTube#site-builder-details) for
general information about using the component.

### Default Player Settings

The default YouTube player settings for the Vital YouTube component can be found in
[`util.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-youtube/src/components/YouTube/util.ts
':target=_blank').

For more information regarding these settings, please see:

- [BodilessJS YouTube Component : `playerSettings` Parameters](/Components/YouTube#playersettings-parameters)
- [YouTube Embedded Players and Player Parameters : Supported Parameters | Google Developers](https://developers.google.com/youtube/player_parameters#Parameters ':target=_blank')

### Hero Video

The `vitalYouTube` token collection includes a `Hero` token, which renders a 16:9, full-width video
player, and automatically adds related structured data (JSON-LD) into the page.

Example usage:

```jsx
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';
import { as } from '@bodiless/fclasses';

const VideoHero = as(vitalYouTube.Hero)(YouTubeClean);

const ExamplePage = () => (
  <ExampleWrapper>
    <VideoHero />
    ...
  </ExampleWrapper>
);
```

### Video Schema

Vital YouTube components may be used as a schema source for a Video entity. See the BodilessJS
Schema.org package's [Video Schema](/Components/Schema/#video-schema) documentation for more
information.

<!-- Inlining HTML to add multi-line warning block with unordered list. -->
<div class="tip">
  <strong>IMPORTANT:</strong> Structured data for YouTube videos is only fetched if you provide a
  valid API key.

  While you can set the `BODILESS_GOOGLE_YOUTUBE_API_KEY` in your site's `.env` file, this is
  **not recommended**, as it exposes the API key to anyone with access to your source code.

  The recommended approach is to set this environment variable per your platform's directions.  
  For example:

  - [Configure environments : Variables](https://docs.platform.sh/administration/web/configure-environment.html#variables ':target=_blank') | Platform.sh Documentation
  - [Managing Environment Variables](https://support.gatsbyjs.com/hc/en-us/articles/360053096753-Managing-Environment-Variables ':target=_blank') | Gatsby Cloud

</div>
