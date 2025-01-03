import { Administration } from "../documents/administration";
import { Forms } from "../documents/forms";
import { createInvoices } from "../services/createInvoices";

export default class AdministrationMenu {
  install() {
    ScriptApp.newTrigger(onOpen.name)
      .forSpreadsheet(Administration.spreadsheet)
      .onOpen()
      .create();
  }
}

function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
  e.source.addMenu("Administration", [
    { name: "Patienten Anlegen", functionName: showPatientForm.name },
    { name: "Preis Anlegen", functionName: showPriceForm.name },
    { name: "Rechnungen Erstellen", functionName: createInvoices.name },
  ]);
}

function showPatientForm() {
  const htmlOutput = HtmlService.createHtmlOutput(
    `<iframe style="position: absolute; height: 100%; border: none" src="${Forms.createPatient.getPublishedUrl()}">Wird geladen...</iframe>`
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

function showPriceForm() {
  const htmlOutput = HtmlService.createHtmlOutput(
    `<iframe style="position: absolute; height: 100%; border: none" src="${Forms.createPrice.getPublishedUrl()}">Wird geladen...</iframe>`
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
