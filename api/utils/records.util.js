var AWS = require("aws-sdk");
const xlsx = require("node-xlsx");
const fs = require("fs");
const util = require('util');
const creds = require('../../credentials')

AWS.config.update(creds.aws2);

const parseExcel = async (file) => {
  function getBufferFromS3(file, callback) {
    const buffers = [];
    const s3 = new AWS.S3();
    const stream = s3
      .getObject({ Bucket: file.bucket, Key: file.key })
      .createReadStream();
    stream.on("data", (data) => buffers.push(data));
    stream.on("end", () => callback(null, Buffer.concat(buffers)));
    stream.on("error", (error) => callback(error));
  }

  function getBufferFromS3Promise(file) {
    return new Promise((resolve, reject) => {
      getBufferFromS3(file, (error, s3buffer) => {
        if (error) return reject(error);
        return resolve(s3buffer);
      });
    });
  }

  // create workbook from buffer
  try {
    const buffer = await getBufferFromS3Promise(file);
    const workbook = xlsx.parse(buffer);
    let keys = workbook[0].data[0];
    let values = workbook[0].data.slice(1);
    // let items = (values.map(arr => arr.filter(el => el != ''))).filter(arr => arr.length > 0).slice(1,);
    let items = values.filter(arr => arr.length > 0).slice(1,);
    items = items.map(el => {
      if (el.length >= 17 && el[0]) {
        return el;
      } else {
        return el.filter(el2 => el2 != '' || el2 != ' ');
      }
    });
    let groups = [];
    let groupIndex = -1;
    let ageIndex = 0;

    items.forEach(item => {

      if ( item.length === 2 && ((typeof item[0]) === "string") && ((typeof item[1]) === "string")) {
        arr1 = (item[0].split(' ')).filter(el => el != '');
        arr2 = (item[1].split(' ')).filter(el => el != '');

        let group = {};

        if (arr1.length == 3) {
          group = {
            gender:  arr1[0],
            category: arr1[1],
            event: arr1[2],
            division: arr2[0],
            weightClasses: []
          };
          groups.push(group);
        } else if (arr1.length === 4) {
          if (arr1[1] === 'Single' || arr1[1] === 'Classic' || arr1[1] === 'Multi') {
            if (arr1[2] === 'Ply' || arr1[2] === 'Raw') {
              group = {
                gender:  arr1[0],
                category: arr1[1] + ' ' + arr1[2],
                event: arr1[3],
                division: arr2[0],
                weightClasses: []
              };
              groups.push(group);
            }
          } else if (arr1[1] === 'Raw') {
            if (arr1[2] === 'Bench' || arr1[2] === 'Squat' || arr1[2] === 'Deadlift') {
              if (arr1[3] === 'Only') {
                group = {
                  gender:  arr1[0],
                  category: arr1[1],
                  event: arr1[2] + ' ' + arr1[3],
                  division: arr2[0],
                  weightClasses: []
                };
                groups.push(group);
              }
            }
          }
        } else if (arr1.length === 5) {
          group = {
            gender:  arr1[0],
            category: arr1[1] + ' ' + arr1[2],
            event: arr1[3] + ' ' + arr1[4],
            division: arr2[0],
            weightClasses: []
          };
          groups.push(group);
        }
        groupIndex += 1;
      } else if ( item.length === 1 && ((typeof item[0]) === "string") && (item[0].includes('kg'))){
        let div = (item[0].split(' ')).filter(el => el != '' || el != ' ');
        if (div.length === 2) {
          groups[groupIndex].weightClasses.push(
            {
              weightClass: div[0],
              ageClass: div[1],
              results: []
            }
          );
        } else {
          groups[groupIndex].weightClasses.push(
            {
              weightClass: div[0],
              ageClass: div[2],
              results: []
            }
          );
        }
      } else if (item.length >= 17) {
        groups[groupIndex].weightClasses.forEach((wClass, index) => {
          if (wClass.weightClass === item[3]) {
            groups[groupIndex].weightClasses[index].results.push({
              name: item[1],
              ageClass: groups[groupIndex].weightClasses[index].ageClass,
              category: groups[groupIndex].category,
              event: groups[groupIndex].event,
              division: groups[groupIndex].division,
              province: item[2],
              weightClass: item[3],
              weight: item[4],
              age: item[5],
              squat1: item[6],
              squat2: item[7],
              squat3: item[8],
              bench1: item[9],
              bench2: item[10],
              bench3: item[11],
              deadlift1: item[12],
              deadlift2: item[13],
              deadlift3: item[14],
              total: item[15],
              wilks: item[16],
              mccTotal: item[17]
            });
          }
        })
      }
    });

    let resultsForLifter = [];

    groups.forEach((group, index1) => {
      group.weightClasses.forEach((weightClass, index2) => {
        weightClass.results.forEach((result, index3) => {

            let division;
            if (groups[index1].weightClasses[index2].ageClass === 'Open') {
              division = { "name": "Open" , ageClass: { "min": 13, "max": 100 }};
            } else {
              let arr = groups[index1].weightClasses[index2].ageClass.split("-");
              if ((typeof arr[0] === 'number') && (typeof arr[1] === 'number')) {
                division = { "name": groups[index1].division, ageClass: {"min": arr[0], "max": arr[1]}};
              } else {
                division = { "name": groups[index1].division, ageClass: {"min": 0, "max": 100}};
              }
              
            }
          if ( resultsForLifter.find(el => el.name === result.name) ) {
            
            let i = resultsForLifter.findIndex(el => el.name === result.name);
            if (!(resultsForLifter[i].events.includes(result.event))){
              resultsForLifter[i].events.push(result.event);
            }
            if (!(resultsForLifter[i].divisions.some(div => div.name === division.name))) {
              resultsForLifter[i].divisions.push(division);
            }
          } else {

            resultsForLifter.push({
              name: result.name,
              gender: groups[index1].gender,
              divisions: [division],
              category: groups[index1].category,
              events: [result.event],
              province: result.province,
              weightClass: result.weightClass,
              weight: result.weight,
              age: result.age,
              results: {
                squat1: result.squat1,
                squat2: result.squat2,
                squat3: result.squat3,
                bench1: result.bench1,
                bench2: result.bench2,
                bench3: result.bench3,
                deadlift1: result.deadlift1,
                deadlift2: result.deadlift2,
                deadlift3: result.deadlift3,
              },
              total: result.total,
              wilks: result.wilks,
              mccTotal: result.mccTotal
            })
          }
        });
      });
    });

    return resultsForLifter;
  } catch (err) {
    throw new Error(err.message);
  }
};

const generateRecordCertificate = async (record) => {
  try {

  } catch (err) {

  }
};

// Checks to see if a result is a record and returns true/false
const checkIfResultIsRecord = async (result) => {};

module.exports = {
  parseExcel,
  checkIfResultIsRecord,
  generateRecordCertificate
};