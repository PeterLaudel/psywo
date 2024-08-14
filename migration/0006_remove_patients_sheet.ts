export default class Migration0006 {
  up() {
    const id = PropertiesService.getUserProperties().getProperty(
      "ADMINISTRATION_SPREADSHEET_ID"
    );

    const ss = SpreadsheetApp.openById(id);
    const sheet = ss.getSheetByName("Patienten");

    if (sheet) {
      ss.deleteSheet(sheet);
    }
  }
}
