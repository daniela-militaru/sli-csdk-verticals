import { JSX } from 'react';
import { Image, ImageField, Text, TextField, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { QuoteForm } from 'src/lib/quote-form';

type Fields = {
  Title?: TextField;
  Subtitle?: TextField;
  Placeholder?: TextField;
  ButtonLabel?: TextField;
  ButtonLink?: LinkField;
  Image?: ImageField;
};

const QuoteHero = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-hero">
    <div className="as-hero-copy">
      <h1>
        <Text field={fields?.Title} />
      </h1>
      <p>
        <Text field={fields?.Subtitle} />
      </p>
      <QuoteForm
        placeholder={fields?.Placeholder}
        buttonLabel={fields?.ButtonLabel}
        buttonLink={fields?.ButtonLink}
      />
    </div>
    <div className="as-hero-media">
      <Image field={fields?.Image} />
    </div>
  </section>
);

export const Default = QuoteHero;
export default QuoteHero;
