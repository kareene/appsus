export default {
    template: `
    <li class = "email-preview "   @click= "toggleExpended" :class = "readStatus">
        <section class = "preview-header flex space-between">
            <h3>{{email.subject}}</h3>
            <p>{{formattedBodyShort}}</p>
            <p>{{formattedTime}}</p>
        </section>
        <section class = "expended" v-if = "isExpended">
            <div class = "flex space-between">
                
                <h3>{{email.subject}}</h3>
                <div>
                <router-link :to="'/email/'+email.sentAt" > 
                    <button class="fas fa-expand"></button>
                </router-link>   
                <button @click.stop = "deleteClicked" class = "fas fa-trash-alt"></button>
                <button @click.stop = "toggleRead" :class = "toggleReadIcon"></button>
                </div>
                
            </div>
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
        toggleReadIcon(){
            return (this.email.isRead) ? 'fas fa-envelope-open' : 'fas fa-envelope';
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