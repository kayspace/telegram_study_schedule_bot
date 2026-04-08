/**
 * Cron Endpoint for Daily 7 AM Schedule Prompts
 * Call this endpoint from a cron service (cron-job.org, Upstash, etc.)
 * to send daily reminders at 7 AM
 */

import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "@/lib/telegram-bot";
import { sendDailySchedulePrompt } from "@/lib/handlers";
import { getAllUserSelections } from "@/lib/schedule";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CRON_SECRET = process.env.CRON_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  // Verify the cron secret for security
  const secret = request.headers.get("x-cron-secret");

  if (secret !== CRON_SECRET) {
    console.error("[v0] Unauthorized cron request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!TELEGRAM_TOKEN) {
    console.error("[v0] TELEGRAM_BOT_TOKEN not configured");
    return NextResponse.json(
      { error: "Bot token not configured" },
      { status: 500 },
    );
  }

  try {
    const bot = new TelegramBot(TELEGRAM_TOKEN);

    // Get all users who have interacted with the bot
    const allSelections = getAllUserSelections();
    const userIds = Object.keys(allSelections).map((id) => parseInt(id));

    console.log(`[v0] Sending daily prompts to ${userIds.length} users`);

    let sent = 0;
    let failed = 0;

    // Send daily prompt to each user
    for (const userId of userIds) {
      try {
        await sendDailySchedulePrompt(userId, bot);
        sent++;
      } catch (error) {
        console.error(`[v0] Failed to send prompt to ${userId}:`, error);
        failed++;
      }

      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(`[v0] Cron job completed. Sent: ${sent}, Failed: ${failed}`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      sent,
      failed,
    });
  } catch (error) {
    console.error("[v0] Cron job error:", error);
    return NextResponse.json(
      { error: "Cron job failed", details: String(error) },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "This is a cron endpoint. Send POST with x-cron-secret header.",
    timestamp: new Date().toISOString(),
  });
}
