function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedRow = e.range.getRow();
  var lastRow = sheet.getLastRow();

  sheet.getRange(lastRow, 1).setValue("Neuer Wert");
}

function onSubmitForm(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  // Setzt den Wert der ersten Zelle in der neuen Zeile
  sheet.getRange(lastRow, 1).setValue("Neuer Wert");
}
