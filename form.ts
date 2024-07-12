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
  const items = e.source.getItems();
  const namedValues = items.reduce((acc, item) => {
    const title = item.getTitle();
    return (acc[title] = e.response.getResponseForItem(item).getResponse());
  }, {});

  Patients.repository().createPatient({
    firstName: namedValues["Vorname"],
    lastName: namedValues["Name"],
    birthdate: new Date(namedValues["Geburtsdatum"]),
    email: namedValues["Email"],
    street: namedValues["Straße"],
    postalCode: namedValues["Postleizahl"],
    city: namedValues["Stadt"],
  });
}
