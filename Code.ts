function createEnvironment() {
  const sheet = createSheet();
  const form = createForm();

  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  ScriptApp.newTrigger("onSubmitForm")
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

function onSubmitForm(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  // Fügt eine neue Spalte nach der letzten Spalte hinzu, wenn sie noch nicht existiert
  if (sheet.getRange(1, lastColumn).getValue() !== "Schiffre") {
    sheet.insertColumnAfter(lastColumn);
    sheet.getRange(1, lastColumn + 1).setValue("Schiffre");
  }
  const itemResponses = e.response.getItemResponses();
  const lastName = itemResponses[0].getResponse().toString();
  const birthDate = itemResponses[2].getResponse().toString();
  const [month, day, year] = birthDate.split("/");
  const shortYear = year.slice(-2); // Die letzten zwei Ziffern des Jahres
  const cipher = `${month.padStart(2, "0")}${day.padStart(2, "0")}${shortYear}`;

  // Setzt den Wert der Zelle in der neuen Spalte für die letzte Zeile
  sheet.getRange(lastRow, lastColumn + 1).setValue(lastName[0] + cipher);
}
