# Troubleshooting Guide

## Common Issues & Solutions

### 1. Bot Doesn't Respond to Messages

#### Issue: Bot ignores `/start` command or text messages

**Symptoms:**
- You send `/start` but bot doesn't respond
- Message disappears with no bot reply
- Bot appears offline

**Causes & Solutions:**

1. **Webhook Not Set**
   - Message **BotFather**: `/mybots` → select your bot → check webhook status
   - If no webhook: Message BotFather → `/setwebhook` → paste your URL
   - ✅ URL must be HTTPS (not HTTP)
   - ✅ URL must be publicly accessible (not localhost)

2. **Wrong Webhook URL**
   - If local: Use ngrok to expose
     ```bash
     ngrok http 3000
     # Get HTTPS URL like: https://abc123.ngrok.io
     ```
   - If Vercel: Use `https://your-project.vercel.app/api/telegram`

3. **Server Not Running**
   ```bash
   npm run dev  # Should show "started server on 0.0.0.0:3000"
   ```

4. **Environment Variable Not Set**
   - Check `.env.local` has `TELEGRAM_BOT_TOKEN`
   - Verify token is correct (from BotFather)
   - Restart dev server after adding env var

5. **Bot Token Expired/Invalid**
   - Get a fresh token from BotFather
   - Update `.env.local`
   - Restart server

**Quick Test:**
```bash
# Check if endpoint is working
curl https://your-domain.com/api/telegram

# Should return 200 status (might say "ok: false" without update, that's fine)
```

---

### 2. Buttons Don't Work / Click Has No Effect

#### Issue: User clicks subject button but nothing happens

**Symptoms:**
- Button shows loading spinner then disappears
- No message updates
- No error visible
- Same UI stays on screen

**Causes & Solutions:**

1. **Message ID Lost**
   - Check Vercel logs: `app/api/telegram`
   - Look for `[v0]` debug messages
   - Issue: Try refreshing Telegram or restarting bot

2. **Chat ID Mismatch**
   - Check logs to verify correct `chatId` and `userId`
   - Different values might cause issues

3. **Message Already Edited**
   - Telegram doesn't allow editing the same message too fast
   - Add delay between edits: `setTimeout(..., 100)`

**Debug Steps:**
1. Check browser/Telegram dev tools (if available)
2. View Vercel function logs: `Settings` → `Monitoring` → `Function Logs`
3. Look for error messages starting with `[v0]`

**Fix:**
Add debug logging to `lib/handlers.ts`:
```typescript
console.log('[v0] Callback data:', data);
console.log('[v0] Current slot:', slot);
console.log('[v0] Editing message:', { chatId, messageId });
```

---

### 3. "All slots selected!" Message When Starting Fresh

#### Issue: `/start` shows "All slots already selected" when trying to restart

**Symptoms:**
- Fresh `/start` says slots are filled
- Can't restart the schedule
- Have to wait for reset

**Causes:**

