import { Forms } from "../documents/forms";
import { Patients } from "../repositories/patients";

export default class CreatePatientForm {
  install() {
    ScriptApp.newTrigger(onCreatePatient.name)
      .forForm(Forms.createPatient)
      .onFormSubmit()
      .create();
  }
}

function onCreatePatient(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const itemResponses = e.response.getItemResponses();

  Patients.addPatient({
    lastName: itemResponses[0].getResponse().toString(),
    firstName: itemResponses[1].getResponse().toString(),
    birthdate: new Date(itemResponses[2].getResponse().toString()),
    email: itemResponses[3].getResponse().toString(),
    street: itemResponses[4].getResponse().toString(),
    postalCode: itemResponses[5].getResponse().toString(),
    city: itemResponses[6].getResponse().toString(),
  });
}
