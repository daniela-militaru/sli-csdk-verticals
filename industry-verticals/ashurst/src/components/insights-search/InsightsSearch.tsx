import { JSX, useEffect, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { recordSearchEvent } from 'src/lib/cdp/cdp-session-tracker';
import { filterInsights } from 'src/lib/insights';

type Props = ComponentProps & { fields?: { Title?: TextField; Placeholder?: TextField } };

const Search = ({ fields, params, rendering }: Props): JSX.Element => {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(4);
  const results = useMemo(() => filterInsights(query), [query]);
  useEffect(() => {
    const value = query.trim();
    if (value.length < 2) return undefined;
    const timer = window.setTimeout(() => recordSearchEvent(value, 'insights'), 400);
    return () => window.clearTimeout(timer);
  }, [query]);
  return (
    <section
      className={`ash-search-page ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <h2>
        <Text field={fields?.Title} />
      </h2>
      <div className="ash-search-bar">
        <input
          value={query}
          placeholder={
            fields?.Placeholder?.value?.toString() || 'Enter key words e.g. corporate, tax.'
          }
          aria-label="Search all insights"
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(4);
          }}
        />
      </div>
      <div className="ash-search-meta">
        <span>{results.length} results</span>
        <span>Latest</span>
      </div>
      {results.slice(0, visible).map((item) => (
        <a className="ash-result-row" key={item.title} href={item.href}>
          <div>
            <p className="ash-kicker">{item.tag}</p>
            <p>{item.date}</p>
          </div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </div>
        </a>
      ))}
      {visible < results.length ? (
        <button
          className="ash-button"
          type="button"
          onClick={() => setVisible((count) => count + 4)}
        >
          Load more
        </button>
      ) : null}
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Search {...props} />;
export const Animated = (props: Props): JSX.Element => <Search {...props} />;
