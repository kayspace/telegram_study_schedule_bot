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
  getCurrentSlot,
  selectSubject,
  isScheduleComplete,
  generateTimetableMessage,
  resetUserSchedule,
  getUserSchedule,
  initializeSlotCountSetup,
  getLastSlotCount,
  setSlotCount,
  getSlotCount,
  addSlot,
  removeSlot,
  confirmSlotCount,
  getLastUserTimes,
  usePreviousTimes,
  addCustomTime,
  isTimeSetupComplete,
  startWakeUpTimeSetup,
  setWakeUpTime,
  getWakeUpTime,
  getLastWakeUpTime,
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
    initializeSlotCountSetup(chatId);
    await offerSlotCountOptions(chatId, bot);
    return;
  }

  // Check if user is setting up slot count
  const phase = getUserPhase(chatId);
  if (phase === "slot-count-setup") {
    // Handle slot count adjustments via text commands
    if (text === "+" || text.toLowerCase() === "add") {
      addSlot(chatId);
      await offerSlotCountOptions(chatId, bot);
      return;
    }
    if (text === "-" || text.toLowerCase() === "remove") {
      removeSlot(chatId);
      await offerSlotCountOptions(chatId, bot);
      return;
    }
    if (text === "done" || text.toLowerCase() === "continue") {
      confirmSlotCount(chatId);
      await offerTimeSlotOptions(chatId, bot);
      return;
    }
  }

  // Check if user is setting up times
  if (phase === "time-setup") {
    await handleTimeInput(chatId, message.text || "", bot);
    return;
  }

  // Check if user is setting up wake up time
  if (phase === "wake-up-setup") {
    await handleWakeUpTimeInput(chatId, message.text || "", bot);
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

  // Handle slot count setup
  if (data === "add_slot") {
    addSlot(userId);
    await offerSlotCountOptions(chatId, bot, messageId);
    return;
  }
  if (data === "remove_slot") {
    removeSlot(userId);
    await offerSlotCountOptions(chatId, bot, messageId);
    return;
  }
  if (data === "confirm_slots") {
    confirmSlotCount(userId);
    await offerTimeSlotOptions(chatId, bot);
    return;
  }

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

  if (data === "use_previous_wakeup") {
    const lastWakeUpTime = getLastWakeUpTime(userId);
    if (lastWakeUpTime && setWakeUpTime(userId, lastWakeUpTime)) {
      await bot.editMessageText(
        chatId,
        messageId,
        `✅ Using your last wake up time: ${lastWakeUpTime}\n\nNow select subjects for each slot:`,
      );
      await sendSchedulePrompt(chatId, bot);
    } else {
      await bot.editMessageText(
        chatId,
        messageId,
        "❌ No previous wake up time found. Please send a new one.",
      );
      await offerWakeUpTimeOptions(chatId, bot, messageId);
    }
    return;
  }

  if (data === "set_new_wakeup") {
    await offerWakeUpTimeOptions(chatId, bot, messageId);
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
  const totalSlots = getSlotCount(chatId);

  let message = `<b>📚 Select Subject for ${currentSlot}</b>\n`;
  message += `<i>${time}</i>\n\n`;
  message += `Progress: ${progressText}/${totalSlots} slots completed\n\n`;
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
  const lastSlotCount = getLastSlotCount(chatId);

  let message = "<b>⏰ Set Your Study Time Slots</b>\n\n";

  if (lastTimes && lastSlotCount && lastTimes.length === lastSlotCount) {
    message += `Your last setup (${lastSlotCount} slots):\n`;
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
    message += "Enter your time slots in HH:MM - HH:MM format.\n\n";
    message += "Send Slot 1 time (e.g., 8:15 - 11:00)";

    if (messageId) {
      await bot.editMessageText(chatId, messageId, message);
    } else {
      await bot.sendMessage(chatId, message);
    }
  }
}

/**
 * Offer wake up time options
 */
async function offerWakeUpTimeOptions(
  chatId: number,
  bot: TelegramBot,
  messageId?: number,
): Promise<void> {
  const lastWakeUpTime = getLastWakeUpTime(chatId);
  let message = "<b>⏰ Set Your Wake Up Time</b>\n\n";

  if (lastWakeUpTime) {
    message += `Your last wake up time was ${lastWakeUpTime}.\n\n`;
    message += "Would you like to use this time again or set a new one?";

    const buttons = [
      [
        { text: "✅ Use Previous", callback_data: "use_previous_wakeup" },
        { text: "🆕 Set New", callback_data: "set_new_wakeup" },
      ],
    ];

    if (messageId) {
      await bot.editMessageText(chatId, messageId, message, buttons);
    } else {
      await bot.sendMessageWithButtons(chatId, message, buttons);
    }
  } else {
    message += "Send your wake up time (e.g., 7:15 am)";
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
  const totalSlots = getSlotCount(chatId);
  const message =
    `<b>⏰ Enter Slot ${slotIndex + 1} Time Range</b>\n\n` +
    "Format: HH:MM - HH:MM (e.g., 8:15 - 11:00)\n\n" +
    `Progress: ${slotIndex}/${totalSlots} slots`;

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
      "❌ Invalid format! Please use HH:MM - HH:MM format (e.g., 8:15 - 11:00, 14:30 - 17:00)",
    );
    await sendTimePrompt(chatId, bot);
    return;
  }

  if (isTimeSetupComplete(chatId)) {
    startWakeUpTimeSetup(chatId);
    await offerWakeUpTimeOptions(chatId, bot);
  } else {
    await sendTimePrompt(chatId, bot);
  }
}

