import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | undefined> & { Title?: TextField };

const BenefitList = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-benefits">
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <ul>
      {[1, 2, 3, 4, 5, 6].map((slot) => {
        const text = fields?.[`Item${slot}Text`];
        if (!text?.value) return null;
        return (
          <li key={slot}>
            <Text field={text} />
          </li>
        );
      })}
    </ul>
  </section>
);

export const Default = BenefitList;
export default BenefitList;
