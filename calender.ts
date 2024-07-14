export class TherapyCalender {
  static calendar_: GoogleAppsScript.Calendar.Calendar | null = null;

  static calendar() {
    if (TherapyCalender.calendar_ === null) {
      TherapyCalender.calendar_ = createCalendar();
    }

    return TherapyCalender.calendar_;
  }
}

function createCalendar() {
  const calendarName = "Therapie Kalender";
  const calendars = CalendarApp.getCalendarsByName(calendarName);
  if (calendars.length > 0) return calendars[0];

  return CalendarApp.createCalendar(calendarName);
}