1. **Schedule Not Reset**
   - Issue: `resetUserSchedule()` not called
   - Solution: `/start` command should reset (it's in code)

2. **In-Memory Data Persistent**
   - Issue: Bot restarted but selections saved somewhere
   - Solution: This shouldn't happen (data lost on restart)

**Fix:**
The code already resets on `/start`. If still happens:
1. Restart the server: `npm run dev`
2. Check logs for errors in `resetUserSchedule()`

---

### 4. Daily Reminders Not Sending at 7 AM

#### Issue: No messages at 7 AM even after configuring cron

**Symptoms:**
- 7 AM passes but no bot message
- No reminders after waiting a day
- Cron job seems disabled

**Causes & Solutions:**

1. **Cron Job Disabled**
   - Check cron-job.org dashboard
   - Is the job enabled? (Should show green checkmark)
   - ✅ Fix: Enable the job if disabled

2. **Wrong Timezone**
   - Cron job running at wrong time
   - Check cron-job.org: Settings → Timezone
   - ✅ Fix: Set correct timezone (your local time)

3. **x-cron-secret Header Missing or Wrong**
   - Endpoint rejects unauthorized requests
   - ✅ Check: Header key is `x-cron-secret` (lowercase)
   - ✅ Check: Header value matches `.env` `CRON_SECRET`

4. **Webhook URL Wrong in Cron**
   - Cron hitting wrong endpoint
   - ✅ Fix: Verify URL is exactly: `https://your-project.vercel.app/api/cron/schedule`

5. **Vercel Server Down or Redeployed**
   - Deployment might have paused
   - ✅ Check: Vercel dashboard → Deployments
   - ✅ Check: Function is actually deployed

6. **No Users to Send To**
   - Bot has never been used
   - No entries in `userSelections`
   - ✅ Fix: Use bot with `/start` first, then cron has users to message

**Debug Steps:**

1. **Test Cron Manually:**
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
     "failed": 0
   }
   ```

2. **Check Cron Logs:**
   - cron-job.org: Click job → View "Execution Log"
   - Look for HTTP status (should be 200)

3. **Check Vercel Logs:**
   - Dashboard → Function Logs
   - Search for `[v0] Sending daily prompts`

4. **Force Test Execution:**
   - cron-job.org: Select job → Click "Force Execution"
   - Check Telegram immediately for test message

---

### 5. "Unauthorized" Error on Cron Job

#### Issue: Cron endpoint returns 401 Unauthorized

**Symptoms:**
- Cron job fails with 401
- Cron logs show "Unauthorized"
- Cron execution shows red X

**Causes:**

1. **Missing x-cron-secret Header**
   - ✅ Fix: In cron-job.org, add header:
     - **Key**: `x-cron-secret` (lowercase!)
     - **Value**: Your `CRON_SECRET` from `.env`

2. **Header Value Doesn't Match**
   - ✅ Check: `.env` value vs cron-job.org value match exactly
   - ✅ Check: No extra spaces or typos

3. **Wrong Header Key**
   - ✅ Must be: `x-cron-secret` (not `X-Cron-Secret` or other variation)
   - Note: HTTP headers are case-insensitive for key, but code checks lowercase

**Fix:**
1. Go to cron-job.org
2. Edit your cronjob
3. Scroll to "HTTP Headers"
4. Add header:
   ```
   Key: x-cron-secret
   Value: your-secret-value-here
   ```
5. Save and test "Force Execution"

---

### 6. Bot Token Invalid / Expired

#### Issue: "Bot token is invalid" or Telegram API errors

**Symptoms:**
- Any action returns error
- Bot suddenly stops working
- All requests to Telegram fail

**Causes:**

1. **Wrong Token Format**
   - Should be: `123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D`
   - ✅ Check: Numbers:Letters ratio correct

2. **Token Typed Wrong**
   - Single character difference breaks it
   - ✅ Fix: Get fresh token from BotFather:
     ```
     Message BotFather
     /mybots
     Select your bot
     "API Token" button
     Copy token exactly
     ```

3. **Old Token (from Deleted Bot)**
   - Bot might have been deleted
   - ✅ Fix: Create new bot via BotFather `/newbot`

4. **Token Expired**
   - Telegram might invalidate old tokens
   - ✅ Fix: Generate new token

**Verify Token:**
```bash
# Direct test (in terminal, replace TOKEN)
curl https://api.telegram.org/botTOKEN/getMe

