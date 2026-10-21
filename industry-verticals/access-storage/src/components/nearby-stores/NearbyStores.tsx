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
  Title?: TextField;
  Card1Title?: TextField;
  Card1Text?: RichTextField;
  Card1Image?: ImageField;
  Card1Link?: LinkField;
  Card2Title?: TextField;
  Card2Text?: RichTextField;
  Card2Image?: ImageField;
  Card2Link?: LinkField;
};

const NearbyStores = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-nearby">
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <ul>
      {[1, 2].map((slot) => {
        const title = fields?.[`Card${slot}Title` as 'Card1Title'];
        const text = fields?.[`Card${slot}Text` as 'Card1Text'];
        const image = fields?.[`Card${slot}Image` as 'Card1Image'];
        const link = fields?.[`Card${slot}Link` as 'Card1Link'];
        if (!title?.value) return null;
        return (
          <li key={slot}>
            <Image field={image} />
            <h3>
              <Text field={title} />
            </h3>
            <RichText field={text} />
            {link ? <Link className="as-btn" field={link} /> : null}
          </li>
        );
      })}
    </ul>
  </section>
);

export const Default = NearbyStores;
export default NearbyStores;
