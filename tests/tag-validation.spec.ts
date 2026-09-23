import { test, expect } from './fixtures/test.fixture';

test('tag validation placeholder', { tag: '@smoke' }, async () => {
  expect(true).toBeTruthy();
});
