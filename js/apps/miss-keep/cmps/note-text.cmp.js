export default {
    template: `
        <article>
            <textarea v-model="txt" placeholder="What's on your mind..."></textarea>
        </article>
    `,
    props: ['info'],
    data() {
        return {
            txt: ''
        }
    }
}