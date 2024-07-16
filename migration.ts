import * as Migration0001 from "./migration/0001_administration_spreadsheet";
import * as Migration0002 from "./migration/0002_patients_sheet";
import * as Migration0003 from "./migration/0003_prices_sheet";

function migrate(some: object) {
  const name = some.constructor.name;
  some.Migration.up();
}

function test() {
  migrate(Migration0001);
}
