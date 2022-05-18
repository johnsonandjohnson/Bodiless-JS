# VitalDS YouTube Component

VitalDS YouTube is based on [@bodiless/youtube](../../bodiless/Components/YouTube) component. It adds features and styles specific to VitalDS sites.

## Site Builder Details

## Hero Video

The `vitalYouTube` token collection includes a `Hero` token, which renders a 16:9, full-width video
player and automatically adds related structured data (JSON-LD) into the page. Example usage:

```js
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

# Schema.org

VitalDS YouTube components may be used as a schema source for a Video entity. See 
[@bodiless/schema-org docs](../../bodiless/Components/Schema) for more information.