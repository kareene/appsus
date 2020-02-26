// import { utilService } from '../../../services/util.service.js';

// const NOTE_KEY = 'notes';
// const notesDB = createNotes();

// export const noteService = {
//     getNotesForDisplay
// }

// function getNotesForDisplay() {
//     return Promise.resolve(notesDB);
// }

// function createNotes() {
//     var notes = utilService.loadFromStorage(NOTE_KEY);
//     if (!notes) {
//         notes = [];
//         for (let i = 0; i < 10; i++) {
//             notes.push(createNote(utilService.makeLorem(7), utilService.makeLorem(50), Date.now() + i))
//         }
//         utilService.saveToStorage(NOTE_KEY, notes)
//     }
//     return notes;
// }

// function createNote(subject, body, sentAt = Date.now()) {
//     return {
//         type: type,
//         isPinned: false,
//         info: info,
//         sentAt: sentAt
//     }
// }