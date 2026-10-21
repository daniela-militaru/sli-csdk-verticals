import { JSX } from 'react';
import {
  Image,
  ImageField,
  Link,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = { Title?: TextField; Body?: RichTextField; Link?: LinkField; Image?: ImageField };

const ContentSplit = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-split">
    <Image field={fields?.Image} />
    <div>
      <h2>
        <Text field={fields?.Title} />
      </h2>
      <RichText field={fields?.Body} />
      {fields?.Link ? <Link className="as-btn" field={fields.Link} /> : null}
    </div>
  </section>
);

export const Default = ContentSplit;
export default ContentSplit;
