import { JSX } from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = { Text?: TextField; Link?: LinkField };

const PromoBar = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <div className="as-promo">
    <Text field={fields?.Text} /> {fields?.Link ? <Link field={fields.Link} /> : null}
  </div>
);

export const Default = PromoBar;
export default PromoBar;
