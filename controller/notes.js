const noteRouter = require("express").Router();
const Note = require("../models/notes");

noteRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

noteRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id).then((note) => {
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  });
  next(error);

  //........bellow is the normal method without the database
  // let id = +request.params.id;
  // const note = notes.find((note) => +note.id == id);

  // if (note) {
  //   response.json(note);
  // } else {
  //   response.status(404).end();
  // }
});

noteRouter.post("/", (req, res, next) => {
  let { content, important } = req.body;
  // if (content === undefined) {
  //   return res.status(400).json({ error: "content missing" });
  // }

  const newNote = new Note({
    content: content,
    important: important | false,
    date: new Date(),
  });

  newNote
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

noteRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const note = {
    content: body.content,
    important: body.important | false,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

noteRouter.delete("/:id", async (request, responce, next) => {
  try {
    const deletedNote = await Note.findByIdAndRemove(request.params.id);
    responce.json(deletedNote);
  } catch (error) {
    console.log(error);
    next(error);
  }
  // let id = +request.params.id;
  // const note = notes.filter((note) => note.id !== id);
  // responce.json(note);
});

module.exports = noteRouter;
