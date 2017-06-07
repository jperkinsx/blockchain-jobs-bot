const axios = require('axios')
console.log(axios)
//---------------------------------------
// SEEKING HANDLERS
//---------------------------------------

function msgHandler(message) {
  return (msgResponse) => {
    return look(msgResponse)
  }
}

function cmdHandler(command) {
  return (msgResponse) => {
    switch (command.content.value) {
      case 'looking':
        return look(msgResponse)
        break
      default :
        return msgResponse
        break
    }
  }
}

//---------------------------------------
// SEEKING FUNCTIONS
//---------------------------------------

function look(msgResponse) {
  let lookMessage = `Awesome, here's the latest listing from Blockchain Jobs. You can view the full listing for more information, or view another job.`
  // hit our api, print the data https://www.blockchainjobs.co/api/v1/bot/next/0



  const controls = [
    {type: 'button', label: `View full listing`, action: 'Webview::https://www.blockchainjobs.co'},
    {type: 'button', label: `Next job`, value: ''}, // hit api again with +1 index
]
  msgResponse.message = lookMessage
  msgResponse.controls = controls
  return msgResponse
}

module.exports = { msgHandler: msgHandler
                 , cmdHandler: cmdHandler
                 }
