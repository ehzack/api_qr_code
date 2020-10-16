const { required } = require("joi");

module.exports = function (qr_code, payload) {
  var logo = require("./fadaa_alouloumeLogo");
  if (payload.school == "ecoletaiba") {
    logo = require("./ecoleTaibaLogo");
  }

  let html = `
    <style>
    @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
    @import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
    body {
         background: #e2e2e2;
         width: 98%;
         height: 100vh;
    }
     body .card {
         width: 800px;
         height: 400px;
         background: white;
         position: absolute;
         left: 0;
         right: 0;
         margin: auto;
         top: 0;
         bottom: 0;
         border-radius: 10px;
         -webkit-border-radius: 10px;
         -moz-border-radius: 10px;
         box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
    }
     body .card_left {
         width: 40%;
         height: 400px;
         float: left;
         overflow: hidden;
         background: transparent;
    }
     body .card_left img {
         width: 100%;
         height: 75%;
         border-radius: 10px 0 0 10px;
         -webkit-border-radius: 10px 0 0 10px;
         -moz-border-radius: 10px 0 0 10px;
         position: relative;
         top: 12%;
    }
     body .card_right {
         width: 60%;
         float: left;
         background: white;
         height: 400px;
         border-radius: 0 10px 10px 0;
         -webkit-border-radius: 0 10px 10px 0;
         -moz-border-radius: 0 10px 10px 0;
    }
     body .card_right h1 {
         color: black;
         font-family: 'Montserrat', sans-serif;
         font-weight: 600;
         text-align: left;
         font-size: 40px;
         margin: 30px 0 0 0;
         padding: 0 0 0 40px;
         letter-spacing: 1px;
    }
     body .card_right__details ul {
         list-style-type: none;
         padding: 0 0 0 40px;
         margin: 10px 0 0 0;
    }
     body .card_right__details ul li {
         color: #454f66;
         display: inline;
         font-family: 'Montserrat', sans-serif;
         font-weight: 400;
         font-size: 16px;
         padding: 0 40px 0 0;
    }
     body .card_right__review p {
         color: black;
         font-family: 'Montserrat', sans-serif;
         font-size: 12px;
         padding: 0 40px 0 40px;
         letter-spacing: 1px;
         margin: 10px 0 10px 0;
         line-height: 20px;
    }
     body .card_right__review a {
         text-decoration: none;
         font-family: 'Montserrat', sans-serif;
         font-size: 14px;
         padding: 0 0 0 40px;
         color: #ffda00;
         margin: 0;
    }
    </style>
    <div class="card">
        <div class="card_left">
          <img src="data:image/png;base64, ${qr_code}"/>
        </div>
        <div class="card_right">
          <div class="card_right__details">
            <br />
            <br />
            <ul>
              <li style="font-weight: bold;"> année scolaire : ${
                payload.schoolYear
              }</li>
              <li style="float: right;"><img src="${logo}" style="width: 100px; height=100px;"/></li>
            </ul>
          </div>
          
          <h1>${payload.first_name} ${payload.last_name}</h1>
          <div class="card_right__details">
            <ul>
              <li>${payload.role}</li>
            </ul>
            ${
              payload.role == "student"
                ? `<ul>
              <li>${payload.registers[0].classroom.name}</li>
            </ul>
          
            <ul>
              <li>Transport: ${payload.transport}</li>
            </ul>
            <ul>
              <li>Cantine: ${payload.canteen}</li>
            </ul>
            `
                : ""
            }
        ${
          payload.role == "teacher"
            ? `<ul>
              <li> (Si Enseignant) - Status: ${payload.permanent}</li>
            </ul>`
            : ""
        }
            <div class="card_right__review">
              
            </div>
          </div>
        </div>
      </div>





    `;

  return html;
};
