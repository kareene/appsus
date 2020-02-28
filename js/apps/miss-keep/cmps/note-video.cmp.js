export default {
    template: `
        <article class="note-video">
            <h3>{{info.title}}</h3>
            <div v-if="videoUrl" class="video-container">
                <iframe :src="videoUrl" frameborder="0" allowfullscreen></iframe>
            </div>
            <p v-else>Sorry, something went wrong while loding the video.</p>
        </article>
    `,
    props: ['info'],
    data() {
        return {
            videoUrl: ''
        }
    },
    created() {
        const videoId = this.getYoutubeVideoId(this.info.url);
        this.videoUrl = (videoId) ? `https://www.youtube.com/embed/${videoId}` : '';
    },
    methods: {
        getYoutubeVideoId(url) {
            console.log(url)
            // RegEx by Stephan Schmitz <eyecatchup@gmail.com>
            // https://stackoverflow.com/a/10315969/624466
            const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            return url.match(youtubeRegex)[1];
        }
    }
}