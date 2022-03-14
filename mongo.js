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

const noteSchema = new mongoose.Schema({
  content: { type: String, minlength: 5, required: true },
  date: { type: Date, required: true },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
