function createEnvironment() {
  const sheet = createSheet();
  const form = createForm();

  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();
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

function createSheet() {
  const fileName = "Patienten";
  const files = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
  const file = findFileByName(fileName, files);
  if (file !== null) return SpreadsheetApp.openById(file.getId());

  return SpreadsheetApp.create(fileName);
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

function onSubmitForm(e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = e.range.getLastRow();
  const lastColumn = e.range.getLastColumn();

  // Fügt eine neue Spalte nach der letzten Spalte hinzu, wenn sie noch nicht existiert
  if (sheet.getRange(1, lastColumn).getValue() !== "Schiffre") {
    sheet.insertColumnAfter(lastColumn);
    sheet.getRange(1, lastColumn + 1).setValue("Schiffre");
  }

  const lastName = e.namedValues["Name"];
  const birthDate = e.namedValues["Geburtsdatum"];
  Logger.log(lastName);
  Logger.log(birthDate);
  const [month, day, year] = birthDate[0].split("/");
  const cipher = `${day.padStart(2, "0")}${month.padStart(2, "0")}${year.slice(
    -2
  )}`;

  // Setzt den Wert der Zelle in der neuen Spalte für die letzte Zeile
  sheet
    .getRange(lastRow, lastColumn + 1)
    .setValue(lastName[0].charAt(0) + cipher);
}
