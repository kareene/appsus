import { emailService } from '../services/email.service.js';
import { eventBus, EVENT_SHOW_MSG ,EVENT_SET_FILTER} from '../../../services/event-bus.service.js';
import emailPreview from './email-preview.cmp.js'



{/* <router-link :to="'/email/'+email.id" v-for="email in emails" :key="email.id" >  */ }

export default {
    template: `
        <section class ="email-list">
            <ul class = "clean-list">
                <email-preview :email="email"  v-for="email in filteredEmails"
                 
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
            emails: [],
            filteredEmails : []
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

        markAsUnread(emailId){

            emailService.isReadToggle(emailId);
        },


        filterEmails(filterBy) {
            var emails = JSON.parse(JSON.stringify(this.emails))
            if (filterBy === 'all') this.filteredEmails =  emails;
            if (filterBy === 'sent'){
                this.filteredEmails = emails.filter( email => email.isSent)
            }
            if (filterBy === 'read'){
                this.filteredEmails = emails.filter( email => email.isRead )
            }
            if (filterBy === 'unread'){
                this.filteredEmails = emails.filter( email => !email.isRead )
            }

            if (filterBy === 'draft'){
                this.filteredEmails = emails.filter( email => !email.sentAt )
            }
            
            console.log("from filter emails", emails)
        }
    },

    created() {
        emailService.getEmailsForDisplay()
            .then(emails => {
                this.emails = emails;
                eventBus.$on(EVENT_SET_FILTER, (filterBy) => {
                    this.filterEmails(filterBy)
                })
                this.filteredEmails = emails;
            });
    },
    components: {
        emailPreview
    }
};