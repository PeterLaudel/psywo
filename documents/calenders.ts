export class Calenders {
  public static calendar = CalendarApp.getCalendarById(
    PropertiesService.getUserProperties().getProperty("THERAPY_CALENDAR_ID")
  );
}
