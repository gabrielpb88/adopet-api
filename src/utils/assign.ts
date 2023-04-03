export function assignValues(dto, entity) {
  for (const [key, value] of Object.entries(dto)) {
    entity[key] = value;
  }
  return entity;
}
