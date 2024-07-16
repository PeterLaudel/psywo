import { Forms } from "../documents/forms";
import { Administration } from "../documents/administration";
import { createInvoices } from "../services/createInvoices";

export class PatientsView {
  static create() {
    ScriptApp.newTrigger(onOpen.name)
      .forSpreadsheet(Administration.spreadsheet)
      .onOpen()
      .create();
  }
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
