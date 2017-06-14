'use strict';
const winston = require('winston');
const request = require('request');
const fs = require('fs');

class DataReturnsUserSession {
    constructor (endpoint) {
        this.endpoint = endpoint;
        this.sessionData = null;
    }

    createSession () {
        const self = this;
        return new Promise(function (resolve, reject) {
            const requestData = {
                url: self.endpoint,
                gzip: true,
                timeout: 60000, // ms 60 seconds
                qs: {
                    'createSession': 'true'
                }
            };
            // Make REST call into the Data Exchange service, and handle the result.
            request.post(requestData, function (err, httpResponse, body) {
                if (err || httpResponse.statusCode !== 200) {
                    const error = err || new Error(`Server returned error code (${httpResponse.statusCode}) when establishing preload session.`);
                    console.log(err);
                    return reject(error);
                }
                const data = JSON.parse(body);
                self.sessionData = data;
                return resolve(data);
            });
        });
    }

    getSession () {
        const self = this;
        return new Promise(function (resolve, reject) {
            if (self.sessionData) {
                return resolve(self.sessionData);
            } else {
                self.createSession().then(resolve).catch(reject);
            }
        });
    }

    upload (filePaths) {
        const self = this;
        return self.getSession()
            .then(() => Promise.all(filePaths.map(fp => self.uploadFile(fp))))
            .then((promises) => {
                return {
                    sessionId: promises[0].sessionId,
                    sessionKey: promises[0].sessionKey,
                    files: promises.map(p => p.files).reduce((combined, fileArray) => combined.concat(fileArray), [])
                };
            });
    }

    uploadFile (filePath) {
        const self = this;
        return new Promise(function (resolve, reject) {
            return self.getSession().then(function (sessionData) {
                const requestData = {
                    url: self.endpoint,
                    gzip: true,
                    timeout: 60000, // ms 60 seconds
                    qs: {
                        fineuploader: true, // This api emulates the fineuploader functionality
                        filename: filePath,
                        filesize: fs.statSync(filePath).size,
                        sessionId: sessionData.sessionId,
                        sessionKey: sessionData.sessionKey
                    },
                    formData: {
                        fileUpload: {
                            value: fs.createReadStream(filePath),
                            options: {
                                filename: filePath
                            }
                        }
                    }
                };
                // Make REST call into the Data Exchange service, and handle the result.
                request.post(requestData, function (err, httpResponse, body) {
                    if (err || httpResponse.statusCode !== 200) {
                        const error = err || new Error(`Unexpected response (${httpResponse.statusCode}) from server when attempting to preload files`);
                        winston.error('Error encountered on session preload POST request', error);
                        return reject(error);
                    }
                    const data = JSON.parse(body);
                    winston.info(`Successfully preloaded file ${data.files} into data-returns frontend preload session ${data.sessionId}`);
                    return resolve(data);
                });
            }).catch(reject);
        });
    }
}

module.exports = DataReturnsUserSession;
