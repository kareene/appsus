import { emailService } from "../services/email.service";
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';


export default {
    template: `
        <section v-if="email" class="email-compose">
            <header>New Message</header>
            <section class="input-container">
                <input placeholder="To" />
                <input placeholder="Subject" />
                <textarea placeholder="Compose email"></textarea>
            </section>
            <section class="button-container flex align-center space-between">
                <button @click="sendEmail" class="send-btn" title="Send email">Send</button>
                <button @click="deleteDraft" class="delete-btn" title="Discard draft">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </section>
        </section>
    `,
    data() {
        return {
            email: null,
            isDeleteDraft: false
        }
    },
    created() {
        emailService.getEmptyEmail()
            .then(email => {
                this.email = email;
            });
    },
    destroyed() {
        if (!isDeleteDraft) {
            saveDraft()
                .then(msg => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: msg, type: 'success' });
                });
        }
    },
    methods: {
        sendEmail() { },
        deleteDraft() { 
            this.isDeleteDraft = true;
        },
        saveDraft() { }
    }
};