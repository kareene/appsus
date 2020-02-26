import { emailService } from '../services/email.service.js';
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section v-if="email">
            <p>{{formattedTime}}</p>
            <h3>{{email.subject}}</h3>
            <p>{{email.body}}</p>
            <section v-if="nextPrevEmailIds">
                <router-link :to="nextPrevEmailIds.prevId">Prev</router-link>
                <router-link :to="nextPrevEmailIds.nextId">Next</router-link>
            </section>
        </section>
    `,
    data() {
        return {
            email: null,
            nextPrevEmailIds: null
        }
    },
    created() {
        this.getEmail();
    },
    watch: {
        '$route.params.id'(to, from) {
            this.getEmail();
        }
    },
    computed: {
        formattedTime() {
            return new Date(this.email.sentAt).toLocaleString();
        }
    },
    methods: {
        getEmail() {
            const id = this.$route.params.id;
            emailService.getEmailById(id)
                .then(email => {
                    this.email = email;
                    this.email.isRead = true;
                    emailService.getNextPrevEmailIds(this.email.id)
                        .then(nextPrevEmailIds => {
                            this.nextPrevEmailIds = nextPrevEmailIds;
                        })
                        .catch(err => {
                            eventBus.$emit(EVENT_SHOW_MSG, { txt: err, type: 'error' });
                        });
                })
                .catch(err => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: err, type: 'error' });
                });
        }
    }
};