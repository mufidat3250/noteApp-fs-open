require("dotenv").config();
const express = require("express");
const cor = require("cors");

const app = express();
app.use(cor());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];
const idGen = () => {
  const maxid =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxid + 1;
};

///middleWares
const requestLogger = (request, responce, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("body", request.body);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown end point" });
};

app.use(requestLogger);
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  let id = +request.params.id;
  const note = notes.find((note) => +note.id == id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(404).json({ error: "content missing" });
  }
  const newNote = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: idGen(),
  };

  notes = notes.concat(newNote);
  res.json(newNote);
});

app.delete("/api/notes/:id", (request, responce) => {
  let id = +request.params.id;
  const note = notes.filter((note) => note.id !== id);
  responce.json(note);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT | 3003;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
