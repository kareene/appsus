export default {
    template: `
        <section class="email-compose">
            <header>New Message</header>
            <section class="input-container">
                <input placeholder="To" />
                <input placeholder="Subject" />
                <textarea placeholder="Compose email"></textarea>
            </section>
            <section class="button-container flex align-center space-between">
                <button @click="sendEmail" class="send-btn" title="Send email">Send</button>
                <button @click="deleteDraft" class="delete-btn" title="Discard draft">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </section>
        </section>
    `,
    methods: {
        sendEmail() {},
        deleteDraft() {}
    }
};