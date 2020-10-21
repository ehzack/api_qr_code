var qr = require("qr-image");
var encrypter = require("object-encrypter");
var pdf = require("html-pdf");
var fs = require("fs");
const path = require("path");
const util = require("util");
const fsRemove = require("fs-extra");

var engine = encrypter("zakaria123", { ttl: false });
var options = {
  timeout: "100000",
  type: "pdf",
};

const nodemailer = require("nodemailer");

const { SMPT_AUTH_USER, SMPT_AUTH_PASS } = require("./../../config");

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  //secure: true, // use SSL
  auth: {
    user: SMPT_AUTH_USER,
    pass: SMPT_AUTH_PASS,
  },
});
module.exports = {
  generateQrCodeImage: function (user) {
    var hashData = engine.encrypt(user);
    var qr_svg = qr.imageSync(hashData, { type: "png" });
    var image_64bit = Buffer.from(qr_svg).toString("base64");
    return image_64bit;
  },

  decrypte_data: function (data) {
    return engine.decrypt(data);
  },

  generate_pdf: async function (file_name, qr_code, payload) {
    var html = require("../../template/index")(qr_code, payload);
    return new Promise((resolve) => {
      pdf
        .create(html, options)
        .toFile(
          `${__dirname}/../${file_name}/${payload.first_name.replace(
            / /g,
            ""
          )}_${payload.last_name.replace(/ /g, "")}.pdf`,
          (err, res) => {
            resolve(res);
          }
        );
    });
  },
  create_folder: async function (namefolder) {
    if (!fs.existsSync(namefolder)) {
      await fs.mkdirSync(namefolder);
      return namefolder + 1;
    } else {
      await fs.mkdirSync(namefolder + 1);
      return namefolder + 1;
    }
  },
  rmDir: async function (dirPathPDF) {
    try {
      console.log("Remove File **************", dirPathPDF);
      await fsRemove.remove(dirPathPDF);
    } catch (e) {
      console.log(e);
      return;
    }
  },
  sendMail: function (message) {
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("done");
        console.log(info);
      }
    });
  },
};
