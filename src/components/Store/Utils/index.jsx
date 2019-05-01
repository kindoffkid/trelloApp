export const arraySlicer = (array, index, itemToInsert) => {
  return [
    ...array.slice(0, index),
    itemToInsert,
    ...array.slice( index + 1 )
  ]
}
export const removeArrayItem = (array, itemIndex) => {
  return [
    ...array.slice(0, itemIndex),
    ...array.slice(itemIndex + 1)
  ]
}