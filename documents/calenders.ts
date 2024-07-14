export class Calenders {
  public static calendar = createCalendar();
}

function createCalendar() {
  const calendarName = "Therapie Kalender";
  const calendars = CalendarApp.getCalendarsByName(calendarName);
  if (calendars.length > 0) return calendars[0];

  return CalendarApp.createCalendar(calendarName);
}
