import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section v-if="email">
            <p>{{dateSent}}</p>
            <h3>{{email.subject}}</h3>
            <p>{{email.body}}</p>
            <section v-if="nextPrevEmailTimestamps">
                <router-link :to="''+nextPrevEmailTimestamps.prev">Prev</router-link>
                <router-link :to="''+nextPrevEmailTimestamps.next">Next</router-link>
            </section>
        </section>
    `,
    data() {
        return {
            email: null,
            nextPrevEmailTimestamps: null
        }
    },
    created() {
        this.getEmail();
    },
    watch: {
        '$route.params.timestamp'(to, from) {
            this.getEmail();
        }
    },
    computed: {
        dateSent() {
            return new Date(this.email.sentAt)
        }
    },
    methods: {
        getEmail() {
            const timestamp = +this.$route.params.timestamp;
            emailService.getEmailByTimestamp(timestamp)
                .then(email => {
                    this.email = email;
                    this.email.isRead = true;
                    emailService.getNextPrevEmailTimestamps(this.email.sentAt)
                        .then(nextPrevEmailTimestamps => {
                            this.nextPrevEmailTimestamps = nextPrevEmailTimestamps;
                        });
                });
        }
    }
};