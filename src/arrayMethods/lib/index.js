exports.arraySlicer = (array, index, itemToInsert) => {
  return [
    ...array.slice(0, index),
    itemToInsert,
    ...array.slice( index + 1 )
  ]
}