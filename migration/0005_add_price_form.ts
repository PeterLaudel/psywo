export default class Migration0005 {
  up() {
    const fileName = "Preis Anlegen";
    const form = FormApp.create(fileName);
    form.setTitle(fileName);
    form.setDescription("Hier kannst du einen Preis Anlegen");

    const priceValidation = FormApp.createTextValidation()
      .setHelpText("Bitte geben Sie einen gültigen Preis in Euro ein.")
      .requireTextMatchesPattern("^\\d+(\\.\\d{2})?$")
      .build();

    let abbreviationValidation = FormApp.createTextValidation()
      .setHelpText(
        "Bitte geben Sie ein Kürzel ein, das genau aus zwei Großbuchstaben besteht."
      )
      .requireTextMatchesPattern("^[A-Z]{2}$")
      .build();

    form.addTextItem().setTitle("Beschreibung").setRequired(true);
    form
      .addTextItem()
      .setTitle("Kürzel aus 2 Großbuchstaben")
      .setRequired(true)
      .setValidation(abbreviationValidation);
    form
      .addTextItem()
      .setTitle("Preis")
      .setRequired(true)
      .setValidation(priceValidation);

    PropertiesService.getUserProperties().setProperty(
      "CREATE_PRICE_FORM_ID",
      form.getId()
    );
  }
}
