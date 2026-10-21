import { JSX } from 'react';
import { Image, ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | ImageField | undefined>;

const CardCarousel = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-cards">
    <ul>
      {[1, 2, 3, 4].map((slot) => {
        const title = fields?.[`Card${slot}Title`] as TextField | undefined;
        const text = fields?.[`Card${slot}Text`] as TextField | undefined;
        const image = fields?.[`Card${slot}Image`] as ImageField | undefined;
        if (!title?.value) return null;
        return (
          <li key={slot}>
            <Image field={image} />
            <strong>
              <Text field={title} />
            </strong>
            <p>
              <Text field={text} />
            </p>
          </li>
        );
      })}
    </ul>
  </section>
);

export const Default = CardCarousel;
export default CardCarousel;
