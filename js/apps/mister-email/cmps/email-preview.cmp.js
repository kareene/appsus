export default {
    template: `
    <li class = "email-preview flex space-between" :class="previewSize"  @click= "toggleExpended">
        <h3>{{email.subject}}</h3>
        <p>{{formattedBody}}</p>
        <p>{{formattedTime}}</p>
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
        formattedBody(){
            return this.email.body.substring(0,99) + '...';
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