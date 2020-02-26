export default {
    template: `
    <li class = "email-preview "   @click= "toggleExpended" :class = "readStatus">
        <section class = "preview-header flex space-between">
            <h3>{{email.subject}}</h3>
            <p>{{formattedBodyShort}}</p>
            <p>{{formattedTime}}</p>
        </section>
        <section class = "expended" v-if = "isExpended">
            <router-link :to="'/email/'+email.sentAt" > 
                <button>Details</button>
            </router-link>   
            <button @click = "deleteClicked">Remove</button>
            <button @click.stop = "toggleRead">{{toggleReadTxt}}</button>
            <h3>{{email.subject}}</h3>
            <p>{{formattedBodyLong}}</p> 


        </section>
    </li>`,
    
    props: ['email'],

    data(){
        return {
            isExpended : false,
            
        }
    },

    computed: {
        formattedTime(){
            var date = new Date(this.email.sentAt);
            return date.toLocaleString();
        },
        formattedBodyShort(){
            return this.email.body.substring(0,99) + '...';
        },
        formattedBodyLong(){
            return this.email.body.substring(0,300) + '...';
        },
        previewSize(){
            return (this.isExpended) ? 'expended' : 'small';
        },
        toggleReadTxt(){
            return (this.email.isRead) ? 'mark as unread' : 'mark as read';
        },
        readStatus(){
            return (this.email.isRead) ? 'read': '';
        }
    },
    methods: {
        toggleExpended(){
            console.log("toggle expended")
            if(!this.email.isRead) this.$emit('read', this.email.sentAt);
            this.isExpended = !this.isExpended;
        },

        toggleRead(){
            if(!this.email.isRead) this.$emit('read', this.email.sentAt);
            else this.$emit('unread', this.email.sentAt);

        },

        deleteClicked(){
            this.$emit('delete', this.email.sentAt);
        }

    }
    
    
};