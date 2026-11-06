# Putting dgthings.com live on GitHub Pages (free)

The site is ready to host. **Nothing has been published yet.**

## Before going live
- [ ] Dave approves the site
- [ ] Real bio added (`index.html`, search `BIO:`)
- [x] Pink Guards Vimeo link added (`js/projects.js`), or the project removed
- [ ] Project years checked (they're estimates from Vimeo upload dates)
- [ ] Optional: a headshot for the About section

## Step 1 — GitHub (the site lives on Dave's own account)
**Dave does this part (about 5 minutes, free):**
1. Sign up at github.com (the free plan). Pick a username, which will show in the temporary address.
2. Click **+ → New repository**. Name it `dgthings`, set it to **Public**, and leave every box unticked. Click **Create**.
3. In the new repo, go to **Settings → Collaborators → Add people** and invite **ZenThePhunk** (Austin). Austin accepts the email invite.

**Claude does this part (when Austin says go):**
4. Upload this folder to Dave's `dgthings` repo.

**Dave clicks one setting** (collaborators can't change it):
5. In the repo, go to **Settings → Pages**. Under "Branch", pick `main` and `/ (root)`, then **Save**.
6. The site appears within a minute at `https://dcgarcia24.github.io/dgthings/` for a final check.

After that, Austin (with Claude) can keep updating the site, and Dave owns it.

## Step 2 — Domain (needs Dave's GoDaddy login)
dgthings.com is registered at **GoDaddy** (paid through Nov 2030). Today it points to Squarespace.

In GoDaddy → **My Products → dgthings.com → DNS**:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `dcgarcia24.github.io` |

Delete the old Squarespace records (`A @ 198.185.159.144`, and the `www` CNAME to `ext-cust.squarespace.com`), plus any other Squarespace A records.
DNS changes can take a few minutes to a few hours to work everywhere.

## Step 3 — Finish up
0. Claude uploads the `CNAME` file. It was held back so the github.io preview works before the domain is switched.
1. Dave: in the repo's **Settings → Pages**, set the custom domain to `www.dgthings.com` and turn on **Enforce HTTPS** once the certificate is ready.
2. Check the live site on a phone and a computer.
3. **Only after it works:** Dave cancels Squarespace. Keep the domain at GoDaddy, which is separate from Squarespace.

## Cost
GitHub Pages: free. The domain renewal at GoDaddy is the only ongoing cost (already paid through 2030).
