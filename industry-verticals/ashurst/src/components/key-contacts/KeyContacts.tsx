import { JSX } from 'react';
import { ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { FieldImage } from 'src/lib/field-image';

type Fields = {
  Title?: TextField;
  Contact1Name?: TextField;
  Contact1Role?: TextField;
  Contact1Image?: ImageField;
  Contact2Name?: TextField;
  Contact2Role?: TextField;
  Contact2Image?: ImageField;
  Contact3Name?: TextField;
  Contact3Role?: TextField;
  Contact3Image?: ImageField;
  Contact4Name?: TextField;
  Contact4Role?: TextField;
  Contact4Image?: ImageField;
};
type Props = ComponentProps & { fields?: Fields };

const Person = ({
  name,
  role,
  image,
}: {
  name?: TextField;
  role?: TextField;
  image?: ImageField;
}): JSX.Element | null => {
  if (!name?.value) return null;
  return (
    <article className="ash-contact">
      <figure>
        <FieldImage field={image} mode="cover" />
      </figure>
      <h3>
        <Text field={name} />
      </h3>
      <p>
        <Text field={role} />
      </p>
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
      />
      <Person
        name={fields?.Contact2Name}
        role={fields?.Contact2Role}
        image={fields?.Contact2Image}
      />
      <Person
        name={fields?.Contact3Name}
        role={fields?.Contact3Role}
        image={fields?.Contact3Image}
      />
      <Person
        name={fields?.Contact4Name}
        role={fields?.Contact4Role}
        image={fields?.Contact4Image}
      />
    </div>
  </section>
);

export const Default = (props: Props): JSX.Element => <Contacts {...props} />;
export const Animated = (props: Props): JSX.Element => <Contacts {...props} />;
