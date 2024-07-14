import { Administration } from "../documents/administration";
import type { Patient } from "../models/patient";

type CreatePatient = Pick<
  Patient,
  Exclude<keyof Patient, "createdAt" | "shipCode">
>;

export class Patients {
  private static repostitory_: PatientRepository | null = null;

  private static repository() {
    if (Patients.repostitory_ === null) {
      Patients.repostitory_ = new PatientRepository(Administration.patients);
    }

    return Patients.repostitory_;
  }

  static getPatients() {
    return Patients.repository().getPatients();
  }

  static addPatient(patient: CreatePatient) {
    return Patients.repository().addPatient(patient);
  }
}

class PatientRepository {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    this.sheet = sheet;
  }

  addPatient(patient: CreatePatient) {
    const lastRow = this.sheet.getLastRow();
    const range = this.sheet.getRange(lastRow + 1, 1, 1, 9);

    const firstLetter = patient.lastName.charAt(0);
    const birthDate = patient.birthdate;
    const day = birthDate.getDay().toString().padStart(2, "0");
    const month = (birthDate.getMonth() + 1).toString().padStart(2, "0");
    const year = birthDate.getFullYear().toString().slice(-2);
    const cipher = `${firstLetter}${day}${month}${year}`;

    const values = [
      new Date(),
      patient.firstName,
      patient.lastName,
      patient.birthdate,
      patient.email,
      patient.street,
      patient.postalCode,
      patient.city,
      cipher,
    ];
    range.setValues([values]);
  }

  getPatients() {
    const rows = this.sheet.getDataRange().getValues();
    return rows
      .slice(1)
      .map(
        ([
          createdAt,
          firstName,
          lastName,
          birthdate,
          email,
          street,
          postalCode,
          city,
          shipCode,
        ]) => ({
          createdAt,
          firstName,
          lastName,
          birthdate,
          email,
          street,
          postalCode,
          city,
          shipCode,
        })
      );
  }
}
