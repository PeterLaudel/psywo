import { TherapyCalender } from "./calender";

type TherapyType = "Einzeltherapie" | "Erstgespräch";

interface Therapy {
  cipher: string;
  type: TherapyType;
}

class Therapies {
  static repositroy_: TherapyRepository | null = null;

  static repository(
    calendar: GoogleAppsScript.Calendar.Calendar = TherapyCalender.calendar()
  ) {
    if (Therapies.repositroy_ === null) {
      Therapies.repositroy_ = new TherapyRepository(calendar);
    }

    return Therapies.repositroy_;
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
      return { cipher, type: type as TherapyType };
    });
  }

  getTerapiesForPatient(cipher: string, startTime: Date, endTime: Date) {
    const therapies = this.getTherapies(startTime, endTime);
    return therapies.filter((therapy) => therapy.cipher === cipher);
  }
}
