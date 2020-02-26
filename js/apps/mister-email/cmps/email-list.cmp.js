import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js'

export default {
    template: `
        <section>
            <h3>Email - List</h3>
            <ul>
                <router-link :to="'/email/'+email.sentAt" v-for="email in emails"> 
                    <email-preview :email="email"></car-preview>
                
                </router-link>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: []
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