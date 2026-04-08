# Quick Start - 5 Minutes to Running Bot

## 1️⃣ Create Telegram Bot (2 min)

1. Open Telegram → Search "**BotFather**"
2. Type `/newbot`
3. Give it a name and username
4. **Copy the API Token** (save this!)

Example token: `123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D`

---

## 2️⃣ Local Testing (2 min)

1. Create `.env.local` file in project root:
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   CRON_SECRET=test-secret-key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

Your bot is now running at: `http://localhost:3000`

---

## 3️⃣ Use ngrok to Expose Locally (1 min)

To test with actual Telegram (not just locally):

1. Download [ngrok](https://ngrok.com/download)

2. Run:
   ```bash
   ngrok http 3000
   ```

3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

---

## 4️⃣ Connect Bot to Your Webhook

Message **BotFather** on Telegram:

```
/setwebhook
https://abc123.ngrok.io/api/telegram
```

BotFather will confirm: ✅ "Webhook was set"

---

## 5️⃣ Test Your Bot!

1. Go to your bot (search by username)
2. Click "Start" or type `start`
3. Select subjects for each time slot
4. See your schedule appear!

---

## What Works Right Now

✅ Manual `/start` command - test anytime  
✅ Interactive subject selection  
✅ Auto-generated schedule  
❌ Daily 7 AM reminder - requires deployed bot (see next step)

---

## Deploy to Production (Optional)

Ready to go live with 7 AM reminders?

### Deploy to Vercel (Free):

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `TELEGRAM_BOT_TOKEN`: your token
   - `CRON_SECRET`: a random secret string
5. Deploy!
6. Your URL: `https://your-project.vercel.app/api/telegram`

### Set Webhook in Telegram:

Message **BotFather**:
```
/setwebhook
https://your-project.vercel.app/api/telegram
```

### Set Daily Reminder (7 AM):

Go to [cron-job.org](https://cron-job.org) and create:

- **URL**: `https://your-project.vercel.app/api/cron/schedule`
- **Method**: POST
- **Header**: `x-cron-secret: your-secret-key`
- **Schedule**: 7:00 AM daily

Done! 🎉

---

## File Reference

| File | Purpose |
|------|---------|
| `lib/telegram-bot.ts` | Telegram API calls |
| `lib/schedule.ts` | Store/manage user schedules |
| `lib/handlers.ts` | Handle messages & buttons |
| `app/api/telegram/route.ts` | Webhook endpoint |
| `app/api/cron/schedule.ts` | Daily 7 AM trigger |

---

## Useful BotFather Commands

| Command | What it does |
|---------|------------|
| `/newbot` | Create a new bot |
| `/mybots` | See your bots |
| `/setwebhook` | Set webhook URL |
| `/deletewebhook` | Remove webhook |
| `/getwebhookinfo` | Check webhook status |

---

See **TELEGRAM_BOT_SETUP.md** for detailed guide!
