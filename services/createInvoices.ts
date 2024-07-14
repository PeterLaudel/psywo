import { Invoices } from "../repositories/invoices";
import { Patients } from "../repositories/patients";

export function createInvoices() {
  const patient = Patients.repository().getPatients()[0];
  Invoices.repository().addInvoice({
    patient,
    positions: [
      { description: "Therapie", amount: 1, price: 50 },
      { description: "Material", amount: 1, price: 20 },
    ],
  });
}
