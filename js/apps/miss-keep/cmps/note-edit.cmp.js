import { utilService } from '../../../services/util.service.js';
import { noteService } from "../services/note.service.js"

export default {
    template: `
        <section class="note-edit">
            <input v-model="title" placeholder="Title" />
            <input v-model="content" :placeholder="note.info.placeholder" @keydown.enter="updateNote" />
            <div class="edit-btn-container flex space-between">
                <button class="cancel-btn" @click="finishEdit" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
                <button class="update-btn" @click="updateNote" title="Update Note">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        </section>
    `,
    props: ['note'],
    data() {
        return {
            title: '',
            content: ''
        }
    },
    created() {
        this.title = this.note.info.title;
        switch (this.note.type) {
            case 'noteTxt':
                this.content = this.note.info.txt;
                break;
            case 'noteImg':
            case 'noteVideo':
                this.content = this.note.info.url;
                break;
            case 'noteTodos':
                this.content = this.note.info.todos.map(todo => todo.txt).join(',');
        }
    },
    methods: {
        updateNote() {
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
            this.note.info.title = this.title;
            noteService.updateNote(this.note)
                .then(() => {
                    console.log('updated note');
                });
            this.finishEdit();
        },
        finishEdit() {
            this.$emit('edit-finished');
        }
    }
}