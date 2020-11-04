const registrationsDb = require("../db/registration.db");
const meetDb = require("../db/meets.db");

var PDFDocument = require("pdfkit");
var blobStream = require("blob-stream");
var nodemailer = require("nodemailer");
var AWS = require("aws-sdk");
var credentials = require("../../credentials.js");
var ses = require("nodemailer-ses-transport");
var mongoose = require("mongoose");
var Registration = mongoose.model("Registration");
var Member = mongoose.model("Member");
var Stream = require("stream");
const xlsx = require("node-xlsx");
const fs = require("fs");
const Excel = require("exceljs");
const creds = require('../../credentials');

var Registration = mongoose.model("Registration");

var transporter = nodemailer.createTransport(
  ses({
    accessKeyId: credentials.aws.key,
    secretAccessKey: credentials.aws.secret,
    region: "us-west-2",
  })
);

var bucket = new AWS.S3(creds.awsS3);

// Generate registration pdf
var generateMemberRegistrationPdf = async (newRegistration, newMeet) => {
  let pdf = new PDFDocument();
  let registration = newRegistration[0];
  let meet = newMeet;
  console.log(registration, meet);
  let feeTotal = 100;
  let FOLDER = "meets/test/registrations/";
  let regLink = "";

  let buffers = [];
  pdf.on("data", buffers.push.bind(buffers));
  pdf.on("end", () => {
    let pdfData = Buffer.concat(buffers);

    var params = {
      Bucket: "cpl-documents",
      Key:
        FOLDER +
        registration.meetId.title.replace(/\s/g, "_").toLowerCase() +
        "_" +
        registration.name +
        ".pdf",
      Body: pdfData,
      ContentType: "application/pdf",
      ACL: "public-read",
    };

    var text =
      '<div style="width: 100%; height: 12px; background-color: black;"></div><div style="width: 100%; height: 17px; background-color: red; margin-bottom: 50px"></div><h2>Thank you ' +
      registration.name +
      " for registering for the Canadian Powerlifting League&#39;s " +
      registration.name +
      "!</h2><h4>To complete your registration for this meet please pay your fee of $" +
      registration.fees.total +
      '.00.</h4><p>You may pay your fee through paypal or etransfer to canadianpowerlifting@gmail.com.<br /><br/>You will receive a confirmation of registration email from us confirming your spot at the meet within 24 hours of payment being recieved.</p><p style="margin-top: 40px;">Thank you,<br/>Bernice Fuss <br/>President,<br/>Canadian Powerlifting League<br />(403) 318 9143<br />canadianpowerlifting@gmail.com</p><div style="width: 100%; height: 17px; background-color: red; margin-top: 50px"></div><div style="width: 100%; height: 12px; background-color: black;"></div>';

    var text2 =
      '<div style="width: 100%; height: 12px; background-color: black;"></div><div style="width: 100%; height: 17px; background-color: red; margin-bottom: 50px"></div><h2>' +
      registration.name +
      " has for registered for the Canadian Powerlifting League&#39;s " +
      registration.name +
      "!</h2><h4>Their total fees are $" +
      registration.fees.total +
      '.00.</h4><p style="margin-top: 40px;">Attached is a copy of their registration form</p><div style="width: 100%; height: 17px; background-color: red; margin-top: 50px"></div><div style="width: 100%; height: 12px; background-color: black;"></div>';

    var promises = [];
    var emails = [];
    // if (process.env.NODE_ENV == 'development') {
    emails = ["raymondmorland@gmail.com"];
    // } else if (process.env.NODE_ENV == 'production') {
    // emails = [form.email, 'canadianpowerlifting@gmail.com', 'raymond@mordevstudio.ca'];
    // }

    promises.push(
      new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: "registration@canadianpowerliftingleague.ca",
            to: emails[0],
            subject: " Registration for ",
            html: text,
            attachments: [
              {
                filename: "CPLRegistration" + registration._id + ".pdf",
                content: pdfData,
              },
            ],
          },
          function (err, info) {
            if (err) {
              reject(err);
            } else {
              resolve(info);
            }
          }
        );
      })
    );

    promises.push(
      new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: "registration@canadianpowerliftingleague.ca",
            to: emails[0],
            subject: " Registration for " + registration._id,
            html: text2,
            attachments: [
              {
                filename: "CPLRegistration" + registration._id + ".pdf",
                content: pdfData,
              },
            ],
          },
          function (err, info) {
            if (err) {
              reject(err);
            } else {
              resolve(info);
            }
          }
        );
      })
    );

    promises.push(
      new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: "registration@canadianpowerliftingleague.ca",
            to: emails[0],
            subject: " Registration for " + registration._id,
            html: text2,
            attachments: [
              {
                filename: "CPLRegistration" + registration._id + ".pdf",
                content: pdfData,
              },
            ],
          },
          function (err, info) {
            if (err) {
              reject(err);
            } else {
              resolve(info);
            }
          }
        );
      })
    );

    bucket.upload(params, (err, data) => {
      Registration.findOneAndUpdate(
        { _id: registration._id },
        { regLink: data.Location },
        { new: true }
      ).exec((vl) => {
        return Promise.all(promises).then((vals) => console.log(vals));
      });
    });
  });

  var title = registration._id;
  var meetDate = "";
  var where = "venue";
  var venueAddress = "address";
  var city = "city";

  var year = 2000;
  var month = "02";
  // if (month == '01') {
  //   month = 'January';
  // } else if (month == '02') {
  //   month = 'February';
  // } else if (month == '03') {
  //   month = 'March';
  // } else if (month == '04') {
  //   month = 'April';
  // } else if (month == '05') {
  //   month = 'May';
  // } else if (month == '06') {
  //   month = 'June';
  // } else if (month == '07') {
  //   month = 'July';
  // } else if (month == '08') {
  //   month = 'August';
  // } else if (month == '09') {
  //   month = 'September';
  // } else if (month == '10') {
  //   month = 'October';
  // } else if (month == '11') {
  //   month = 'November';
  // } else if (month == '12') {
  //   month = 'December';
  // }
  let day = "00";
  // if (day == '00' || day == '01' || day == '02' || day == '03' || day == '04' || day == '05' || day == '06' || day == '07' || day == '08' || day == '09') {
  //   day = day.slice(1);
  // }
  meetDate += "" + month + " " + day + ", " + year + "";

  var hour = "4";
  // if (hour.slice(0, 2) < 12) {
  //   hour = hour + ' AM';
  // } else if (hour.slice(0, 2) >= 12) {
  //   if (hour.slice(0, 2) == '13') {
  //     hour = '1' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '14') {
  //     hour = '2' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '15') {
  //     hour = '3' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '16') {
  //     hour = '4' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '17') {
  //     hour = '5' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '18') {
  //     hour = '6' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '19') {
  //     hour = '7' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '20') {
  //     hour = '8' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '21') {
  //     hour = '9' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '22') {
  //     hour = '10' + hour.slice(2);
  //   } else if (hour.slice(0, 2) == '23') {
  //     hour = '11' + hour.slice(2);
  //   }
  //   hour = hour + 'PM'
  // }
  // var hourE = meet.endTime.slice(11, 16);
  // if (hourE.slice(0, 2) < 12) {
  //   hourE = hourE + ' AM';
  // } else if (hourE.slice(0, 2) >= 12) {
  //   if (hourE.slice(0, 2) == '13') {
  //     hourE = '1' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '14') {
  //     hourE = '2' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '15') {
  //     hourE = '3' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '16') {
  //     hourE = '4' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '17') {
  //     hourE = '5' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '18') {
  //     hourE = '6' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '19') {
  //     hourE = '7' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '20') {
  //     hourE = '8' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '21') {
  //     hourE = '9' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '22') {
  //     hourE = '10' + hourE.slice(2);
  //   } else if (hourE.slice(0, 2) == '23') {
  //     hourE = '11' + hourE.slice(2);
  //   }
  //   hourE = hourE + 'PM'
  // }

  var start = "start";
  var end = "end";
  var name = "Name: ";
  var dob = "DOB: ";
  var email = "Email: ";
  var phone = "Phone Number: ";
  var gender = "Gender: ";
  var address = "Address: ";
  // if (form.street == '' && form.postal == '' && form.city == '' && form.province == '') {
  //   address += "No address specified";
  // } else {
  //   address += form.street + ' ' + form.city + ' ' + form.province + ' ' + form.postal;
  // }
  var gym = "Home Gym: ";
  // if (form.gym == '') {
  //   gym += "No home gym specified";
  // } else if (form.gym != '') {
  //   gym += form.gym;
  // }
  var coach = "Coach: ";
  // if (form.coach == '') {
  //   coach += "No coach specified";
  // } else if (form.coach != '') {
  //   coach += form.coach;
  // }
  var category = "Category: ";
  // if (form.category == '') {
  //   category += "No category specified";
  // } else if (form.category != '') {
  //   category += form.category;
  // }

  var division = "Divisions: ";
  // if (form.j1315) {
  //   division += "Junior 13-15, ";
  // } else if (form.j1617) {
  //   division += "Junior 16-17, ";
  // } else if (form.j1819) {
  //   division += "Junior 18-19, ";
  // } else if (form.j2023) {
  //   division += "Junior 20-23, ";
  // }
  // if (form.m40) {
  //   division += "Master 40+, ";
  // } else if (form.m45) {
  //   division += "Master 45+, ";
  // } else if (form.m50) {
  //   division += "Master 50+, ";
  // } else if (form.m55) {
  //   division += "Master 55+, ";
  // } else if (form.m60) {
  //   division += "Master 60+, ";
  // } else if (form.m65) {
  //   division += "Master 65+, ";
  // } else if (form.m70) {
  //   division += "Master 70+, ";
  // } else if (form.m75) {
  //   division += "Master 75+, ";
  // } else if (form.m80) {
  //   division += "Master 80+, ";
  // }
  // if (form.openDiv) {
  //   division += "Open 13+, ";
  // }
  // if (form.subDiv) {
  //   division += "Sub-Master 35-39, ";
  // }
  // if (!form.j1617 && !form.j1819 && !form.j12023 && !form.m40 && !form.m45 && !form.m50 && !form.m55 && !form.m60 && !form.m65 && !form.m70 && !form.m75 && !form.m80 && !form.j1315 && !form.openDiv && !form.subDiv) {
  //   division += "Not Specified"
  // }

  var events = "Events: ";
  // if (form.powerEvent) {
  //   events += "Full Power,"
  // }
  // if (form.benchEvent) {
  //   events += "Bench Only";
  // }
  // if (form.deadEvent) {
  //   events += "Deadlift Only";
  // }
  // if (!form.deadEvent && !form.powerEvent && !form.benchEvent) {
  //   events += "Not Specified"
  // }

  var weightClass = "Weight Class: kg";

  var openers = "Openers";
  var squatOpeners = "Squat: ";
  // if (form.squatOpen != null) {
  //   squatOpeners += form.squatOpen + "kg";
  // } else {
  //   squatOpeners += "Not specified"
  // }

  var benchOpeners = "Bench: ";
  // if (form.benchOpen != null) {
  //   benchOpeners += form.benchOpen + "kg";
  // } else {
  //   benchOpeners += "Not specified"
  // }

  var deadliftOpeners = "Deadlift: ";
  // if (form.deadliftOpen != null) {
  //   deadliftOpeners += form.deadliftOpen + "kg";
  // } else {
  //   deadliftOpeners += "Not specified"
  // }

  var squatHeight = "Squat Rack Height: ";
  // if (form.squatRackHeight != null) {
  //   squatHeight += form.squatRackHeight;
  // } else {
  //   squatHeight += "Not specified";
  // }

  var squatRack = "Rack position: ";
  // if (form.er != null && form.er != '') {
  //   squatRack += form.er;
  // } else {
  //   squatRack += "Not specified"
  // }

  var benchHeight = "Bench Height: ";
  // if (form.benchHeight != null) {
  //   benchHeight += form.benchHeight;
  // } else {
  //   benchHeight += "Not specified";
  // }

  var benchSafetyHeight = "Bench Safety Height: ";
  // if (form.benchSafetyHeight != null) {
  //   benchSafetyHeight += form.benchSafetyHeight;
  // } else {
  //   benchSafetyHeight += "Not specified";
  // }

  var shirt = "Tshirt Size: ";
  var shirtSize = "";
  var shirtPricing = "Tshirt: ";
  var shirtPrice = "";

  // if (form.tShirt) {
  //   if (form.shirt == 'menss') {
  //     shirtSize += " Mens small";
  //   } else if (form.shirt == 'mensm') {
  //     shirtSize += " Mens medium";
  //   } else if (form.shirt == 'mensl') {
  //     shirtSize += " Mens large";
  //   } else if (form.shirt == 'mensxl') {
  //     shirtSize += " Mens xlarge";
  //   } else if (form.shirt == 'mensxxl') {
  //     shirtSize += " Mens xxlarge";
  //   } else if (form.shirt == 'mensxxxl') {
  //     shirtSize += " Mens xxxlarge";
  //   } else if (form.shirt == 'womenss') {
  //     shirtSize += " Womens small";
  //   } else if (form.shirt == 'womensm') {
  //     shirtSize += " Womens medium";
  //   } else if (form.shirt == 'womensl') {
  //     shirtSize += " Womens large";
  //   } else if (form.shirt == 'womensxl') {
  //     shirtSize += " Womens xlarge";
  //   } else if (form.shirt == 'womensxxl') {
  //     shirtSize += " Womens xxlarge";
  //   }
  //   shirtPrice = "$30.00"
  // } else {
  //   shirtSize += ""
  //   shirtPrice += '';
  // }

  var membership = "Membership: ";
  var membershipPrice = "";
  // if (form.newMember) {
  //   membershipPrice += "$45.00";
  // } else if (form.member) {
  //   membershipPrice += "";
  // } else {
  //   membershipPrice += "";
  // }

  var fullPower = "Full Power : ";
  var fullPowerPrice = "";
  // if (form.powerEvent) {
  //   fullPowerPrice = "$120.00";
  // } else {
  //   fullPowerPrice += "";
  // }

  var benchDead = "Bench/Deadlift Only ";
  var benchDeadPrice = "";
  // if ((form.benchEvent && !form.deadEvent) || (!form.benchEvent && form.deadEvent)) {
  //   if (form.benchEvent) {
  //     benchDead += " [1 x $50.00]:";
  //     benchDeadPrice += '$50.00';
  //   } else if (form.deadEvent) {
  //     benchDead += " [1 x $50.00]:";
  //     benchDeadPrice += '$50.00';
  //   }
  // } else if (form.benchEvent && form.deadEvent) {
  //   benchDead += " [2 x $50.00]:";
  //   benchDeadPrice += '$100.00';
  // } else {
  //   benchDead += " [0 x $50.00]: ";
  //   benchDeadPrice += '';
  // }
  var additionalDivs =
    "Additional Divisions [" + additionalDivs + " x $30.00]: ";
  var additionalDivsPrice = "";

  // if (additionalDivs > 0) {
  //   additionalDivsPrice += "$" + (30 * additionalDivs) + ".00";
  // } else {
  //   additionalDivs += "";
  // }

  var teamEntry = "Team Entry: ";
  var teamEntryPrice = "";
  // if (form.teamEntry) {
  //   teamEntryPrice += "$50.00";
  // } else {
  //   teamEntryPrice += "";
  // }
  var recordsCert = "Application for records certificate: ";
  var recordsCertPrice = "";
  // if (form.recordsCert) {
  //   recordsCertPrice += "$10.00";
  // } else {
  //   recordsCertPrice += "";
  // }
  var total = "Total: ";
  var totalPrice = "$100.00";

  var howToPay =
    "Please pay your fees through etransfer or paypal to canadianpowerlifting@gmail.com";

  // pdf.image('public/images/CPL_LOGO_2_CLR_fnl.png', 60, 10, {
  //   fit: [200, 100],
  //   align: 'left',
  //   valign: 'top'
  // });

  pdf.fillColor("black");
  pdf.fontSize(18);
  pdf.text(title, 200, 20, {
    width: 350,
    align: "left",
  });
  pdf.fontSize(12);
  pdf.text(where, 320, 50);
  pdf.text(venueAddress, 320, 70);
  pdf.text(city, 320, 90);
  pdf.text(meetDate, 200, 50);
  pdf.text(start + "-" + end, 200, 70);

  pdf.text(name, 40, 140);
  pdf.text(gender, 355, 140);
  pdf.text(dob, 440, 140);
  pdf.text(email, 40, 160);
  pdf.text(phone, 355, 160);
  pdf.text(address, 40, 180, {
    width: 300,
  });
  pdf.text(gym, 40, 220);
  pdf.text(coach, 355, 220);

  pdf.lineWidth(1);

  pdf.moveTo(40, 250).lineTo(550, 250).stroke();

  pdf.text(category, 40, 280);
  pdf.text(division, 355, 280);
  pdf.text(events, 40, 300);
  pdf.text(weightClass, 355, 320);
  pdf.text(openers, 40, 320);
  pdf.text(squatOpeners, 40, 340);
  pdf.text(benchOpeners, 40, 360);
  pdf.text(deadliftOpeners, 40, 380);
  pdf.text(squatHeight, 355, 340);
  pdf.text(squatRack, 355, 360);
  pdf.text(benchHeight, 355, 380);
  pdf.text(benchSafetyHeight, 355, 400);

  pdf.moveTo(40, 430).lineTo(550, 430).stroke();

  pdf.text(shirt, 40, 460);
  pdf.text(shirtSize, 100, 460);

  pdf.moveTo(40, 490).lineTo(550, 490).stroke();

  pdf.text(shirtPricing, 0, 520, {
    align: "right",
    width: 420,
  });
  pdf.text(shirtPrice, 440, 520);
  pdf.text(membership, 0, 540, {
    align: "right",
    width: 420,
  });
  pdf.text(membershipPrice, 440, 540);
  pdf.text(fullPower, 0, 560, {
    align: "right",
    width: 420,
  });
  pdf.text(fullPowerPrice, 440, 560);
  pdf.text(benchDead, 0, 580, {
    align: "right",
    width: 420,
  });
  pdf.text(benchDeadPrice, 440, 580);
  pdf.text(additionalDivs, 0, 600, {
    align: "right",
    width: 420,
  });
  pdf.text(additionalDivsPrice, 440, 600);
  pdf.text(recordsCert, 0, 620, {
    align: "right",
    width: 420,
  });
  pdf.text(recordsCertPrice, 440, 620);
  pdf.text(teamEntry, 0, 640, {
    align: "right",
    width: 420,
  });
  pdf.text(teamEntryPrice, 440, 640);
  pdf.fontSize(15);
  pdf.text(total, 0, 660, {
    align: "right",
    width: 420,
  });
  pdf.text(totalPrice, 440, 660);
  pdf.fontSize(12);
  pdf.text(howToPay, 0, 690, {
    width: 520,
    align: "center",
  });
  pdf.end();
};

