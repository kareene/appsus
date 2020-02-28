export default {
    template: `
        <article>
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