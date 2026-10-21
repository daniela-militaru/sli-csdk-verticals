import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | undefined>;

const LinkRow = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-links">
    {[1, 2, 3].map((slot) => {
      const title = fields?.[`Card${slot}Title`];
      const text = fields?.[`Card${slot}Text`];
      return (
        <article key={slot}>
          <h3>
            <Text field={title} />
          </h3>
          <p>
            <Text field={text} />
          </p>
        </article>
      );
    })}
  </section>
);

export const Default = LinkRow;
export default LinkRow;