var generateRegistrationsSpreadsheet = async (meetId) => {
  try {
    const registrants = await meetDb.meetRegistrations({ _id: meetId });

    // Create Registration List XLSX from meet registrants

    // Save Registration List spreadsheet to S3 and overwrite previous one so the nre one is the most current

    let workbook = new Excel.Workbook();
    workbook.creator = "System";
    workbook.lastModifiedBy = "System";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    let worksheet = workbook.addWorksheet("Registrants");
    worksheet.columns = [
      {
        header: "Member ID",
        key: "memberId",
      },
      {
        header: "name",
        key: "name",
      },
      {
        header: "Registration Date",
        key: "registrationDate",
      },
      {
        header: "Fees",
        key: "fees",
      },
      {
        header: "Fees Paid",
        key: "feesPaid",
      },
      {
        header: "Age",
        key: "age",
      },
      {
        header: "Gender",
        key: "gender",
      },
      {
        header: "name",
        key: "name",
      },
      {
        header: "Divisions",
        key: "divisions",
      },
      {
        header: "Category",
        key: "category",
      },
      // For each event the lifts will need to be broken down so that rack/safety height and opening weight can be entered
      {
        header: "Events",
        key: "events",
      },
    ];

    registrants.forEach((element) => {
      console.log(element.name);
      worksheet.addRow({
        name: element.name,
      });
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = {
        bold: true,
      };
    });

    const stream = new Stream.PassThrough();

    const result = await workbook.xlsx.write(stream);
    const file = await bucket
      .upload(
        {
          Bucket: "cpl-file-storage-testing",
          Key: "testing-registrants-xlsx-" + Date.now() + ".xlsx",
          Body: stream,
          ACL: "public-read",
        },
        (err, data) => {
          console.log(data);
          return data;
        }
      )
      .promise()
      .then();

    return file;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  generateMemberRegistrationPdf,
  generateRegistrationsSpreadsheet,
};
