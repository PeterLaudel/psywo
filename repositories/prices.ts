import { Administration } from "../documents/administration";

export class Prices {
  private static prices_: PriceRepository | null = null;

  private static repository() {
    if (Prices.prices_ === null) {
      Prices.prices_ = new PriceRepository(Administration.prices);
    }

    return Prices.prices_;
  }

  static getPrices() {
    return Prices.repository().getPrices();
  }

  static addPrice(price: Price) {
    return Prices.repository().addPrice(price);
  }
}

class PriceRepository {
  private pricesSheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(pricesSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    this.pricesSheet = pricesSheet;
  }

  getPrices() {
    const rows = this.pricesSheet.getDataRange().getValues();
    return rows.slice(1).map(
      ([description, short, price]: [string, string, number]): Price => ({
        description,
        short,
        price,
      })
    );
  }

  addPrice(price: Price) {
    const lastRow = this.pricesSheet.getLastRow();
    const range = this.pricesSheet.getRange(lastRow + 1, 1, 1, 4);
    const values = [new Date(), price.description, price.short, price.price];
    range.setValues([values]);
  }
}
