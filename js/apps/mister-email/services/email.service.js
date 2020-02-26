import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'emails';
const emailsDB = createEmails();

export const emailService = {
    getEmailsForDisplay
}

function getEmailsForDisplay() {
    return Promise.resolve(emailsDB);
}

function createEmails() {
    var emails = utilService.loadFromStorage(EMAIL_KEY);
    if (!emails) {
        emails = [];
        for (let i = 0; i < 10; i++) {
            emails.push(createEmail(utilService.makeLorem(7), utilService.makeLorem(50), Date.now() + i))
        }
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails;
}

function createEmail(subject, body, sentAt = Date.now()) {
    return {
        subject: subject,
        body: body,
        isRead: false,
        sentAt: sentAt
    }
}