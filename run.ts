import Migration0001 from "./migration/0001_administration_spreadsheet";
import Migration0002 from "./migration/0002_patients_sheet";
import Migration0003 from "./migration/0003_prices_sheet";
import Migration0004 from "./migration/0004_create_patient_form";
import Migration0005 from "./migration/0005_add_price_form";

import AdministrationMenu from "./triggers/administration_menu";
import CreatePatientForm from "./triggers/create_patient_form";
import CreatePriceForm from "./triggers/create_price_form";

function run() {
  migrate(new Migration0001());
  migrate(new Migration0002());
  migrate(new Migration0003());
  migrate(new Migration0004());
  migrate(new Migration0005());

  installTriggers([
    new AdministrationMenu(),
    new CreatePatientForm(),
    new CreatePriceForm(),
  ]);
}

interface Migration {
  up(): void;
}

function migrate(migration: Migration) {
  const version = currentVersion();
  const newVersion = determineVersion(migration);

  if (version >= newVersion) {
    return;
  }

  migration.up();
  PropertiesService.getUserProperties().setProperty(
    "MIGRATION_VERSION",
    newVersion.toString()
  );
}

function determineVersion(migration: Migration) {
  const name = migration.constructor.name;
  let numberString = name.replace("Migration", ""); // Ergebnis: "0001"
  let number = parseInt(numberString, 10);
  return number;
}

function currentVersion() {
  const currentVersion = PropertiesService.getUserProperties().getProperty(
    "MIGRATION_VERSION"
  );
  return currentVersion === null ? 0 : parseInt(currentVersion, 10);
}

interface Trigger {
  install(): void;
}

function installTriggers(triggers: Trigger[]) {
  const installedTriggers = ScriptApp.getProjectTriggers();
  installedTriggers.forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  triggers.forEach((trigger) => trigger.install());
}
