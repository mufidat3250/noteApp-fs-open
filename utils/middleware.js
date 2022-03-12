const requestLogger = (request, responce, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("body", request.body);

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown end point" });
};
