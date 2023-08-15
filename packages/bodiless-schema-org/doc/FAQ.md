### FAQ Schema

JSON-LD following the FAQPage schema can be generated on your pages using Questions and Answers.

1. If you didn't already, place the `withStructuredDataProvider` HOC on your page. It collects
all of your page schemas, so only place it once, and as close to your page root as possible:

    ```tsx
    import { withStructuredDataProvider } from '@bodiless/schema-org';

    const ExamplePage = asFluidToken({
      SEO: {
        _: withStructuredDataProvider,
      },
    });
    ```

1. Place `withFAQSchema` on your page. This HOC creates a context that collects
all questions and answers inside it. This HOC depends on the `StructuredDataProvider`, so place it
somewhere down below `withStructuredDataProvider` in the element tree:

    ```tsx
    import { withFAQSchema, withStructuredDataProvider } from '@bodiless/schema-org';

    const ExamplePage = asFluidToken({
      SEO: {
        _: withStructuredDataProvider, // This should be around withFAQSchema, which means...
        Wrapper: withFAQSchema, // ...that this could be anywhere inside withStructuredDataProvider.
      },
    });
    ```

1. Finally, get each question and its answer content using `asSchemaSource`:

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

    // This could be an accordion token, for instance.
    const Example = asFluidToken({
      SEO: {
        Title: asSchemaSource('faq-question'),
        Content: asSchemaSource('faq-answer'),
      },
    });
    ```

An example of the returned JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@name": "Questions and answers",
  "mainEntity": [
    {
      "@type": "Question",
      "name":"Question Title", 
      "acceptedAnswer": 
        {
          "@type": "Answer",
          "text":"This is the answer of the question."
        }
    }
  ]
}
```

For further information regarding the definition of the FAQPage and Offer data types, see:

- **FAQPage:**
  - [FAQPage](https://schema.org/FAQPage) | Schema.org
- **Question:**
  - [Question](https://schema.org/Question) | Schema.org
- **Answer:**
  - [Answer](https://schema.org/Answer) | Schema.org

#### FAQ Schema Keys

- `faq-question`: The title of the question.
- `faq-answer`: The answer of the question.

> Only a single FAQPage entity should be created per page, but a FAQPage may contain any number of 
> Questions and Answers, as long as each question only have one answer.
