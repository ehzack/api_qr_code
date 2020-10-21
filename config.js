exports.HASURA_GRAPHQL_ENDPOINT =
  process.env.HASURA_GRAPHQL_ENDPOINT || "https://skyuptest.tech/v1/graphql";

exports.PORT = process.env.PORT || 3000;
exports.SMPT_AUTH_USER =
  process.env.SMPT_AUTH_USER || "ecoletaiba.infos@gmail.com";
exports.SMPT_AUTH_PASS =
  process.env.SMPT_AUTH_PASS || "ecoletaiba.infos@ecoletaiba.infos";

exports.FromEmail = process.env.FromEmail || "test@gmail.com";
exports.DOMAINNAME = process.env.DOMAINNAME || "http://qrcode.ecoletaiba.com/";
