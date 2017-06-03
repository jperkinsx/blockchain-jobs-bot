const Bot = require('./lib/Bot')
const SOFA = require('sofa-js')
const Fiat = require('./lib/Fiat')
const Hiring = require('./botLogic/Hiring')
const Seeking = require('./botLogic/Seeking');

//---------------------------------------
// CONSTANTS
//---------------------------------------

const defaultControls =
    [ {type: 'button', label: `I'm Hiring`, value: 'hiring'}
    , {type: 'button', label: `I'm looking for a job`, value: 'looking'}
    ]

//---------------------------------------
// INIT
//---------------------------------------

let bot = new Bot()

//---------------------------------------
// ROUTING
//---------------------------------------

bot.onEvent = function(session, message) {
  switch (message.type) {
    case 'Init':
      initHandler(session)
      break
    case 'Message':
      messageHandler(session, message)
      break
    case 'Command':
      commandHandler(session, message)
      break
    case 'Payment':
      onPayment(session, message)
      break
    case 'PaymentRequest':
      welcome(session)
      break
  }
}

//---------------------------------------
// HANDLERS
//---------------------------------------
function initHandler(session) {
  let welcomeMessage = `Hi, I'm Blocky, your hiring bot. (maybe moar info about blockchainjobs.co) I connect top talent with innovative blockchain companies. Are you hiring or looking for a job?`
  let msgResponse = { message : welcomeMessage
                    , controls: defaultControls
                    , session : session
                    }
  respond(msgResponse)
}

function messageHandler(session, message) {
  let msgResponse = { message : `Hey! Could you type that again?`
                    , controls: defaultControls
                    , session : session
                    }
  if(message.body === 'ALT+F4') {
    session.reset()
    respond(msgResponse)
    return
  }
  msgResponse = Hiring.msgHandler(message, msgResponse)
  msgResponse = Seeking.msgHandler(message, msgResponse)
  respond(msgResponse)
}

function commandHandler(session, command) {
  let msgResponse = { message : `Hey! Could you type that again?`
                    , controls: defaultControls
                    , session : session
                    }
  msgResponse = Hiring.cmdHandler(command, msgResponse)
  msgResponse = Seeking.cmdHandler(command, msgResponse)
  respond(msgResponse)
}


//---------------------------------------
// HELPERS
//---------------------------------------
function respond(msgResponse) {
  let controls = msgResponse.controls
  let message = msgResponse.message
  let session = msgResponse.session
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}
