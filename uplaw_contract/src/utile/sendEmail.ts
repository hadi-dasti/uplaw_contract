import nodemailer, { Transporter } from 'nodemailer';


// config server email
const transporter: Transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f2a8d14f86771",
    pass: "c6474bdc5fec00"
  }
});

// setup email for to employee of application
export const sendRegistrationEmail = async (email: string, firstName: string) => {
  const mailOptions = {
    from: 'contract_uplaw',
    to: email,
    subject: 'Registration Successful',
    text: `Dear ${firstName},\n\nThank you for registering with our service!`,
    html: `<p>Dear ${firstName},</p><p>Thank you for registering with our service!</p>`,
  }
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending registration email to ${email}: ${error}`);
  };
};


// send Email of employee to application
export const sendEmailOfEmployeeToApp = async (email: string, message: string) => {
  const optionSendEmail = {
    from: email,
    to: "employee.email@example.com",
    subject: 'New email from employee',
    text: message
  }
  try {
    await transporter.sendMail(optionSendEmail)
    console.log(`send ${email} of employee  with ${message} to employee.email@example.com`);
  } catch (err: any) {
    console.log(`Error of send email with ${err.message}`);
  };
};




