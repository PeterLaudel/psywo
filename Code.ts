function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedRow = e.range.getRow();
  var lastRow = sheet.getLastRow();

  sheet.getRange(lastRow, 1).setValue("Neuer Wert");
}

function onSubmitForm(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  // Fügt eine neue Spalte nach der letzten Spalte hinzu, wenn sie noch nicht existiert
  if (sheet.getRange(1, lastColumn).getValue() !== "Zusätzlicher Eintrag") {
    sheet.insertColumnAfter(lastColumn);
    sheet.getRange(1, lastColumn + 1).setValue("Zusätzlicher Eintrag");
  }

  // Setzt den Wert der Zelle in der neuen Spalte für die letzte Zeile
  sheet.getRange(lastRow, lastColumn + 1).setValue("Neuer Wert");
}
