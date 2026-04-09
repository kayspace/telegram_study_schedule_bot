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

// In-memory storage for user selections (in production, use a database)
const userSelections: Record<
  number,
  {
    [key: string]: any;
    timestamp: number;
    lastTimes?: string[];
    lastSlotCount?: number;
    customTimes?: string[];
    phase?:
      | "time-setup"
      | "slot-count-setup"
      | "wake-up-setup"
      | "subject-setup";
    timeSlotIndex?: number;
    slotCount?: number;
    wakeUpTime?: string;
    lastWakeUpTime?: string;
  }
> = {};

/**
 * Get available subjects
 */
export function getSubjects(): string[] {
  return SUBJECTS;
}

/**
 * Initialize user for slot count setup
 */
export function initializeSlotCountSetup(userId: number): void {
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].phase = "slot-count-setup";
  userSelections[userId].slotCount = 4; // Default to 4 slots
}

/**
 * Get user's last slot count
 */
export function getLastSlotCount(userId: number): number | null {
  return userSelections[userId]?.lastSlotCount || null;
}

/**
 * Set slot count for user
 */
export function setSlotCount(userId: number, count: number): void {
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].slotCount = Math.max(1, Math.min(10, count)); // Limit between 1-10
}

/**
 * Get current slot count for user
 */
export function getSlotCount(userId: number): number {
  return userSelections[userId]?.slotCount || 4;
}

/**
 * Add a slot
 */
export function addSlot(userId: number): void {
  const currentCount = getSlotCount(userId);
  setSlotCount(userId, currentCount + 1);
}

/**
 * Remove a slot
 */
export function removeSlot(userId: number): void {
  const currentCount = getSlotCount(userId);
  setSlotCount(userId, currentCount - 1);
}

/**
 * Confirm slot count and move to time setup
 */
export function confirmSlotCount(userId: number): void {
  const slotCount = getSlotCount(userId);
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].lastSlotCount = slotCount;
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
  const lastSlotCount = getLastSlotCount(userId);
  if (!lastTimes || !lastSlotCount || lastTimes.length !== lastSlotCount) {
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
  // Validate HH:MM - HH:MM format
  if (!/^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/.test(trimmed)) {
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
  const slotCount = getSlotCount(userId);
  return (userSelections[userId]?.customTimes?.length || 0) === slotCount;
}

/**
 * Move to wake up time setup
 */
export function startWakeUpTimeSetup(userId: number): void {
  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].phase = "wake-up-setup";
}

/**
 * Set wake up time for user
 */
export function setWakeUpTime(userId: number, time: string): boolean {
  // Validate time format (simple validation for now)
  if (!time.trim()) return false;

  if (!userSelections[userId]) {
    userSelections[userId] = { timestamp: Date.now() };
  }
  userSelections[userId].wakeUpTime = time.trim();
  userSelections[userId].lastWakeUpTime = time.trim();
  userSelections[userId].phase = "subject-setup";
  return true;
}

/**
 * Get user's wake up time
 */
export function getWakeUpTime(userId: number): string | null {
  return userSelections[userId]?.wakeUpTime || null;
}

/**
 * Get user's last wake up time
 */
export function getLastWakeUpTime(userId: number): string | null {
  return userSelections[userId]?.lastWakeUpTime || null;
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
  userSelections[userId].lastSlotCount = getSlotCount(userId);
  userSelections[userId].phase = "subject-setup";
}

/**
 * Get current phase
 */
export function getUserPhase(
  userId: number,
):
  | "time-setup"
  | "slot-count-setup"
  | "wake-up-setup"
  | "subject-setup"
  | null {
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

  const slotCount = getSlotCount(userId);

  // Check which slot needs a subject
  for (let i = 1; i <= slotCount; i++) {
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
export function getUserSchedule(userId: number): Record<string, string | null> {
  const data = userSelections[userId] || {};
  const slotCount = getSlotCount(userId);
  const schedule: Record<string, string | null> = {};

  for (let i = 1; i <= slotCount; i++) {
    const slotName = `Slot ${i}`;
    schedule[slotName] = data[slotName] || null;
  }

  return schedule;
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
  const slotCount = getSlotCount(userId);

  for (let i = 1; i <= slotCount; i++) {
    const slotName = `Slot ${i}`;
    if (schedule[slotName] === null) {
      return false;
    }
  }

  return true;
}

/**
 * Reset user selections
 */
export function resetUserSchedule(userId: number) {
  const lastTimes = userSelections[userId]?.lastTimes;
  const lastSlotCount = userSelections[userId]?.lastSlotCount;
  const lastWakeUpTime = userSelections[userId]?.lastWakeUpTime;
  delete userSelections[userId];
  // Preserve last used times, slot count, and wake up time for reuse
  if (lastTimes || lastSlotCount || lastWakeUpTime) {
    userSelections[userId] = {
      timestamp: Date.now(),
      lastTimes,
      lastSlotCount,
      lastWakeUpTime,
    };
  }
}

/**
 * Generate formatted timetable message
 */
export function generateTimetableMessage(userId: number): string {
  const schedule = getUserSchedule(userId);
  const customTimes = getUserCustomTimes(userId);
  const slotCount = getSlotCount(userId);

  // Get current date in dd-mm-yyyy format
  const today = new Date();
  const dateStr = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getFullYear()}`;

  // Get wake up time from user input
  const wakeUpTime = getWakeUpTime(userId) || "7:00 am";

  let message = "*Schedule*\n\n";
  message += `*${dateStr}*\n`;
  message += `Wake up : ${wakeUpTime}\n\n`;

  for (let i = 0; i < slotCount; i++) {
    const slotName = `SLOT ${i + 1}`;
    const time = customTimes[i] || "Not set";
    const selected = schedule[`Slot ${i + 1}`];
    const subject = selected || "Not Selected";

    message += `➡${slotName}\n`;
    message += `${subject}: ${time}\n\n`;
  }

  message += "****************************";

  return message;
}

/**
 * Get all users' latest selections
 */
export function getAllUserSelections() {
  return userSelections;
}
