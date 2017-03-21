#!/usr/bin/env node

/**
 * DISCLAIMER:
 *
 * This is a quick and dirty script to delete builds from browserstack - it is by no means finished or production ready!
 *
 * Use from the command line:
 *
 * BROWSERSTACK_USERNAME=blah BROWSERSTACK_ACCESS_KEY=blah ./browserstack-delete-builds.js --pattern=substringstringfrombuildname --delete
 *
 * Use without the --delete flag will show the build id's to be deleted (but won't delete anything)
 * Use without the --pattern=blah flag will result in all builds being in scope for deletion
 */
const winston = require("winston");
const util = require("util");
const lodash = require("lodash");
let request = require("request");
let args = process.argv.slice(2);

let doDelete = !lodash.isNil(args.find((element) => element === "--delete"));
let patternRegex = /^--pattern=(.+)/;
let patternArg = args.find((element) => patternRegex.test(element));

let pattern = null;
if (patternArg) {
    let patternMatch = patternRegex.exec(patternArg);
    if (patternMatch != null && patternMatch.length > 0) {
        pattern = patternMatch[1]
    }
}

winston.info("doDelete=" + doDelete);
winston.info("pattern=" + pattern);

let browserstackUser = process.env.BROWSERSTACK_USERNAME;
let browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY;
let auth = new Buffer(`${browserstackUser}:${browserstackKey}`).toString('base64');

let requestData = {
    url: "https://www.browserstack.com/automate/builds.json?limit=100000",
    timeout: 60000, //ms 60 seconds
    qs: {},
    headers: {
        'Authorization': `Basic ${auth}`
    }
};

// Make REST call into the Data Exchange service, and handle the result.
request.get(requestData, function (err, httpResponse, body) {
    if (err || httpResponse.statusCode !== 200) {
        let error = err || new Error(`Unexpected response (${httpResponse.statusCode}) from browserstack server`);
        winston.error(error);
    } else {
        let data = JSON.parse(body);

        let dataInScope = [];

        for (let build of data) {
            let include = pattern === null;

            if (pattern !== null) {
                include = build.automation_build.name.includes(pattern);
            }
            if (include) {
                dataInScope.push(build.automation_build.hashed_id);
            }
        }


        for (let id of dataInScope) {
            winston.info("Will delete build with id = " + id);

            if (doDelete) {
                let detleteRequestData = {
                    url: `https://www.browserstack.com/automate/builds/${id}.json`,
                    timeout: 60000, //ms 60 seconds
                    qs: {},
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                };

                request.delete(detleteRequestData, function (err, httpResponse, body) {
                    if (err || httpResponse.statusCode !== 200) {
                        let error = err || new Error(`Unexpected response (${httpResponse.statusCode}) from browserstack server`);
                        winston.error(error);
                    } else {
                        winston.info("Actually deleted " + id);
                    }
                });
            }
        }
    }
});

