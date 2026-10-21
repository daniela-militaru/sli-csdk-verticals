import { JSX } from 'react';
import {
  Link,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | RichTextField | LinkField | undefined> & {
  Link?: LinkField;
};

const OfferBand = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-offers">
    <div
      className="as-wrap"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
    >
      {[1, 2, 3].map((slot) => {
        const title = fields?.[`Card${slot}Title`] as TextField | undefined;
        const text = fields?.[`Card${slot}Text`] as RichTextField | undefined;
        return (
          <article key={slot}>
            <h3>
              <Text field={title} />
            </h3>
            <RichText field={text} />
          </article>
        );
      })}
    </div>
    <p className="as-wrap">
      {fields?.Link ? <Link className="as-btn" field={fields.Link} /> : null}
    </p>
  </section>
);

export const Default = OfferBand;
export default OfferBand;
