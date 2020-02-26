import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'emails';
const emailsDB = _createEmails();

export const emailService = {
    getEmailsForDisplay,
    getEmailByTimestamp,
    getNextPrevEmailTimestamps,
    deleteMail
}

function getEmailsForDisplay() {
    return Promise.resolve(emailsDB);
}

function getEmailByTimestamp(timestamp) {
    return Promise.resolve(emailsDB.find(email => email.sentAt == timestamp));
}

function getNextPrevEmailTimestamps(timestamp) {
    const idx = emailsDB.findIndex(email => email.sentAt === timestamp)
    var nextIdx = idx + 1;
    if (nextIdx === emailsDB.length) nextIdx = 0;
    var prevIdx = idx - 1;
    if (prevIdx < 0) prevIdx = emailsDB.length - 1;
    return  Promise.resolve({
        prev: emailsDB[prevIdx].sentAt,
        next: emailsDB[nextIdx].sentAt
    });
}


function deleteMail(sentAt){
    var idx = emailsDB.find( email => email.sentAt === sentAt);
    emailsDB.splice(idx,1);
    utilService.saveToStorage(EMAIL_KEY, emailsDB);

}



function _createEmails() {
    var emails = utilService.loadFromStorage(EMAIL_KEY);
    if (!emails) {
        emails = [];
        for (let i = 0; i < 10; i++) {
            emails.push(_createEmail(utilService.makeLorem(7), utilService.makeLorem(200), Date.now() + i))
        }
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails;
}

function _createEmail(subject, body, sentAt = Date.now()) {
    return {
        subject: subject,
        body: body,
        isRead: false,
        sentAt: sentAt
    }
}