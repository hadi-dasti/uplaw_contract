import nodemailer, { Transporter } from 'nodemailer'


// config server email
const transporter :Transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f2a8d14f86771",
    pass: "c6474bdc5fec00"
  }
})

// setup email
export const sendRegistrationEmail = async (email: string , firstName :string)=> {
    const mailOptions = {
        from: 'contract_uplaw',
        to:email,
        subject: 'Registration Successful',
        text: `Dear ${firstName},\n\nThank you for registering with our service!`,
        html: `<p>Dear ${firstName},</p><p>Thank you for registering with our service!</p>`,
    }
    try {
      await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending registration email to ${email}: ${error}`);
  }
    }




