import { utilService } from '../../../services/util.service.js';
import { noteService } from "../services/note.service.js"

export default {
    template: `
        <section class="note-add">
            <input v-model="note.info.title" placeholder="Title" />
            <input v-model="content" :placeholder="inputPlacehoder" @keydown.enter="addNote" />
            <section class="button-container">
                <button @click="changeType('noteTxt')"><i class="fas fa-font"></i></button>
                <button @click="changeType('noteImg')"><i class="far fa-image"></i></button>
                <button @click="changeType('noteVideo')"><i class="fab fa-youtube"></i></button>
                <button @click="changeType('noteTodos')"><i class="fas fa-list"></i></button>
            </section>
        </section>
    `,
    data() {
        return {
            note: null,
            content: '',
            isActive: false
        }
    },
    created() {
        this.note = noteService.getEmptyNote('noteTxt')
    },
    computed: {
        inputPlacehoder() {
            switch (this.note.type) {
                case 'noteTxt': return 'Take a note...';
                case 'noteImage': return 'Enter image url...';
                case 'noteVideo': return 'Enter Youtube video url...';
                case 'noteTodos': return 'Enter a comma separated todo list...';
            }
        }
    },
    methods: {
        changeType(type) {
            this.note = noteService.getEmptyNote(type)
        },
        addNote() {
            if (this.note.type === 'noteVideo') {
                const videoId = utilService.getYoutubeVideoId(this.content);
                this.note.info.url = (videoId) ? `https://www.youtube.com/embed/${videoId}` : '';
            } else if (this.note.type === 'noteImg') {
                this.note.info.url = this.content;
            } else if (this.note.type === 'noteTodos') {
                this.note.info.todos = this.content.split(',').map(todo => {
                    return {
                        txt: todo,
                        isDone: false
                    };
                });
            } else {
                this.note.info.txt = this.content;
            }
            this.content = '';
            noteService.addNote(JSON.parse(JSON.stringify(this.note)))
                .then(() => {
                    console.log('added note')
                });
            this.note = noteService.getEmptyNote('noteTxt');
        }
    }
}