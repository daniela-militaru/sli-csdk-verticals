import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | undefined>;

const TrustBar = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-trust">
    {[1, 2, 3, 4].map((slot) => {
      const title = fields?.[`Item${slot}Title`];
      const text = fields?.[`Item${slot}Text`];
      return (
        <article key={slot}>
          <strong>
            <Text field={title} />
          </strong>
          <p>
            <Text field={text} />
          </p>
        </article>
      );
    })}
  </section>
);

export const Default = TrustBar;
export default TrustBar;
