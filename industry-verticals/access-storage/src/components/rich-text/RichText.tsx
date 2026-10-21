import { JSX } from 'react';
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

const RichTextView = ({
  fields,
}: ComponentProps & { fields?: { Body?: RichTextField } }): JSX.Element => (
  <section className="as-wrap as-rich">
    <RichText field={fields?.Body} />
  </section>
);

export const Default = RichTextView;
export default RichTextView;
