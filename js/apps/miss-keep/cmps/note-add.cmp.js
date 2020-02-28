export default {
    template: `
        <section class="note-add">
            <input v-model="info" :placeholder="inputPlacehoder" @keydown.enter="addNote" />
            <section class="button-container">
                <button @click="changeType('txt')"><i class="fas fa-font"></i></button>
                <button @click="changeType('image')"><i class="far fa-image"></i></button>
                <button @click="changeType('video')"><i class="fab fa-youtube"></i></button>
                <button @click="changeType('todos')"><i class="fas fa-list"></i></button>
            </section>
        </section>
    `,
    data() {
        return {
            type: 'txt',
            info: ''
        }
    },
    computed: {
        inputPlacehoder() {
            switch (this.type) {
                case 'txt' : return 'Take a note...';
                case 'image' : return 'Enter image url...';
                case 'video' : return 'Enter Youtube video url...';
                case 'todos' : return 'Enter a comma separated todo list...';
            }
        }
    },
    methods: {
        changeType(type) {
            this.type = type;
        },
        addNote() {
            console.log(this.type, this.info)
        }
    }
}