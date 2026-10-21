import { JSX } from 'react';
import {
  Image,
  ImageField,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { QuoteForm } from 'src/lib/quote-form';

type Fields = {
  Title?: TextField;
  Intro?: RichTextField;
  Placeholder?: TextField;
  ButtonLabel?: TextField;
  ButtonLink?: LinkField;
  Image?: ImageField;
};

const PageHero = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-page-hero">
    <div className="as-page-hero-copy">
      <p className="as-crumb">Home / Self storage</p>
      <h1>
        <Text field={fields?.Title} />
      </h1>
      <RichText field={fields?.Intro} />
      <QuoteForm
        placeholder={fields?.Placeholder}
        buttonLabel={fields?.ButtonLabel}
        buttonLink={fields?.ButtonLink}
      />
    </div>
    <div className="as-page-hero-media">
      <Image field={fields?.Image} />
    </div>
  </section>
);

export const Default = PageHero;
export default PageHero;
