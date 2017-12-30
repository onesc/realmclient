export default (state = {
	inspectedCard: null,
	spell: null,
	promptingForTarget: false,
    socket: {},
    game: { players: [] }
}, action) => {
    switch (action.type) {
    case 'INSPECT_CARD':
      	return {...state, inspectedCard: action.card}
    case 'SET_SOCKET': 
        return {...state, socket: action.socket}
    case 'SET_GAME_STATE': 
        return {...state, game: action.game}
    default:
      	return state
    }
}
