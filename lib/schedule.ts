/**
 * Schedule Management
 * Handles user schedule data and timetable generation
 */

const SUBJECTS = [
  "Aerodynamics",
  "Space Dynamics",
  "Propulsion",
  "Structures",
  "Flight Mechanics",
  "Mathematics",
  "Aptitude",
  "Gas Dynamics",
  "Fluid Mechanics",
];

const SLOTS = [
  { name: "Slot 1", time: "8:30 AM - 11:00 AM" },
  { name: "Slot 2", time: "12:10 PM - 2:00 PM" },
  { name: "Slot 3", time: "2:40 PM - 5:40 PM" },
  { name: "Slot 4", time: "7:30 PM - 10:00 PM" },
];

// In-memory storage for user selections (in production, use a database)
const userSelections: Record<
  number,
  {
    [key: string]: string;
    timestamp: number;
    lastTimes?: string[];
    customTimes?: string[];
    phase?: "time-setup" | "subject-setup";
    timeSlotIndex?: number;
  }
> = {};

export interface UserSchedule {
  "Slot 1": string | null;
  "Slot 2": string | null;
  "Slot 3": string | null;
  "Slot 4": string | null;
}

/**
 * Get available subjects
 */
export function getSubjects(): string[] {
  return SUBJECTS;
}

/**
 * Get available time slots
 */
export function getSlots() {
  return SLOTS;
}

/**
 * Initialize user for time slot setup
 */
export function initializeTimeSlotSetup(userId: number): void {
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].phase = "time-setup";
  userSelections[userId].customTimes = [];
  userSelections[userId].timeSlotIndex = 0;
}

/**
 * Get user's last used time slots
 */
export function getLastUserTimes(userId: number): string[] | null {
  return userSelections[userId]?.lastTimes || null;
}

/**
 * Use previously saved times
 */
export function usePreviousTimes(userId: number): boolean {
  const lastTimes = getLastUserTimes(userId);
  if (!lastTimes || lastTimes.length !== 4) {
    return false;
  }
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].customTimes = [...lastTimes];
  userSelections[userId].phase = "subject-setup";
  return true;
}

/**
 * Add custom time for current slot
 */
export function addCustomTime(userId: number, time: string): boolean {
  const trimmed = time.trim();
  if (!/^\d{1,2}:\d{2}$/.test(trimmed)) {
    return false;
  }
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  if (!userSelections[userId].customTimes) {
    userSelections[userId].customTimes = [];
  }
  userSelections[userId].customTimes!.push(trimmed);
  userSelections[userId].timeSlotIndex =
    (userSelections[userId].timeSlotIndex || 0) + 1;
  return true;
}

/**
 * Check if time setup is complete
 */
export function isTimeSetupComplete(userId: number): boolean {
  return (userSelections[userId]?.customTimes?.length || 0) === 4;
}

/**
 * Move to subject selection
 */
export function startSubjectSelection(userId: number): void {
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  if (userSelections[userId].customTimes) {
    userSelections[userId].lastTimes = [...userSelections[userId].customTimes!];
  }
  userSelections[userId].phase = "subject-setup";
}

/**
 * Get current phase
 */
export function getUserPhase(
  userId: number,
): "time-setup" | "subject-setup" | null {
  return userSelections[userId]?.phase || null;
}

/**
 * Get current time slot index
 */
export function getCurrentTimeSlotIndex(userId: number): number {
  return userSelections[userId]?.timeSlotIndex || 0;
}

/**
 * Get user's custom times
 */
export function getUserCustomTimes(userId: number): string[] {
  return userSelections[userId]?.customTimes || [];
}

/**
 * Get current subject selection for a user
 */
export function getCurrentSlot(userId: number): string | null {
  const data = userSelections[userId];

  // If user not in subject setup phase, no slot
  if (!data || data.phase !== "subject-setup") {
    return null;
  }

  // Check which slot needs a subject
  for (let i = 1; i <= 4; i++) {
    const slotName = `Slot ${i}`;
    if (!data[slotName]) {
      return slotName;
    }
  }

  return null; // All slots filled
}

/**
 * Get all selected subjects for a user
 */
export function getUserSchedule(userId: number): UserSchedule {
  const data = userSelections[userId] || {};

  return {
    "Slot 1": data["Slot 1"] || null,
    "Slot 2": data["Slot 2"] || null,
    "Slot 3": data["Slot 3"] || null,
    "Slot 4": data["Slot 4"] || null,
  };
}

/**
 * Save subject selection for a user
 */
export function selectSubject(userId: number, slot: string, subject: string) {
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }

  userSelections[userId][slot] = subject;
  userSelections[userId].timestamp = Date.now();
}

/**
 * Check if user has completed all selections
 */
export function isScheduleComplete(userId: number): boolean {
  const schedule = getUserSchedule(userId);
  return (
    schedule["Slot 1"] !== null &&
    schedule["Slot 2"] !== null &&
    schedule["Slot 3"] !== null &&
    schedule["Slot 4"] !== null
  );
}

/**
 * Reset user selections
 */
export function resetUserSchedule(userId: number) {
  delete userSelections[userId];
}

/**
 * Generate formatted timetable message
 */
export function generateTimetableMessage(userId: number): string {
  const schedule = getUserSchedule(userId);
  const customTimes = getUserCustomTimes(userId);

  let message = "<b>📅 Your Study Timetable</b>\n\n";

  for (let i = 0; i < 4; i++) {
    const slotName = `Slot ${i + 1}`;
    const time = customTimes[i] || "Not set";
    const selected = schedule[slotName as keyof UserSchedule];
    const subject = selected || "❌ Not Selected";

    message += `<b>${slotName}</b> (${time})\n`;
    message += `📚 ${subject}\n\n`;
  }

  message += "<i>***************************</i>";

  return message;
}

/**
 * Get all users' latest selections
 */
export function getAllUserSelections() {
  return userSelections;
}
