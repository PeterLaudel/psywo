export class Administration {
  private static spreadsheet_: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null;

  public static get spreadsheet() {
    if (Administration.spreadsheet_ === null) {
      const id = PropertiesService.getUserProperties().getProperty(
        "ADMINISTRATION_SPREADSHEET_ID"
      );
      Administration.spreadsheet_ = SpreadsheetApp.openById(id);
    }
    return Administration.spreadsheet_;
  }
}
