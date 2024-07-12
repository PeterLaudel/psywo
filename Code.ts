import { PatientSheet } from "./sheet";

function createEnvironment() {
  const sheet = PatientSheet.sheet();
  const form = createForm();

  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();

  ScriptApp.newTrigger("onOpen").forSpreadsheet(sheet).onOpen().create();
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
  return form;
}

function onFormSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = e.range.getLastRow();
  const lastColumn = e.range.getLastColumn();

  // Fügt eine neue Spalte nach der letzten Spalte hinzu, wenn sie noch nicht existiert
  if (sheet.getRange(1, lastColumn + 1).getValue() !== "Schiffre") {
    sheet.getRange(1, lastColumn + 1).setValue("Schiffre");
  }

  const lastName = e.namedValues["Name"][0];
  const birthDate = e.namedValues["Geburtsdatum"][0];
  const [month, day, year] = birthDate.split("/");
  const cipher = `${day.padStart(2, "0")}${month.padStart(2, "0")}${year.slice(
    -2
  )}`;

  // Setzt den Wert der Zelle in der neuen Spalte für die letzte Zeile
  sheet.getRange(lastRow, lastColumn + 1).setValue(lastName.charAt(0) + cipher);
}

function createInvoice() {
  const template = SpreadsheetApp.openById(
    "1pnAu7waOR2fWg8Bph9z-pZETlkyZEHsIYXqDTYZMxXI"
  );

  const newSpreadsheet = template.copy("Rechnung 1");
  const sheet = newSpreadsheet.getActiveSheet();

  sheet.getRange("B3:D3").setValue("Mein Unternehmen");
  sheet.getRange("B4:D4").setValue("Straße");
  sheet.getRange("B5:D5").setValue("PLZ Stadt");
  sheet.getRange("B6:D6").setValue("Telefonnummer");

  sheet
    .getRange("B9:D9")
    .setValue(`Rechnungsdatum ${new Date().toLocaleDateString()}`);

  sheet.getRange("B12:C12").setValue("Name");
  sheet.getRange("B13:C13").setValue("Straße");
  sheet.getRange("B14:C14").setValue("PLZ Stadt");
  sheet.getRange("B15:C15").clearContent();
}
