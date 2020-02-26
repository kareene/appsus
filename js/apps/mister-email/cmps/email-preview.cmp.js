export default {
    template: `
    <li class = "email-preview "   @click= "toggleExpended">
        <section class = "preview-header flex space-between">
            <h3>{{email.subject}}</h3>
            <p>{{formattedBodyShort}}</p>
            <p>{{formattedTime}}</p>
        </section>
        <section class = "expended" v-if = "isExpended">
            <router-link :to="'/email/'+email.sentAt" > 
                <button>Details</button>
            </router-link>   
            <button>Remove</button>
            <h3>{{email.subject}}</h3>
            <p>{{formattedBodyLong}}</p> 


        </section>
    </li>`,
    
    props: ['email'],

    data(){
        return {
            isExpended : false
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
        }
    },
    methods: {
        toggleExpended(){
            console.log("toggle expended")
            this.isExpended = !this.isExpended;
        }

    }
    
    
};