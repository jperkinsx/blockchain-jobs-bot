const Bot = require('./lib/Bot')
const SOFA = require('sofa-js')
const Fiat = require('./lib/Fiat')

let bot = new Bot()

// ROUTING

bot.onEvent = function(session, message) {
  switch (message.type) {
    case 'Init':
      welcome(session)
      break
    case 'Message':
      onMessage(session, message)
      break
    case 'Command':
      onCommand(session, message)
      break
    case 'Payment':
      onPayment(session, message)
      break
    case 'PaymentRequest':
      welcome(session)
      break
  }
}

function onMessage(session, message) {
  welcome(session)
}

function onCommand(session, command) {
  switch (command.content.value) {
    case 'hiring':
      hire(session)
      break
    case 'looking':
      look(session)
      break
    case 'how-work':
      howDoesThisWork(session)
      break
    case 'donate':
      donate(session)
      break
    }
}

function onPayment(session, message) {
  if (message.fromAddress == session.config.paymentAddress) {
    // handle payments sent by the bot
    if (message.status == 'confirmed') {
      // perform special action once the payment has been confirmed
      // on the network
    } else if (message.status == 'error') {
      // oops, something went wrong with a payment we tried to send!
    }
  } else {
    // handle payments sent to the bot
    if (message.status == 'unconfirmed') {
      // payment has been sent to the ethereum network, but is not yet confirmed
      sendMessage(session, `Thanks for the payment! 🙏`);
    } else if (message.status == 'confirmed') {
      // handle when the payment is actually confirmed!
    } else if (message.status == 'error') {
      sendMessage(session, `There was an error with your payment!🚫`);
    }
  }
}

// STATES

function welcome(session) {
  let welcomeMessage = `BlockChain Jobs Intro!`
  sendMessageWithHowDoesThisWork(session, welcomeMessage )
}

function hire(session) {
  sendMessage(session, `Dummy hire!`)
}

function look(session) {
  sendMessage(session, `Dummy look!`)
}

function howDoesThisWork(session) {
  sendMessage(session, `Dummy howDoesThisWork!`)
}

// example of how to store state on each user
function count(session) {
  let count = (session.get('count') || 0) + 1
  session.set('count', count)
  sendMessage(session, `${count}`)
}

function donate(session) {
  // request $1 USD at current exchange rates
  Fiat.fetch().then((toEth) => {
    session.requestEth(toEth.USD(1))
  })
}

// HELPERS

function sendMessage(session, message) {
  let controls =
    [ {type: 'button', label: 'Donate', value: 'donate'}
    , {type: 'button', label: `I'm Hiring`, value: 'hiring'}
    , {type: 'button', label: `I'm looking for a job`, value: 'looking'}
    ]
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}


function sendMessageWithHowDoesThisWork(session, message) {
  let controls =
    [ {type: 'button', label: `How does this work?`, value: 'how-work'}
    , {type: 'button', label: `I'm Hiring`, value: 'hiring'}
    , {type: 'button', label: `I'm looking for a job`, value: 'looking'}
    ]
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: true,
  }))
}
