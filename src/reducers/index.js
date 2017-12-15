export default (state = {
	inspectedCard: null
}, action) => {
  switch (action.type) {
    case 'INSPECT_CARD':
      return {...state, inspectedCard: action.card}
    default:
      return state
  }
}
