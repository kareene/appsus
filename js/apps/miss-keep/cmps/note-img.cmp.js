export default {
    template: `
        <article>
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