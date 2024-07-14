import { Patient } from "./patientRepository";

class Position {
  description: string;
  amount: number;
  price: number;
}

class Invoice {
  creationDate: Date;
  patient: Patient;
  positions: Position[];
  link: string;
}

type InvoiceCreate = Pick<Invoice, "patient" | "positions">;

class Invoices {
  static repository_: InvoiceRepository | null = null;

  static repository(folder: GoogleAppsScript.Drive.Folder) {
    if (Invoices.repository_ === null) {
      Invoices.repository_ = new InvoiceRepository(folder);
    }

    return Invoices.repository_;
  }
}

class InvoiceRepository {
  private folder: GoogleAppsScript.Drive.Folder;

  constructor(folder: GoogleAppsScript.Drive.Folder) {
    this.folder = folder;
  }

  addInvoice(invoice: InvoiceCreate): Invoice {
    const fileCopy = DriveApp.getFileById(
      "1pnAu7waOR2fWg8Bph9z-pZETlkyZEHsIYXqDTYZMxXI"
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
}
