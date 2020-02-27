import { eventBus, EVENT_SET_FILTER } from '../../../services/event-bus.service.js';
export default {
    template: `
            <ul class = "nav-bar clean-list">
                <li>
                    <a @click = "emitFilter('all')">Inbox</a>
                </li>
                <li>
                    <a @click = "emitFilter('sent')">Sent</a>
                </li>
                <li>
                    <a @click = "emitFilter('read')">Read</a>
                </li>
                <li>
                    <a @click = "emitFilter('unread')">Unread</a>
                </li>
                <li>
                    <a @click = "emitFilter('Draft')">Draft</a>
                </li>
                <li>
                    <a @click = "emitFilter('Stared')">Stared</a>
                </li>
            </ul>`,
            
            // data(){
            //     return {
            //         filterBy = ''
            //     }
            // },

            methods: {
                emitFilter(filterBy){
                    eventBus.$emit(EVENT_SET_FILTER, filterBy);
                    console.log("emit-filter", filterBy);
                    // this.$emit('set-filter', filterBy)
                }
            }
    

};