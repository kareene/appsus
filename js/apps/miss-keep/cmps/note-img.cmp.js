export default {
    template: `
        <article class = "note-item">
            <img :src="info.url" :title="info.title" />
        </article>
    `,
    props: ['info'],
    data() {
        return {
            txt: ''
        }
    }
}