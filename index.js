require('dotenv').config()
const nodemailer = require('nodemailer')
const ethers = require('ethers')
const axios = require('axios')


// curently unused but would be nice to get the email associated with an ENS name or 0x.. account.
async function getAddress(){
    
    const rpc = "https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_KEY
    const provider = ethers.getDefaultProvider(rpc)
    const address = await provider.resolveName('idecentralize.eth');
    console.log('ACCOUNT : ',address)
    const name = await provider.lookupAddress(address);
    console.log('NAME : ',name)
}
// get ENS record for email
//getAddress()
const to = 'madeindreams@protonmail.com'
const message = "It might be a little anoying while i'm running test"
const subject = "News from the MadeInDreams Organization"

const html = `
<style>
.signature-style{
    position:abolute;
    bottom:0px;
   text-align:center;
    width:100%;
    color: #cccccc;
}
.logo{
    height:50px;
}
a{
    color:#ba277f;
    text-decoration: none;
}
h1{
text-align:center;
border-bottom: 1px solid #ba277f;
}
</style>
<h1>News from the MadeInDreams Organization</h1>
<p>${message}</p>

<div class="moz-signature"><br>
 
  <div class="signature-style"> <img class="logo"
      src="https://madeindreams.org/logo.png" alt="Our Logo"> <br>
    <a href="mailto:admin@madindreams.ca">Ian Decentralize</a> <br>
    Blockchain Developer<br>
    <a href="https://madeindreams.org" moz-do-not-send="true">MadeInDreams.org</a></div>
</div>
`

var transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port:1025,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
  });


  // we can send email in loops to every address provided
 


  var mailOptions = {
    from: process.env.EMAIL ,
    to: to,
    subject: subject,
    html: html
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  axios.post(process.env.SLACK_HOOK, {
    text: message,
   
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });