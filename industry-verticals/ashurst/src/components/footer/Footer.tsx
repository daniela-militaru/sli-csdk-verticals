import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';

type Fields = {
  ColumnOneTitle?: TextField;
  ColumnOneLinks?: RichTextField;
  ColumnTwoTitle?: TextField;
  ColumnTwoLinks?: RichTextField;
  ColumnThreeTitle?: TextField;
  ColumnThreeLinks?: RichTextField;
  Copyright?: TextField;
};
type Props = ComponentProps & { fields?: Fields };

const FooterView = ({
  fields,
  params,
  rendering,
  animated,
}: Props & { animated?: boolean }): JSX.Element => {
  const grid = (
    <div className="ash-footer-grid">
      <a className="ash-logo" href="/">
        ASHURST
        <br />
        PERKINS
        <br />
        COIE
      </a>
      <div>
        <h2>
          <Text field={fields?.ColumnOneTitle} />
        </h2>
        <RichText field={fields?.ColumnOneLinks} />
      </div>
      <div>
        <h2>
          <Text field={fields?.ColumnTwoTitle} />
        </h2>
        <RichText field={fields?.ColumnTwoLinks} />
      </div>
      <div>
        <h2>
          <Text field={fields?.ColumnThreeTitle} />
        </h2>
        <RichText field={fields?.ColumnThreeLinks} />
      </div>
    </div>
  );
  return (
    <footer
      className={`ash-footer ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      {animated ? <AnimateIn>{grid}</AnimateIn> : grid}
      <p>
        <Text field={fields?.Copyright} />
      </p>
    </footer>
  );
};

export const Default = (props: Props): JSX.Element => <FooterView {...props} />;
export const Animated = (props: Props): JSX.Element => <FooterView {...props} animated />;
