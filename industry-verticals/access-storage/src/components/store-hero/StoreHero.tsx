import { JSX } from 'react';
import {
  Image,
  ImageField,
  Link,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Crumb?: RichTextField;
  Title?: TextField;
  Offer?: TextField;
  Subtitle?: TextField;
  Link?: LinkField;
  Image1?: ImageField;
  Image2?: ImageField;
  Image3?: ImageField;
  Image4?: ImageField;
};

const StoreHero = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-store-hero">
    <div className="as-wrap as-store-hero-grid">
      <div>
        <div className="as-crumb">
          <RichText field={fields?.Crumb} />
        </div>
        <h1>
          <Text field={fields?.Title} />
        </h1>
        <p className="as-store-offer">
          <Text field={fields?.Offer} />
        </p>
        <p>
          <Text field={fields?.Subtitle} />
        </p>
        {fields?.Link ? <Link className="as-btn" field={fields.Link} /> : null}
      </div>
      <ul className="as-store-gallery">
        {[1, 2, 3, 4].map((slot) => {
          const image = fields?.[`Image${slot}` as 'Image1'];
          if (!image?.value?.src) return null;
          return (
            <li key={slot}>
              <Image field={image} />
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export const Default = StoreHero;
export default StoreHero;
