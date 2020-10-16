var hash = require("object-hash");
var pdf = require("html-pdf");

module.exports = class functions {
  encrypte_data = (data) => {
    return hash(data);
  };
};
