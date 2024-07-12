export class PatientSheet {
  static sheet_: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null;

  static sheet() {
    if (PatientSheet.sheet_ === null) {
      PatientSheet.sheet_ = createSheet();
    }

    return PatientSheet.sheet_;
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

function createSheet() {
  const fileName = "Patienten";

  const files = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
  const file = findFileByName(fileName, files);
  if (file !== null) return SpreadsheetApp.openById(file.getId());

  const sheet = SpreadsheetApp.create(fileName);

  sheet.setFrozenRows(1);
  sheet.getRange("A1:I1").setFontWeight("bold");
  sheet.getRange("A1:I1").setBackground("#f0f0f0");
  sheet.getRange("A1:I1").setHorizontalAlignment("left");
  sheet.getRange("A1:I1").setBorder(false, false, true, false, false, false);
  sheet.getRange("A1").setValue("Erstellt am");
  sheet.getRange("B1").setValue("Vorname");
  sheet.getRange("C1").setValue("Nachname");
  sheet.getRange("D1").setValue("Geburtsdatum");
  sheet.getRange("E1").setValue("Email");
  sheet.getRange("F1").setValue("Straße");
  sheet.getRange("G1").setValue("Postleizahl");
  sheet.getRange("H1").setValue("Stadt");
  sheet.getRange("I1").setValue("Schiffre");

  ScriptApp.newTrigger("onOpen").forSpreadsheet(sheet).onOpen().create();

  return sheet;
}

function onOpen() {
  SpreadsheetApp.getActiveSpreadsheet().addMenu("Patienten", [
    { name: "Patienten Anlegen", functionName: "showPatientForm" },
  ]);
}

function showPatientForm() {
  const htmlOutput = HtmlService.createHtmlOutput(
    `<iframe style="position: absolute; height: 100%; border: none" src="www.google.de">Wird geladen...</iframe>`
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
