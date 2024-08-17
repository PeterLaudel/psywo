import { Calenders } from "../documents/calenders";
import { Therapy } from "../models/therapy";

export class Therapies {
  private static repository_: TherapyRepository | null = null;

  private static repository(
    calendar: GoogleAppsScript.Calendar.Calendar = Calenders.calendar
  ) {
    if (Therapies.repository_ === null) {
      Therapies.repository_ = new TherapyRepository(calendar);
    }

    return Therapies.repository_;
  }

  static getTherapies() {
    return Therapies.repository().getTherapies();
  }

  static updateTherapy(
    id: string,
    therapy: Required<Pick<Therapy, "invoice">>
  ) {
    return Therapies.repository().updateTherapy(id, therapy);
  }
}

class TherapyRepository {
  private calendar: GoogleAppsScript.Calendar.Calendar;

  constructor(calendar: GoogleAppsScript.Calendar.Calendar) {
    this.calendar = calendar;
  }

  getTherapies(): Therapy[] {
    const now = new Date();
    const nowMinusOneYear = new Date();
    nowMinusOneYear.setFullYear(nowMinusOneYear.getFullYear() - 1);
    const events = this.calendar.getEvents(now, nowMinusOneYear);
    return events.map((event) => ({
      id: event.getId(),
      title: event.getTitle(),
      patientEmail: event.getGuestList(false)[0].getEmail(),
      description: event.getDescription(),
    }));
  }

  updateTherapy(id: string, { invoice }: Required<Pick<Therapy, "invoice">>) {
    const event = this.calendar.getEventById(id);
    event.setDescription("Rechnung: " + invoice.link);
  }
}
