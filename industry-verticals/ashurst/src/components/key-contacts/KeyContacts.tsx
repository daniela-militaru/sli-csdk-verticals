import { JSX } from 'react';
import { ImageField, Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { FieldImage } from 'src/lib/field-image';

type Fields = {
  Title?: TextField;
  Contact1Name?: TextField;
  Contact1Role?: TextField;
  Contact1Image?: ImageField;
  Contact1Link?: LinkField;
  Contact2Name?: TextField;
  Contact2Role?: TextField;
  Contact2Image?: ImageField;
  Contact2Link?: LinkField;
  Contact3Name?: TextField;
  Contact3Role?: TextField;
  Contact3Image?: ImageField;
  Contact3Link?: LinkField;
  Contact4Name?: TextField;
  Contact4Role?: TextField;
  Contact4Image?: ImageField;
  Contact4Link?: LinkField;
};
type Props = ComponentProps & { fields?: Fields };

const Person = ({
  name,
  role,
  image,
  link,
}: {
  name?: TextField;
  role?: TextField;
  image?: ImageField;
  link?: LinkField;
}): JSX.Element | null => {
  if (!name?.value) return null;
  const card = (
    <>
      <figure>
        <FieldImage field={image} mode="cover" />
      </figure>
      <h3>
        <Text field={name} />
      </h3>
      <p>
        <Text field={role} />
      </p>
    </>
  );
  return (
    <article className="ash-contact">
      {link?.value?.href ? (
        <Link field={link} showLinkTextWithChildrenPresent={false}>
          {card}
        </Link>
      ) : (
        card
      )}
    </article>
  );
};

const Contacts = ({ fields, params, rendering }: Props): JSX.Element => (
  <section
    className={`ash-contacts ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <div className="ash-contact-grid">
      <Person
        name={fields?.Contact1Name}
        role={fields?.Contact1Role}
        image={fields?.Contact1Image}
        link={fields?.Contact1Link}
      />
      <Person
        name={fields?.Contact2Name}
        role={fields?.Contact2Role}
        image={fields?.Contact2Image}
        link={fields?.Contact2Link}
      />
      <Person
        name={fields?.Contact3Name}
        role={fields?.Contact3Role}
        image={fields?.Contact3Image}
        link={fields?.Contact3Link}
      />
      <Person
        name={fields?.Contact4Name}
        role={fields?.Contact4Role}
        image={fields?.Contact4Image}
        link={fields?.Contact4Link}
      />
    </div>
  </section>
);

export const Default = (props: Props): JSX.Element => <Contacts {...props} />;
export const Animated = (props: Props): JSX.Element => <Contacts {...props} />;
