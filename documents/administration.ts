export class Administration {
  private static spreadsheet_: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null;
  private static pricesSheet_: GoogleAppsScript.Spreadsheet.Sheet | null = null;

  public static get spreadsheet() {
    if (Administration.spreadsheet_ === null) {
      const id = PropertiesService.getUserProperties().getProperty(
        "ADMINISTRATION_SPREADSHEET_ID"
      );
      Administration.spreadsheet_ = SpreadsheetApp.openById(id);
    }
    return Administration.spreadsheet_;
  }

  public static get prices() {
    if (Administration.pricesSheet_ === null) {
      Administration.pricesSheet_ = Administration.spreadsheet.getSheetByName(
        "Preise"
      );
    }
    return Administration.pricesSheet_;
  }
}
