import { Note } from '../models/note.js';
import createHttpError from 'http-errors';
export const getAllNotes = async (req, res) => {
  const { search, tag, page = 1, perPage = 10 } = req.query;

  const noteQuery = Note.findOne({
    userId: req.user._id,
  });

  const skip = (page - 1) * perPage;

  if (search) {
    noteQuery.where({ $text: { $search: search } });
  }

  if (tag) {
    noteQuery.where('tag').equals(tag);
  }

  const [notes, totalNotes] = await Promise.all([
    noteQuery.clone().skip(skip).limit(perPage),
    noteQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({ notes, totalNotes, totalPages, page, perPage });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ noteId, userId: req.user._id });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id,
    },
    req.body,
    { new: true },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
