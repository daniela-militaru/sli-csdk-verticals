import { JSX, useEffect, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { filterInsights } from 'src/lib/insights';

type Fields = { Placeholder?: TextField; InsightsTitle?: TextField; PeopleTitle?: TextField };
type Props = ComponentProps & { fields?: Fields };

const SearchPanel = ({ fields, params, rendering }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener('ashurst-search-open', openPanel);
    return () => window.removeEventListener('ashurst-search-open', openPanel);
  }, []);
  const results = useMemo(() => filterInsights(query).slice(0, 4), [query]);
  if (!open) return <div key={params?.RenderingIdentifier ?? rendering?.uid} hidden />;
  return (
    <div className="ash-overlay" key={params?.RenderingIdentifier ?? rendering?.uid}>
      <div className="ash-overlay-panel">
        <input
          value={query}
          placeholder={fields?.Placeholder?.value?.toString() || 'Enter a search term'}
          aria-label="Search the website by keyword"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="ash-results">
          <div>
            <h2>
              <Text field={fields?.InsightsTitle} />
            </h2>
            {results.map((item) => (
              <a key={item.href + item.title} href={item.href}>
                {item.title}
              </a>
            ))}
          </div>
          <div>
            <h2>
              <Text field={fields?.PeopleTitle} />
            </h2>
            <p>People search is available when a people catalog is published.</p>
          </div>
        </div>
        <button className="ash-button" type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export const Default = (props: Props): JSX.Element => <SearchPanel {...props} />;
export const Animated = (props: Props): JSX.Element => <SearchPanel {...props} />;
