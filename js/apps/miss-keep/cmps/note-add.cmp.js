export default {
    template: `
        <section class="note-add">
            <input v-model="info" :placeholder="inputPlacehoder" @keydown.enter="addNote" />
            <section class="button-container">
                <button @click="changeType('txt')">text</button>
                <button @click="changeType('image')">image</button>
                <button @click="changeType('video')">video</button>
                <button @click="changeType('todos')">todos</button>
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
                case 'txt' : return 'text';
                case 'image' : return 'Enter image url';
                case 'video' : return 'Enter video url';
                case 'todos' : return 'Enter list of comma separated todos';
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