import assert from 'node:assert/strict';
import test from 'node:test';
import { collect, pages, render } from './activity.mjs';

test('API pagination reads beyond 100 entries and fails on API errors', async () => {
  const calls = [];
  const request = async url => {
    calls.push(url);
    return { ok: true, json: async () => calls.length === 1 ? Array(100).fill({}) : [{}] };
  };
  const items = [];
  for await (const item of pages('/example?type=public', request)) items.push(item);
  assert.equal(items.length, 101);
  assert.match(calls[1], /type=public&per_page=100&page=2$/);
  await assert.rejects(async () => {
    for await (const item of pages('/example', async () => ({ ok: false, status: 403 }))) void item;
  }, /GitHub API 403/);
});

test('counts real public commits, deduplicates, excludes private/fork/bot/out-of-range data', async () => {
  const today = new Date('2026-10-21T00:00:00Z');
  const calls = [];
  const commit = (sha, date, login = 'developer') => ({ sha, author: { login }, commit: { committer: { date } } });
  async function* list(path) {
    calls.push(path);
    if (path.startsWith('/orgs/')) {
      yield* [
        { name: 'public', default_branch: 'main', size: 1 },
        { name: 'private', private: true, size: 1 },
        { name: 'fork', fork: true, size: 1 },
        { name: 'empty', size: 0 },
      ];
    } else {
      yield* [
        commit('first', '2025-10-22T00:00:00Z'),
        commit('last', '2026-10-21T23:59:59Z'),
        commit('last', '2026-10-21T23:59:59Z'),
        commit('bot', '2026-10-21T12:00:00Z', 'github-actions[bot]'),
        commit('old', '2025-10-21T23:59:59Z'),
        commit('future', '2026-10-22T00:00:00Z'),
      ];
    }
  }
  const counts = await collect(today, list);
  assert.deepEqual([...counts], [['2025-10-22', 1], ['2026-10-21', 1]]);
  assert.equal(calls.length, 2);
  assert.match(calls[1], /sha=main&since=/);
});

test('calendar covers exactly 365 UTC days, including a leap day and week boundaries', () => {
  for (const end of ['2026-10-21', '2024-03-01', '2026-10-24', '2026-10-25']) {
    const svg = render(new Map(), new Date(`${end}T00:00:00Z`));
    assert.equal((svg.match(/<title>\d{4}-\d{2}-\d{2}: /g) ?? []).length, 365);
    assert.match(svg, new RegExp(`${end}: 0 commits`));
    assert.match(svg, /0 public commits/);
    for (const match of svg.matchAll(/<rect x="(\d+)" y="(\d+)"/g)) {
      assert.ok(Number(match[1]) + 11 <= 900);
      assert.ok(Number(match[2]) + 11 <= 230);
    }
    if (end === '2024-03-01') assert.match(svg, /2024-02-29: 0 commits/);
  }
});

test('chart total and cell intensity match the collected daily counts', () => {
  const counts = new Map([['2026-10-20', 3], ['2026-10-21', 10]]);
  const svg = render(counts, new Date('2026-10-21T00:00:00Z'));
  assert.match(svg, /13 public commits/);
  assert.match(svg, /fill="#0e7490"><title>2026-10-20: 3 commits/);
  assert.match(svg, /fill="#67e8f9"><title>2026-10-21: 10 commits/);
});
