import type { Invoice } from "../models/invoice";
import { Folders } from "../documents/folders";

type InvoiceCreate = Pick<Invoice, "patient" | "positions">;

export class Invoices {
  static repository_: InvoiceRepository | null = null;

  private static repository(
    folder: GoogleAppsScript.Drive.Folder = Folders.invoices
  ) {
    if (Invoices.repository_ === null) {
      Invoices.repository_ = new InvoiceRepository(folder);
    }

    return Invoices.repository_;
  }

  static addInvoice(invoice: InvoiceCreate) {
    return Invoices.repository().addInvoice(invoice);
  }
}

class InvoiceRepository {
  private folder: GoogleAppsScript.Drive.Folder;

  constructor(folder: GoogleAppsScript.Drive.Folder) {
    this.folder = folder;
  }

  addInvoice(invoice: InvoiceCreate): Invoice {
    const fileCopy = DriveApp.getFileById(
      "1h4r4SJJc2VZu8iqYwn4IheMG98S6kkcyuNEd3biFOEA"
    ).makeCopy("Rechnung 1", this.folder);

    const newSpreadsheet = SpreadsheetApp.openById(fileCopy.getId());
    const sheet = newSpreadsheet.getActiveSheet();

    sheet.getRange("B3:D3").setValue("Mein Unternehmen");
    sheet.getRange("B4:D4").setValue("Straße");
    sheet.getRange("B5:D5").setValue("PLZ Stadt");
    sheet.getRange("B6:D6").setValue("Telefonnummer");

    const creationDate = new Date();
    sheet
      .getRange("B9:D9")
      .setValue(`Rechnungsdatum ${creationDate.toLocaleDateString()}`);

    sheet
      .getRange("B12:C12")
      .setValue(`${invoice.patient.firstName} ${invoice.patient.lastName}`);
    sheet.getRange("B13:C13").setValue(invoice.patient.street);
    sheet
      .getRange("B14:C14")
      .setValue(`${invoice.patient.postalCode} ${invoice.patient.city}`);

    return { creationDate, ...invoice, link: newSpreadsheet.getUrl() };
  }

  getInvoices(id: string) {
    const file = DriveApp.getFileById(id);
    return {
      creationDate: file.getDateCreated(),
      link: file.getUrl(),
    };
  }
}
