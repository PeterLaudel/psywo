import { Invoices } from "../repositories/invoices";
import { Therapies } from "../repositories/therapies";

export function createInvoices() {
  Therapies.getTherapies()
    .filter(({ invoice }) => !invoice)
    .forEach(({ patient, title, id }) => {
      const invoice = Invoices.addInvoice({
        patient,
        positions: [{ description: title, amount: 1, price: 50 }],
      });
      Therapies.updateTherapy(id, { invoice });
    });
}
