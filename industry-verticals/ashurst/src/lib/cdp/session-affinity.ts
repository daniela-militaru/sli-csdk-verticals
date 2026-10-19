'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CDP_EVENT, getSessionEvents, getVisitCount } from 'src/lib/cdp/cdp-session-tracker';

export type ShopperIntent = 'new' | 'returning' | 'search' | 'browse';

export type SessionAffinity = {
  topics: Record<string, number>;
  industries: Record<string, number>;
  searches: string[];
  intent: ShopperIntent;
  visits: number;
};

const EMPTY: SessionAffinity = {
  topics: {},
  industries: {},
  searches: [],
  intent: 'new',
  visits: 0,
};

function bump(map: Record<string, number>, key: string, amount = 1): void {
  if (!key) return;
  map[key] = (map[key] || 0) + amount;
}

export function readSessionAffinity(): SessionAffinity {
  const topics: Record<string, number> = {};
  const industries: Record<string, number> = {};
  const searches: string[] = [];
  let views = 0;

  getSessionEvents().forEach((event) => {
    const data = event.arbitraryData || {};
    if (event.type === 'SEARCH' && typeof data.query === 'string') {
      searches.push(data.query.toLowerCase());
    }
    const weight = event.type === 'SEARCH' ? 2 : event.type === 'VIEW' ? 1 : 0;
    if (event.type === 'VIEW') views += 1;
    if (!weight) return;
    const raw = data.affinities;
    if (!Array.isArray(raw)) return;
    raw.forEach((row) => {
      if (!row || typeof row !== 'object') return;
      const name = String((row as { name?: string }).name || '');
      const value = String((row as { value?: string }).value || '');
      if (name === 'topic') bump(topics, value, weight);
      if (name === 'industry') bump(industries, value, weight);
    });
  });

  const visits = getVisitCount();
  let intent: ShopperIntent = 'new';
  if (visits > 1) intent = 'returning';
  else if (searches.length > 0) intent = 'search';
  else if (views > 0) intent = 'browse';

  return { topics, industries, searches, intent, visits };
}

export function useShopper(): SessionAffinity {
  const router = useRouter();
  const [shopper, setShopper] = useState<SessionAffinity>(EMPTY);

  useEffect(() => {
    const refresh = () => setShopper(readSessionAffinity());
    refresh();
    window.addEventListener(CDP_EVENT, refresh);
    return () => window.removeEventListener(CDP_EVENT, refresh);
  }, [router.asPath]);

  return shopper;
}
