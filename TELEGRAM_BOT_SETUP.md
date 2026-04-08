# Telegram Study Schedule Bot - Setup Guide

This is a fully automated Telegram bot that helps users plan their study schedule with daily reminders at 7 AM.

## Features

✅ **Manual `/start` command** - Begin scheduling anytime (for testing)
✅ **Daily 7 AM automatic trigger** - Sends schedule prompts automatically
✅ **Interactive subject selection** - Choose from 7 subjects across 4 time slots
✅ **Auto-generated timetable** - Bot creates and displays your complete schedule

## Time Slots

- **Slot 1**: 8:30 AM - 11:00 AM
- **Slot 2**: 12:10 PM - 2:00 PM
- **Slot 3**: 2:40 PM - 5:40 PM
- **Slot 4**: 7:30 PM - 10:00 PM

## Available Subjects

1. Aerodynamics
2. Space Dynamics
3. Propulsion
4. Structures
5. Flight Mechanics
6. Mathematics
7. Aptitude

---

## Step 1: Create a Telegram Bot (2 minutes)

1. Open **Telegram** app
2. Search for **"BotFather"** (official Telegram bot for creating bots)
3. Type `/newbot`
4. Choose a name (e.g., "Study Schedule Bot")
5. Choose a username (must be unique, e.g., "study_schedule_bot_123")
6. **Copy the API Token** - looks like: `123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D`

---

## Step 2: Deploy Your Bot

### Option A: Deploy to Vercel (Recommended - Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `TELEGRAM_BOT_TOKEN`: Paste your API token from BotFather
   - `CRON_SECRET`: Create any random string (e.g., "your-super-secret-key-123")
5. Deploy!
6. Your webhook URL will be: `https://your-project.vercel.app/api/telegram`

### Option B: Run Locally

1. Create `.env.local` file:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D
   CRON_SECRET=your-super-secret-key-123
   ```
2. Run: `npm run dev`
3. Your local URL: `http://localhost:3000/api/telegram`
4. Use a service like ngrok to expose locally: `ngrok http 3000`

---

## Step 3: Set Webhook URL

The webhook URL tells Telegram where to send user messages.

### Using BotFather (Easiest):

1. Open Telegram, message **BotFather**
2. Type `/mybots` → select your bot → "API Token"
3. Go back to chat and type `/setwebhook`
4. Send your webhook URL: `https://your-project.vercel.app/api/telegram`
5. BotFather will confirm: "Webhook was set"

### Using cURL:

```bash
curl -X POST https://api.telegram.org/bot{YOUR_TOKEN}/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-project.vercel.app/api/telegram"}'
```

---

## Step 4: Set Daily 7 AM Reminder (Cron Job)

Your bot will send daily prompts to all users at 7 AM. Use a free cron service:

### Using cron-job.org (Free - Recommended):

1. Go to [cron-job.org](https://cron-job.org)
2. Sign up (free)
3. Click "Create Cronjob"
4. Fill in:
   - **Title**: "Study Bot Daily Reminder"
   - **URL**: `https://your-project.vercel.app/api/cron/schedule`
   - **Request Method**: `POST`
   - **HTTP Headers**: Add custom header:
     - **Key**: `x-cron-secret`
     - **Value**: Your `CRON_SECRET` from environment variables
   - **Schedule**: Set to run daily at 7:00 AM (choose your timezone)
5. Save!

### Using Upstash (Free - Alternative):

1. Go to [upstash.com](https://upstash.com)
2. Sign up and create a QStash project
3. Create a scheduled message:
   - **Endpoint**: `https://your-project.vercel.app/api/cron/schedule`
   - **Schedule**: `0 7 * * *` (7 AM daily)
   - **Headers**: `x-cron-secret: your-secret-key`
4. Save!

---

## Step 5: Test Your Bot

1. Open Telegram
2. Search for your bot (the username you created)
3. Click "Start"
4. **Or** send the message: `start`
5. Select subjects for each time slot
6. Bot will show your complete schedule!

### Test Manual Start Anytime:
- Type `/start` → Bot will reset and start the schedule process again
- Perfect for testing!

---

## How It Works

### User Interaction Flow:

```
User sends /start
        ↓
Bot asks: "Select subject for Slot 1 (8:30 AM - 11:00 AM)"
        ↓
User clicks a subject button
        ↓
Bot asks: "Select subject for Slot 2 (12:10 PM - 2:00 PM)"
        ↓
User clicks a subject button
        ↓
Bot asks: "Select subject for Slot 3 (2:40 PM - 5:40 PM)"
        ↓
User clicks a subject button
        ↓
Bot asks: "Select subject for Slot 4 (7:30 PM - 10:00 PM)"
        ↓
User clicks a subject button
        ↓
Bot displays: ✅ Complete timetable with all 4 slots filled
```

### Daily Reminder Flow (7 AM):

```
Cron job runs at 7 AM (calls /api/cron/schedule)
        ↓
Bot sends greeting: "🌅 Good morning! Time to plan..."
        ↓
Bot sends subject selection buttons
        ↓
User selects subjects same as flow above
        ↓
Bot displays updated timetable
```

---

## File Structure

```
your-project/
├── lib/
│   ├── telegram-bot.ts       # Telegram API wrapper
│   ├── schedule.ts           # Schedule logic & data storage
│   └── handlers.ts           # Message & button handlers
├── app/
│   └── api/
│       ├── telegram/
│       │   └── route.ts      # Webhook endpoint (receives messages)
│       └── cron/
│           └── schedule.ts   # Cron endpoint (daily 7 AM trigger)
└── TELEGRAM_BOT_SETUP.md    # This file
```

---

## Troubleshooting

### Bot doesn't respond to messages

1. **Check webhook URL is set**: Message BotFather → `/mybots` → select bot → check webhook
2. **Verify webhook URL is correct**: Must be `https` (not `http`)
3. **Check logs**: Look at your Vercel or server logs for errors

### Daily reminders not working

1. **Verify cron job is enabled**: Check cron-job.org dashboard
2. **Check `x-cron-secret` header**: Must match your `CRON_SECRET` env variable
3. **Verify endpoint is working**: Visit `https://your-project.vercel.app/api/cron/schedule` and it should say "This is a cron endpoint..."

### "Schedule already selected" message

- User has already filled all 4 slots
- Type `/start` or send "start" to reset and begin again

### Rate limiting errors

- If many users interact simultaneously, Telegram API might rate-limit
- Bot adds delays to prevent this - it's normal

---

## Production Tips

### 1. Use a Database Instead of In-Memory Storage

Current implementation stores user selections in memory (lost on server restart).

For production, connect a database:
- **Supabase** (PostgreSQL - free tier)
- **MongoDB** (NoSQL - free tier)
- **Firebase** (NoSQL - free tier)

Replace `userSelections` in `lib/schedule.ts` with database queries.

### 2. Add User Session Management

Track which users have completed scheduling today to avoid duplicate prompts.

### 3. Set Proper Error Handling

Add try-catch blocks and logging for production monitoring (Sentry, DataDog, etc.).

### 4. Scale the Cron Job

If you have many users, split the cron job across multiple time windows or use a message queue.

---

## Support

For issues with:
- **Telegram Bot API**: See [core.telegram.org/bots](https://core.telegram.org/bots)
- **BotFather commands**: Message BotFather with `/help`
- **Your deployment**: Check Vercel/server logs

---

## Commands Summary

| Command | What it does |
|---------|------------|
| `/start` | Begin scheduling process |
| `start` (text) | Same as `/start` |
| Button clicks | Select subjects |

Enjoy your automated study bot! 🤖
