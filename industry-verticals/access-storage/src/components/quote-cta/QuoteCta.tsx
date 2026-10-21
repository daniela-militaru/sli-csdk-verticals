import { JSX } from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = { Title?: TextField; Link?: LinkField };

const QuoteCta = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-cta">
    <div
      className="as-wrap"
      style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
    >
      <h2>
        <Text field={fields?.Title} />
      </h2>
      {fields?.Link ? <Link className="as-btn" field={fields.Link} /> : null}
    </div>
  </section>
);

export const Default = QuoteCta;
export default QuoteCta;
