import { utilService } from '../../../services/util.service.js';

const NOTE_KEY = 'notes';
const notesDB = _createNotes();

export const noteService = {
    getNotesForDisplay,
    getNoteById,
    getEmptyNote,
    addNote,
    updateNote,
    deleteNote,
    noteToggler
}

function getNotesForDisplay() {
    return Promise.resolve(notesDB);
}

function getNoteById(noteId) {
    const note = notesDB.find(note => note.id == noteId);
    if (!note) return Promise.reject('Something bad happened');
    return Promise.resolve(note);
}

function getEmptyNote(type) {
    var info = { title: '' }
    if (type === 'noteImg' || type === 'noteVideo') info.url = '';
    else if (type === 'noteTodos') info.todos = [];
    else info.txt = '';
    return {
        id: utilService.makeId(13),
        type: type,
        info: info,
        isPinned: false,
        isMarked: false,
        color: '#fff'
    }
}

function addNote(note) {
    notesDB.unshift(note);
    utilService.saveToStorage(NOTE_KEY, notesDB);
    return Promise.resolve();
}

function updateNote(noteToSave) {
    var idx = notesDB.findIndex(note => note.id === noteToSave.id);
    if (idx === -1) return Promise.reject('Something bad happened');
    notesDB.splice(idx, 1, noteToSave);
    utilService.saveToStorage(NOTE_KEY, notesDB);
    return Promise.resolve();
}

function deleteNote(noteId) {
    var idx = notesDB.findIndex(note => note.id === noteId);
    if (idx !== -1) {
        notesDB.splice(idx, 1);
        utilService.saveToStorage(NOTE_KEY, notesDB);
    }
    return Promise.resolve();
}

function noteToggler(target, noteId) {
    var note = notesDB.find(note => note.id === noteId);
    if (!note) return Promise.reject('Something bad happened');
    if (target === 'mark') note.isMarked = !note.isMarked;
    else note.isPinned = !note.isPinned;
    utilService.saveToStorage(NOTE_KEY, notesDB);
    return Promise.resolve();
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes) {
        var notes = [
            {
                id: 'sarhdfhd',
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: 'Fullstack Me Baby!',
                    txt: 'Fullstack Me Baby!\nFullstack Me Baby!\nthis is a story about a girl, her dog and the end of the world\nFullstack! Fullstack! Fullstack! Fullstack! Fullstack!'
                }
            },
            {
                id: 'akfjghdfguh',
                type: 'noteImg',
                isPinned: false,
                info: {
                    title: 'Fullstack Me Baby!',
                    url: 'img/success.png'
                }
            },
            {
                id: 'dddddddddd',
                type: 'noteTodos',
                isPinned: false,
                info: {
                    title: 'Do all the things',
                    todos: [{ txt: 'do this', isDone: false },
                    { txt: 'do that', isDone: true },
                    { txt: 'do some more', isDone: false },
                    { txt: 'do it all', isDone: false }]
                }
            }
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes;
}