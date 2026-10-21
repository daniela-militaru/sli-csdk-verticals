import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: TextField;
  Intro?: TextField;
  Body?: RichTextField;
  MoreLabel?: TextField;
  LessLabel?: TextField;
};

const ExpandableCopy = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-copy">
    <div className="as-wrap">
      <h2>
        <Text field={fields?.Title} />
      </h2>
      <p>
        <Text field={fields?.Intro} />
      </p>
      <details>
        <summary>
          <Text field={fields?.MoreLabel} />
        </summary>
        <RichText field={fields?.Body} />
        <p>
          <Text field={fields?.LessLabel} />
        </p>
      </details>
    </div>
  </section>
);

export const Default = ExpandableCopy;
export default ExpandableCopy;
