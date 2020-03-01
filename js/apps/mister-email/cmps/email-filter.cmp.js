import { eventBus, EVENT_SET_FILTER } from '../../../services/event-bus.service.js';
export default {
    // <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    template: `
            <ul class = "nav-bar clean-list">
                <li>
                    <router-link :to = "{path: '/email', query: {filterBy: 'all'}}"  ><i class="fas fa-inbox"></i><span> Inbox</span></router-link>
                </li>
                <li>
                <router-link :to = "{path: '/email', query: {filterBy: 'sent'}}"><i class="fas fa-paper-plane"></i><span> Sent</span></router-link>
                </li>
                <li>
                <router-link :to = "{path: '/email', query: {filterBy: 'read'}}"><i class="fas fa-envelope-open"></i><span> Read</span></router-link>
                </li>
                <li>
                <router-link :to = "{path: '/email', query: {filterBy: 'unread'}}"><i class="fas fa-envelope"></i><span> Unread</span></router-link>
                </li>
                <li>
                    <a @click = "emitFilter('Draft')"><i class="fas fa-sticky-note"></i><span> Draft</span></a>
                </li>
                <li>
                    <a @click = "emitFilter('Stared')"><i class="far fa-star"></i><span> Stared</span></a>
                </li>
            </ul>`,

            
            

            methods: {
                emitFilter(filterBy){
                    eventBus.$emit(EVENT_SET_FILTER, filterBy);
                    console.log("emit-filter", filterBy);
                    // this.$emit('set-filter', filterBy)
                },
                filterClicked(){
                    console.log("clicked filter");
                }
            },    

};