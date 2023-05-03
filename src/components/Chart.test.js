import data from '../data.json';

describe('Chart component', () => {
  test('data is imported', () => {
    expect(data).not.toEqual({});
  });
});

