import { utilService } from '../../../services/util.service.js';
import { noteService } from "../services/note.service.js"

export default {
    template: `
        <section class="note-add flex align-center">
            <input v-model="note.info.title" placeholder="Title" />
            <input v-model="content" :placeholder="note.info.placeholder" @keydown.enter="addNote" />
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
            content: ''
        }
    },
    created() {
        this.note = noteService.getEmptyNote('noteTxt')
    },
    methods: {
        changeType(type) {
            this.note = noteService.getEmptyNote(type)
        },
        addNote() {
            switch (this.note.type) {
                case 'noteTxt':
                    this.note.info.txt = this.content;
                    break;
                case 'noteImg':
                    this.note.info.url = this.content;
                    break;
                case 'noteVideo':
                    const videoId = utilService.getYoutubeVideoId(this.content);
                    this.note.info.url = (videoId) ? `https://www.youtube.com/embed/${videoId}` : '';
                    break;
                case 'noteTodos':
                    this.note.info.todos = this.content.split(',').filter(todo => todo).map(todo => {
                        return {
                            txt: todo,
                            isDone: false
                        };
                    });
            }
            this.content = '';
            noteService.addNote(this.note)
                .then(() => {
                    console.log('added note')
                });
            this.note = noteService.getEmptyNote('noteTxt');
        }
    }
}