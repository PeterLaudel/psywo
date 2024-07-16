export default class Migration0004 {
  up() {
    const fileName = "Patienten Anlegen";

    const form = FormApp.create(fileName);
    form.setTitle(fileName);
    form.setDescription("Hier kannst du einen Patienten Anlegen");

    const emailValidation = FormApp.createTextValidation()
      .requireTextIsEmail()
      .build();

    const numberValidation = FormApp.createTextValidation()
      .requireTextMatchesPattern("^\\d{5}$")
      .build();

    form.addTextItem().setTitle("Name").setRequired(true);
    form.addTextItem().setTitle("Vorname").setRequired(true);
    form.addDateItem().setTitle("Geburtsdatum").setRequired(true);
    const emailItem = form.addTextItem().setTitle("Email").setRequired(true);
    emailItem.setValidation(emailValidation);

    form.addTextItem().setTitle("Straße").setRequired(true);

    const plzItem = form
      .addTextItem()
      .setTitle("Postleizahl")
      .setRequired(true);
    plzItem.setValidation(numberValidation);

    form.addTextItem().setTitle("Stadt").setRequired(true);

    PropertiesService.getUserProperties().setProperty(
      "PATIENT_FORM_ID",
      form.getId()
    );
  }
}
