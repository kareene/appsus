import emailFilter from '../cmps/email-filter.cmp.js'


export default {
    template: `
        <section class = "mister-email flex flex">
            <nav class = "nav-container flex align-center direction-column">
                <button class = "compose">Compose</button>
                <email-filter></email-filter>
                
            </nav>
            <router-view></router-view>
        </section>
    `,
    components: {
        emailFilter
    }

};