# 📚 Telegram Study Schedule Bot

A free, fully-automated Telegram bot that helps users plan their daily study schedule with interactive prompts and automatic 7 AM reminders.

**Live Features:**
- ✅ Manual `/start` command for testing anytime
- ✅ Interactive 4-slot subject selection via buttons
- ✅ Auto-generated personalized timetables
- ✅ Daily 7 AM automatic reminders (when configured)

## 🚀 Quick Start (5 minutes)

### Step 1: Create Your Bot
1. Open Telegram and search for **"BotFather"**
2. Type `/newbot`
3. Copy your API Token

### Step 2: Configure Locally
```bash
# Create .env.local
TELEGRAM_BOT_TOKEN=your_token_here
CRON_SECRET=any-secret-key

# Install and run
npm install
npm run dev
```

### Step 3: Test on Telegram
1. Search for your bot on Telegram
2. Click **Start** or type `start`
3. Select subjects for each time slot
4. See your timetable appear!

## 📖 Full Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[TELEGRAM_BOT_SETUP.md](./TELEGRAM_BOT_SETUP.md)** - Complete guide with all details
- **[CRON_SETUP.md](./CRON_SETUP.md)** - Setting up daily 7 AM reminders

## 🏗️ Architecture

```
Telegram User
    ↓
Telegram Bot API
    ↓
Your Bot (Next.js)
├── /api/telegram → Receives messages & button clicks
├── /api/cron/schedule → Sends daily 7 AM reminders
├── lib/telegram-bot.ts → API wrapper
├── lib/schedule.ts → Data management
└── lib/handlers.ts → Message logic
```

## ⏰ Time Slots & Subjects

### Slots
- **Slot 1**: 8:30 AM - 11:00 AM
- **Slot 2**: 12:10 PM - 2:00 PM
- **Slot 3**: 2:40 PM - 5:40 PM
- **Slot 4**: 7:30 PM - 10:00 PM

### Subjects (Choose 1 for each slot)
1. Aerodynamics
2. Space Dynamics
3. Propulsion
4. Structures
5. Flight Mechanics
6. Mathematics
7. Aptitude
8. Gas Dynamics
9. Fluid Mechanics

## 🔧 Environment Variables

Required:
```
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
CRON_SECRET=your-secret-key-for-cron-endpoint
```

See `.env.example` for reference.

## 📦 File Structure

```
lib/
├── telegram-bot.ts         # Telegram API client
├── schedule.ts             # Schedule data & logic
└── handlers.ts             # Message & button handlers

app/
├── page.tsx                # Setup dashboard
└── api/
    ├── telegram/route.ts   # Webhook endpoint
    └── cron/schedule.ts    # Daily 7 AM trigger

QUICK_START.md              # 5-minute setup
TELEGRAM_BOT_SETUP.md       # Full guide
CRON_SETUP.md              # Cron configuration
.env.example               # Environment template
```

## 🤖 How It Works

### User Flow:
```
/start → Select Slot 1 → Select Slot 2 → Select Slot 3 → Select Slot 4 → ✅ Timetable
```

### Daily Reminder Flow:
```
7:00 AM (Cron) → "Good morning!" → Slot selection prompt → Same flow as above
```

## 🚀 Deployment Options

### Vercel (Recommended - Free)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Bot is live!

### Other Platforms
Any platform supporting Node.js (Heroku, Railway, AWS Lambda, etc.)

## ⚙️ Setting Up Daily Reminders

Choose one of these free services:

### Option 1: cron-job.org (Easiest)
1. Sign up at [cron-job.org](https://cron-job.org)
2. Create cronjob pointing to `/api/cron/schedule`
3. Set time to 7:00 AM daily
4. Add header: `x-cron-secret: your-secret-key`

### Option 2: Upstash
1. Sign up at [upstash.com](https://upstash.com)
2. Create QStash schedule
3. Cron: `0 7 * * *`
4. Add same header as above

## 🔐 Security Notes

- Never commit `.env.local` (use `.env.example`)
- Use `x-cron-secret` header to protect cron endpoint
- Only webhook endpoint accepts Telegram messages
- In production, use a database instead of in-memory storage

## 🛠️ Customization

### Change Time Slots
Edit `lib/schedule.ts`:
```typescript
const SLOTS = [
  { name: 'Slot 1', time: 'Your time here' },
  // ...
];
```

### Add/Remove Subjects
Edit `lib/schedule.ts`:
```typescript
const SUBJECTS = ['Your', 'Subjects', 'Here'];
```

### Store in Database
Replace `userSelections` object in `lib/schedule.ts` with database queries.

## 🆘 Troubleshooting

### Bot doesn't respond
1. Check webhook is set (BotFather → `/mybots`)
2. Ensure URL is HTTPS (not HTTP)
3. Check Vercel logs for errors

### Daily reminders not working
1. Verify cron job is enabled in your service
2. Check `x-cron-secret` header matches
3. Test with "Force Execution"

### "All slots selected" error
- User needs to type `/start` to reset and try again

## 📚 Learning Resources

- [Telegram Bot API Docs](https://core.telegram.org/bots)
- [BotFather Commands](https://core.telegram.org/bots#botfather)
- [Cron Expression Help](https://crontab.guru)

## 📄 License

Free to use and modify.

---

**Questions?** Check the detailed guides or Telegram Bot API documentation.
