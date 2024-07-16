export default class Migration0003 {
  up() {
    const id = PropertiesService.getUserProperties().getProperty(
      "ADMINISTRATION_SPREADSHEET_ID"
    );

    const ss = SpreadsheetApp.openById(id);

    const sheetName = "Preise";
    const sheet = ss.insertSheet(sheetName);

    sheet.setFrozenRows(1);
    sheet.getRange("A1:D1").setFontWeight("bold");
    sheet.getRange("A1:D1").setBackground("#f0f0f0");
    sheet.getRange("A1").setValue("Erstellt am");
    sheet.getRange("B1").setValue("Name");
    sheet.getRange("C1").setValue("Kürzel");
    sheet.getRange("D1").setValue("Preis");

    sheet.getRange("A:A").setNumberFormat("dd.mm.yyyy hh:mm:ss");
    sheet.getRange("D:D").setNumberFormat("0.00 €");
  }
}
