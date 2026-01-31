import { model, Schema } from "mongoose";

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
    default: "",
  },
  tag: {
    type: String,
    enum: [
      "Work",
      "Personal",
      "Meeting",
      "Shopping",
      "Ideas",
      "Travel",
      "Finance",
      "Health",
      "Important",
      "Todo",
    ],
    default: "Todo"
  },
}, {timestamps: true, versionKey: false});

NoteSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'StudentTextIndex',
    weights: { name: 10 },
    default_language: 'english',
  },
);

export const Note = model("Note", NoteSchema);
