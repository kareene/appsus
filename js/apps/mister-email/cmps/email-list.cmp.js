import { emailService } from '../services/email.service.js';
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';
import emailPreview from './email-preview.cmp.js'


{/* <router-link :to="'/email/'+email.id" v-for="email in emails" :key="email.id" >  */ }

export default {
    template: `
        <section class ="email-list">
            <ul class = "clean-list">
                <email-preview :email="email"  v-for="email in emails"
                 
                 :key="email.id" 
                 @read = "markAsRead" 
                 @unread = "markAsUnread"
                 @delete= "deleteEmail">
                 </email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: []
        }
    },

    methods: {
        deleteEmail(emailId) {
            emailService.deleteEmail(emailId)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: 'Email was deleted', type: 'success' });
                });
        },
        markAsRead(emailId) {
            console.log("on read")
            emailService.isReadToggle(emailId);
        },
        markAsUnread(emailId) {
            console.log("on unread");
            emailService.isReadToggle(emailId);
        }
    },

    created() {
        emailService.getEmailsForDisplay()
            .then(emails => {
                this.emails = emails;
            });
    },
    components: {
        emailPreview
    }
};