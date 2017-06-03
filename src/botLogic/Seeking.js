//---------------------------------------
// SEEKING HANDLERS
//---------------------------------------

function msgHandler(message, msgResponse) {
  console.log('uhhhh')
  return msgResponse
}

function cmdHandler(command, msgResponse) {
  switch (command.content.value) {
    case 'looking':
      return look(msgResponse)
      break
    default :
      return msgResponse
      break
    }
}

//---------------------------------------
// SEEKING FUNCTIONS
//---------------------------------------

function look(msgResponse) {
  let lookMessage = `Great, this is a placeholder for function look`
  return msgResponse
}

module.exports = { msgHandler: msgHandler
                 , cmdHandler: cmdHandler
                 }
