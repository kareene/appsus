import {noteService} from "../services/note.service.js"
import noteText from "../cmps/note-text.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodos from "../cmps/note-todos.cmp.js"
import noteAdd from "../cmps/note-add.cmp.js"

export default {
    template: `
        <section>
            <h2>MISS KEEP</h2>
            <note-add></note-add>
            <ul v-if="notes" class="note-list clean-list">
                <li v-for="note in notes">
                    <component :is="note.type" :info="note.info"></component>
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
    components: {
        noteText,
        noteImg,
        noteVideo,
        noteTodos,
        noteAdd
    }
};