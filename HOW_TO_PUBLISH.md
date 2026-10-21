# Organization profile

GitHub displays `profile/README.md` from the default branch of the public
[Storesdz/.github](https://github.com/Storesdz/.github) repository on the
[organization overview](https://github.com/Storesdz).

Edit that file and merge or push the change to `main` to publish it. Keep links
publicly accessible; most platform repositories are private.

## Activity chart

`profile/activity.svg` is generated from the GitHub API using Node.js 22 with no
dependencies. It counts commits on the default branches of public, non-fork,
non-empty StoresDZ repositories over the last 365 UTC dates, including today.
Identical commit SHAs are counted once across repositories. Automated commits
authored by `github-actions[bot]` are excluded so chart refreshes do not inflate
activity. This is a public commit chart, not GitHub's user contribution calendar;
issues, reviews, other branches and private work are not counted.

The `Public activity chart` workflow tests the generator on pull requests and
refreshes the image daily at 06:23 UTC, on generator changes to `main`, or when
run manually from Actions. It uses the built-in `GITHUB_TOKEN`; no personal token
or access to private repositories is needed. API errors fail the run before
replacing the existing chart. The image includes its last successful update date.

To check or refresh locally from this repository:

```sh
node --test .github/scripts/activity.test.mjs
node .github/scripts/activity.mjs
```

An optional `GITHUB_TOKEN` environment variable raises the API rate limit. Never
commit a token. GitHub may delay scheduled runs or disable them after prolonged
repository inactivity; the workflow can also be run manually.
