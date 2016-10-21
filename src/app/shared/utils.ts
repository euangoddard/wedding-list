export function getElementFromCollection(
  collection: Array<any>,
  key: string,
  value: any,
  isItemRequired = true,
) {
  let collectionFiltered = collection.filter(item => {
    return item[key] === value;
  });

  const message = `Expected at most 1 item, found ${collectionFiltered.length}`;

  if (isItemRequired && collectionFiltered.length === 0) {
    throw new Error(message);
  }
  if (collectionFiltered.length > 1) {
    throw new Error(message);
  }
  return collectionFiltered[0] || null;
}


export function hasObjectItems(object: {[key: string]: any}): boolean {
  return Object.getOwnPropertyNames(object).length > 0;
}
