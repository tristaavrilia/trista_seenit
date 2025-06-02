import { getWatchlist, addToWatchlist } from '@/actions/watchlist';

let mockCookieValue: string | undefined = undefined;

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: (key: string) => {
      return key === 'watchlist' && mockCookieValue
        ? { value: mockCookieValue }
        : undefined;
    },
    set: (key: string, value: string) => {
      if (key === 'watchlist') {
        mockCookieValue = value;
      }
    },
  }),
}));

describe('getWatchlist', () => {
  beforeEach(() => {
    mockCookieValue = undefined;
  });

  it('should return empty array if no cookie set', async () => {
    const result = await getWatchlist();
    expect(result).toEqual([]);
  });

  it('should return updated list after addToWatchlist', async () => {
    await addToWatchlist(42);
    const result = await getWatchlist();
    expect(result).toEqual([42]);
  });
});
