import {noteService} from "../services/note.service.js"
import noteTxt from "../cmps/note-txt.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodos from "../cmps/note-todos.cmp.js"
import noteAdd from "../cmps/note-add.cmp.js"

export default {
    template: `
        <section class="miss-keep-container">
            <h2>MISS KEEP</h2>
            <note-add></note-add>
            <div v-if="pinnedNotes.length" class="list-lable">Pinned</div>
            <ul v-if="pinnedNotes.length" class="note-list clean-list">
                <li v-for="note in pinnedNotes" class="note-item" 
                :class="{ marked: note.isMarked, pinned: note.isPinned }">
                    <button class="mark-note-btn" @click="noteToggler('pin', note.id)">pin</button>
                    <button class="mark-note-btn" @click="noteToggler('mark', note.id)">mark</button>
                    <button class="delete-note-btn" @click="deleteNote(note.id)">&times;</button>
                    <component :is="note.type" :info="note.info" @save="saveNote(note)"></component>
                </li>
            </ul>
            <div v-if="pinnedNotes.length && unPinnedNotes.length" class="list-lable">Others</div>
            <ul v-if="unPinnedNotes.length" class="note-list clean-list">
                <li v-for="note in unPinnedNotes" class="note-item" 
                :class="{ marked: note.isMarked, pinned: note.isPinned }">
                    <button class="mark-note-btn" @click="noteToggler('pin', note.id)">pin</button>
                    <button class="mark-note-btn" @click="noteToggler('mark', note.id)">mark</button>
                    <button class="delete-note-btn" @click="deleteNote(note.id)">&times;</button>
                    <component :is="note.type" :info="note.info" @save="saveNote(note)"></component>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.getNotesForDisplay()
            .then(notes => {
                this.notes = notes;
            });
    },
    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned);
        },
        unPinnedNotes() {
            return this.notes.filter(note => !note.isPinned);
        }
    },
    methods: {
        deleteNote(noteId) {
            noteService.deleteNote(noteId)
                .then(() => {
                    console.log('note deleted')
                })
        },
        saveNote(note) {
            noteService.updateNote(note)
                .then(() => {
                    console.log('note saved')
                })
        },
        noteToggler(target, noteId) {
            noteService.noteToggler(target, noteId)
                .then(() => {
                    console.log('toggle', target);
                })
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
        noteAdd
    }
};
