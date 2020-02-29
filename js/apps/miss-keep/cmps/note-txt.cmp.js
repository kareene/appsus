export default {
    template: `
        <article class="note-txt">
            <p class="title">{{info.title}}</p>
            <p class="">{{info.txt}}</p>
        </article>
    `,
    props: ['info']
}