import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({path:"src/.env"});

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailStyles = `
  style="
    background-color: #FFE0B5;
    font-family: Arial, sans-serif;
    color: #462521;
  "
`;

const emailRegister = async (userData) => {
  const { name, email, token } = userData;
  await transport.sendMail({
    from: "220385@utxicotepec.edu.mx",
    to: email,
    subject: "Welcome to RealState-220138- Confirm your account",
    text: `Thank you for choosing us ${name}. In our platform, you can sell and buy properties. To continue, please follow the confirmation link below: `,
    html: `
      <div ${emailStyles}>
        <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr style="margin-top: 25px;">
            <td width="20%" style="padding: 10px; text-align: center; margin-top: 25px;">
              <p style="font-size: 18px; color: #666;">RealState.com</p>
            </td>
            <td style="margin-top: 25px;">
              <a href="https://www.facebook.com/profile.php?id=61553926479601" style="float: right; margin-right: 60px;"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" style="width: 30px; height: 30px; margin-bottom: 15px;"></a>
              <a href="https://www.instagram.com/alejandro_romeroooo/" style="float: right; margin-right: 60px;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style="width: 30px; height: 30px; margin-bottom: 15px;"></a>
              <a href="https://www.youtube.com/channel/UCDT46KZsckDixtAmkJIzdhQ" style="float: right; margin-right: 60px;"><img src="https://upload.wikimedia.org/wikipedia/commons/7/72/YouTube_social_white_square_%282017%29.svg" alt="YouTube" style="width: 30px; height: 30px; margin-bottom: 15px;"></a>
            </td>
          </tr>
          <tr style="text-align: center; margin-top: 25px;">
            <td colspan="2" style="padding: 20px; margin-top: 25px;">
              <p style="font-size: 16px; margin-bottom: 10px;">Hola ${name}, PLS CONFIRM YOUR ACCOUNT</p>
              <p style="font-size: 16px; margin-bottom: 10px;">CLICK ON THE FOLLOWING LINK</p>
              <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}">CLICK HERE TO AUTHENTICATE YOUR ACCOUNT</a>
            </td>
          </tr>
        </table>
        <div style="text-align: center; padding: 10px; color: #fff; background-color: #462521;">
          <p style="font-size: 15px;">C.E.O ALEJANDRO GONZALEZ ROMERO</p>
        </div>
      </div>
    `
  });

  console.log(`
    ############ MailTrap ############ \n
    Se está intentando enviar un correo electrónico al usuario: ${email}, con el token de validación ${token}
    \n #########################
  `);
};

const emailResetPassword = async (userData) => {
  const { name, email, tokenPassword } = userData;
  await transport.sendMail({
    from: "220138@utxicotepec.edu.mx",
    to: email,
    subject: "RealState - 220385 - Reset your password",
    text: `You have received your password change request. Please follow the link below `,
    html: `
      <div ${emailStyles}>
        <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr style="margin-top: 25px;">
            <td width="20%" style="padding: 10px; text-align: center; margin-top: 25px;">
              <p style="font-size: 18px; color: #666;">RealState.com</p>
            </td>
            <td style="margin-top: 25px;">
              <a href="https://www.facebook.com/profile.php?id=61553926479601" style="float: right; margin-right: 60px;"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" style="width: 30px; height: 30px; margin-bottom: 15px;"></a>
              <a href="https://www.instagram.com/alejandro_romeroooo/" style="float: right; margin-right: 60px;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style="width: 30px; height: 30px; margin-bottom: 15px;"></a>
              <a href="https://www.youtube.com/channel/UCDT46KZsckDixtAmkJIzdhQ" style="float: right; margin-right: 60px;"><img src="https://upload.wikimedia.org/wikipedia/commons/7/72/YouTube_social_white_square_%282017%29.svg" alt="YouTube" style="width: 30px; height: 30px; margin-bottom: 15px;"></a>
            </td>
          </tr>
          <tr style="text-align: center; margin-top: 25px;">
            <td colspan="2" style="padding: 20px; margin-top: 25px;">
              <p style="font-size: 16px; margin-bottom: 10px;">Hola ${name}, we received a request to change your password</p>
              <p style="font-size: 16px; margin-bottom: 10px;">Please follow the reset password link below</p>
              <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/password-change/${tokenPassword}">Click here to change your password</a>
              <p style="font-size: 16px; margin-bottom: 10px;">If you didn't request a password recovery, just ignore this email</p>
            </td>
          </tr>
        </table>
        <div style="text-align: center; padding: 10px; color: #fff; background-color: #462521;">
          <p style="font-size: 15px;">C.E.O ALEJANDRO GONZALEZ ROMERO</p>
        </div>
      </div>
    `
  });

  console.log(`
    ############ MailTrap ############ \n
    Se está intentando enviar un correo a ${email} 
    \n #########################
  `);
};

export { emailRegister, emailResetPassword };
