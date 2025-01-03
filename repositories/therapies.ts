import { Calenders } from "../documents/calenders";
import { Therapy } from "../models/therapy";
import { Patients } from "./patients";

export class Therapies {
  private static repository_: TherapyRepository | null = null;

  private static repository(
    calendar: GoogleAppsScript.Calendar.Calendar = Calenders.therapyCalendar
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
    const nowMinusOneYear = new Date(now.getTime() - 31557600000);
    const events = this.calendar.getEvents(nowMinusOneYear, now);
    const patients = Patients.getPatients();
    return events.map((event) => ({
      id: event.getId(),
      title: event.getTitle(),
      patient: patients.find(
        ({ email }) => email === event.getGuestList()[0].getEmail()
      ),
      description: event.getDescription(),
    }));
  }

  updateTherapy(id: string, { invoice }: Required<Pick<Therapy, "invoice">>) {
    const event = this.calendar.getEventById(id);
    event.setDescription("Rechnung: " + invoice.link);
  }
}
