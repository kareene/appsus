import { utilService } from '../../../services/util.service.js';

const NOTE_KEY = 'notes';
const notesDB = _createNotes();

export const noteService = {
    getNotesForDisplay,
    getNoteById,
    createNote,
    editNote,
    deleteNote
}

function getNotesForDisplay() {
    return Promise.resolve(notesDB);
}

function getNoteById(noteId) {
    const note = notesDB.find(note => note.id == noteId);
    if (!note) return Promise.reject('Something bad happened');
    return Promise.resolve(note);
}

function createNote(type, info, color = 'white', isPinned = false, isMarked = false) {
    var note = {
        id: utilService.makeId(13),
        type,
        info,
        color,
        isPinned,
        isMarked
    }
    notesDB.unshift(note);
    utilService.saveToStorage(NOTE_KEY, notes);
    return Promise.resolve();
}

function editNote(noteToSave) {
    var idx = notesDB.findIndex(note => note.id === noteToSave.id);
    if (idx === -1) return Promise.reject('Something bad happened');
    notesDB.splice(idx, 1, noteToSave);
    utilService.saveToStorage(NOTE_KEY, notesDB);
    return Promise.resolve();
}

function deleteNote(noteID) {
    var idx = notesDB.findIndex(note => note.id === noteId);
    if (idx !== -1) {
        notesDB.splice(idx, 1);
        utilService.saveToStorage(NOTE_KEY, notesDB);
    }
    return Promise.resolve();
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes) {
        var notes = [
            {
                id: "sarhdfhd",
                type: "noteText",
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "akfjghdfguh",
                type: "noteImg",
                isPinned: false,
                info: {
                    title: "Fullstack Me Baby!",
                    url: "img/success.png"
                }
            },
            {
                id: "jkagsfbcxb",
                type: "noteVideo",
                isPinned: false,
                info: {
                    title: "The unofficial A-Z of Shetland",
                    url: "https://www.youtube.com/watch?v=Su5weSQH1DY"
                }
            },
            {
                id: "jkagsfbcxb",
                type: "noteVideo",
                isPinned: false,
                info: {
                    title: "The Future of Shetland's Textiles",
                    url: "https://youtu.be/rFv0bkobBek"
                }
            }
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes;
}