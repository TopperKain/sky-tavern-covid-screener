const fetch = require("cross-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    let res = {
        contentId: 1,
        dayId: 1,
        goodToGo: true,
    }
    let url = process.env["ResponseLogicAppUrl"]
    let httpResult = await fetch(url, {
        "method": "POST",
        "body": JSON.stringify(res),
        // Adding headers to the request 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            text: httpResult.text
        }
    };
}