export default (state = {
	inspectedCard: null,
	spell: null,
	promptingForTarget: false
}, action) => {
  switch (action.type) {
    case 'INSPECT_CARD':
      	return {...state, inspectedCard: action.card}
   	case 'PROMPT_FOR_TARGET':
      	return {...state, promptingForTarget: true, promptedSpell: action.promptedSpell}
  	case 'CAST_AT_TARGET':
  		console.log("tryna cast ", state)
  		action.socket.emit('playCard', state.promptedSpell.id, null, action.target)
      	return {...state, promptingForTarget: false, promptedSpell: null}
    default:
      	return state
  }
}
