export default class Migration0008 {
  up() {
    const calendarName = "Therapie Kalender";
    const therapyCalender = CalendarApp.createCalendar(calendarName);

    PropertiesService.getUserProperties().setProperty(
      "THERAPY_CALENDAR_ID",
      therapyCalender.getId()
    );
  }
}
