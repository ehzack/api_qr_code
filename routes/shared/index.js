var qr = require("qr-image");
var encrypter = require("object-encrypter");
var pdf = require("html-pdf");
var fs = require("fs");
const path = require("path");

var engine = encrypter("zakaria123", { ttl: false });
var options = {
  height: "1107px",
  width: "900px",
};

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

  generate_pdf: async function (qr_code, payload) {
    var html = require("../../template/index")(qr_code, payload);

    pdf
      .create(html, options)
      .toFile(
        `${__dirname}/../result/${payload.first_name.replace(
          / /g,
          ""
        )}_${payload.last_name.replace(/ /g, "")}.pdf`,
        function (err, ress) {
          if (err) return console.log(err);
          return "done";
        }
      );
  },
  rmDir: function (dirPath, dirPathPDF) {
    try {
      fs.unlinkSync(dirPath);

      fs.readdir(dirPathPDF, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(dirPathPDF, file), (err) => {
            if (err) throw err;
          });
        }
      });
    } catch (e) {
      return;
    }
  },
};
