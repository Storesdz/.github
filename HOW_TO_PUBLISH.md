# Publishing This README to the GitHub Organization

The `README.md` in this folder is the **public profile page** for the `storesdz` GitHub organization.

GitHub renders an organization's profile from a special repository:

1. Create a **public** repository named **`.github`** under the `storesdz` org
   → `https://github.com/storesdz/.github`
2. Place the README at **`profile/README.md`** inside that repo:

   ```
   .github/
   └── profile/
       └── README.md   ← copy readmepage/README.md here
   ```

3. Commit & push — the content appears immediately on `https://github.com/storesdz`.

### Quick way with the GitHub CLI

```bash
gh repo create storesdz/.github --public --description "StoresDZ organization profile"
gh repo clone storesdz/.github
mkdir .github\profile
copy readmepage\README.md .github\profile\README.md
cd .github
git add . && git commit -m "Add organization profile README" && git push
```

### Notes

- The animated header/footer ([capsule-render](https://github.com/kyechan99/capsule-render)), typing SVG
  ([readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg)), skill icons
  ([skillicons](https://github.com/tandpfun/skill-icons)), and badges ([shields.io](https://shields.io))
  are external services — GitHub proxies and caches them via Camo, so they render even if a visitor's
  network can't reach those hosts directly.
- The Mermaid architecture diagram renders natively on GitHub — no external service needed.
- If any repo names differ from the ones linked in the ecosystem table, update the
  `https://github.com/storesdz/<repo>` links accordingly.
