import { JSX } from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | LinkField | undefined> & {
  Title?: TextField;
  Intro?: TextField;
  Link?: LinkField;
};

const UnitSizes = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-sizes">
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <p>
      <Text field={fields?.Intro} />
    </p>
    <ul>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => {
        const size = fields?.[`Size${slot}`] as TextField | undefined;
        if (!size?.value) return null;
        return (
          <li key={slot}>
            <Text field={size} />
          </li>
        );
      })}
    </ul>
    {fields?.Link ? <Link className="as-btn" field={fields.Link} /> : null}
  </section>
);

export const Default = UnitSizes;
export default UnitSizes;
