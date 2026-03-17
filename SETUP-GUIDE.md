# Delta — Setup Guide (Mac + Cursor + Claude Code)

Everything below assumes you're starting from scratch on a Mac.
Follow in order — each step builds on the last.

---

## Step 1: Install Node.js

Node.js is the engine that runs your website locally.

1. Go to https://nodejs.org
2. Download the **LTS** version (the green button)
3. Open the downloaded `.pkg` file and follow the installer
4. Open **Terminal** (press Cmd+Space, type "Terminal", hit Enter)
5. Verify:
   ```
   node --version
   ```
   Should show `v20.x.x` or higher.
   ```
   npm --version
   ```
   Should show `10.x.x` or higher.

Close the terminal when done.

---

## Step 2: Install Git

Git may already be on your Mac. Check first.

1. Open Terminal
2. Type:
   ```
   git --version
   ```
3. If you see a version number, skip ahead to Step 3
4. If it prompts you to install Xcode Command Line Tools, click "Install"
   - This takes a few minutes
   - Once done, run `git --version` again to confirm

---

## Step 3: Install Cursor

Cursor is your code editor — like VS Code but with AI built in.

1. Go to https://www.cursor.com
2. Download for Mac
3. Open the `.dmg` file and drag Cursor to Applications
4. Open Cursor from Applications
5. It may ask you to sign in / create a Cursor account — do that
6. When it asks about importing VS Code settings, you can skip

---

## Step 4: Install Claude Code

Claude Code is the AI terminal tool that can build and edit your project.
Requires a Claude Pro ($20/month) or Max subscription.

1. Open Terminal (or Cursor's built-in terminal)
2. Run:
   ```
   curl -fsSL https://claude.ai/install.sh | sh
   ```
3. Close and reopen your terminal, then verify:
   ```
   claude --version
   ```
4. Authenticate — run:
   ```
   claude
   ```
5. It opens your browser to log in to your Claude account
6. Authorize the connection
7. You should see the Claude Code welcome screen

Type `/exit` to quit for now.

---

## Step 5: Create a GitHub account

1. Go to https://github.com
2. Sign up and verify your email
3. That's it for now

---

## Step 6: Set up the Delta project

### 6a: Unzip and place the project

1. Download `delta-project.zip` from our conversation
2. Double-click to unzip
3. Move the `delta` folder somewhere sensible:
   ```
   mkdir ~/Projects
   mv ~/Downloads/delta ~/Projects/delta
   ```

### 6b: Open in Cursor

1. Open Cursor
2. File → Open Folder → navigate to `delta` → select it
3. You should see the file tree on the left

### 6c: Install dependencies

1. In Cursor: Terminal → New Terminal (or Ctrl+`)
2. Make sure you're in the delta folder:
   ```
   pwd
   ```
   Should end in `/delta`. If not: `cd ~/Projects/delta`
3. Run:
   ```
   npm install
   ```
4. Wait 30-60 seconds until you see "added X packages"

### 6d: Start the dev server

1. In the same terminal:
   ```
   npm run dev
   ```
2. Open browser → http://localhost:3000
3. You should see the Delta home page

Check all pages:
- http://localhost:3000 (home)
- http://localhost:3000/football
- http://localhost:3000/f1
- http://localhost:3000/cross-sport
- http://localhost:3000/methodology
- http://localhost:3000/about

Stop server: Ctrl+C. Restart: `npm run dev`

---

## Step 7: Using Claude Code on the project

### Running both at once

You want the dev server AND Claude Code running simultaneously.

1. In Cursor, open Terminal 1: `npm run dev`
2. Open Terminal 2 (click the + icon in the terminal panel): `claude`
3. Now give Claude Code instructions — changes appear live in browser

### First command: create CLAUDE.md

This gives Claude Code permanent context about your project.
Type this into Claude Code:

```
Create a CLAUDE.md file for this project. It's a Next.js 14 sports
data website called Delta. Design system: Instrument Serif italic
for headlines, Instrument Serif regular for body, IBM Plex Mono for
data labels, Caveat for handwritten notes only. Pages: home (navy bg,
editorial grid), football (green pitch bg, FM-style 4-2-3-1 formation),
F1 (carbon bg, starting grid layout, purple/pink timing colors),
cross-sport (amber split field). Articles use light off-white bg.
Sport colors: teal=#4a9aad for football, pink=#d4a0c4 for F1,
amber=#d4a44e for cross-sport. All article data is in src/data/articles.js.
Page components are in src/components/pages/. Dev server: npm run dev.
```

### Example commands

Fix an error:
```
The football page isn't rendering. Here's the error: [paste error]. Fix it.
```

Design tweak:
```
Change the Gap Score label to Instrument Serif instead of IBM Plex Mono
across all pages.
```

Add navigation:
```
Add working navigation links between all pages using Next.js Link
components. Every header should link to home, football, formula 1,
cross-sport, methodology, and about.
```

Wire up a new page:
```
The cross-sport page design is in delta-cross-sport.jsx in the project
files. Wire it up as the actual cross-sport page at /cross-sport.
```

---

## Step 8: Push to GitHub

### 8a: Create the repo

1. Go to github.com → click "New" (or + → New repository)
2. Name: `delta`
3. Do NOT check "Add a README"
4. Click "Create repository"

### 8b: Push code

In Cursor's terminal (stop dev server with Ctrl+C first):

```
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/jayszu8/delta.git
git push -u origin main
```

If asked for a password, use a GitHub personal access token:
GitHub → Settings → Developer settings → Personal access tokens →
Generate new token → check "repo" scope → use that as password.

### 8c: Future updates

```
git add .
git commit -m "describe your change"
git push
```

---

## Step 9: Deploy on Vercel

1. Go to vercel.com → Sign Up → Continue with GitHub
2. Click "Add New Project"
3. Find `delta` → Import
4. Don't change settings → Deploy
5. Wait 1-2 minutes
6. Site is live at `delta-yourusername.vercel.app`

Every future `git push` auto-redeploys.

---

## Daily workflow

```
1. Open Cursor → open delta folder
2. Terminal 1: npm run dev
3. Terminal 2: claude
4. Make changes (via Claude Code or manually in Cursor)
5. Check at http://localhost:3000
6. When happy:
   git add .
   git commit -m "what I changed"
   git push
7. Vercel auto-deploys in ~30 seconds
```

---

## Troubleshooting

"node: command not found"
→ Close terminal, open new one. Still broken? Reinstall Node.js.

"npm install" fails
→ Check you're in the delta folder: `pwd` should end in `/delta`

"claude: command not found"
→ Close terminal, open new one. Still broken? Re-run install command.

Page error in browser
→ Copy error from the `npm run dev` terminal → paste into Claude Code

Changes not showing
→ Hard refresh: Cmd+Shift+R

"git push" asks for password
→ Use a personal access token, not your GitHub password

Vercel fails but local works
→ Likely a filename case mismatch (Mac ignores case, Vercel doesn't)
