require("dotenv").config();

// Controller de Users
const { userModel } = require("../Models/index")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const JWT_SECRET = 'asjkdnajksfndjaksndasknd12123()239883smlkdsmad?)==(23'
const nodemailer = require("nodemailer");
// const register = require('../MailTemplates/Register')
//NOTIFICACIONES POR MAIL

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "compudevs2022@gmail.com",
      pass: "ftmgoxulpwshhfak",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
const getAllUsers = async (req, res, next) => {
  try {
    const response = await userModel.find({})//.populate("Product");
    if (response.flat().length > 0) {
      const Users = response?.map((u) => {
        return {
          id: u._id,
          full_name: u.full_name,
          email: u.email,
          favorites: u.favorites,
          address: u.address,
          phone: u.phone,
          status: u.status,
          isAdmin: u.isAdmin,
        }
      })
      res.status(200).send(Users);
    } else {
      res.status(400).send("There's no Users to show")
    }

  } catch (error) {
    console.error(error);
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("product")
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(400).send("There's no User with that ID")
    }

  } catch (error) {
    console.error(error);
    next(error)
  }
}

const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({ email: email })
    if (user) {
      let userToSend = {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        favorites: user.favorites
      }
      res.status(200).send(userToSend)
    } else {
      res.status(400).send("There's no User with that Email")
    }
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const {
      full_name,
      email,
      password,
      isAdmin
    } = userData;
    const foundUser = await userModel.findOne({ email: email })
    if (foundUser) {
      res.status(400).send("The User email already exists")
    } else if (full_name && email && password && isAdmin) {
      const newUser = await userModel.create({
        full_name,
        email,
        password,
        favorites: [],
        address: "",
        phone: "",
        status: true,
        isAdmin: isAdmin || false
      });

      if (!newUser) {
        res.status(400).send("The new User can't be created")
      } else {
        res.status(200).send({ msg: "New User created", newUser })
      }
    } else {
      res.status(400).send("The new User can't be created. Missing required Data")
    }

  } catch (error) {
    console.error(error);
    next(error)
  }
}
////////////////////autenticacion

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "3600s"
  })
}
const registerUser = async (req, res, next) => {
  const { full_name, email, password, isAdmin } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    try{
        const oldUser = await userModel.findOne({email})
        if(oldUser){
          return res.json({error:'User Exists'}) 
        }
        const newUser = await userModel.create({
            full_name,
            email,
            password: encryptedPassword,
        });
        var register = {
            from: '"Bienvenido a CompuDevs" <CompuDevs2022@gmail.com>',
            to: newUser.email,
            subject: "CompuDevs -Te has registrado con exito",
            html: `<html
              xmlns="http://www.w3.org/1999/xhtml"
              xmlns:v="urn:schemas-microsoft-com:vml"
              xmlns:o="urn:schemas-microsoft-com:office:office"
            >
              <head>
                <!--[if gte mso 9]>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG />
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                <![endif]-->
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="x-apple-disable-message-reformatting" />
                <!--[if !mso]><!-->
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <!--<![endif]-->
                <title></title>
                
                <link
                  href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
                  rel="stylesheet"
                  type="text/css"
                />
                <link
                  href="https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap"
                  rel="stylesheet"
                  type="text/css"
                />
              </head>
            
              <body
                class="clean-body u_body"
                style="
                  margin: 0;
                  padding: 0;
                  -webkit-text-size-adjust: 100%;
                  background-color: #506791;
                  color: #000000;
                "
              >
                <table
                  id="u_body"
                  style="
                    border-collapse: collapse;
                    table-layout: fixed;
                    border-spacing: 0;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    vertical-align: top;
                    min-width: 320px;
                    margin: 0 auto;
                    background-color: #506791;
                    width: 100%;
                  "
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tbody>
                    <tr style="vertical-align: top">
                      <td
                        style="
                          word-break: break-word;
                          border-collapse: collapse !important;
                          vertical-align: top;
                        "
                      >
            
                        <div
                          class="u-row-container"
                          style="padding: 0px; background-color: transparent"
                        >
                          <div
                            class="u-row"
                            style="
                              margin: 0 auto;
                              min-width: 320px;
                              max-width: 600px;
                              overflow-wrap: break-word;
                              word-wrap: break-word;
                              word-break: break-word;
                              background-color: transparent;
                            "
                          >
                            <div
                              style="
                                border-collapse: collapse;
                                display: table;
                                width: 100%;
                                height: 100%;
                                background-color: transparent;
                              "
                            >
                              <div
                                class="u-col u-col-100"
                                style="
                                  max-width: 320px;
                                  min-width: 600px;
                                  display: table-cell;
                                  vertical-align: top;
                                "
                              >
                                <div
                                  style="
                                    background-color: #506791;
                                    height: 100%;
                                    width: 100% !important;
                                  "
                                >
                                 <div
                                    style="
                                      height: 100%;
                                      padding: 0px;
                                      border-top: 0px solid transparent;
                                      border-left: 0px solid transparent;
                                      border-right: 0px solid transparent;
                                      border-bottom: 0px solid transparent;
                                    "
                                    <table
                                      id="u_content_image_1"
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 30px 10px 10px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <table
                                              width="100%"
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                            >
                                              <tr>
                                                <td
                                                  class="v-text-align"
                                                  style="
                                                    padding-right: 0px;
                                                    padding-left: 0px;
                                                  "
                                                  align="center"
                                                >
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
            
                                    <table
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 0px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <table
                                              width="100%"
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                            >
                                              <tr>
                                                <td
                                                  class="v-text-align"
                                                  style="
                                                    padding-right: 0px;
                                                    padding-left: 0px;
                                                  "
                                                  align="center"
                                                >
                                                  <img
                                                    align="center"
                                                    border="0"
                                                    src="https://cdn.appdesign.dev/wp-content/uploads/2020/09/Desarrollo-tiendas-online.jpg"
                                                    alt="Image"
                                                    title="Image"
                                                    style="
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                      clear: both;
                                                      display: inline-block !important;
                                                      border: none;
                                                      height: auto;
                                                      float: none;
                                                      width: 100%;
                                                      max-width: 600px;
                                                    "
                                                    width="600"
                                                    class="v-src-width v-src-max-width"
                                                  />
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
            
                        <div
                          class="u-row-container"
                          style="padding: 0px; background-color: transparent"
                        >
                          <div
                            class="u-row"
                            style="
                              margin: 0 auto;
                              min-width: 320px;
                              max-width: 600px;
                              overflow-wrap: break-word;
                              word-wrap: break-word;
                              word-break: break-word;
                              background-color: transparent;
                            "
                          >
                            <div
                              style="
                                border-collapse: collapse;
                                display: table;
                                width: 100%;
                                height: 100%;
                                background-color: transparent;
                              "
                            >
                              <div
                                class="u-col u-col-100"
                                style="
                                  max-width: 320px;
                                  min-width: 600px;
                                  display: table-cell;
                                  vertical-align: top;
                                "
                              >
                                <div
                                  style="
                                    background-color: #7b97bc;
                                    height: 100%;
                                    width: 100% !important;
                                    border-radius: 0px;
                                    -webkit-border-radius: 0px;
                                    -moz-border-radius: 0px;
                                  "
                                >
                                  <div
                                    style="
                                      height: 100%;
                                      padding: 0px;
                                      border-top: 0px solid transparent;
                                      border-left: 0px solid transparent;
                                      border-right: 0px solid transparent;
                                      border-bottom: 0px solid transparent;
                                      border-radius: 0px;
                                      -webkit-border-radius: 0px;
                                      -moz-border-radius: 0px;
                                    "
                                  >
                        
                                    <table
                                      id="u_content_heading_1"
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 50px 10px 20px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <h1
                                              class="v-text-align v-font-size"
                                              style="
                                                margin: 0px;
                                                color: #ffffff;
                                                line-height: 140%;
                                                text-align: center;
                                                word-wrap: break-word;
                                                font-weight: normal;
                                                font-family: 'Rubik', sans-serif;
                                                font-size: 26px;
                                              "
                                            >
                                              <div>
                                                <strong>GRACIAS POR REGISTRARTE</strong
                                                ><br /><strong>A COMPU DEVS</strong>
                                              </div>
                                            </h1>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
            
                                    <table
                                      id="u_content_text_1"
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 25px 50px 70px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <div
                                              class="v-text-align"
                                              style="
                                                color: #ffffff;
                                                line-height: 160%;
                                                text-align: justify;
                                                word-wrap: break-word;
                                              "
                                            >
                                              <p style="font-size: 14px; line-height: 160%">
                                                <span
                                                  style="
                                                    font-size: 16px;
                                                    line-height: 25.6px;
                                                  "
                                                  ><strong>${newUser.full_name}!</strong></span
                                                >
                                              </p>
                                              <p style="font-size: 14px; line-height: 160%">
                                                 
                                              </p>
                                              <p style="font-size: 14px; line-height: 160%">
                                                Podras ver los mejores descuentos y productos directamente desde nuestra pagina web
                                              </p>
                                              <p style="font-size: 14px; line-height: 160%">
                                                 
                                              </p>
                                              <p style="font-size: 14px; line-height: 160%">
                                               Esta al tanto de los mejores lanzamientos en tecnologia para ti
                                              </p>
                                              <p style="font-size: 14px; line-height: 160%">
                                             Por favor verifica tu email en el siguiente enlace
                                              </p>
                                              // <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}">Verifica tu email</a>
                                             
                                              <p style="font-size: 14px; line-height: 160%">
                                                <strong>Compu Devs</strong>
                                              </p>
                                              <p style="font-size: 14px; line-height: 160%">
                                                <strong>2022</strong>
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
            
                        <div
                          class="u-row-container"
                          style="padding: 0px; background-color: transparent"
                        >
                          <div
                            class="u-row"
                            style="
                              margin: 0 auto;
                              min-width: 320px;
                              max-width: 600px;
                              overflow-wrap: break-word;
                              word-wrap: break-word;
                              word-break: break-word;
                              background-color: transparent;
                            "
                          >
                            <div
                              style="
                                border-collapse: collapse;
                                display: table;
                                width: 100%;
                                height: 100%;
                                background-color: transparent;
                              "
                            >
                              <div
                                class="u-col u-col-100"
                                style="
                                  max-width: 320px;
                                  min-width: 600px;
                                  display: table-cell;
                                  vertical-align: top;
                                "
                              >
                                <div
                                  style="
                                    background-color: #506791;
                                    height: 100%;
                                    width: 100% !important;
                                    border-radius: 0px;
                                    -webkit-border-radius: 0px;
                                    -moz-border-radius: 0px;
                                  "
                                >
                                 <div
                                    style="
                                      height: 100%;
                                      padding: 0px;
                                      border-top: 0px solid transparent;
                                      border-left: 0px solid transparent;
                                      border-right: 0px solid transparent;
                                      border-bottom: 0px solid transparent;
                                      border-radius: 0px;
                                      -webkit-border-radius: 0px;
                                      -moz-border-radius: 0px;
                                    "
                                  ><!--<![endif]-->
                                    <table
                                      id="u_content_text_2"
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 70px 80px 10px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <div
                                              class="v-text-align"
                                              style="
                                                color: #ecf0f1;
                                                line-height: 140%;
                                                text-align: center;
                                                word-wrap: break-word;
                                              "
                                            >
                                              <p style="font-size: 14px; line-height: 140%">
                                                Si tienes preguntas, por favor escribenos al
                                                email
                                                <a
                                                  rel="noopener"
                                                  href="https://www.unlayer.com"
                                                  target="_blank"
                                                  >CompuDevs2022@gmail.com</a
                                                >
                                                o visita nuestra pagina web
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
            
                                    <table
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 20px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <table
                                              height="0px"
                                              align="center"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="63%"
                                              style="
                                                border-collapse: collapse;
                                                table-layout: fixed;
                                                border-spacing: 0;
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                vertical-align: top;
                                                border-top: 1px solid #95a5a6;
                                                -ms-text-size-adjust: 100%;
                                                -webkit-text-size-adjust: 100%;
                                              "
                                            >
                                              <tbody>
                                                <tr style="vertical-align: top">
                                                  <td
                                                    style="
                                                      word-break: break-word;
                                                      border-collapse: collapse !important;
                                                      vertical-align: top;
                                                      font-size: 0px;
                                                      line-height: 0px;
                                                      mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%;
                                                      -webkit-text-size-adjust: 100%;
                                                    "
                                                  >
                                                    <span>&#160;</span>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
            
                                    <table
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 10px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <div align="center">
                                              <div style="display: table; max-width: 187px">
                                                <table
                                                  align="left"
                                                  border="0"
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  width="32"
                                                  height="32"
                                                  style="
                                                    width: 32px !important;
                                                    height: 32px !important;
                                                    display: inline-block;
                                                    border-collapse: collapse;
                                                    table-layout: fixed;
                                                    border-spacing: 0;
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    vertical-align: top;
                                                    margin-right: 15px;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr style="vertical-align: top">
                                                      <td
                                                        align="left"
                                                        valign="middle"
                                                        style="
                                                          word-break: break-word;
                                                          border-collapse: collapse !important;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <a
                                                          href="https://www.facebook.com"
                                                          title="Facebook"
                                                          target="_blank"
                                                        >
                                                          <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png"
                                                            alt="Facebook"
                                                            title="Facebook"
                                                            width="32"
                                                            style="
                                                              outline: none;
                                                              text-decoration: none;
                                                              -ms-interpolation-mode: bicubic;
                                                              clear: both;
                                                              display: block !important;
                                                              border: none;
                                                              height: auto;
                                                              float: none;
                                                              max-width: 32px !important;
                                                            "
                                                          />
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  align="left"
                                                  border="0"
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  width="32"
                                                  height="32"
                                                  style="
                                                    width: 32px !important;
                                                    height: 32px !important;
                                                    display: inline-block;
                                                    border-collapse: collapse;
                                                    table-layout: fixed;
                                                    border-spacing: 0;
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    vertical-align: top;
                                                    margin-right: 15px;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr style="vertical-align: top">
                                                      <td
                                                        align="left"
                                                        valign="middle"
                                                        style="
                                                          word-break: break-word;
                                                          border-collapse: collapse !important;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <a
                                                          href="https://twitter.com"
                                                          title="Twitter"
                                                          target="_blank"
                                                        >
                                                          <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/292px-Twitter-logo.svg.png"
                                                            alt="Twitter"
                                                            title="Twitter"
                                                            width="32"
                                                            style="
                                                              outline: none;
                                                              text-decoration: none;
                                                              -ms-interpolation-mode: bicubic;
                                                              clear: both;
                                                              display: block !important;
                                                              border: none;
                                                              height: auto;
                                                              float: none;
                                                              max-width: 32px !important;
                                                            "
                                                          />
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
            
                                                <table
                                                  align="left"
                                                  border="0"
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  width="32"
                                                  height="32"
                                                  style="
                                                    width: 32px !important;
                                                    height: 32px !important;
                                                    display: inline-block;
                                                    border-collapse: collapse;
                                                    table-layout: fixed;
                                                    border-spacing: 0;
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    vertical-align: top;
                                                    margin-right: 0px;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr style="vertical-align: top">
                                                      <td
                                                        align="left"
                                                        valign="middle"
                                                        style="
                                                          word-break: break-word;
                                                          border-collapse: collapse !important;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <a
                                                          href="https://www.instagram.com"
                                                          title="Instagram"
                                                          target="_blank"
                                                        >
                                                          <img
                                                            src="https://eltallerdehector.com/wp-content/uploads/2022/06/cd939-logo-instagram-png.png"
                                                            alt="Instagram"
                                                            title="Instagram"
                                                            width="32"
                                                            style="
                                                              outline: none;
                                                              text-decoration: none;
                                                              -ms-interpolation-mode: bicubic;
                                                              clear: both;
                                                              display: block !important;
                                                              border: none;
                                                              height: auto;
                                                              float: none;
                                                              max-width: 32px !important;
                                                            "
                                                          />
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                       
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
            
                                    <table
                                      id="u_content_menu_1"
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 10px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <div class="menu" style="text-align: center">
                                 
                                              <a
                                                href=""
                                                target="_self"
                                                style="
                                                  padding: 5px 15px;
                                                  display: inline-block;
                                                  color: #ffffff;
                                                  font-family: 'Open Sans', sans-serif;
                                                  font-size: 14px;
                                                  text-decoration: none;
                                                "
                                                class="v-padding v-font-size"
                                              >
                                                Home
                                              </a>
                                              <span
                                                style="
                                                  padding: 5px 15px;
                                                  display: inline-block;
                                                  color: #ffffff;
                                                  font-family: 'Open Sans', sans-serif;
                                                  font-size: 14px;
                                                "
                                                class="v-padding v-font-size hide-mobile"
                                              >
                                                |
                                              </span>
            
                                              <a
                                                href=""
                                                target="_self"
                                                style="
                                                  padding: 5px 15px;
                                                  display: inline-block;
                                                  color: #ffffff;
                                                  font-family: 'Open Sans', sans-serif;
                                                  font-size: 14px;
                                                  text-decoration: none;
                                                "
                                                class="v-padding v-font-size"
                                              >
                                                About Us
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
            
                                    <table
                                      id="u_content_text_3"
                                      style="font-family: 'Open Sans', sans-serif"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="v-container-padding-padding"
                                            style="
                                              overflow-wrap: break-word;
                                              word-break: break-word;
                                              padding: 10px 10px 70px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            align="left"
                                          >
                                            <div
                                              class="v-text-align"
                                              style="
                                                color: #ffffff;
                                                line-height: 140%;
                                                text-align: center;
                                                word-wrap: break-word;
                                              "
                                            >
                                              <p style="font-size: 14px; line-height: 140%">
                                                Recibiste este email porque te registraste
                                                en technotrade
                                              </p>
            
                                              <p style="font-size: 14px; line-height: 140%">
                                                Techno Trade 2022 All rights reserved
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
            
                      </td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
            `,
          };
        //NOTIFICACION DE REGISTRO
        console.log(newUser.email, 'email')
        transporter.sendMail(register, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email de verificacion es enviado a tu correo");
            }
          });
        // res.send({status:'ok'})

        
    }catch(error){
        res.send({status:'error'})
    }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await userModel.findOne({
      email,
    });

    // If user not found, send error message
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }

    // Compare hased password with user password to see if they are valid
    let isMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({}, JWT_SECRET);

    if (!isMatch) {
      return res.status(401).json({
        errors: [
          {
            msg: "Email or password is invalid",
          },
        ],
      });
    } else {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      return res.json({ status: 'ok', data: token, id: user.id })
    }


  } catch (err) {
    res.send({ error: err.message });
  }


}
//olvidar contraseñaa
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try{
    const oldUser = await userModel.findOne({
       
        email: email,
      },
    );
    if (!oldUser) {
      return res.json({ status: "Usuario no existe" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
      },
      secret,
      {
        expiresIn: "5m",
      }
    );
    const link = `http://localhost:3000/resetPassword/${oldUser._id}/${token}`
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "compudevs2022@gmail.com",
        pass: "ftmgoxulpwshhfak",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    var mailOptions = {
      from: "compudevs2022@gmail.com",
      to: oldUser.email,
      subject: "Restaura tu contraseña",
      html: `
      <h4>Hola ${oldUser.full_name} </h4>
      <p>¿Olvidaste tu contraseña?</p>
      <p>Recibimos una solicitud para restaurar tu contraseña, haz click en el siguiente enlace</p>
      <p>${link}</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mensaje enviado" + info.response);
      }
    });
    console.log(oldUser.full_name);

    console.log(link);
  }catch(e){
    console.log(err);
  }
}
const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await userModel.findOne({
   
    _id: id,
    
  });
  if (!oldUser) {
    return res.json({ status: "Usuario no existe" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    // res.render("index", { email: verify.email, status: "No verificado" });
    res.status(201)

  } catch (err) {
    res.send("No verificado");
    console.log(err);
  }

}

const resetPasswordToken = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await userModel.findOne({
    
      _id: id,
    
  });
  if (!oldUser) {
    return res.json({ status: "Usuario no existe" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
   await userModel.updateOne({
    _id: id,
   },
   {
    $set:{
      password: encryptedPassword,
    },
   })
    // res.render("index", { email: verify.email, status: "verificado" });
    res.status(201).send('verified')

  } catch (err) {
    res.json({ status: "Algo salio mal" });
    console.log(err);
  }
}
// const registerUser = async (req, res, next) => {
//     try {
//         const {email, password} = req.body;
//     const user = await userModel.create({
//         email,
//         password
//     });
//     const token = createToken(user._id);
//     res.cookie('jwt', token, {
//         withCredentials: true,
//         httpOnly: false,
//         expiresIn: '3600s'
//     });
//     res.status(201).json({user: user._id, created: true})
//     }catch (e){
//         console.log(e)
//     }

// }
// const loginUser = async (req, res, next) => {
//     try {
//         const {email, password} = req.body;
//     const user = await userModel.login({
//         email,
//         password
//     });
//     const token = createToken(user._id);
//     res.cookie('jwt', token, {
//         withCredentials: true,
//         httpOnly: false,
//         expiresIn: '3600s'
//     });
//     res.status(201).json({user: user._id, created: true})
//     }catch (e){
//         console.log(e)
//     }

// }

const userData = async (req, res, next) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    userModel.findOne({ email: userEmail }).then((data) => {
      res.send({ status: 'ok', data: data })
    }).catch((error) => {
      res.send({ status: 'error', data: error })
    })
  } catch (e) {
    console.log(e)
  }
}
const editUser = async (req, res, next) => {
  try {

  } catch (error) {
    console.error(error);
    next(error)
  }
}

const blockUser = async (req, res, next) => {
  try {

  } catch (error) {
    console.error(error);
    next(error)
  }
}

const addFavorites = async (req, res, next) => {
  try {

  } catch (error) {
    console.error(error);
    next(error)
  }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    editUser,
    blockUser,
    addFavorites,
    registerUser,
    loginUser,
    userData,
    forgotPassword,
    resetPassword,
    resetPasswordToken
};