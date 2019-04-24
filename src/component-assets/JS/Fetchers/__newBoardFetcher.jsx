

export default async (input, dispatch) => {
  const url = `/api/boards/new?boardName=${input}`
  const query = await fetch(url, { method: 'POST' })
  const response = await query.json()
  if (response) {
    return dispatch({
      type: 'CREATE_BOARD',
      payload: response
    })
  }
}