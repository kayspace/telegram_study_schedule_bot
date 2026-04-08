/**
 * Message Handlers
 * Handles different user interactions with the bot
 */

import TelegramBot, {
  TelegramUpdate,
  TelegramMessage,
  TelegramCallbackQuery,
} from "./telegram-bot";
import {
  getSubjects,
  getSlots,
  getCurrentSlot,
  selectSubject,
  isScheduleComplete,
  generateTimetableMessage,
  resetUserSchedule,
  getUserSchedule,
  initializeTimeSlotSetup,
  getLastUserTimes,
  usePreviousTimes,
  addCustomTime,
  isTimeSetupComplete,
  startSubjectSelection,
  getUserPhase,
  getCurrentTimeSlotIndex,
  getUserCustomTimes,
} from "./schedule";

export async function handleUpdate(
  update: TelegramUpdate,
  bot: TelegramBot,
): Promise<void> {
  console.log("[v0] Processing update:", update.update_id);

  // Handle text messages
  if (update.message) {
    await handleMessage(update.message, bot);
  }

  // Handle button clicks
  if (update.callback_query) {
    await handleCallbackQuery(update.callback_query, bot);
  }
}

/**
 * Handle incoming text messages
 */
async function handleMessage(
  message: TelegramMessage,
  bot: TelegramBot,
): Promise<void> {
  const chatId = message.chat.id;
  const text = message.text?.toLowerCase().trim() || "";

  console.log(`[v0] Message from ${chatId}: ${text}`);

  // /start command - begin scheduling
  if (text === "/start" || text === "start") {
    resetUserSchedule(chatId);
    initializeTimeSlotSetup(chatId);
    await offerTimeSlotOptions(chatId, bot);
    return;
  }

  // Check if user is setting up times
  const phase = getUserPhase(chatId);
  if (phase === "time-setup") {
    await handleTimeInput(chatId, message.text || "", bot);
    return;
  }

  // Unknown command
  await bot.sendMessage(
    chatId,
    "I understand the following commands:\n\n" +
      "/start - Begin your study schedule selection\n\n" +
      'Just send "start" anytime to restart.',
  );
}

/**
 * Handle button clicks (callback queries)
 */
async function handleCallbackQuery(
  query: TelegramCallbackQuery,
  bot: TelegramBot,
): Promise<void> {
  const userId = query.from.id;
  const chatId = query.message?.chat.id;
  const messageId = query.message?.message_id;
  const data = query.data || "";

  console.log(`[v0] Callback from ${userId}: ${data}`);

  if (!chatId || !messageId) return;

  // Answer the callback to remove loading state
  await bot.answerCallbackQuery(query.id);

  // Handle "use previous times" button
  if (data === "use_previous") {
    if (usePreviousTimes(userId)) {
      await bot.editMessageText(
        chatId,
        messageId,
        "<b>✅ Using your last saved times!</b>\n\nNow select subjects for each slot.",
      );
      await sendSchedulePrompt(chatId, bot);
    } else {
      await bot.editMessageText(
        chatId,
        messageId,
        "❌ No previous times found. Please set your time slots.",
      );
      await offerTimeSlotOptions(chatId, bot, messageId);
    }
    return;
  }

  // Handle "set new times" button
  if (data === "set_new") {
    await sendTimePrompt(chatId, bot, messageId);
    return;
  }

  // Handle subject selection: "slot_Subject Name"
  if (data.startsWith("slot_")) {
    const subject = data.substring(5);
    const slot = getCurrentSlot(userId);

    if (!slot) {
      await bot.sendMessage(
        chatId,
        "✅ All slots already selected! Send /start to restart.",
      );
      return;
    }

    // Save selection
    selectSubject(userId, slot, subject);
    console.log(`[v0] User ${userId} selected ${subject} for ${slot}`);

    // Check if all slots are filled
    if (isScheduleComplete(userId)) {
      const timetable = generateTimetableMessage(userId);
      await bot.editMessageText(chatId, messageId, timetable);
      return;
    }

    // Show next slot
    await sendSchedulePrompt(chatId, bot, messageId);
  }
}

/**
 * Send schedule selection prompt with buttons
 */
