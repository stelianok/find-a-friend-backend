export class UndefinedCityQueryParamError extends Error {
  constructor() {
    super("Query param 'city' is undefined.")
  }
}