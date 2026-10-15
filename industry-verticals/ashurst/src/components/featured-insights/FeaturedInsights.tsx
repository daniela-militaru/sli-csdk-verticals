import { JSX } from 'react';
import { ImageField, Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { FieldImage } from 'src/lib/field-image';

type Fields = {
  Card1Image?: ImageField;
  Card1Tag?: TextField;
  Card1Title?: TextField;
  Card1Date?: TextField;
  Card1Link?: LinkField;
  Card2Image?: ImageField;
  Card2Tag?: TextField;
  Card2Title?: TextField;
  Card2Date?: TextField;
  Card2Link?: LinkField;
  Card3Image?: ImageField;
  Card3Tag?: TextField;
  Card3Title?: TextField;
  Card3Date?: TextField;
  Card3Link?: LinkField;
};
type Props = ComponentProps & { fields?: Fields };

const Card = ({
  image,
  tag,
  title,
  date,
  link,
}: {
  image?: ImageField;
  tag?: TextField;
  title?: TextField;
  date?: TextField;
  link?: LinkField;
}): JSX.Element => (
  <article className="ash-card">
    <figure>
      <FieldImage field={image} mode="cover" />
    </figure>
    <p className="ash-kicker">
      <Text field={tag} />
    </p>
    <h2>
      <Text field={title} />
    </h2>
    <p>
      <Text field={date} />
    </p>
    {link ? <Link field={link} className="ash-button" /> : null}
  </article>
);

const Grid = ({ fields, params, rendering }: Props): JSX.Element => (
  <section
    className={`ash-featured ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <Card
      image={fields?.Card1Image}
      tag={fields?.Card1Tag}
      title={fields?.Card1Title}
      date={fields?.Card1Date}
      link={fields?.Card1Link}
    />
    <Card
      image={fields?.Card2Image}
      tag={fields?.Card2Tag}
      title={fields?.Card2Title}
      date={fields?.Card2Date}
      link={fields?.Card2Link}
    />
    <Card
      image={fields?.Card3Image}
      tag={fields?.Card3Tag}
      title={fields?.Card3Title}
      date={fields?.Card3Date}
      link={fields?.Card3Link}
    />
  </section>
);

export const Default = (props: Props): JSX.Element => <Grid {...props} />;
export const Animated = (props: Props): JSX.Element => <Grid {...props} />;
