import { JSX } from 'react';
import { LinkField, RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { QuoteForm } from 'src/lib/quote-form';

type Fields = {
  Title?: TextField;
  Placeholder?: TextField;
  ButtonLabel?: TextField;
  ButtonLink?: LinkField;
  MapLabel?: TextField;
  Locations?: RichTextField;
};

const StoreFinder = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-finder">
    <div className="as-wrap">
      <p className="as-crumb">Home / Our stores</p>
      <h1>
        <Text field={fields?.Title} />
      </h1>
      <QuoteForm
        placeholder={fields?.Placeholder}
        buttonLabel={fields?.ButtonLabel}
        buttonLink={fields?.ButtonLink}
      />
      <p>
        <Text field={fields?.MapLabel} />
      </p>
      <div className="as-locations">
        <RichText field={fields?.Locations} />
      </div>
    </div>
  </section>
);

export const Default = StoreFinder;
export default StoreFinder;
