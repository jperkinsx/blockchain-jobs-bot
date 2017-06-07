const Bot = require('./lib/Bot')
const SOFA = require('sofa-js')
const Fiat = require('./lib/Fiat')
const Hiring = require('./botLogic/Hiring')
const Seeking = require('./botLogic/Seeking')
const Promise = require('bluebird')

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
  console.log('onEvent', message.type)
  switch (message.type) {
    case 'Init':
      console.log('Init')
      initHandler(session)
      .then(respond)
      .catch(err => console.log(err))
      break
    case 'Message':
      console.log('Message')
      messageHandler(session, message)
      .then(respond)
      .catch(err => console.log(err))
      break
    case 'Command':
      commandHandler(session, message)
      .then(respond)
      break
    case 'Payment':
      onPayment(session, message)
      .then(respond)
      break
    case 'PaymentRequest':
      welcome(session)
      .then(respond)
      break
  }
}

//---------------------------------------
// HANDLERS
//---------------------------------------
function initHandler(session) {
    console.log('InitHandler')
  return new Promise( (resolve, reject) => {
    let welcomeMessage = `Hi, I'm Blocky, your hiring bot. (maybe moar info about blockchainjobs.co) I connect top talent with innovative blockchain companies. Are you hiring or looking for a job?`
    let msgResponse = { message : welcomeMessage
                      , controls: defaultControls
                      , session : session
                      }
    resolve(msgResponse)
  })
}


function messageHandler(session, message) {
  console.log('messageHandler')
  return new Promise((resolve,reject) => {
    let msgResponse = { message : `Hey! Could you type that again?`
                      , controls: defaultControls
                      , session : session
                      }
    if(message.body === 'RESET') {
      msgResponse.session.reset()
    }
    resolve(msgResponse)
  })
  .then(Seeking.msgHandler(message))
  //.then(Hiring.msgHandler(message))

   //  msgResponse = Hiring.msgHandler(message, msgResponse)
   //  msgResponse = Seeking.msgHandler(message, msgResponse)
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
