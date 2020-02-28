export default {
    template: `
        <article class = "note-item">
            <p>{{info.txt}}</p>
        </article>
    `,
    props: ['info'],
    // data() {
    //     return {
    //         txt: ''
    //     }
    // }
}