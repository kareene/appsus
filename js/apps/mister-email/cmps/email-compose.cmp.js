import { emailService } from "../services/email.service.js";
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section v-if="email" class="email-compose">
            <header :class="headerClass">{{headerMsg}}</header>
            <section class="input-container">
                <input placeholder="To" />
                <input v-model="email.subject" placeholder="Subject" />
                <textarea v-model="email.body" placeholder="Compose email"></textarea>
            </section>
            <pre>{{email}}</pre>
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
            timeout: null
        }
    },
    created() {
        emailService.getEmptyEmail()
            .then(email => {
                this.email = email;
            });
    },
    destroyed() {
        if (this.isSaveDraft) {
            console.log(this.isSaveDraft)
            this.saveDraft()
                .then(msg => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: msg, type: 'success' });
                });
        }
    },
    compted: {
        headerClass() {
            return (this.isSaveDraft) ? 'draft' : '';
        },
        headerMsg() {
            return (this.isSaveDraft) ? 'Draft saved' : 'New Message';
        }
    },
    methods: {
        sendEmail() {
            this.isSaveDraft = false;
            emailService.sendEmail(this.email)
                .then(msg => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: msg, type: 'success' });
                    // this.router.push('email');
                });
        },
        deleteDraft() { 
            this.isSaveDraft = false;
            // this.router.push('email');
        },
        saveDraft() {
            emailService.saveEmailDraft(this.email)
                .then(msg => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: msg, type: 'success' });
                });
        }
    }
};