# YouTube Component

The YouTube Component can be used to place a [YouTube video](https://www.youtube.com/) on a page via the
BodilessJS edit interface. The YouTube Component is responsive and features 
a 16:9 ratio by default. 

## Content Editor Details

To add a YouTube Component to your site:

1. In Edit Mode, select the YouTube Component from the Component Library.
![](./assets/YoutubeComponentLibrary.jpg)

2. Click on the YouTube Component to show the Configure button in the context menu. 
![](./assets/YoutubeFlow.jpg)

3. Enter the target YouTube URL and click the checkmark or hit enter.

?> Please note the following accepted URL formats:

  * **Share** (e.g. https://youtu.be/Rqla3gsl1Ik)
  * **Watch** (e.g. https://www.youtube.com/watch?v=Rqla3gsl1Ik)
  * **Embed** (e.g. https://www.youtube.com/embed/Rqla3gsl1Ik)

4. Resize or reposition the YouTube component using the Flow Container controls.


---

## Site Builder Details

The YouTube Component can be used to place a YouTube video on a page via the 
BodilessJS edit interface.

?> Please note that the [Embed Component](../../../Components/Embed) must be activated on your site for the YouTube Component to work.


``` js
  import { YouTube } from '@bodiless/components';

  <YouTube nodeKey="youtube" />
  ```

You can also use the HOC version of this which can then be applied to 
other components. But the underlining component must accept the same props
as an `iframe` tag. Simply pass the node key to the asBodilessYouTube function
and then use the returned HOC

  ``` js
  import { CustomYouTube } from 'my-library';
  import { asBodilessYouTube } from '@bodiless/components';

  const YouTube = asBodilessYouTube('customYouTube')(CustomYouTube);

  <YouTube />
  ```

You can configure YouTube player settings leveraging withYouTubePlayerSettings 
HOC. For example, to configure AutoPlay for the YouTube component:

  ``` js
  import { YouTube } from '@bodiless/components';

  const AutoPlayYouTube = withYouTubePlayerSettings({
    autoplay: true,
    mute: true,
  })(YouTube);

  <AutoPlayYouTube nodeKey="youtube" />
  ```

### Props

| name           | default   | description                                                                         |
|----------------|-----------|-------------------------------------------------------------------------------------|
| nodeKey        | undefined | Identifies where the component data will be stored.                                 |
| playerSettings | undefined | YouTube embed player settings. Check YouTubePlayerSettings type from 'Youtube.tsx'. |

In addition, you can pass `HTMLIFrameElement` props (id, src, width, etc.). Check `HTMLIFrameElement` type for more details.

### `playerSettings` Parameters 

The YouTube Component utilizes an API that allows you to change the following
properties/parameters. You can use defaultPlayerSettings to set parameters that
are commonly used together. For more details on each individual parameter see [YouTube Player API Reference for iframe Embeds](https://developers.google.com/youtube/iframe_api_reference). 


| Parameters | Suggested Default | 
| -------- | -------- |
| autoplay     | 0     |
| cc_lang_pref    | no default    |
| cc_load_policy	| 0 |
| controls |	1 |
| loop |	0 |
| enablejsapi  | 	1 |
| modestbranding |	1 |
| origin |	canonical URL |
| rel |	0 |
| mute | |
| version | |
| playlist | |


e.g.: Responsive YouTube with 16:9 ratio with custom language preferences:


```
const withCustomLangPref = flowRight(
  withYouTubePlayerSettings({
    ...defaultPlayerSettings,
    cc_lang_pref: 'de',
    cc_load_policy: 1,
  }),
  addProps({
    src: 'https://www.youtube.com/embed/9No-FiEInLA',
  }),
);

const YouTubeWithCustomLangPref = withDesign({
  Item: withCustomLangPref,
})(DefaultReponsive16By9YouTube);
```

### Usage

```
<YouTubeWithCustomLangPref nodeKey="withLangPref" />
```

---

## Architectural Details

The YouTube Component renders the following code:

```
<iframe id="player" type="text/html" 
  src=""
  frameborder="0">
</iframe>
```

?> There are optional parameters on the src that are configurable.
