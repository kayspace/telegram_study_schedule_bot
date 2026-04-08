/**
 * Telegram Bot Service
 * Handles basic API calls to Telegram Bot API
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

export interface TelegramMessage {
  chat: { id: number };
  text?: string;
  message_id: number;
}

export interface TelegramCallbackQuery {
  id: string;
  from: { id: number; first_name: string };
  data?: string;
  message?: { chat: { id: number }; message_id: number };
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

class TelegramBot {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Send a text message
   */
  async sendMessage(
    chatId: number,
    text: string,
    options?: any
  ): Promise<any> {
    const url = `${TELEGRAM_API_BASE}${this.token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        ...options,
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Send message with inline buttons
   */
  async sendMessageWithButtons(
    chatId: number,
    text: string,
    buttons: any[][]
  ): Promise<any> {
    return this.sendMessage(chatId, text, {
      reply_markup: {
        inline_keyboard: buttons,
      },
    });
  }

  /**
   * Edit existing message with new buttons
   */
  async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    buttons?: any[][]
  ): Promise<any> {
    const url = `${TELEGRAM_API_BASE}${this.token}/editMessageText`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: 'HTML',
        reply_markup: buttons
          ? {
              inline_keyboard: buttons,
            }
          : undefined,
      }),
    });

    if (!response.ok) {
      console.error('Edit message error:', await response.text());
    }

    return response.json();
  }

  /**
   * Answer callback query (remove loading state from button)
   */
  async answerCallbackQuery(
    callbackQueryId: string,
    text?: string
  ): Promise<any> {
    const url = `${TELEGRAM_API_BASE}${this.token}/answerCallbackQuery`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: text || '',
        show_alert: false,
      }),
    });

    return response.json();
  }

  /**
   * Set webhook URL for receiving updates
   */
  async setWebhook(url: string): Promise<any> {
    const webhookUrl = `${TELEGRAM_API_BASE}${this.token}/setWebhook`;
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    return response.json();
  }
}

export default TelegramBot;