# Should return:
# {"ok":true,"result":{"id":123456...}}
```

---

### 7. Vercel Deployment Issues

#### Issue: Bot works locally but not after deploying to Vercel

**Symptoms:**
- Local works perfectly
- Deployed version doesn't respond
- Webhook shows "failed to send message"

**Causes & Solutions:**

1. **Environment Variables Not Set in Vercel**
   - ✅ Go to: Vercel Dashboard → Project → Settings → Environment Variables
   - ✅ Add: `TELEGRAM_BOT_TOKEN`
   - ✅ Add: `CRON_SECRET`
   - ✅ Redeploy after adding

2. **Webhook URL Not Updated**
   - Still pointing to localhost or old URL
   - ✅ Message BotFather:
     ```
     /setwebhook
     https://your-project.vercel.app/api/telegram
     ```

3. **Build Error (Not Running)**
   - Check Vercel logs → Deployments
   - Click latest deployment → "Logs"
   - Look for errors during build
   - ✅ Fix: Ensure all imports are correct

4. **Function Timeout**
   - Endpoint takes too long
   - ✅ Check: Each handler completes in <10 seconds

**Debug Deployment:**
1. Go to Vercel dashboard
2. Click your project
3. Go to "Deployments"
4. Click latest deployment
5. View "Logs" tab
6. Search for errors or `[v0]` messages

---

### 8. In-Memory Data Lost on Restart

#### Issue: Selections reset every time server restarts

**Symptoms:**
- User selections disappear after deploy
- Schedule lost when Vercel restarts
- Have to start over each time

**Cause:**
Data stored in memory (by design for now)

**Solutions:**

**Short-term** (Testing):
- Accept data loss on restart
- Use `/start` to begin again

**Production** (Recommended):
- Set up database (5 minutes):
  - Supabase (PostgreSQL) - free tier
  - MongoDB - free tier
  - Firebase - free tier
- Replace `userSelections` in `lib/schedule.ts` with DB queries

---

### 9. Rate Limiting / Message Send Fails

#### Issue: Bot can't send messages or gets rate limited

**Symptoms:**
- "429 Too Many Requests" errors
- Messages fail silently
- Cron job fails for some users

**Causes:**

1. **Too Many Messages Too Fast**
   - Telegram rate limits ~30 msg/second
   - ✅ Solution: Add delays
     ```typescript
     await new Promise(r => setTimeout(r, 100));
     ```

2. **Same User Bombarded**
   - User clicks button 10x rapidly
   - ✅ Solution: Add button click cooldown

3. **Cron Sending to All Users at Once**
   - 1000 users → 1000 requests simultaneously
   - ✅ Solution: Stagger requests (code already does this)

**Current Code Includes Delays:**
```typescript
// In /api/cron/schedule.ts
await new Promise((resolve) => setTimeout(resolve, 100));
```

This should be sufficient for most use cases.

---

### 10. ngrok Tunnel Expired / Disconnected

#### Issue: Local testing stops working after few hours

**Symptoms:**
- Worked earlier, now bot doesn't respond
- ngrok tunnel shows "disconnected"
- 403 errors in logs

**Cause:**
ngrok free tier disconnects after inactivity or time limit

**Solutions:**

1. **Restart ngrok**
   ```bash
   # Kill the ngrok process
   # Restart:
   ngrok http 3000
   ```

2. **Get New URL**
   - Each restart gives new URL
   - ✅ Update webhook: BotFather → `/setwebhook`

3. **Use Paid ngrok** (Optional)
   - ngrok pro has persistent URLs
   - Or skip ngrok, just deploy to Vercel

**Better Approach:**
- Deploy to Vercel directly
- Skip local testing with ngrok
- Use Vercel's URL for webhook

---

## Debugging Checklist

When something breaks, go through this:

- [ ] Check Vercel logs: Dashboard → Function Logs → Search `[v0]`
- [ ] Check cron-job.org: Dashboard → Execution Log
- [ ] Verify environment variables set correctly
- [ ] Test webhook manually with curl
- [ ] Verify BotFather webhook is set
- [ ] Check bot token is valid (message BotFather)
- [ ] Ensure HTTPS URLs (not HTTP)
- [ ] Test locally with `npm run dev`
- [ ] Test on Telegram with `/start`
- [ ] Check browser console for errors

---

## Getting More Help

1. **Telegram Bot Issues:**
   - Message BotFather with `/help`
   - Check core.telegram.org/bots

2. **Vercel Issues:**
   - Vercel docs: vercel.com/docs
   - Check Vercel status page

3. **Cron Issues:**
   - cron-job.org has email support
   - Upstash has documentation

4. **Code Issues:**
   - Check console.log `[v0]` messages
   - Add more debug logging
   - Share logs when asking for help

---

## Emergency Reset

If everything is broken:

1. **Reset .env file**
   ```
   Delete .env.local
   Get fresh token from BotFather
   Create new .env.local
   ```

2. **Reset Webhook**
   ```
   Message BotFather
   /deletewebhook
   /setwebhook https://your-domain/api/telegram
   ```

3. **Reset Cron**
   ```
   Delete existing cron job
   Create new one with fresh secret
   ```

4. **Restart Everything**
   ```bash
   npm run dev
   # Or redeploy to Vercel
   ```

---

## Prevention Tips

✅ **Do:**
- Keep `.env` secret safe
- Monitor Vercel logs weekly
- Test cron with "Force Execution" monthly
- Update dependencies regularly
- Use proper error handling

❌ **Don't:**
- Hardcode secrets in code
- Use localhost URLs for production
- Ignore error messages
- Share .env file publicly
- Deploy without testing locally first

---

Still stuck? Add more `console.log('[v0] ...')` statements to trace execution flow!
