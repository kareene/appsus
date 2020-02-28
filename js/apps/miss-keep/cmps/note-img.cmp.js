export default {
    template: `
        <article class = "note-item">
            <img :src="info.url" :title="info.title" />
            <p>{{info.lable}}</p>
        </article>
    `,
    props: ['info'],
    data() {
        return {
            txt: ''
        }
    }
}