const { required } = require("joi");

module.exports = function (qr_code, payload) {
  var logo = require("./fadaa_alouloumeLogo");
  var dictionary = require("./dictionary");

  if (payload.school == "ecoletaiba") {
    logo = require("./ecoleTaibaLogo");
  }

  let html = `

  <style>
  body {
      background: #e2e2e2;
  }
  h6{
    font-size:12px
  }
  p{
    font-size:11px
  }
   body .card {
      height: 5.4cm;
      width: 8.6cm;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      border-radius: 5px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
  }
    
  body #one {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      float: left;
      width: 62%;
      height: 5.4cm;
      padding: 9px;
  }
    
  body #two {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      float: left;
      width: 30%;
      /*margin-right: -1px;*/
      height: 100%;
  }
    
  #oneone {
      display: flex;
      float: left;
      width: 30%;
      text-align: center;
      justify-content: center;
      
    }
    
  body #twotwo {
      float: left;
      width: 70%;
      height: 8%;
  }

  p {
      line-height: 17px;
  }

</style>

  <!-- 8.6*5.4 -->

  <div class="card">
      <div id="one">
          <div id="oneone">
              <img src="${logo}" style="width: 90%;" />
          </div>
          <div id="twotwo">
              <h6 style="color: grey; padding-left: 3px; text-align: center;"> année scolaire : ${
                payload.schoolYear
              } </h6>
          </div>
          <div style=" float: left; text-align: left; padding-left: 3px; padding-top: 30px;">
              <p> <b> ${payload.first_name} - ${payload.last_name} </b> <br>
               ${dictionary[payload.role]} <br>
               ${
                 payload.role == "student"
                   ? `
                  ${payload.registers[0].classroom.name} <br />
                  Transport: ${payload.transport} <br />
                  Cantine: ${payload.canteen} <br />
                  `
                   : ""
               }
                ${
                  payload.role == "teacher"
                    ? `
                  Status: ${payload.permanent}
                  `
                    : ""
                }
              </p>
              <!-- <p> <b> Nom - P rénom </b> <br>
               Role <br>
               Classroom Name <br>
               Transport: Oui/Non <br>
               Cantine: Oui/Non <br>
               Status: permanant / Non
              </p> -->
          </div>
      </div>
      <div id="two">
          <div class="oneone" style="margin-top:55%">
              <img src="data:image/png;base64, ${qr_code}" style="width: 100%; " />
          </div>
      </div>
    </div>

    `;

  return html;
};
