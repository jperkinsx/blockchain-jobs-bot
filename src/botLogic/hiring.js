
//---------------------------------------
// HIRE HANDLERS
//---------------------------------------

function msgHandler(message, msgResponse) {
  const stateIndex = msgResponse.session.get('hire-state')
  const state = hireStatesInOrder[stateIndex]
  let session = msgResponse.session
  switch (state) {
    case 'CATEGORIES':
      //TODO: Move to separate function
      console.log('CATEGORIES')
      const hireMessage = `What is the job title?`
      const controls = []
      let hireDetails = session.get('hire-details')
      const hireState = state + 1

      hireDetails.categories = message.body.split(',')
      session.set('hire-state', hireState)
      session.set('hire-details',hireDetails)
      msgResponse.message = hireMessage
      msgResponse.controls = controls
      //END
      return msgResponse
      break
    case 'JOB_TITLE':
      return msgResponse
      break
    case 'JOB_LOCATION':
      return msgResponse
      break
    case 'JOB_DESCRIPTION':
      return msgResponse
      break
    case 'JOB_REQUIREMENTS':
      return msgResponse
      break
    case 'COMPANY_NAME':
      return msgResponse
      break
    case 'COMPANY_DESCRIPTION':
      return msgResponse
      break
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
    case 'get-started':
      return getStarted(msgResponse)
      break
    default :
      return msgResponse
      break
    }
}

//---------------------------------------
// HIRE FUNCTIONS
//---------------------------------------

function getStarted(msgResponse) {
  console.log('getting started!!!')
  let hireMessage = `List some job category tags to give us an idea about the job. For example "Ethereum, Javascript, UI Design"`
  let controls = []
  let hireState = 0
  let hireDetails = initialHireDetails
  msgResponse.session.set('hire-state',hireState)
  msgResponse.session.set('hire-details',hireDetails)
  msgResponse.message = hireMessage
  msgResponse.controls = controls
  return msgResponse
}

function hire(msgResponse) {
  let hireMessage = `Great, let's get started creating your job listing. You'll be prompted to input the needed information. When everything looks correct, you can submit it and I'll be able to tell job seekers about the opportunity.`
  let controls =
    [ {type: 'button', label: `I'm ready to start`, value: 'get-started'}
    ]
  msgResponse.message = hireMessage
  msgResponse.controls = controls
  return msgResponse
}


//---------------------------------------
// HIRE CONSTANTS
//---------------------------------------

const hireStatesInOrder = [ 'CATEGORIES'
                            , 'JOB_TITLE'
                            , 'JOB_LOCATION'
                            , 'JOB_DESCRIPTION'
                            , 'JOB_REQUIREMENTS'
                            , 'COMPANY_NAME'
                            , 'COMPANY_DESCRIPTION'
                            ]

const initialHireDetails = { categories : []
                             , jobTitle : ''
                             , jobLocation : ''
                             , jobDescription : ''
                             , jobRequirements : ''
                             , companyName : ''
                             , companyDescription : ''
                             }


module.exports = { msgHandler: msgHandler
                 , cmdHandler: cmdHandler
                 }
