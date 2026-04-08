# 📁 Files Guide - What Each File Does

Your project has been built with **9 files + documentation**. This guide explains what each file does.

## 🤖 Core Bot Logic Files (lib/)

### 1. `lib/telegram-bot.ts` (146 lines)
**What it does:** Wraps Telegram Bot API calls

**Key functions:**
```typescript
sendMessage(chatId, text)                    // Send plain text
sendMessageWithButtons(chatId, text, buttons) // Send with buttons
editMessageText(chatId, msgId, text, buttons) // Edit existing message
answerCallbackQuery(id)                       // Handle button click
setWebhook(url)                               // Setup webhook
```

**When it's used:**
- Every time you send a message
- Every time you update a message
- Every time user clicks a button

**Example:**
```typescript
await bot.sendMessage(chatId, "Hello!");
await bot.sendMessageWithButtons(chatId, "Pick one:", [
  [{text: "Option 1", callback_data: "opt_1"}]
]);
```

---

### 2. `lib/schedule.ts` (146 lines)
**What it does:** Manages study schedule data and logic

**Key data:**
```typescript
SUBJECTS                  // 7 available subjects
SLOTS                     // 4 time slots with times
userSelections           // Where user selections are stored (in-memory)
```

**Key functions:**
```typescript
getSubjects()                    // List all subjects
getSlots()                       // List all slots
selectSubject(userId, slot, subject)  // Save user's choice
getCurrentSlot(userId)           // Which slot is user on?
isScheduleComplete(userId)       // Are all 4 slots filled?
getUserSchedule(userId)          // Get all selections for user
generateTimetableMessage(userId) // Create formatted timetable
resetUserSchedule(userId)        // Clear user's selections
```

**When it's used:**
- When user clicks a subject button
- When checking if schedule is complete
- When generating final timetable
- When `/start` is called (reset)

---

### 3. `lib/handlers.ts` (186 lines)
**What it does:** Processes messages and button clicks

**Key functions:**
```typescript
handleUpdate(update, bot)                    // Route updates to handlers
handleMessage(message, bot)                  // Handle text messages
handleCallbackQuery(query, bot)              // Handle button clicks
sendSchedulePrompt(chatId, bot, messageId)  // Show slot selection UI
sendDailySchedulePrompt(chatId, bot)         // Send morning greeting + prompt
```

**Flow:**
```
Message "/start"
  ↓
handleMessage() detects /start
  ↓
resetUserSchedule()
  ↓
sendSchedulePrompt() shows Slot 1 buttons

User clicks button
  ↓
handleCallbackQuery() detects click
  ↓
selectSubject() saves choice
  ↓
Check if complete?
  ├─ No: sendSchedulePrompt() shows Slot 2
  └─ Yes: Display timetable
```

---

## 📡 API Endpoints (app/api/)

### 4. `app/api/telegram/route.ts` (46 lines)
**What it does:** Receives messages from Telegram (webhook)

**Endpoint:** `POST /api/telegram`

**How it works:**
1. Telegram sends user message/button click
2. This endpoint receives it
3. Calls `handleUpdate()` from handlers.ts
4. Sends response back to Telegram

**What it receives:**
```json
{
  "update_id": 12345,
  "message": {
    "chat": {"id": 123456},
    "text": "/start",
    "message_id": 1
  }
}
```

or

```json
{
  "update_id": 12346,
  "callback_query": {
    "id": "query_id",
    "from": {"id": 123456},
    "data": "slot_Mathematics",
    "message": {
      "chat": {"id": 123456},
      "message_id": 2
    }
  }
}
```

**What it returns:**
```json
{"ok": true}
```

**Security:** Anyone can call it (Telegram API validates on their side)

---

### 5. `app/api/cron/schedule.ts` (83 lines)
**What it does:** Sends daily 7 AM reminders

**Endpoint:** `POST /api/cron/schedule`

**Headers required:**
```
x-cron-secret: your-secret-key
```

**How it works:**
1. Cron service (cron-job.org) calls this at 7 AM
2. Verifies the `x-cron-secret` header
3. Gets list of all users
4. Sends morning greeting to each
5. Initiates schedule selection
6. Returns stats (sent count, failed count)

**What it receives:**
```
POST /api/cron/schedule
Header: x-cron-secret: your-secret-key
(no body needed)
```

**What it returns:**
```json
{
  "success": true,
  "timestamp": "2024-01-15T07:00:00.000Z",
  "sent": 42,
  "failed": 0
}
```

