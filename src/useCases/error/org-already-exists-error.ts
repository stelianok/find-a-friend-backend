export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization with this info already exists')
  }
}