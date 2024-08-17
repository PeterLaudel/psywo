import { Invoices } from "../repositories/invoices";
import { Patients } from "../repositories/patients";
import { Therapies } from "../repositories/therapies";

export function createInvoices() {
  const patients = Patients.getPatients();
  Therapies.getTherapies()
    .filter((therapy) => !therapy.invoice)
    .forEach((therapy) => {
      const patient = patients.find(
        (patient) => patient.email === therapy.patientEmail
      );
      const invoice = Invoices.addInvoice({
        patient,
        positions: [{ description: therapy.title, amount: 1, price: 50 }],
      });
      Therapies.updateTherapy(therapy.id, { invoice });
    });
}