**Security:** Only authorized cron services with correct secret can call it

---

## 🎨 Frontend/UI

### 6. `app/page.tsx` (292 lines)
**What it does:** Shows setup dashboard when you visit `/`

**URL:** `https://your-domain.com/`

**Features:**
- ✅ Visual overview of the bot
- ✅ Quick start guide
- ✅ Links to documentation
- ✅ Feature showcase
- ✅ Environment setup instructions
- ✅ Styled with Tailwind CSS

**Who sees it:** Only you during setup (not related to Telegram bot)

**Example:** When you run `npm run dev`, visit `http://localhost:3000` to see it

---

## 📖 Documentation Files

### 7. `README.md` (201 lines)
**Purpose:** Project overview

**Includes:**
- Features summary
- Quick start
- Architecture overview
- Time slots & subjects
- Environment variables
- File structure
- Deployment options
- Troubleshooting quick links

**When to read:** First time getting overview

---

### 8. `QUICK_START.md` (143 lines)
**Purpose:** Fastest way to get running

**Includes:**
- 5-minute setup steps
- Create bot with BotFather
- Local testing
- ngrok setup for testing
- Test on Telegram
- Production deployment overview

**When to read:** When you want to start immediately

---

### 9. `TELEGRAM_BOT_SETUP.md` (268 lines)
**Purpose:** Complete detailed setup guide

**Includes:**
- All BotFather steps
- Webhook setup
- Production deployment options
- File structure explanation
- Troubleshooting
- Command reference
- Production tips

**When to read:** Full deep dive on how everything works

---

### 10. `CRON_SETUP.md` (243 lines)
**Purpose:** Setting up daily 7 AM reminders

**Includes:**
- cron-job.org setup (step-by-step)
- Upstash alternative
- AWS EventBridge alternative
- Google Cloud Scheduler alternative
- Testing cron jobs
- Cron expression guide
- Troubleshooting reminders

**When to read:** When you want daily automatic reminders

---

### 11. `ARCHITECTURE.md` (342 lines)
**Purpose:** How everything works (with diagrams)

**Includes:**
- System component diagram
- Message flow diagrams
- Daily reminder flow
- User journey with examples
- Data storage structure
- Configuration points
- Security layers
- Scalability considerations

**When to read:** When you want to understand the code deeply

---

### 12. `IMPLEMENTATION_SUMMARY.md` (278 lines)
**Purpose:** What was built and what works

**Includes:**
- Complete feature list
- What's implemented
- Data flow documentation
- Security features
- Testing checklist
- Next steps for production
- Learning path

**When to read:** To see what features are ready

---

### 13. `TROUBLESHOOTING.md` (507 lines)
**Purpose:** Fix any issues

**Includes:**
- 10 common issues
- Symptoms & causes
- Solutions for each
- Debug steps
- Quick testing commands
- Prevention tips
- Emergency reset

**When to read:** When something isn't working

---

### 14. `START_HERE.md` (332 lines)
**Purpose:** Your entry point

**Includes:**
- What's built
- Your next 3 steps
- Documentation map
- Quick reference
- Reading path
- Customization tips
- Support resources

