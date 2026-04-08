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
 * Get current subject selection for a user
 */
export function getCurrentSlot(userId: number): string | null {
  const data = userSelections[userId];

  // If user doesn't exist yet, initialize them and start from Slot 1
  if (!data) {
    userSelections[userId] = { timestamp: Date.now() };
    return "Slot 1";
  }

  // Determine which slot we're on
  const slotNames = SLOTS.map((s) => s.name);

  for (const slot of slotNames) {
    if (!data[slot]) {
      return slot;
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

  let message = "<b>📅 Your Study Timetable</b>\n\n";

  SLOTS.forEach((slot) => {
    const selected = schedule[slot.name as keyof UserSchedule];
    const subject = selected || "❌ Not Selected";

    message += `<b>${slot.name}</b> (${slot.time})\n`;
    message += `📚 ${subject}\n\n`;
  });

  message += "<i>Schedule generated successfully!</i>";

  return message;
}

/**
 * Get all users' latest selections
 */
export function getAllUserSelections() {
  return userSelections;
}
