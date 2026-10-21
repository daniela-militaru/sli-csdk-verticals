import { JSX } from 'react';
import { Image, ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | ImageField | undefined> & { Title?: TextField };

const UseCaseGrid = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-grid">
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <ul>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((slot) => {
        const title = fields?.[`Card${slot}Title`] as TextField | undefined;
        const image = fields?.[`Card${slot}Image`] as ImageField | undefined;
        if (!title?.value) return null;
        return (
          <li key={slot}>
            <Image field={image} />
            <span>
              <Text field={title} />
            </span>
          </li>
        );
      })}
    </ul>
  </section>
);

export const Default = UseCaseGrid;
export default UseCaseGrid;
