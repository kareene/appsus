export default {
    template: `
        <nav class="navbar flex">
            <router-link to="/" exact> Home </router-link>
            
            <router-link to="/book" > Miss Books </router-link>
            
            <router-link to="/email" > Mister Email </router-link>
            
            <router-link to="/keep" > Miss Keep </router-link>
            
            <router-link to="/about"> About </router-link>
        </nav>
    `,
    methods: {
        toggleMenu(){
            
        }
    }
};