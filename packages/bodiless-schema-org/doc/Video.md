# Video Schema

JSON-LD following the VideoObject schema can be generated for ([YouTube](/Components/YouTube))
videos on your site.

## Site Builder Details

The Video schema utilizes the YouTube Data API to gather the relevant data.

**See:** [YouTube Data API Reference (v3)](https://developers.google.com/youtube/v3/docs) | Google
Developers

| Schema Field   | YouTube Data API Value                     |
| -------------- | ------------------------------------------ |
| `name`         | `video.snippet.title`                      |
| `description`  | `video.snippet.description`                |
| `thumbnailUrl` | `video.snippet.thumbnails.standard != null` <br/> `  ? video.snippet.thumbnails.standard.url` <br/> `  : video.snippet.thumbnails.default.url` |
| `uploadDate`   | `video.snippet.publishedAt`                |
| `duration`     | `video.contentDetails.duration`            |
| `contentUrl`   | `https://youtube.com/watch/?v=${video.id}` |
| `embedUrl`     | `https://youtube.com/watch/?v=${video.id}` |
| `url`          | `https://youtube.com/watch/?v=${video.id}` |

01. Get data:

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

      SEO: {
        Item: asSchemaSource('youtube-iframe'),
      },
    ```

01. Return data:

    ```tsx
    import { WithVideoSchema } from '@bodiless/schema-org';

      SEO: {
        Wrapper: WithVideoSchema,
      },
    ```

01. Set provider in page component:

    ```tsx
    import { StructuredDataProvider } from '@bodiless/schema-org';

        <StructuredDataProvider>
          <Layout>
            ...
          </Layout>
        </StructuredDataProvider>
    ```

01. Define API key in `.env.site`:

    ```shell
    BODILESS_GOOGLE_YOUTUBE_API_KEY=your-youtube-api-key
    ```

!>  **IMPORTANT:** The compatible API is **Version 3 (v3)** of the YouTube Data API.  
    **See:** [YouTube Data API Reference (v3)](https://developers.google.com/youtube/v3/docs ':target=_blank')
    | Google Developers

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

For further information regarding the definition of the Video data type, see:

- [VideoObject](https://schema.org/VideoObject ':target=_blank') | Schema.org
- [Get videos on Google with schema markup : VideoObject](https://developers.google.com/search/docs/advanced/structured-data/video#video-object ':target=_blank') | Google Search Central