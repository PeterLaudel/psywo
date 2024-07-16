export default class Migration0001 {
  up() {
    const ss = SpreadsheetApp.create("Administration");
    const id = ss.getId();
    PropertiesService.getUserProperties().setProperty(
      "ADMINISTRATION_SPREADSHEET_ID",
      id
    );
  }
}