**When to read:** Right now! (if you haven't already)

---

### 15. `FILES_GUIDE.md` (This file)
**Purpose:** Explain each file

**Includes:**
- Description of each file
- Key functions/features
- When it's used
- Example code
- Purpose overview

---

### 16. `.env.example` (12 lines)
**Purpose:** Template for environment variables

**Contains:**
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
CRON_SECRET=your-super-secret-key-change-me-123
```

**How to use:**
1. Copy to `.env.local`
2. Replace with real values
3. Don't commit to GitHub

---

## 📊 File Dependency Map

```
User/Telegram
    ↓
telegram/route.ts
    ↓
handlers.ts
    ├─→ telegram-bot.ts
    ├─→ schedule.ts
    └─→ (sends messages back)
    
User clicks /api/telegram
    ↓ gets update ↓
handleUpdate() processes it
    ↓
├─→ User typed /start
│   └─→ handleMessage()
│       └─→ resetUserSchedule()
│           └─→ sendSchedulePrompt()
│               └─→ telegram-bot.sendMessageWithButtons()
│
└─→ User clicked button
    └─→ handleCallbackQuery()
        ├─→ selectSubject() [save to schedule.ts]
        ├─→ isScheduleComplete() [check schedule.ts]
        └─→ telegram-bot.editMessageText()

Cron Job (Daily 7 AM)
    ↓
cron/schedule.ts
    ├─→ getAllUserSelections() [from schedule.ts]
    └─→ For each user:
        └─→ sendDailySchedulePrompt()
            └─→ telegram-bot.sendMessage()
```

---

## 🔄 Request Flow

### Message Request
```
1. User sends /start in Telegram
2. Telegram servers process it
3. Telegram sends POST to /api/telegram
4. Node.js backend receives request
5. handlers.handleUpdate() is called
6. handlers.handleMessage() processes it
7. Checks if text is "/start"
8. Calls resetUserSchedule(userId)
9. Calls sendSchedulePrompt(chatId)
10. sendSchedulePrompt() calls:
    - telegram-bot.sendMessageWithButtons()
11. telegram-bot.sendMessageWithButtons() calls:
    - fetch() to Telegram API
12. Telegram API receives request
13. Message appears on user's phone
14. Response sent back to backend
15. Backend responds {"ok": true} to Telegram
```

### Button Click Request
```
1. User clicks "Mathematics" button
2. Telegram captures callback_query
3. Sends POST to /api/telegram
4. handlers.handleUpdate() is called
5. handlers.handleCallbackQuery() processes it
6. Parses callback_data: "slot_Mathematics"
7. Calls selectSubject(userId, "Slot 1", "Mathematics")
8. Saves to userSelections[userId]
9. Checks isScheduleComplete()
10. If not done: calls sendSchedulePrompt() for next slot
11. If done: calls generateTimetableMessage() and editMessageText()
12. Message updates on user's phone
13. Response sent back
```

---

## 💾 Data Flow

### In-Memory Storage
```typescript
// In lib/schedule.ts

const userSelections = {
  // User ID 123456
  123456: {
    "Slot 1": "Mathematics",
    "Slot 2": "Propulsion",
    "Slot 3": null,
    "Slot 4": null,
    timestamp: 1705315200000
  },
  
  // User ID 654321
  654321: {
    "Slot 1": "Aerodynamics",
    "Slot 2": "Space Dynamics",
    "Slot 3": "Flight Mechanics",
    "Slot 4": "Structures",
    timestamp: 1705315300000
  }
}
```

---

## 📋 Key Files by Use Case

**Just want to test?**
→ QUICK_START.md + lib/handlers.ts

**Want to deploy?**
→ TELEGRAM_BOT_SETUP.md + CRON_SETUP.md

**Want to understand code?**
→ ARCHITECTURE.md + Read lib/*.ts files

**Having issues?**
→ TROUBLESHOOTING.md

**Want deep dive?**
→ IMPLEMENTATION_SUMMARY.md + ARCHITECTURE.md

**Want to customize?**
→ Edit lib/schedule.ts (SUBJECTS, SLOTS)

---

## 🎯 Most Important Files

**For Getting Started:**
1. START_HERE.md (you are here area)
2. QUICK_START.md (5-minute setup)
3. lib/handlers.ts (logic)

**For Understanding:**
1. ARCHITECTURE.md (diagrams)
2. IMPLEMENTATION_SUMMARY.md (what's built)
3. lib/telegram-bot.ts (API calls)

**For Troubleshooting:**
1. TROUBLESHOOTING.md (fixes)
2. Vercel logs (debug)
3. telegram-bot.ts (error messages)

---

## 🚀 File Sizes

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| telegram-bot.ts | 146 | 5 KB | API wrapper |
| schedule.ts | 146 | 4 KB | Data & logic |
| handlers.ts | 186 | 6 KB | Message processing |
| telegram/route.ts | 46 | 1.5 KB | Webhook |
| cron/schedule.ts | 83 | 2.5 KB | Daily reminder |
| page.tsx | 292 | 10 KB | Dashboard UI |
| **Total Code** | **899** | **29 KB** | Main bot |

---

## ✅ Checklist

- [ ] Read START_HERE.md
- [ ] Read QUICK_START.md
- [ ] Check lib/schedule.ts to understand data storage
- [ ] Check lib/handlers.ts to understand message flow
- [ ] Check app/api/telegram/route.ts to see webhook
- [ ] Create `.env.local` with your token
- [ ] Run `npm run dev`
- [ ] Test on Telegram
- [ ] Read CRON_SETUP.md for reminders
- [ ] Deploy when ready

---

**Next Step:** Open START_HERE.md or QUICK_START.md!
