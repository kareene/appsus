import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'emails';
const emailsDB = _createEmails();

export const emailService = {
    getEmailsForDisplay,
    getEmailByTimestamp,
    getNextPrevEmailTimestamps
}

function getEmailsForDisplay() {
    return Promise.resolve(emailsDB);
}

function getEmailByTimestamp(timestamp) {
    return Promise.resolve(emailsDB.find(email => email.sentAt === timestamp));
}

function getNextPrevEmailTimestamps(timestamp) {
    const idx = emailsDB.findIndex(email => email.id === timestamp)
      var nextIdx = idx + 1;
      if (nextIdx === emails.length) nextIdx = 0;
      var prevIdx = idx - 1;
      if (prevIdx < 0) prevIdx = emails.length - 1;
      return {
        prevTimestamp: emails[prevIdx].sentAt,
        nextTimestamp: emails[nextIdx].sentAt
      }
}

function _createEmails() {
    var emails = utilService.loadFromStorage(EMAIL_KEY);
    if (!emails) {
        emails = [];
        for (let i = 0; i < 10; i++) {
            emails.push(_createEmail(utilService.makeLorem(7), utilService.makeLorem(50), Date.now() + i))
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