export async function sendSchedulePrompt(
  chatId: number,
  bot: TelegramBot,
  messageId?: number,
): Promise<void> {
  const currentSlot = getCurrentSlot(chatId);

  if (!currentSlot) {
    const timetable = generateTimetableMessage(chatId);
    if (messageId) {
      await bot.editMessageText(chatId, messageId, timetable);
    } else {
      await bot.sendMessage(chatId, timetable);
    }
    return;
  }

  const customTimes = getUserCustomTimes(chatId);
  const slotNumber = parseInt(currentSlot.split(" ")[1]) - 1;
  const time = customTimes[slotNumber] || "Not set";

  const subjects = getSubjects();
  const schedule = getUserSchedule(chatId);

  // Create buttons: 3 columns
  const buttons: any[][] = [];
  for (let i = 0; i < subjects.length; i += 3) {
    const row = subjects.slice(i, i + 3).map((subject) => ({
      text: subject,
      callback_data: `slot_${subject}`,
    }));
    buttons.push(row);
  }

  const progressText = Object.values(schedule).filter((s) => s !== null).length;

  let message = `<b>📚 Select Subject for ${currentSlot}</b>\n`;
  message += `<i>${time}</i>\n\n`;
  message += `Progress: ${progressText}/4 slots completed\n\n`;
  message += "Choose a subject:";

  if (messageId) {
    await bot.editMessageText(chatId, messageId, message, buttons);
  } else {
    await bot.sendMessageWithButtons(chatId, message, buttons);
  }
}

/**
 * Send daily schedule prompt to a user
 * Called by the cron job at 7 AM
 */
export async function sendDailySchedulePrompt(
  chatId: number,
  bot: TelegramBot,
): Promise<void> {
  try {
    const greeting = "🌅 Good morning!\n\n";
    const message =
      greeting +
      "Time to plan your study schedule for today.\n\n" +
      "Select your subjects for each time slot:";

    await bot.sendMessage(chatId, message);
    await sendSchedulePrompt(chatId, bot);
  } catch (error) {
    console.error(`[v0] Failed to send daily prompt to ${chatId}:`, error);
  }
}

/**
 * Offer time slot setup options: use previous or set new
 */
async function offerTimeSlotOptions(
  chatId: number,
  bot: TelegramBot,
  messageId?: number,
): Promise<void> {
  const lastTimes = getLastUserTimes(chatId);

  let message = "<b>⏰ Set Your Study Time Slots</b>\n\n";

  if (lastTimes && lastTimes.length === 4) {
    message += "Your last used times:\n";
    lastTimes.forEach((time, i) => {
      message += `Slot ${i + 1}: ${time}\n`;
    });
    message += "\nWould you like to use these times again or set new ones?";

    const buttons = [
      [
        { text: "✅ Use Previous", callback_data: "use_previous" },
        { text: "🆕 Set New", callback_data: "set_new" },
      ],
    ];

    if (messageId) {
      await bot.editMessageText(chatId, messageId, message, buttons);
    } else {
      await bot.sendMessageWithButtons(chatId, message, buttons);
    }
  } else {
    message += "Enter your time slots in HH:MM format.\n\n";
    message += "Send Slot 1 time (e.g., 8:15, 9:30)";

    if (messageId) {
      await bot.editMessageText(chatId, messageId, message);
    } else {
      await bot.sendMessage(chatId, message);
    }
  }
}

/**
 * Send prompt for next time slot
 */
async function sendTimePrompt(
  chatId: number,
  bot: TelegramBot,
  messageId?: number,
): Promise<void> {
  const slotIndex = getCurrentTimeSlotIndex(chatId);
  const message =
    `<b>⏰ Enter Slot ${slotIndex + 1} Time</b>\n\n` +
    "Format: HH:MM (e.g., 8:15, 14:30)\n\n" +
    `Progress: ${slotIndex}/4 slots`;

  if (messageId) {
    await bot.editMessageText(chatId, messageId, message);
  } else {
    await bot.sendMessage(chatId, message);
  }
}

/**
 * Handle time input from user
 */
async function handleTimeInput(
  chatId: number,
  input: string,
  bot: TelegramBot,
): Promise<void> {
  if (!addCustomTime(chatId, input)) {
    await bot.sendMessage(
      chatId,
      "❌ Invalid format! Please use HH:MM format (e.g., 8:15, 14:30)",
    );
    await sendTimePrompt(chatId, bot);
    return;
  }

  if (isTimeSetupComplete(chatId)) {
    startSubjectSelection(chatId);
    const customTimes = getUserCustomTimes(chatId);
    let confirmMessage = "<b>✅ Your time slots are set!</b>\n\n";
    customTimes.forEach((time, i) => {
      confirmMessage += `Slot ${i + 1}: ${time}\n`;
    });
    confirmMessage += "\nNow select subjects for each slot:";

    await bot.sendMessage(chatId, confirmMessage);
    await sendSchedulePrompt(chatId, bot);
  } else {
    await sendTimePrompt(chatId, bot);
  }
}
