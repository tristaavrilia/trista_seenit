import { getMovies } from '@/actions/movies';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [{ id: 1, title: 'Inception' }] }),
  })
) as jest.Mock;

describe('getMovies', () => {
  it('should fetch movies successfully', async () => {
    const result = await getMovies(1);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].title).toBe('Inception');
  });

  it('should return empty array on fetch failure', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, statusText: 'Bad Request' })
    );
    const result = await getMovies(1);
    expect(result).toEqual([]);
  });
});