import { Forms } from "./forms";
import { createInvoices } from "../services/createInvoices";

export class Administration {
  public static patients = administrationSheet().getSheetByName("Patienten");
  public static prices = administrationSheet().getSheetByName("Preise");
}

function findFileByName(
  fileName: string,
  files: GoogleAppsScript.Drive.FileIterator
) {
  while (files.hasNext()) {
    const file = files.next();
    if (file.getName() === fileName) {
      return file;
    }
  }
  return null;
}

function administrationSheet() {
  const fileName = "Administration";

  const files = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
  const file = findFileByName(fileName, files);
  if (file !== null) return SpreadsheetApp.openById(file.getId());

  const ss = SpreadsheetApp.create(fileName);

  createPatientsSheet(ss);
  createPricesSheet(ss);

  ss.deleteActiveSheet();

  ScriptApp.newTrigger(onOpen.name).forSpreadsheet(ss).onOpen().create();

  return ss;
}

function createPatientsSheet(ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {
  const sheetName = "Patienten";
  if (ss.getSheetByName(sheetName)) return ss.getSheetByName(sheetName);

  const sheet = ss.insertSheet(sheetName);

  sheet.setFrozenRows(1);
  sheet.getRange("A1:I1").setFontWeight("bold");
  sheet.getRange("A1:I1").setBackground("#f0f0f0");
  sheet.getRange("A1:I1").setHorizontalAlignment("left");
  sheet.getRange("A1").setValue("Erstellt am");
  sheet.getRange("B1").setValue("Vorname");
  sheet.getRange("C1").setValue("Nachname");
  sheet.getRange("D1").setValue("Geburtsdatum");
  sheet.getRange("E1").setValue("Email");
  sheet.getRange("F1").setValue("Straße");
  sheet.getRange("G1").setValue("Postleizahl");
  sheet.getRange("H1").setValue("Stadt");
  sheet.getRange("I1").setValue("Schiffre");
  // Zugriff auf die Spalte "G" und Änderung des Formats
  const columnI = sheet.getRange("G:G");
  columnI.setNumberFormat("@");

  // Zugriff auf die Spalte "A" und Änderung des Formats
  const columnA = sheet.getRange("A:A");
  columnA.setNumberFormat("dd.mm.yyyy hh:mm:ss");

  return sheet;
}

function createPricesSheet(ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {
  const sheetName = "Preise";
  if (ss.getSheetByName(sheetName)) return ss.getSheetByName(sheetName);

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

  return sheet;
}

function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
  e.source.addMenu("Patienten", [
    { name: "Patienten Anlegen", functionName: showPatientForm.name },
    { name: "Rechnungen Erstellen", functionName: createInvoices.name },
  ]);
}

function showPatientForm() {
  const htmlOutput = HtmlService.createHtmlOutput(
    `<iframe style="position: absolute; height: 100%; border: none" src="${Forms.createPatient.getPublishedUrl()}">Wird geladen...</iframe>`
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
