
//---------------------------------------
// HIRING HANDLERS
//---------------------------------------

function msgHandler(message, msgResponse) {
  switch (message) {
    default :
      return msgResponse
      break
    }
}

function cmdHandler(command, msgResponse) {
  switch (command.content.value) {
    case 'hiring':
      return hire(msgResponse)
      break
    default :
      return msgResponse
      break
    }
}

//---------------------------------------
// HIRING FUNCTIONS
//---------------------------------------

function hire(msgResponse) {
  let hireMessage = `Great, let's get started creating your job listing. You'll be prompted to input the needed information. When everything looks correct, you can submit it and I'll be able to tell job seekers about the opportunity.`
  let controls =
    [ {type: 'button', label: `I'm ready to start`, value: 'get-started'}
    ]
  msgResponse.message = hireMessage
  msgResponse.controls = controls
  return msgResponse
}

module.exports = { msgHandler: msgHandler
                 , cmdHandler: cmdHandler
                 }
