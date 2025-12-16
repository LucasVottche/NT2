const nodemailer = require("nodemailer");

// Configuración del transporte (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Mail 1: Solicitud recibida
async function sendAdoptionEmail(userEmail, userName, petName) {
  try {
    const info = await transporter.sendMail({
      from: '"Refugio de Mascotas 🐾" <noreply@refugio.com>',
      to: userEmail,
      subject: `¡Solicitud recibida para ${petName}!`,
      html: `<h1>Hola ${userName}</h1><p>Hemos recibido tu solicitud para adoptar a <strong>${petName}</strong>.</p>`,
    });
    return info;
  } catch (error) {
    console.error("Error enviando email solicitud: ", error);
  }
}

// Mail 2: Aprobación (ESTA ES LA QUE TE FALTABA)
async function sendApprovalEmail(userEmail, userName, petName) {
  try {
    const info = await transporter.sendMail({
      from: '"Refugio de Mascotas 🐾" <noreply@refugio.com>',
      to: userEmail,
      subject: `¡Felicidades! Adoptaste a ${petName} 🎉`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
            <h1 style="color: #28a745;">¡Buenas noticias, ${userName}!</h1>
            <p>Tu solicitud para adoptar a <strong>${petName}</strong> ha sido <strong>APROBADA</strong>.</p>
            <p>¡Ya puedes pasar a buscar a tu nuevo compañero!</p>
        </div>
      `,
    });
    console.log("📩 Email de Aprobación enviado a %s", userEmail);
    return info;
  } catch (error) {
    console.error("Error enviando email aprobación: ", error);
  }
}

// Exportar AMBAS funciones
module.exports = { sendAdoptionEmail, sendApprovalEmail };