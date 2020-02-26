import { emailService } from '../services/email.service.js';

export default {
    template: `
        <section>
            <h3>List</h3>
            <pre>{{emails}}</pre>
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
    }
};