/**
 * Handle wake up time input from user
 */
async function handleWakeUpTimeInput(
  chatId: number,
  input: string,
  bot: TelegramBot,
): Promise<void> {
  const normalized = input.toLowerCase().trim();
  const lastWakeUpTime = getLastWakeUpTime(chatId);

  if (
    (normalized === "use previous" ||
      normalized === "use previous wake up" ||
      normalized === "reuse") &&
    lastWakeUpTime
  ) {
    setWakeUpTime(chatId, lastWakeUpTime);
    await bot.sendMessage(
      chatId,
      `✅ Using your last wake up time: ${lastWakeUpTime}\n\nNow select subjects for each slot:`,
    );
    await sendSchedulePrompt(chatId, bot);
    return;
  }

  if (!setWakeUpTime(chatId, input)) {
    await bot.sendMessage(
      chatId,
      "❌ Please provide a valid wake up time (e.g., 7:15 am, 6:30 pm)",
    );
    return;
  }

  const wakeUpTime = getWakeUpTime(chatId);
  await bot.sendMessage(
    chatId,
    `✅ Wake up time set to: ${wakeUpTime}\n\nNow select subjects for each slot:`,
  );
  await sendSchedulePrompt(chatId, bot);
}

/**
 * Offer slot count setup options
 */
async function offerSlotCountOptions(
  chatId: number,
  bot: TelegramBot,
  messageId?: number,
): Promise<void> {
  const lastSlotCount = getLastSlotCount(chatId);
  const currentSlotCount = getSlotCount(chatId);

  let message = "<b>⏰ Set Number of Study Slots</b>\n\n";

  if (lastSlotCount && lastSlotCount !== currentSlotCount) {
    message += `Your last setup had ${lastSlotCount} slots.\n\n`;
  }

  message += `Current slots: <b>${currentSlotCount}</b>\n\n`;
  message += "Use buttons to adjust or send:\n";
  message += "<code>+</code> or <code>add</code> - Add slot\n";
  message += "<code>-</code> or <code>remove</code> - Remove slot\n";
  message += "<code>done</code> or <code>continue</code> - Continue";

  const buttons = [
    [
      { text: "➕ Add Slot", callback_data: "add_slot" },
      { text: "➖ Remove Slot", callback_data: "remove_slot" },
    ],
    [{ text: "✅ Continue", callback_data: "confirm_slots" }],
  ];

  if (messageId) {
    await bot.editMessageText(chatId, messageId, message, buttons);
  } else {
    await bot.sendMessageWithButtons(chatId, message, buttons);
  }
}
