const request = require('request');
const util = require('util');
const loginConfig = require('../config/login.json');
const keytar = require('keytar');

const ErrorCodes = [400, 401, 403, 503];


function getItems(index) {

    return new Promise((res, rej) => {

        let data;

        var p1 = function () {

            return new Promise((resolve, reject) => {

                request.post({ url: 'https://getpocket.com/v3/get', form: data }, function (err, httpResponse, body) {

                    let StatusCode = httpResponse.statusCode;
                    var xErrorCode = httpResponse.headers['x-error-code'];
                    var xError = httpResponse.headers['x-error'];
                    let error = false;

                    ErrorCodes.forEach((val) => {
                        if (val === StatusCode) {

                            error = true;

                        }
                    });

                    if (!err && !error) {

                        resolve(JSON.parse(body));

                    } else if (err) {

                        reject(err);

                    } else if (error) {


                        reject(xError + " Code: " + xErrorCode);

                    }

                });

            });

        }


        keytar.getPassword("Tekcop", "access_token").then((success) => {


            data = {
                consumer_key: loginConfig.consumer_key,
                access_token: success,
                count: index,
                detailType: "complete"
            }


        }).catch((reason) => {

            rej(reason);

        }).then(p1).then((success) => {


            res(success);

        }).catch((reason) => {

            rej(reason);
        });

    });

}

module.exports = getItems;