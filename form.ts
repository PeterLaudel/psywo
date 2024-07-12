import { Patients } from "./patientRepository";

export class PatientForm {
  static form_: GoogleAppsScript.Forms.Form | null = null;

  static form() {
    if (PatientForm.form_ === null) {
      PatientForm.form_ = createForm();
    }

    return PatientForm.form_;
  }
}

function findFileByName(
  fileName: string,
  files: GoogleAppsScript.Drive.FileIterator
) {
  while (files.hasNext()) {
    const file = files.next();
    if (file.getName() === fileName) {
      return file;
    }
  }
  return null;
}

function createForm() {
  const fileName = "Patienten Anlegen";
  const files = DriveApp.getFilesByType(MimeType.GOOGLE_FORMS);
  const file = findFileByName(fileName, files);
  if (file !== null) return FormApp.openById(file.getId());

  const form = FormApp.create(fileName);
  form.setTitle(fileName);
  form.setDescription("Hier kannst du einen Patienten Anlegen");

  const emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();

  const numberValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern("^\\d{5}$")
    .build();

  form.addTextItem().setTitle("Name").setRequired(true);
  form.addTextItem().setTitle("Vorname").setRequired(true);
  form.addDateItem().setTitle("Geburtsdatum").setRequired(true);
  const emailItem = form.addTextItem().setTitle("Email").setRequired(true);
  emailItem.setValidation(emailValidation);

  form.addTextItem().setTitle("Straße").setRequired(true);

  const plzItem = form.addTextItem().setTitle("Postleizahl").setRequired(true);
  plzItem.setValidation(numberValidation);

  form.addTextItem().setTitle("Stadt").setRequired(true);

  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();

  return form;
}

function onFormSubmit(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const response = e.response;
  const itemResponses = response.getItemResponses();

  const lastName = itemResponses[0].getResponse().toString();
  const firstName = itemResponses[1].getResponse().toString();
  const birthdate = new Date(itemResponses[2].getResponse().toString());
  const email = itemResponses[3].getResponse().toString();
  const street = itemResponses[4].getResponse().toString();
  const postalCode = itemResponses[5].getResponse().toString();
  const city = itemResponses[6].getResponse().toString();

  Patients.repository().addPatient({
    firstName,
    lastName,
    birthdate,
    email,
    street,
    postalCode,
    city,
  });
}
