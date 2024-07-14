export class Calenders {
  static calendar_: GoogleAppsScript.Calendar.Calendar | null = null;

  static calendar() {
    if (Calenders.calendar_ === null) {
      Calenders.calendar_ = createCalendar();
    }

    return Calenders.calendar_;
  }
}

function createCalendar() {
  const calendarName = "Therapie Kalender";
  const calendars = CalendarApp.getCalendarsByName(calendarName);
  if (calendars.length > 0) return calendars[0];

  return CalendarApp.createCalendar(calendarName);
}
