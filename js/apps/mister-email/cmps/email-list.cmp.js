import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js'


{/* <router-link :to="'/email/'+email.sentAt" v-for="email in emails" :key="email.sentAt" >  */}

export default {
    template: `
        <section class ="email-list">
            <ul class = "clean-list">
                <email-preview :email="email"  v-for="email in emails" :key="email.sentAt" @delete= "deleteMail"></email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: []
        }
    },
    
    methods:{
        deleteMail(sentAt){
            emailService.deleteMail(sentAt);
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