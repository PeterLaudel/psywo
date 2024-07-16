export default class Migration0002 {
  up() {
    const id = PropertiesService.getUserProperties().getProperty(
      "ADMINISTRATION_SPREADSHEET_ID"
    );

    const ss = SpreadsheetApp.openById(id);
    const sheetName = "Patienten";
    const sheet = ss.insertSheet(sheetName);

    sheet.setFrozenRows(1);
    sheet.getRange("A1:I1").setFontWeight("bold");
    sheet.getRange("A1:I1").setBackground("#f0f0f0");
    sheet.getRange("A1:I1").setHorizontalAlignment("left");
    sheet.getRange("A1").setValue("Erstellt am");
    sheet.getRange("B1").setValue("Vorname");
    sheet.getRange("C1").setValue("Nachname");
    sheet.getRange("D1").setValue("Geburtsdatum");
    sheet.getRange("E1").setValue("Email");
    sheet.getRange("F1").setValue("Straße");
    sheet.getRange("G1").setValue("Postleizahl");
    sheet.getRange("H1").setValue("Stadt");
    sheet.getRange("I1").setValue("Schiffre");
    // Zugriff auf die Spalte "G" und Änderung des Formats
    const columnI = sheet.getRange("G:G");
    columnI.setNumberFormat("@");

    // Zugriff auf die Spalte "A" und Änderung des Formats
    const columnA = sheet.getRange("A:A");
    columnA.setNumberFormat("dd.mm.yyyy hh:mm:ss");

    PropertiesService.getUserProperties().setProperty(
      "PATIENTS_SHEET_ID",
      sheet.getSheetId().toString()
    );
  }
}
