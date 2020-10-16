var express = require("express");
var router = express.Router();
const Boom = require("@hapi/boom");
var fs = require("fs");
const fsExtra = require("fs-extra");

const Joi = require("joi");
const Functions = require("./shared/index");
const { zip } = require("zip-a-folder");
const path = require("path");

router.post("/generate_qr_code", async function (req, res, next) {
  const schema = Joi.object().keys({
    data: Joi.array().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    const { data } = value;

    for (let i = 0; i < data.length; i++) {
      let qr_code = Functions.generateQrCodeImage(data[i]);
      await Functions.generate_pdf(qr_code, data[i]);
    }

    await zip(`${__dirname}/result`, `${__dirname}/result.zip`);

    fs.readdir(`${__dirname}/result`, (err, files) => {
      for (const file of files) {
        console.log(path.join(`${__dirname}/result`, file));
        fs.unlink(path.join(`${__dirname}/result`, file), (err) => {
          if (err) {
            console.log("errrrrrror");
          } else {
            console.log("Done");
          }
        });
      }
    });
    res.sendFile(`${__dirname}/result.zip`);
  } catch (e) {
    console.error(e);
    return next(Boom.badImplementation("Unable to generate QR"));
  }
});

router.post("/decrypte_qr_code", async function (req, res, next) {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    const { code } = value;
    var decrypte = Functions.decrypte_data(code);
    res.json(decrypte);
  } catch (e) {
    console.error(e);
    return next(Boom.badImplementation("Unable to generate QR"));
  }
});

module.exports = router;
