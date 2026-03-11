# 🏨 Colombo Court Marketing Hub — Complete Setup Guide
## Google Sheets + Google Apps Script + GitHub Pages

---

## What You're Building

| Component | Purpose | Cost |
|-----------|---------|------|
| **Google Sheet** | Your database — all data lives here permanently | Free |
| **Google Apps Script** | Backend API — connects your app to the sheet | Free |
| **GitHub Pages** | Hosts your app online at a permanent URL | Free |

**Total cost: LKR 0. Forever.**

---

## STEP 1 — Create Your Google Sheet (5 minutes)

1. Go to **https://sheets.google.com** and click **"+ Blank"**
2. Name the sheet: **CC Marketing Hub**
3. Click the **green Share** button → change access to **"Anyone with the link → Viewer"**  
   *(This is just for safety — the app uses an API key, not public access)*
4. Copy the **Spreadsheet ID** from the URL bar:  
   `https://docs.google.com/spreadsheets/d/`**`THIS_IS_YOUR_ID`**`/edit`  
   Save this ID — you'll need it in Step 2.

---

## STEP 2 — Set Up Google Apps Script (15 minutes)

Google Apps Script is the free backend that connects your app to Google Sheets.

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with a code editor. **Delete all the existing code**
3. Open the file `Code.gs` from this package
4. **Copy all the text** and paste it into the Apps Script editor
5. Find this line near the top and replace the placeholder with your Sheet ID from Step 1:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
   It should look like:
   ```javascript
   const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';
   ```
6. Click the **Save** icon (or Ctrl+S)

### Run the Setup Function (creates all your sheets)

