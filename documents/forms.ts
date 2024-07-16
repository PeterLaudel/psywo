export class Forms {
  private static createPatientForm_: GoogleAppsScript.Forms.Form | null = null;
  private static createPriceForm_: GoogleAppsScript.Forms.Form | null = null;

  public static get createPatient() {
    if (Forms.createPatientForm_ === null) {
      const id = PropertiesService.getUserProperties().getProperty(
        "PATIENT_FORM_ID"
      );
      Forms.createPatientForm_ = FormApp.openById(id);
    }
    return Forms.createPatientForm_;
  }

  public static get createPrice() {
    if (Forms.createPriceForm_ === null) {
      const id = PropertiesService.getUserProperties().getProperty(
        "CREATE_PRICE_FORM_ID"
      );
      Forms.createPriceForm_ = FormApp.openById(id);
    }
    return Forms.createPriceForm_;
  }
}
