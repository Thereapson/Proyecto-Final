export const forgotPassword = {
    from: "compuDevs2022@gmail.com",
    to: oldUser.email,
    subject: "Restaura tu contraseña",
    html: `
    <h4>Hola ${oldUser.userName} </h4>
    <p>¿Olvidaste tu contraseña?</p>
    <p>Recibimos una solicitud para restaurar tu contraseña, haz click en el siguiente enlace</p>
    <p>${link}</p>`,
  };