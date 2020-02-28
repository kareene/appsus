export default {
    template: `
        <article class="note-todos">
            <p v-if="info.title" class="title">{{info.title}}</p>
            <ul v-if="info.todos" class="clean-list">
                <li v-for="todo in info.todos">
                    <label :class="{ checked: todo.isDone }">
                        <input type="checkbox" v-model="todo.isDone" @change="saveNote">
                        {{todo.txt}}
                    </label>  
                </li>
            </ul>
        </article>
    `,
    props: ['info'],
    methods: {
        saveNote() {
            this.$emit('save');
        }
    }
}