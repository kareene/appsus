import emailFilter from '../cmps/email-filter.cmp.js'
import { emailService } from '../services/email.service.js'

export default {
    template: `
    <section>
        <section class = "mister-email flex space-between">
            <nav class = "nav-container flex direction-column">
                <email-filter></email-filter>
                <router-link to = "email/compose"><button class = "compose"><i class="fas fa-plus"></i> Compose</button></router-link>


            </nav>
            <router-view></router-view>

        </section>

    </section>    
    `,
    
    components: {
        emailFilter
    },
    
   

};