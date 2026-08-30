import * as React from 'react';

export type ReadingDirection = 'ltr' | 'rtl';

interface ReadingDirectionValue {
  /** Current page layout direction — manga readers may flip it. */
  direction: ReadingDirection;
  isRtl: boolean;
  /** Flip between western (ltr) and manga (rtl) reading order. */
  toggle: () => void;
  /** Legend text describing the current mode. */
  modeLabel: string;
}

const ReadingDirectionContext = React.createContext<ReadingDirectionValue>({
  direction: 'ltr',
  isRtl: false,
  toggle: () => {},
  modeLabel: 'WESTERN ORDER (L→R)',
});

const STORAGE_KEY = 'manga-portfolio:reading-direction';

export function ReadingDirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = React.useState<ReadingDirection>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored === 'rtl' ? 'rtl' : 'ltr';
    } catch {
      return 'ltr';
    }
  });

  React.useEffect(() => {
    document.documentElement.dir = direction;
    try {
      window.localStorage.setItem(STORAGE_KEY, direction);
    } catch {
      /* storage may be unavailable in private mode */
    }
  }, [direction]);

  const toggle = React.useCallback(() => {
    setDirection((current) => (current === 'ltr' ? 'rtl' : 'ltr'));
  }, []);

  const value = React.useMemo<ReadingDirectionValue>(
    () => ({
      direction,
      isRtl: direction === 'rtl',
      toggle,
      modeLabel: direction === 'rtl' ? 'MANGA ORDER (R→L)' : 'WESTERN ORDER (L→R)',
    }),
    [direction, toggle],
  );

  return <ReadingDirectionContext.Provider value={value}>{children}</ReadingDirectionContext.Provider>;
}

export function useReadingDirection(): ReadingDirectionValue {
  return React.useContext(ReadingDirectionContext);
}