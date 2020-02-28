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
            <ul v-if="notes" class="note-list clean-list">
                <li v-for="note in notes" class="note-item">
                    <button @click="deleteNote(note.id)">&times;</button>
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
    methods: {
        deleteNote(noteId) {
            console.log(noteId)
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