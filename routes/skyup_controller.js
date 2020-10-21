var express = require("express");
var router = express.Router();
const Boom = require("@hapi/boom");
var fs = require("fs");
const fsExtra = require("fs-extra");
const { FromEmail, DOMAINNAME } = require("./../config");

const Joi = require("joi");
const Functions = require("./shared/index");
const { zip } = require("zip-a-folder");
const path = require("path");

async function main(nameFolder, data, email) {
  for (let i = 0; i < data.length; i++) {
    let qr_code = Functions.generateQrCodeImage(data[i]);
    let res = await Functions.generate_pdf(nameFolder, qr_code, data[i]);
  }
  await zip(`${__dirname}/${nameFolder}`, `${__dirname}/zip/${nameFolder}.zip`);

  Functions.rmDir(`${__dirname}/${nameFolder}`);
  const msg = {
    to: email,
    from: FromEmail,
    subject: "Donwload ZIP",
    text: `${DOMAINNAME}skyupControllerRouter/getfile?name=${nameFolder}`,
  };
  Functions.sendMail(msg);
}
router.post("/generate_qr_code", async function (req, res, next) {
  const schema = Joi.object().keys({
    data: Joi.array().required(),
    email: Joi.string().email().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }
  const { data, email } = value;

  let nameFolder = email.split("@")[0];
  try {
    main(nameFolder, data, email);

    res.send("");

    next();
  } catch (e) {
    console.error(e);
    Functions.rmDir(
      `${__dirname}/routes/zip/${nameFolder}.zip`,
      `${__dirname}/routes/${nameFolder}`
    );
    return next(Boom.badImplementation("Unable to generate QR"));
  }
});

router.get("/getfile", async function (req, res, next) {
  console.log("iciiii");
  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }
  const { name } = value;

  try {
    res.sendFile(`${__dirname}/zip/${name}.zip`);

    next();
  } catch (e) {
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
