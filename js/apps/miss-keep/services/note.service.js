import { utilService } from '../../../services/util.service.js';

const NOTE_KEY = 'notes';
const notesDB = _createNotes();

export const noteService = {
    getNotesForDisplay,
    getNoteById,
    getEmptyNote,
    saveNotes,
    addNote,
    updateNote,
    deleteNote,
    changeNoteStyle
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
    switch (type) {
        case 'noteTxt':
            info.txt = '';
            info.placeholder = 'Take a note...';
            break;
        case 'noteImg':
            info.url = '';
            info.placeholder = 'Enter image url...';
            break;
        case 'noteVideo':
            info.url = '';
            info.placeholder = 'Enter Youtube video url...';
            break;
        case 'noteTodos':
            info.todos = [];
            info.placeholder = 'Enter a comma separated todo list...';
    }

    return {
        id: utilService.makeId(13),
        type: type,
        info: info,
        style: {
            isPinned: false,
            isMarked: false,
            color: '#fff'
        }
    }
}

function saveNotes() {
    utilService.saveToStorage(NOTE_KEY, notesDB);
    return Promise.resolve();
}

function addNote(note) {
    notesDB.unshift(note);
    saveNotes();
    return Promise.resolve();
}

function updateNote(noteToSave) {
    var idx = notesDB.findIndex(note => note.id === noteToSave.id);
    if (idx === -1) return Promise.reject('Something bad happened');
    notesDB.splice(idx, 1, noteToSave);
    saveNotes();
    return Promise.resolve();
}

function deleteNote(noteId) {
    var idx = notesDB.findIndex(note => note.id === noteId);
    if (idx !== -1) notesDB.splice(idx, 1);
    saveNotes();
    return Promise.resolve();
}

function changeNoteStyle(noteId, style, value) {
    var note = notesDB.find(note => note.id === noteId);
    if (!note) return Promise.reject('Something bad happened');

    switch (style) {
        case 'mark':
            note.style.isMarked = !note.style.isMarked;
            break;
        case 'pin':
            note.style.isPinned = !note.style.isPinned;
            break;
        case 'color':
            note.style.color = value;
    }

    saveNotes();
    return Promise.resolve();
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes) {
        var notes = [
            {
                id: 'sarhdfhd',
                type: 'noteTxt',
                info: {
                    title: 'Fullstack Me Baby!',
                    txt: 'Fullstack Me Baby!\nFullstack Me Baby!\nthis is a story about a girl, her dog and the end of the world\nFullstack! Fullstack! Fullstack! Fullstack! Fullstack!'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#fff'
                }
            },
            {
                id: 'akfjghdfguh',
                type: 'noteImg',
                info: {
                    title: 'Fullstack Me Baby!',
                    url: 'img/success.png'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#fff'
                }
            },
            {
                id: 'dddddddddd',
                type: 'noteTodos',
                info: {
                    title: 'Do all the things',
                    todos: [{ txt: 'do this', isDone: false },
                    { txt: 'do that', isDone: true },
                    { txt: 'do some more', isDone: false },
                    { txt: 'do it all', isDone: false }]
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#fff'
                }
            }
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes;
}