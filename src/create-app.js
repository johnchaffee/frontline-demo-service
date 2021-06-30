const express = require("express");
const { v1: uuidv1 } = require("uuid");

module.exports = (config) => {
  const app = express();

  // *** BEGIN ZIPWHIP AND TWILIO WEBHOOK RESPONDER *** //
  // ZIPWHIP WEBHOOK
  // Reply with status 200
  app.post(/\/(receive|progress|send|stop)/, (req, res, next) => {
    console.log("ZIPWHIP WEBHOOK");
    res.sendStatus(200);
  });

  // TWILIO WEBHOOK
  // Reply with empty TWIML response
  app.post(/\/twilio/, (req, res, next) => {
    console.log("TWILIO WEBHOOK");
    res.send("<Response></Response>");
  });
  // *** END ZIPWHIP AND TWILIO WEBHOOK RESPONDER *** //

  const requestFilter = (req, res, next) => {
    res.locals.log = logWithRequestData(req.method, req.path, uuidv1());
    next();
  };

  const logWithRequestData =
    (method, path, id) =>
    (...message) => {
      console.log(`[${method}][${path}][${id}]`, ...message);
    };

  app.enable("trust proxy"); // for trusting heroku proxy
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(requestFilter);

  return app;
};
