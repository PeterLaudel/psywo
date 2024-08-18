export class Calenders {
  private static therapyCalendar_: GoogleAppsScript.Calendar.Calendar | null = null;

  public static get therapyCalendar() {
    if (Calenders.therapyCalendar_ === null) {
      const id = PropertiesService.getUserProperties().getProperty(
        "THERAPY_CALENDAR_ID"
      );
      Calenders.therapyCalendar_ = CalendarApp.getCalendarById(id);
    }
    return Calenders.therapyCalendar_;
  }
}
