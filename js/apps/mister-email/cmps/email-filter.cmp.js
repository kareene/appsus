import { eventBus, EVENT_SET_FILTER } from '../../../services/event-bus.service.js';
export default {
    // <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    template: `
            <ul class = "nav-bar clean-list">
                <li>
                    <router-link :to = "{path: '/email', query: {filterBy: 'all'}}"  ><i class="fas fa-inbox"></i> Inbox</router-link>
                </li>
                <li>
                <router-link :to = "{path: '/email', query: {filterBy: 'sent'}}"><i class="fas fa-paper-plane"></i> Sent</router-link>
                </li>
                <li>
                <router-link :to = "{path: '/email', query: {filterBy: 'read'}}"><i class="fas fa-envelope-open"></i> Read</router-link>
                </li>
                <li>
                <router-link :to = "{path: '/email', query: {filterBy: 'unread'}}"><i class="fas fa-envelope"></i> Unread</router-link>
                </li>
                <li>
                    <a @click = "emitFilter('Draft')"><i class="fas fa-sticky-note"></i> Draft</a>
                </li>
                <li>
                    <a @click = "emitFilter('Stared')"><i class="far fa-star"></i> Stared</a>
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