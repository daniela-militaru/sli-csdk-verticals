import { JSX } from 'react';
import { Image, ImageField, Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Logo?: ImageField;
  SignInLabel?: TextField;
  QuoteLink?: LinkField;
  SelfStorageLink?: LinkField;
  BusinessLabel?: TextField;
  StoresLink?: LinkField;
  BoxesLabel?: TextField;
  OfficeLabel?: TextField;
};

const Header = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <header className="as-header">
    <div className="as-wrap as-header-bar">
      <a className="as-logo" href="/">
        <Image field={fields?.Logo} />
      </a>
      <nav className="as-nav">
        {fields?.SelfStorageLink ? <Link field={fields.SelfStorageLink} /> : null}
        <span>
          <Text field={fields?.BusinessLabel} />
        </span>
        {fields?.StoresLink ? <Link field={fields.StoresLink} /> : null}
        <span>
          <Text field={fields?.BoxesLabel} />
        </span>
        <span>
          <Text field={fields?.OfficeLabel} />
        </span>
      </nav>
      <span className="as-signin">
        <Text field={fields?.SignInLabel} />
      </span>
      {fields?.QuoteLink ? <Link className="as-btn" field={fields.QuoteLink} /> : null}
    </div>
  </header>
);

export const Default = Header;
export default Header;
