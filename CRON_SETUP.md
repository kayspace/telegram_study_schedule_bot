# Setting Up Daily 7 AM Reminders

Your bot is ready to send automatic reminders at 7 AM every day. Here's how to set it up.

## Option 1: cron-job.org (Easiest - 5 minutes)

### Step 1: Sign Up (Free)

1. Go to [cron-job.org](https://cron-job.org)
2. Click "Sign up for free"
3. Create account and verify email

### Step 2: Create New Cronjob

1. Click "Create Cronjob"
2. Fill in:

   **Title:**
   ```
   Study Bot Daily Reminder
   ```

   **URL:**
   ```
   https://your-project.vercel.app/api/cron/schedule
   ```
   (Replace with your actual URL)

   **Request Method:**
   ```
   POST
   ```

   **Execution Times:**
   - Click "Advanced"
   - Set to: **Every day at 7:00 AM** (select your timezone)

   **HTTP Headers** (Important!):
   - Click "Add Header"
   - **Key**: `x-cron-secret`
   - **Value**: The secret from your `CRON_SECRET` env variable
     (e.g., `your-super-secret-key-123`)

3. Click "Create"
4. Done! ✅

### Verify It Works

1. You should see your job in the dashboard
2. Click the job and select "Force execution" to test immediately
3. Check your Telegram bot - it should send a message to all users!

---

## Option 2: Upstash (Alternative - 5 minutes)

### Step 1: Create Upstash Account

1. Go to [upstash.com](https://upstash.com)
2. Sign up (free tier available)
3. Create a new QStash project

### Step 2: Create Scheduled Message

1. Go to QStash console
2. Click "Schedule" → "Create Schedule"
3. Fill in:

   **Endpoint:**
   ```
   https://your-project.vercel.app/api/cron/schedule
   ```

   **Schedule Pattern (Cron):**
   ```
   0 7 * * *
   ```
   (This means: 7:00 AM every day)

   **Headers:**
   - Click "Add Header"
   - **Key**: `x-cron-secret`
   - **Value**: Your secret key

   **Method:**
   ```
   POST
   ```

4. Create schedule
5. Done! ✅

---

## Option 3: AWS EventBridge (Advanced - 10 minutes)

If you're already using AWS:

1. Go to AWS Console → EventBridge
2. Create new rule
3. Set schedule: `cron(0 7 * * ? *)`
4. Target: HTTP endpoint to your API
5. Add header: `x-cron-secret: your-secret`

---

## Option 4: Google Cloud Scheduler (If using Google Cloud)

1. Go to Cloud Scheduler
2. Create new job
3. Frequency: `0 7 * * *`
4. Timezone: Your timezone
5. HTTP target:
   - URL: `https://your-project.vercel.app/api/cron/schedule`
   - Auth: Add Authorization header
   - Headers: `x-cron-secret: your-secret`

---

## Testing Your Cron Job

### Method 1: Force Execution (Easiest)

If using cron-job.org:
1. Go to dashboard
2. Find your cronjob
3. Click "Force Execution"
4. Check your Telegram - bot should message all users

### Method 2: Manual Test with cURL

```bash
curl -X POST \
  -H "x-cron-secret: your-secret-key" \
  https://your-project.vercel.app/api/cron/schedule
```

Should return:
```json
{
  "success": true,
  "sent": 5,
  "failed": 0,
  "timestamp": "2024-01-15T07:00:00.000Z"
}
```

### Method 3: Check Logs

1. Go to Vercel dashboard
2. View function logs for `/api/cron/schedule`
3. Should show: `[v0] Sending daily prompts to X users`

---

## Cron Expression Guide

Cron format: `minute hour day month dayOfWeek`

### Common Examples:

```
0 7 * * *     → 7:00 AM every day
30 7 * * *    → 7:30 AM every day
0 8 * * 1-5   → 8:00 AM Monday-Friday
0 7 * * 0     → 7:00 AM every Sunday
0 7 1 * *     → 7:00 AM on 1st of each month
```

Use [crontab.guru](https://crontab.guru) to test cron expressions.

---

## Troubleshooting

### "Unauthorized" Error

- Check that `x-cron-secret` header matches your `CRON_SECRET` environment variable
- Headers are case-sensitive

### "Failed to send prompt" Errors

- Some users might have blocked the bot or left - this is normal
- Check failed count in response

### Cron Job Never Runs

1. Check cron service dashboard - is job enabled?
2. Verify URL is correct
3. Verify timezone is correct
4. Try "Force execution" to test

### Bot Not Sending Messages

1. Check `/api/cron/schedule` logs in Vercel
2. Look for `[v0]` debug messages
3. Verify bot token is correct
4. Check that users exist in the system

---

## Email Notifications (Optional)

Most cron services can email you when jobs fail:

**cron-job.org:**
1. Go to Settings
2. Enable email notifications
3. Add email for failure alerts

**Upstash:**
1. Set up Slack/Discord webhooks
2. Get alerts in real-time

---

## Best Practices

✅ **Do:**
- Start with cron-job.org for simplicity
- Use `x-cron-secret` header for security
- Test with "Force execution" before relying on it
- Monitor execution logs weekly
- Keep timezone consistent

❌ **Don't:**
- Hardcode secrets in URLs
- Set multiple cron jobs for same endpoint
- Trust only the frequency without verification
- Skip timezone selection

---

## Support

- **cron-job.org Help**: [Support Page](https://cron-job.org/en/help/)
- **Upstash Help**: [Docs](https://upstash.com/docs)
- **Cron Expression Help**: [crontab.guru](https://crontab.guru)

---

Next: Set up your bot webhook in **TELEGRAM_BOT_SETUP.md**!
