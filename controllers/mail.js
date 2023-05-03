const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adrenaline4games@gmail.com', // TODO: your gmail account
      pass: 'veovaipwochynhip', // TODO: your gmail password
    },
  })

  const sendEmail = (startedVms, stoppedVms) => {   
    let mailOptions = {
        from: 'adrenaline4games@gmail.com',
        to: 'oussema.nssibi@esprit.tn',
        subject: `You have ${startedVms+stoppedVms} ${startedVms+stoppedVms > 1 ? 'VMs' : 'VM'} to set up today`,
        html: ` 
        <div style="font-size: 15px ; font-family : Calibri; font-weight:400">
        <p>Hi,</p>
        <br>
        <p>
        Please check your dashboard, you have : <br>
        ${startedVms > 0 ? `- <strong>${startedVms}</strong> Virtual ${startedVms > 1 ? 'machines' : 'machine'} to <strong style="color:red"> stop </strong> today. <br>` : ''}
        ${stoppedVms > 0 ? `- <strong>${stoppedVms}</strong> Virtual ${stoppedVms > 1 ? 'machines' : 'machine'} to <strong style="color:green"> start </strong> today.` : ''}
        </p>
        <br>
        <p>Best regards, <br>Vermeg SOC,</p>
        </div>
        `
      }
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        console.log('email sent')
      })
  }

  module.exports = sendEmail ;

  