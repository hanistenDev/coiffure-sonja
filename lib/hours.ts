import type { DayHours, OpeningHours, Weekday } from "@/types/salon";

export const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const WEEKDAY_LABEL: Record<Weekday, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

export function formatDayHours(value: DayHours | undefined): string | null {
  if (!value) return null;
  if (value === "closed") return "geschlossen";
  return value;
}

export type HoursRow = {
  day: Weekday;
  label: string;
  time: string;
};

export function hoursRows(hours: OpeningHours): HoursRow[] {
  return WEEKDAYS.flatMap((day) => {
    const time = formatDayHours(hours[day]);
    if (!time) return [];
    return [{ day, label: WEEKDAY_LABEL[day], time }];
  });
}
