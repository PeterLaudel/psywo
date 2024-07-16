import { Forms } from "../documents/forms";
import { Prices } from "../repositories/prices";

export default class CreatePriceForm {
  install() {
    ScriptApp.newTrigger(onCreatePrice.name)
      .forForm(Forms.createPrice)
      .onFormSubmit()
      .create();
  }
}

function onCreatePrice(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const itemResponses = e.response.getItemResponses();

  Prices.addPrice({
    description: itemResponses[0].getResponse().toString(),
    short: itemResponses[1].getResponse().toString(),
    price: parseFloat(itemResponses[2].getResponse().toString()),
  });
}
