import {router} from './routes.js';
import navBar from './cmps/nav-bar.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

new Vue({
    el: '#appsus',
    router,
    template: `
    <section>
        <h1>APPSUS</h1>
        <header>
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