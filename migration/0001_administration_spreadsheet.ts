export class Migration {
  static up() {
    const id = SpreadsheetApp.create("Administration").getId();
    PropertiesService.getUserProperties().setProperty(
      "ADMINISTRATION_SPREADSHEET_ID",
      id
    );
  }
}
