export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

export type CdpReferral = {
  referrer: string;
  channel: string;
  source: string;
  campaign: string;
};

export type CdpAffinity = {
  name: string;
  value: string;
};

const SESSION_ID_KEY = 'access-cdp-session-id';
const SESSION_EVENTS_KEY = 'access-cdp-session-events';
const VISIT_COUNT_KEY = 'access-cdp-visit-count';
const VISIT_FLAG_KEY = 'access-cdp-visit-recorded';
const GUEST_KEY = 'access-cdp-guest';
const EMAIL_KEY = 'access-cdp-email';
const REFERRAL_KEY = 'access-cdp-referral';
const EVENT_NAME = 'access-cdp';
const EVENT_LIMIT = 200;

const EMPTY_REFERRAL: CdpReferral = {
  referrer: 'Direct',
  channel: 'direct',
  source: 'direct',
  campaign: 'none',
};

const PERSISTED_KEYS = [SESSION_EVENTS_KEY, SESSION_ID_KEY, REFERRAL_KEY];

const INDUSTRIES: { test: RegExp; value: string }[] = [
  { test: /^\/$|self-storage/, value: 'Self storage' },
  { test: /our-stores/, value: 'Store finder' },
];

function migrateSessionStore(): void {
  if (typeof window === 'undefined') return;
  PERSISTED_KEYS.forEach((key) => {
    if (!window.localStorage.getItem(key)) {
      const legacy = window.sessionStorage.getItem(key);
      if (legacy) window.localStorage.setItem(key, legacy);
    }
    window.sessionStorage.removeItem(key);
  });
}

function readStored(key: string): string | null {
  if (typeof window === 'undefined') return null;
  migrateSessionStore();
  return window.localStorage.getItem(key);
}

function writeStored(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  migrateSessionStore();
  window.localStorage.setItem(key, value);
}

function readEvents(): CdpTrackedEvent[] {
  try {
    const raw = readStored(SESSION_EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CdpTrackedEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEvents(events: CdpTrackedEvent[]): void {
  if (typeof window === 'undefined') return;
  writeStored(SESSION_EVENTS_KEY, JSON.stringify(events.slice(-EVENT_LIMIT)));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function getSessionRef(): string {
  if (typeof window === 'undefined') return 'session_unknown';
  let id = readStored(SESSION_ID_KEY);
  if (!id) {
    id = `web_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    writeStored(SESSION_ID_KEY, id);
  }
  return id;
}

export function getGuestName(): string {
  if (typeof window === 'undefined') return 'Guest';
  return window.localStorage.getItem(GUEST_KEY) || 'Guest';
}

export function getGuestEmail(): string {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(EMAIL_KEY) || '';
}

export function identifyGuest(name: string, email = ''): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(GUEST_KEY, name);
  if (email) window.localStorage.setItem(EMAIL_KEY, email);
  appendCdpEvent({
    type: 'IDENTITY',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      name,
      email: email || getGuestEmail(),
      channel: 'web',
      event: email ? 'subscribe' : 'identify',
    },
  });
}

export function subscribeGuest(email: string): void {
  const name = email.split('@')[0]?.replace(/[._-]+/g, ' ') || 'Guest';
  identifyGuest(name, email);
}

export function captureReferral(search = ''): CdpReferral {
  if (typeof window === 'undefined') return EMPTY_REFERRAL;
  const stored = readStored(REFERRAL_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as CdpReferral;
    } catch {
      /* replace a bad value */
    }
  }
  const params = new URLSearchParams(search);
  const referrer = document.referrer || '';
  let source = params.get('utm_source') || '';
  if (!source && referrer) {
    try {
      source = new URL(referrer).hostname;
    } catch {
      source = referrer;
    }
  }
  const value: CdpReferral = {
    referrer: referrer || 'Direct',
    channel: params.get('utm_medium') || (referrer ? 'referral' : 'direct'),
    source: source || 'direct',
    campaign: params.get('utm_campaign') || 'none',
  };
  writeStored(REFERRAL_KEY, JSON.stringify(value));
  return value;
}

export function getReferral(): CdpReferral {
  if (typeof window === 'undefined') return EMPTY_REFERRAL;
  const stored = readStored(REFERRAL_KEY);
  if (!stored) return EMPTY_REFERRAL;
  try {
    return JSON.parse(stored) as CdpReferral;
  } catch {
    return EMPTY_REFERRAL;
  }
}

export function resetCdpSession(): void {
  if (typeof window === 'undefined') return;
  PERSISTED_KEYS.forEach((key) => {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  });
  window.localStorage.removeItem(VISIT_COUNT_KEY);
  window.localStorage.removeItem(GUEST_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
  window.sessionStorage.removeItem(VISIT_FLAG_KEY);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function recordVisitOnce(): number {
  if (typeof window === 'undefined') return 1;
  const already = window.sessionStorage.getItem(VISIT_FLAG_KEY);
  let count = Number.parseInt(window.localStorage.getItem(VISIT_COUNT_KEY) || '0', 10) || 0;
  if (!already) {
    count += 1;
    window.localStorage.setItem(VISIT_COUNT_KEY, String(count));
    window.sessionStorage.setItem(VISIT_FLAG_KEY, '1');
  }
  return count;
}

export function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;
  return Number.parseInt(window.localStorage.getItem(VISIT_COUNT_KEY) || '0', 10) || 0;
}

export function appendCdpEvent(event: CdpTrackedEvent): void {
  writeEvents([...readEvents(), event]);
}

export function getSessionEvents(): CdpTrackedEvent[] {
  return readEvents();
}

export function pageAffinitiesForPath(path: string): CdpAffinity[] {
  const normalized = path.toLowerCase();
  const pairs: CdpAffinity[] = [];
  if (normalized === '/' || normalized === '') {
    pairs.push({ name: 'topic', value: 'Homepage' });
  }
  if (/self-storage/.test(normalized)) {
    pairs.push({ name: 'topic', value: 'Self storage' });
  }
  if (/our-stores/.test(normalized)) {
    pairs.push({ name: 'topic', value: 'Stores' });
  }
  INDUSTRIES.forEach((industry) => {
    if (industry.test.test(normalized)) {
      pairs.push({ name: 'industry', value: industry.value });
    }
  });
  return pairs;
}

export function affinitiesForPath(path: string): Record<string, string> {
  const affinity: Record<string, string> = {};
  pageAffinitiesForPath(path).forEach((pair) => {
    affinity[pair.name] = pair.value;
  });
  return affinity;
}

export function recordPageView(path: string, search = ''): void {
  const referral = captureReferral(search);
  appendCdpEvent({
    type: 'VIEW',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      page: path,
      query: search,
      channel: referral.channel,
      referrer: referral.referrer,
      source: referral.source,
      campaign: referral.campaign,
      ...affinitiesForPath(path),
      affinities: pageAffinitiesForPath(path),
    },
  });
}

export function recordSearchEvent(query: string, source: string): void {
  appendCdpEvent({
    type: 'SEARCH',
    createdAt: new Date().toISOString(),
    arbitraryData: { query, source },
  });
}

export const CDP_EVENT = EVENT_NAME;
