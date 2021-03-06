const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);
server.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});

// const mongoose = require("mongoose");
// require("dotenv").config();
// const express = require("express");
// const cor = require("cors");
// const Note = require("./mongo");

// const app = express();
// app.use(cor());
// app.use(express.static("build"));
// app.use(express.json());

// const requestLogger = (request, responce, next) => {
//   console.log("Method", request.method);
//   console.log("Path", request.path);
//   console.log("body", request.body);
//   next();
// };

// app.use(requestLogger);

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2022-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2022-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2022-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];
// const idGen = () => {
//   const maxid =
//     notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
//   return maxid + 1;
// };

// ///middleWares

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown end point" });
// };

// app.get("/api/notes", (request, response) => {
//   Note.find({}).then((notes) => response.json(notes));
// });

// app.get("/api/notes/:id", (request, response, next) => {
//   Note.findById(request.params.id).then((note) => {
//     if (note) {
//       response.json(note);
//     } else {
//       response.status(404).end();
//     }
//   });
//   next(error);

//   //........bellow is the normal method without the database
//   // let id = +request.params.id;
//   // const note = notes.find((note) => +note.id == id);

//   // if (note) {
//   //   response.json(note);
//   // } else {
//   //   response.status(404).end();
//   // }
// });

// app.post("/api/notes", (req, res, next) => {
//   let { content, important } = req.body;
//   // if (content === undefined) {
//   //   return res.status(400).json({ error: "content missing" });
//   // }

//   const newNote = new Note({
//     content: content,
//     important: important | false,
//     date: new Date(),
//   });

//   newNote
//     .save()
//     .then((savedNote) => {
//       res.json(savedNote);
//     })
//     .catch((error) => next(error));
// });

// app.put("/api/notes/:id", (request, response, next) => {
//   const body = request.body;
//   const note = {
//     content: body.content,
//     important: body.important | false,
//   };

//   Note.findByIdAndUpdate(request.params.id, note, {
//     new: true,
//     runValidators: true,
//     context: "query",
//   })
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

// app.delete("/api/notes/:id", async (request, responce, next) => {
//   try {
//     const deletedNote = await Note.findByIdAndRemove(request.params.id);
//     responce.json(deletedNote);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
//   // let id = +request.params.id;
//   // const note = notes.filter((note) => note.id !== id);
//   // responce.json(note);
// });

// app.use(unknownEndpoint);

// const errorhandler = (error, request, responce, next) => {
//   if (error.name === "CastError") {
//     return responce.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return responce.status(400).send({ error: error.message });
//   }
// };

// app.use(errorhandler);
// const PORT = process.env.PORT | 3001;
// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });
