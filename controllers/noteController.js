import Note from '../models/Note.js';

// Display all notes for the logged-in user
export const getNotes = async (req, res) => {
  const notes = await Note.find({ author: req.user._id }).sort({ createdAt: 'desc' });
  res.render('notes', { title: 'My Notes', notes });
};

// Display form to create a new note
export const addNote = (req, res) => {
  res.render('editNote', { title: 'Add Note', note: null });
};

// Create a new note
export const createNote = async (req, res) => {
  req.body.author = req.user._id;
  const note = new Note(req.body);
  await note.save();
  req.flash('success', 'Note saved successfully!');
  res.redirect('/notes');
};

// Display form to edit a note
export const editNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, author: req.user._id });
  if (!note) {
    req.flash('error', 'Note not found!');
    return res.redirect('/notes');
  }
  res.render('editNote', { title: 'Edit Note', note });
};

// Update a note
export const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!note) {
    req.flash('error', 'Note not found!');
    return res.redirect('/notes');
  }
  req.flash('success', 'Note updated successfully!');
  res.redirect('/notes');
};

// Delete a note
export const deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, author: req.user._id });
  if (!note) {
    req.flash('error', 'Note not found!');
    return res.redirect('/notes');
  }
  req.flash('success', 'Note deleted successfully!');
  res.redirect('/notes');
}; 