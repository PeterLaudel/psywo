const administrationSheetId = PropertiesService.getUserProperties().getProperty(
  "ADMINISTRATION_SPREADSHEET_ID"
);

export class Administration {
  public static spreadsheet = SpreadsheetApp.openById(administrationSheetId);
  public static patients = Administration.spreadsheet.getSheetByName(
    "Patienten"
  );
  public static prices = Administration.spreadsheet.getSheetByName("Preise");
}
