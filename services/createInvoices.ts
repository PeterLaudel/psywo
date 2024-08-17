import { Invoices } from "../repositories/invoices";
import { Patients } from "../repositories/patients";
import { Therapies } from "../repositories/therapies";

export function createInvoices() {
  Therapies.getTherapies()
    .filter((therapy) => !therapy.invoice)
    .forEach((therapy) => {
      const patient = Patients.getPatient(therapy.patientEmail);
      const invoice = Invoices.addInvoice({
        patient,
        positions: [{ description: therapy.title, amount: 1, price: 50 }],
      });
      Therapies.updateTherapy(therapy.id, { invoice });
    });
}
