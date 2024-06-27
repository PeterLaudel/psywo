function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedRow = e.range.getRow();
  var lastRow = sheet.getLastRow();

  // Überprüft, ob die bearbeitete Zeile die letzte Zeile ist (d.h., eine neue Zeile wurde hinzugefügt)
  if (editedRow === lastRow) {
    // Setzt den Wert der ersten Zelle in der neuen Zeile
    sheet.getRange(lastRow, 1).setValue("Neuer Wert");
  }
}
