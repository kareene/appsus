export default {
    template: `
        <article class="note-video">
            <h1>test</h1>
            <div class="video-container">
                <iframe
                    :src="https://www.youtube.com/embed/youtubeVideoId"
                    frameborder="0" allowfullscreen
                ></iframe>
            </div>
        </article>
    `,
    props: ['info'],
    computed: {
        youtubeVideoId() {
            const youtube_regex = /^.(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]).*/i;
            videoId = this.info.url.match(youtube_regex)[2];
            return (videoId && videoId.length === 11) ? videoId : '';
        }
    }
}

// aspect ratio:  width * (9/16, 56.25%)
// allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"