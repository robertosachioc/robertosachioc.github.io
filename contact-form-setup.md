# Contact form → Google Sheet 

Messages from your website's contact form will appear as new rows in a Google Sheet you own.

## Step 1 — Create the Sheet
1. Go to https://sheets.google.com and create a new blank spreadsheet.
2. Name it something like **"Portfolio Messages"**.
3. In row 1, type these headers: `Time` | `Name` | `Email` | `Company` | `Message`

## Step 2 — Add the script
1. In the Sheet, click **Extensions → Apps Script**.
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    new Date(),
    e.parameter.name || "",
    e.parameter.email || "",
    e.parameter.company || "",
    e.parameter.message || ""
  ]);

 var visitorEmail = e.parameter.email || "";
  if (visitorEmail) {
    MailApp.sendEmail(
      visitorEmail,
      "Thanks for reaching out from Roberto Portfolio",
      "Hi " + (e.parameter.name || "there") + ",\n\n" +
      "Thanks for your message, I've received it and will get back to you soon.\n\n" +
      "Best,\nRoberto \nhttps://robertosachioc.github.io"
    );
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);

}
```

> **After ANY code edit:** saving is NOT enough. You must redeploy:
> Deploy → Manage deployments → ✏️ pencil → Version: "New version" → Deploy.
> The URL stays the same; nothing changes on the website.

3. Click the **save** icon (give the project any name).

## Step 3 — Deploy it
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** **Anyone**  ← important, otherwise the form can't reach it
4. Click **Deploy**, approve the permissions when Google asks
   (it will warn "unverified app" — click **Advanced → Go to … (unsafe)** —
   that's normal for your own personal scripts).
5. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 4 — Paste the URL into your website
1. Open `script.js` and find this line near the top:
   ```javascript
   const SHEET_WEBAPP_URL = "";
   ```
2. Paste your URL between the quotes:
   ```javascript
   const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
3. Save, commit, push. Done!

## How it behaves
- **URL filled in:** visitor clicks "Send message" → button shows "Sending…"
  then "Sent ✓" → a new row appears in your Sheet instantly.
- **URL left empty:** the form falls back to the old behavior
  (opens the visitor's email app pre-filled).
- Uncomment the MailApp block in the script if you also want an
  email notification for every message (still free — Gmail allows
  ~100 script-sent emails per day).

## Testing
After deploying, open your live site, fill in the form with test data, and
check the Sheet — the row should appear within a second or two.
If nothing appears, re-check Step 3.3 ("Anyone" access) — that's the
most common mistake.
