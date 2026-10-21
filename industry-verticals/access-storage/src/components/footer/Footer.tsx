import { JSX } from 'react';
import { Image, ImageField, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = { Logo?: ImageField; Columns?: RichTextField; Legal?: RichTextField };

const Footer = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <footer className="as-footer">
    <div className="as-wrap as-footer-top">
      <Image field={fields?.Logo} />
      <RichText field={fields?.Columns} />
      <RichText field={fields?.Legal} />
    </div>
  </footer>
);

export const Default = Footer;
export default Footer;