7. In the dropdown at the top, select **`setupSheets`** from the function list
8. Click the **▶ Run** button
9. A permissions dialog will appear — click **"Review permissions"**
10. Choose your Google account, then click **"Advanced"** → **"Go to CC Marketing Hub (unsafe)"**  
    *(This is safe — it's your own script. Google just warns for new scripts)*
11. Click **"Allow"**
12. Wait a few seconds — you'll see **"Execution completed"** in the log
13. Go back to your Google Sheet — you should now see **12 tabs** (Users, LineItems, Spends, etc.)!

### Deploy as Web App (makes it accessible)

14. In Apps Script, click **Deploy → New deployment**
15. Click the gear ⚙ next to "Select type" → choose **"Web app"**
16. Fill in:
    - **Description:** `CC Marketing Hub API`
    - **Execute as:** `Me`
    - **Who has access:** `Anyone`
17. Click **"Deploy"**
18. Copy the **Web app URL** — it looks like:  
    `https://script.google.com/macros/s/AKfycb.../exec`  
    **Save this URL — you need it in Step 3.**

---

## STEP 3 — Update Your App Files (5 minutes)

You need to put your Apps Script URL into two files.

### Update `index.html`
1. Open `index.html` in a text editor (Notepad, TextEdit, VS Code, etc.)
2. Find this line:
   ```javascript
   const API_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace the placeholder with your Web App URL from Step 2:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycbXXXXX/exec';
   ```
4. Save the file

### Update `js/app.js`
1. Open `js/app.js`
2. Find the same line at the top:
   ```javascript
   const API_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace with the same URL
4. Save the file

---

## STEP 4 — Host on GitHub Pages (10 minutes)

1. Go to **https://github.com** → Sign up (free) or log in
2. Click **"+"** → **"New repository"**
3. Set:
   - **Repository name:** `cc-marketing-hub`
   - **Visibility:** Private ✓
   - Leave everything else blank
4. Click **"Create repository"**

### Upload Your Files

5. On the empty repo page, click **"uploading an existing file"**
6. Drag and drop everything from this package folder:
   - `index.html`
   - `Code.gs` *(optional — for your records)*
   - `css/` folder
   - `js/` folder  
   - `pages/` folder
   - This guide
7. Add a commit message like "Initial upload" → Click **"Commit changes"**

### Enable GitHub Pages

8. Click **"Settings"** tab (top of the repo page)
9. Click **"Pages"** in the left sidebar
10. Under **Source**: select **"Deploy from a branch"**
11. Under **Branch**: select **"main"** and **"/ (root)"**
12. Click **"Save"**
13. Wait 2–3 minutes, then **refresh the page**
14. You'll see a green box: **"Your site is live at https://USERNAME.github.io/cc-marketing-hub/"**

**That is your permanent app URL. Bookmark it! ✓**

---

## STEP 5 — Log In & Start Using It (5 minutes)

### Default Login Credentials

Open your app URL and log in with:

| Username | Password | Access |
|----------|----------|--------|
| `admin` | `CCMarketing2026!` | Full admin — change everything |
| `manager` | `Marketing2026` | Add & edit entries |
| `viewer` | `ViewOnly2026` | View only |

### ⚠️ Change the Admin Password Immediately

1. Open your **Google Sheet**
2. Click the **Users** tab
3. Find the `admin` row and change the password in column B
4. Add your own team members as new rows with their usernames, passwords, and roles
5. Done — changes take effect immediately

### Set Your First Monthly Budgets

1. Log in as admin → go to **Budget Tracker**
2. Click **"Set Monthly Budgets"**
3. Enter the LKR budget for each line item for April 2026
4. Click **Save**
5. Repeat for other months

---

## How It Works Day-to-Day

```
You open the app URL in any browser
         ↓
Login: app sends username+password to Apps Script
         ↓
Apps Script checks Users sheet → returns session token
         ↓
All data (budgets, spends, social campaigns) loads from Google Sheets
         ↓
When you save anything → Apps Script writes to Google Sheets instantly
         ↓
Close the browser → data stays in Google Sheets forever
```

**Data never resets. No browser storage. Everything is in your Google Sheet.**

---

## Adding/Editing Content After Deployment

### Add a New User
→ Google Sheet → Users tab → add new row

### Change a Password
→ Google Sheet → Users tab → edit column B

### Add a Budget Line Item
→ App → Settings → Budget Line Items → "+ Add Line Item"

### Add a Sidebar Quick-Link (e.g. your Google Drive folder)
→ App → Settings → Sidebar Quick-Links → "+ Add Quick-Link"

### Make Changes to App Code
→ GitHub → open the file → click pencil icon → edit → "Commit changes"  
→ Wait 3 minutes → live

### Update the Apps Script
→ Apps Script editor → make change → Deploy → **Manage deployments**  
→ Edit → version: "New version" → Deploy

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Login says "Cannot connect" | API URL not set correctly | Check `index.html` and `js/app.js` have the correct Apps Script URL |
| Login says "Invalid username" | Users sheet not set up | Run `setupSheets` function in Apps Script |
| "Load failed" error | Apps Script not deployed / permissions issue | Re-deploy the script; make sure "Who has access" = "Anyone" |
| Data not saving | Apps Script deployment is outdated | Deploy → Manage deployments → create new version |
| App shows old version | GitHub Pages cache | Hard refresh: Ctrl+Shift+R |
| Google asks for permission again | Script re-authorization needed | Open Apps Script → Run any function → re-authorize |

---

## Your File Structure

```
cc-marketing-hub/
├── index.html              ← Login page  ⚠️ Add API_URL here
├── Code.gs                 ← Apps Script backend (uploaded to Google)
├── SETUP_GUIDE.md          ← This guide
├── css/
│   └── main.css            ← Dark theme, Poppins font
├── js/
│   ├── app.js              ← API client  ⚠️ Add API_URL here
│   └── sidebar.js          ← Shared sidebar template
└── pages/
    ├── dashboard.html      ← Main overview with 4 charts
    ├── budget.html         ← Monthly budget & spend tracker
    ├── social.html         ← Social campaigns & page growth metrics
    ├── influencers.html    ← Influencer roster & engagement log
    ├── suppliers.html      ← Supplier directory & print orders
    └── settings.html       ← Admin: line items, users, quick-links
```

---

## Google Sheet Structure

After running `setupSheets`, your sheet will have these tabs:

| Tab | Contains |
|-----|---------|
| **Users** | Usernames, passwords, roles |
| **Sessions** | Active login sessions (auto-managed) |
| **LineItems** | Your 7 budget line items |
| **MonthlyBudgets** | Budget per line item per month |
| **Spends** | Manual spend entries |
| **SocialSpends** | Social media campaign entries |
| **PageMetrics** | Monthly page follower/growth stats |
| **Influencers** | Influencer roster |
| **Engagements** | Influencer engagement log |
| **Suppliers** | Supplier directory |
| **PrintOrders** | Print/production orders |
| **SidebarFields** | Custom sidebar quick-links |

**You can view, filter, and export all your data directly in Google Sheets at any time.**

---

*Colombo Court Hotel & Spa — Marketing Hub · FY Apr 2026 – Mar 2027*
