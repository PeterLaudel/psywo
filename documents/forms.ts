export class Forms {
  private static createPatientForm_: GoogleAppsScript.Forms.Form | null = null;

  public static get createPatient() {
    if (Forms.createPatientForm_ === null) {
      const id = PropertiesService.getUserProperties().getProperty(
        "CREATE_PATIENT_FORM_ID"
      );
      Forms.createPatientForm_ = FormApp.openById(id);
    }
    return Forms.createPatientForm_;
  }
}
