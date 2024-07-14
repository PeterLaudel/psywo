import { Calenders } from "../documents/calenders";
import { Patient } from "../models/patient";
import { Therapy } from "../models/therapy";

export class Therapies {
  static repository_: TherapyRepository | null = null;

  static repository(
    calendar: GoogleAppsScript.Calendar.Calendar = Calenders.calendar()
  ) {
    if (Therapies.repository_ === null) {
      Therapies.repository_ = new TherapyRepository(calendar);
    }

    return Therapies.repository_;
  }
}

class TherapyRepository {
  private calendar: GoogleAppsScript.Calendar.Calendar;

  constructor(calendar: GoogleAppsScript.Calendar.Calendar) {
    this.calendar = calendar;
  }

  getTherapies(startTime: Date, endTime: Date): Therapy[] {
    const events = this.calendar.getEvents(startTime, endTime);
    return events.map((event) => {
      const description = event.getDescription();
      const [cipher, type] = description.split(" - ");
      return { cipher, type };
    });
  }

  getTherapiesForPatient(patient: Patient, startTime: Date, endTime: Date) {
    const therapies = this.getTherapies(startTime, endTime);
    return therapies.filter((therapy) => therapy.cipher === patient.shipCode);
  }
}
