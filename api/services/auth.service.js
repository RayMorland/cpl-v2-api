global.fetch = require("node-fetch");
global.navigator = () => null;
var aws = require("aws-sdk");
const creds = require("../../credentials")
aws.config.update(creds.aws3);
const CognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
var jwt = require("jsonwebtoken");
var jwkToPem = require("jwk-to-pem");
var request = require("request");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const pool_region = "us-west-2";

const memberPoolData = creds.memberPool;

const adminPoolData = creds.adminPool;

const coordinatorPoolData = creds.coordinatorPool;

const adminPool = new AmazonCognitoIdentity.CognitoUserPool(adminPoolData);

const Validate = (role) => {
  return async function (req, res, next) {
    

    // if (authLevel == "all") {
      return next();
    // } else {
    //   var token = req.headers.authorization.split(" ")[1];
    //   var authLevel = req.headers["cpl-app-type"];
    

    // let url;

    // if (authLevel == "member") {
    //   url = `https://cognito-idp.${pool_region}.amazonaws.com/${memberPoolData.UserPoolId}/.well-known/jwks.json`;
    // } else if (authLevel == "coordinator") {
    //   url = `https://cognito-idp.${pool_region}.amazonaws.com/${coordinatorPoolData.UserPoolId}/.well-known/jwks.json`;
    // } else if (authLevel == "admin") {
    //   url = `https://cognito-idp.${pool_region}.amazonaws.com/${adminPoolData.UserPoolId}/.well-known/jwks.json`;
    // }
    //   request(
    //     {
    //       url: url,
    //       json: true,
    //     },
    //     function (error, response, body) {
    //       if (!error && response.statusCode === 200) {
    //         pems = {};
    //         var keys = body["keys"];
    //         for (var i = 0; i < keys.length; i++) {
    //           var key_id = keys[i].kid;
    //           var modulus = keys[i].n;
    //           var exponent = keys[i].e;
    //           var key_type = keys[i].kty;
    //           var jwk = { kty: key_type, n: modulus, e: exponent };
    //           var pem = jwkToPem(jwk);
    //           pems[key_id] = pem;
    //         }
    //         var decodedJwt = jwt.decode(token, { complete: true });
    //         if (!decodedJwt) {
    //           console.log("Not a valid JWT token");
    //           res.status(401);
    //           return res.send("Invalid token");
    //         }
    //         console.log(decodedJwt);
    //         var kid = decodedJwt.header.kid;
    //         var pem = pems[kid];
    //         if (!pem) {
    //           console.log("Invalid token");
    //           res.status(401);
    //           return res.send("Invalid token");
    //         }
    //         jwt.verify(token, pem, async function (err, payload) {
    //           if (err) {
    //             console.log("Invalid Token.");
    //             res.status(401);
    //             return res.send("Invalid tokern");
    //           } else {
    //             console.log({
    //               Username: payload.username,
    //               Pool: adminPoolData.UserPoolId,
    //             });
    //             const userData = {
    //               Username: payload.username,
    //               UserPoolId: adminPoolData.UserPoolId,
    //             };
    //             const user = await getUser(userData);
    //             console.log(user);
    //             console.log("Valid Token.");
    //             return next();
    //           }
    //         });
    //       } else {
    //         console.log("Error! Unable to download JWKs");
    //         res.status(500);
    //         return res.send("Error! Unable to download JWKs");
    //       }
    //     }
    //   );
    // };
    }
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(memberPoolData);
const Register = function (body) {
  var name = body.email;
  var email = body.email;
  var attributeList = [];

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    })
  );
  return new Promise((resolve, reject) => {
    userPool.signUp(name, "password", attributeList, null, function (
      err,
      result
    ) {
      if (err) {
        reject(err);
      } else {
        var cognitoUser = result.user;
        resolve(result);
      }
    });
  });
};

const Create = function (body) {
  var params = {
    UserPoolId: "us-west-2_dHWLP9XBe" /* required */,
    Username: body.email /* required */,
    // ClientMetadata: {
    //   // '<StringType>': 'STRING_VALUE',
    // },
    DesiredDeliveryMediums: ["EMAIL"],
    ForceAliasCreation: false,
    // MessageAction: SUPPRESS,
    TemporaryPassword: "password",
    UserAttributes: [
      {
        Name: "email" /* required */,
        Value: body.email,
      },
      {
        Name: "name" /* required */,
        Value: body.personal.firstName,
      },
    ],
  };
  return new Promise((resolve, reject) => {
    CognitoIdentityServiceProvider.adminCreateUser(params, function (
      err,
      result
    ) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const Delete = function (body) {
  return new Promise((resolve, reject) => {
    CognitoIdentityServiceProvider.adminDeleteUser(
      {
        UserPoolId: "us-west-2_dHWLP9XBe",
        Username: body,
      },
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

getUser = function (user) {
  return new Promise((resolve, reject) => {
    CognitoIdentityServiceProvider.adminGetUser(user, function (err, result) {
      if (err) {
        reject(err);
      } else {
        var cognitoUser = result;
        resolve(result);
      }
    });
  });
};

module.exports = {
  Validate,
  Create,
  Delete,
  Register
};
