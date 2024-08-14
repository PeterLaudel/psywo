import { Administration } from "../documents/administration";
import type { Patient } from "../models/patient";

type CreatePatient = Pick<
  Patient,
  Exclude<keyof Patient, "createdAt" | "cipher">
>;

export class Patients {
  private static repostitory_: PatientRepository | null = null;

  private static repository() {
    if (Patients.repostitory_ === null) {
      Patients.repostitory_ = new PatientRepository();
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
  addPatient(patient: CreatePatient): Patient {
    // Erstellen Sie einen neuen Kontakt mit dem People Service
    const newContact = {
      names: [
        {
          givenName: patient.firstName,
          familyName: patient.lastName,
        },
      ],
      emailAddresses: [
        {
          value: patient.email,
        },
      ],
      addresses: [
        {
          streetAddress: patient.street,
          postalCode: patient.postalCode,
          city: patient.city,
        },
      ],
      birthdays: [
        {
          date: {
            year: patient.birthdate.getFullYear(),
            month: patient.birthdate.getMonth() + 1,
            day: patient.birthdate.getDate(),
          },
        },
      ],
    };
    const person = People.People.createContact(newContact);

    People.ContactGroups.Members.modify(
      { resourceNamesToAdd: [person.resourceName] },
      this.patientContactGroup.resourceName
    );

    return {
      firstName: person.names[0].givenName,
      lastName: person.names[0].familyName,
      email: person.emailAddresses[0].value,
      street: person.addresses[0].streetAddress,
      postalCode: person.addresses[0].postalCode,
      city: person.addresses[0].city,
      birthdate: new Date(
        person.birthdays[0].date.year,
        person.birthdays[0].date.month - 1,
        person.birthdays[0].date.day
      ),
    };
  }

  getPatients() {
    const contacts = People.People.getBatchGet({
      resourceNames: this.patientContactGroup.memberResourceNames,
    });

    return contacts.responses.map(({ person }) => {
      return {
        firstName: person.names[0].givenName,
        lastName: person.names[0].familyName,
        email: person.emailAddresses[0].value,
        street: person.addresses[0].streetAddress,
        postalCode: person.addresses[0].postalCode,
        city: person.addresses[0].city,
        birthdate: new Date(
          person.birthdays[0].date.year,
          person.birthdays[0].date.month - 1,
          person.birthdays[0].date.day
        ),
      };
    });
  }

  private get patientContactGroup() {
    const id = PropertiesService.getUserProperties().getProperty(
      "PATIENT_CONTACT_GROUP_ID"
    );
    return People.ContactGroups.get(id);
  }
}
