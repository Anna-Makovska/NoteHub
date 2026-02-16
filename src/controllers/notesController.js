import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { search, tag } = req.query;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;

  const filter = { userId: req.user._id };

  if (search) {
    filter.$text = { $search: search };
  }

  if (tag) {
    filter.tag = tag;
  }

  const skip = (page - 1) * perPage;

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(perPage),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({ notes, totalNotes, totalPages, page, perPage });
};


export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    $or: [{ userId: req.user._id }, { isPublic: true }],
  });

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
