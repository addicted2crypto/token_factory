"use server"



const loggedInUser = tokenFactoryUser(type: boolean);

function sendWalletData() {
  return (
    if(loggedInUser){
        sendWalletData
    }else{
        return("Please Log in")
    }
  )
}

export default sendWalletData