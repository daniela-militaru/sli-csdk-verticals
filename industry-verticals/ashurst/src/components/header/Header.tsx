import { JSX } from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';

type HeaderFields = {
  SearchLabel?: TextField;
  PeopleLabel?: TextField;
  WhoWeAreLabel?: TextField;
  WhatWeDoLabel?: TextField;
  SectorsLabel?: TextField;
  PrivateCapitalLabel?: TextField;
  InsightsLabel?: TextField;
  InsightsLink?: LinkField;
  LocationsLabel?: TextField;
  CareersLabel?: TextField;
};

type HeaderProps = ComponentProps & { fields?: HeaderFields };

const Labels = ({ fields }: { fields?: HeaderFields }): JSX.Element => (
  <>
    <span>
      <Text field={fields?.PeopleLabel} />
    </span>
    <span>
      <Text field={fields?.WhoWeAreLabel} />
    </span>
    <span>
      <Text field={fields?.WhatWeDoLabel} />
    </span>
    <span>
      <Text field={fields?.SectorsLabel} />
    </span>
    <span>
      <Text field={fields?.PrivateCapitalLabel} />
    </span>
    {fields?.InsightsLink ? (
      <Link field={fields.InsightsLink} />
    ) : (
      <Text field={fields?.InsightsLabel} />
    )}
    <span>
      <Text field={fields?.LocationsLabel} />
    </span>
    <span>
      <Text field={fields?.CareersLabel} />
    </span>
  </>
);

const HeaderView = ({
  fields,
  params,
  rendering,
  animated,
}: HeaderProps & { animated?: boolean }): JSX.Element => {
  const openSearch = () => window.dispatchEvent(new CustomEvent('ashurst-search-open'));
  const nav = (
    <nav className="ash-nav">
      <Labels fields={fields} />
    </nav>
  );
  return (
    <div
      className={`ash-header ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <a className="ash-logo" href="/">
        ASHURST
        <br />
        PERKINS
        <br />
        COIE
      </a>
      {animated ? <AnimateIn>{nav}</AnimateIn> : nav}
      <button className="ash-search-btn" type="button" onClick={openSearch}>
        <Text field={fields?.SearchLabel} />
      </button>
    </div>
  );
};

export const Default = (props: HeaderProps): JSX.Element => <HeaderView {...props} />;
export const Animated = (props: HeaderProps): JSX.Element => <HeaderView {...props} animated />;
