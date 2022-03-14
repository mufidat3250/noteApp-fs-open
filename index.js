const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cor = require("cors");
const Note = require("./mongo");

const app = express();
app.use(cor());
app.use(express.json());

const url = process.env.MONGO_DB_URL;

mongoose
  .connect(url)
  .then((result) => console.log("connected"))
  .catch((error) => console.log("not connected", error.message));

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

// const Note = mongoose.model("Note", noteSchema);
// console.log(Note);

noteSchema.set("toJSON", {
  tranform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

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
app.use(express.static("build"));
app.get("/api/notes", async (request, response) => {
  Note.find({}).then((note) => response.json(note));
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
  let { content, important } = req.body;
  if (!content) {
    res.status(404).json({ error: "content missing" });
  }
  const newNote = {
    content: content,
    important: important | false,
    date: new Date(),
  };

  newNote.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.delete("/api/notes/:id", (request, responce) => {
  let id = +request.params.id;
  const note = notes.filter((note) => note.id !== id);
  responce.json(note);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT | 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
