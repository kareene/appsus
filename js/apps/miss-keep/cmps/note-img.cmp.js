export default {
    template: `
        <article class="note-img">
            <p class="title">{{info.title}}</p>
            <img :src="info.url" />
        </article>
    `,
    props: ['info']
}