import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const DAY = 86_400_000;
const dateKey = date => date.toISOString().slice(0, 10);

export async function* pages(path, request = fetch) {
  for (let page = 1; ; page++) {
    const response = await request(`https://api.github.com${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'StoresDZ-public-activity',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status} for ${path}`);
    const items = await response.json();
    yield* items;
    if (items.length < 100) return;
  }
}

export async function collect(today, list = pages) {
  const since = new Date(today - 364 * DAY);
  const until = new Date(today.getTime() + DAY - 1);
  const counts = new Map();
  const seen = new Set();
  for await (const repo of list('/orgs/Storesdz/repos?type=public')) {
    if (repo.private || repo.fork || repo.size === 0) continue;
    const query = new URLSearchParams({ sha: repo.default_branch, since: since.toISOString(), until: until.toISOString() });
    for await (const commit of list(`/repos/Storesdz/${encodeURIComponent(repo.name)}/commits?${query}`)) {
      if (seen.has(commit.sha) || commit.author?.login === 'github-actions[bot]') continue;
      const day = dateKey(new Date(commit.commit.committer.date));
      if (day < dateKey(since) || day > dateKey(today)) continue;
      seen.add(commit.sha);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }
  }
  return counts;
}

export function render(counts, today) {
  const start = new Date(today - 364 * DAY);
  const colors = ['#212c37', '#164e63', '#0e7490', '#06b6d4', '#67e8f9'];
  const level = count => count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
  const summary = `${total} public commits · last 365 days`;
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 230" role="img" aria-labelledby="title desc">',
    `<title id="title">${summary}</title>`,
    `<desc id="desc">Daily default-branch commits from public StoresDZ repositories, ${dateKey(start)} to ${dateKey(today)} UTC. Excludes forks and automated chart updates. Colors: 0, 1–2, 3–5, 6–9, 10+ commits.</desc>`,
    '<rect width="900" height="230" rx="12" fill="#0d1117"/>',
    '<g font-family="system-ui, sans-serif" fill="#f0f6fc">',
    `<text x="28" y="34" font-size="16" font-weight="600">${summary}</text>`,
    `<text x="872" y="34" text-anchor="end" font-size="11" fill="#919da9">Updated ${dateKey(today)}</text>`,
  ];
  for (let index = 0; index < 365; index++) {
    const date = new Date(start.getTime() + index * DAY);
    const week = Math.floor((index + start.getUTCDay()) / 7);
    const x = 52 + week * 15;
    const y = 76 + date.getUTCDay() * 15;
    const count = counts.get(dateKey(date)) ?? 0;
    if (date.getUTCDate() === 1 || index === 0) {
      // Avoid overlapping the first partial month's label.
      if (index === 0 || index > 14) svg.push(`<text x="${x}" y="64" font-size="10" fill="#919da9">${date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })}</text>`);
    }
    svg.push(`<rect x="${x}" y="${y}" width="11" height="11" rx="2" fill="${colors[level(count)]}"><title>${dateKey(date)}: ${count} commits</title></rect>`);
  }
  for (const [day, label] of [[1, 'Mon'], [3, 'Wed'], [5, 'Fri']]) {
    svg.push(`<text x="18" y="${85 + day * 15}" font-size="10" fill="#919da9">${label}</text>`);
  }
  svg.push('<text x="28" y="208" font-size="11" fill="#919da9">Public work only</text>');
  svg.push('<text x="710" y="208" font-size="10" fill="#919da9">Less</text>');
  colors.forEach((color, index) => svg.push(`<rect x="${740 + index * 15}" y="198" width="11" height="11" rx="2" fill="${color}"/>`));
  svg.push('<text x="820" y="208" font-size="10" fill="#919da9">More</text></g></svg>');
  return svg.join('\n') + '\n';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const today = new Date(`${dateKey(new Date())}T00:00:00Z`);
  const counts = await collect(today);
  await writeFile(new URL('../../profile/activity.svg', import.meta.url), render(counts, today));
  console.log(`Generated activity chart from ${[...counts.values()].reduce((sum, count) => sum + count, 0)} public commits.`);
}
