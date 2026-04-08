/**
 * Telegram Webhook Handler
 * Receives updates from Telegram Bot API
 */

import { NextRequest, NextResponse } from 'next/server';
import TelegramBot, { TelegramUpdate } from '@/lib/telegram-bot';
import { handleUpdate } from '@/lib/handlers';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function POST(request: NextRequest) {
  if (!TELEGRAM_TOKEN) {
    console.error('[v0] TELEGRAM_BOT_TOKEN not configured');
    return NextResponse.json(
      { error: 'Bot token not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const update = body as TelegramUpdate;

    console.log('[v0] Webhook received update:', update.update_id);

    // Initialize bot client
    const bot = new TelegramBot(TELEGRAM_TOKEN);

    // Process the update
    await handleUpdate(update, bot);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[v0] Webhook error:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'Telegram bot webhook is running',
    timestamp: new Date().toISOString(),
  });
}
