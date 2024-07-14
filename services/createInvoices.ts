import { Invoices } from "../repositories/invoices";
import { Patients } from "../repositories/patients";

export function createInvoices() {
  const patient = Patients.getPatients()[0];
  Invoices.addInvoice({
    patient,
    positions: [
      { description: "Therapie", amount: 1, price: 50 },
      { description: "Material", amount: 1, price: 20 },
    ],
  });
}
