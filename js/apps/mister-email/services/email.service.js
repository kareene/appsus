import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'emails';
const emailsDB = _createEmails();

export const emailService = {
    getEmailsForDisplay,
    getEmailById,
    getNextPrevEmailIds,
    deleteMail
}

function getEmailsForDisplay() {
    return Promise.resolve(emailsDB);
}

function getEmailById(emailId) {
    const email = emailsDB.find(email => email.id == emailId)
    if (!email) return Promise.reject('Email not found');
    return Promise.resolve(email);
}

function getNextPrevEmailIds(emailId) {
    const idx = emailsDB.findIndex(email => email.id === emailId)
    if (idx === -1) return Promise.reject('Email not found');
    var nextIdx = idx + 1;
    if (nextIdx === emailsDB.length) nextIdx = 0;
    var prevIdx = idx - 1;
    if (prevIdx < 0) prevIdx = emailsDB.length - 1;
    return  Promise.resolve({
        prevId: emailsDB[prevIdx].id,
        nextId: emailsDB[nextIdx].id
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

function _createEmail(subject = '', body = '', sentAt = Date.now()) {
    return {
        id: utilService.makeId(13),
        subject: subject,
        body: body,
        isRead: false,
        isStared: false,
        sentAt: sentAt
    }
}