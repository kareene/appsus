import {router} from './routes.js';
import navBar from './cmps/nav-bar.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

new Vue({
    el: '#appsus',
    router,
    template: `
    <section>
        <header class = "appsus-header flex space-between align-center">
            <h1>APPSUS</h1>
            <nav-bar></nav-bar>
        </header>
        <user-msg></user-msg>
        <router-view></router-view>
        </section>
    `,
    components: {
        navBar,
        userMsg
    }
});