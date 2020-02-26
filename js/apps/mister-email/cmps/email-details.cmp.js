export default {
    template: `
        <section>
            <h3>Detail</h3>
        </section>
    `,
    data() {
        return {
            email: null,
            nextPrevEmailTimestamps: null
        }
    },
    getEmail() {
        const timestamp = this.$route.params.timestamp;
        emailService.getEmailByTimestamp(timestamp)
            .then(email => {
                this.email = email;
                emailService.getNextPrevEmailTimestamps(timestamp)
                    .then(nextPrevEmailTimestamps => {
                        this.nextPrevEmailTimestamps = nextPrevEmailTimestamps;
                    });
            });
    }
};