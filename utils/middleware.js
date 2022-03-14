const requestLogger = (request, responce, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("body", request.body);

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown end point" });
};
const errorhandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandler,
};
