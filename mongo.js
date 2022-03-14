const mongoose = require("mongoose");

require("dotenv").config();

if (process.argv.length < 3) {
  console.log(
    "pless provide the password as an argument : node mongo.js <password>"
  );
  process.exit(1);
}
const password = process.argv[2];
console.log(password);

const url = process.env.MONGO_DB_URL;

try {
  mongoose.connect(url).then(() => console.log("connected"));
} catch (error) {
  console.log("not connected");
}

const noteSchema = mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const newNote = new Note({
//   content: "give me money",
//   important: true,
// });

// Note.find({}).then((result) => {
//   result.forEach((note) => console.log(note));
// });

// Note.find({ important: true }).then((result) => {
//   result.forEach((note) => console.log(note));
// });

// newNote.save().then(() => {
//   console.log("note saved");
//   mongoose.connection.close();
// });
noteSchema.set("toJSON", {
  tranform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Note;
