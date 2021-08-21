const { findWorkerForCustomer, getCustomerByNumber, findRandomWorker } = require('../../providers/customers');
const twilioClient = require('../../providers/twilio');

const routingCallbackHandler = async (req, res) => {
    console.log("ROUTING");
    res.locals.log("Frontline Routing Callback");
    res.locals.log(JSON.stringify(req.body));

    const conversationSid = req.body.ConversationSid;
    const customerNumber = req.body['MessagingBinding.Address'];

    await routeConversation(conversationSid, customerNumber);
    res.sendStatus(200);
};

const routeConversation = async (conversationSid, customerNumber) => {
    let workerIdentity = await findWorkerForCustomer(customerNumber);

    if (!workerIdentity) { // Customer doesn't have a worker

        // Select a random worker
        // workerIdentity = await findRandomWorker();

        // Or you can define default worker for unknown customers.
        // If there is no default mapping for inbound sms, assign to this person:
        workerIdentity = 'fred.chaffee@me.com';

        if (!workerIdentity) {
            console.warn("Routing failed, please add workers to customersToWorkersMap or define a default worker", { conversationSid: conversationSid });
            return;
        }
    }
    await routeConversationToWorker(conversationSid, workerIdentity);
}

const routeConversationToWorker = async (conversationSid, workerIdentity) => {
    // Add worker to the conversation with a customer
    twilioClient.conversations
        .conversations(conversationSid)
        .participants
        .create({ identity: workerIdentity })
        .then(participant => console.log('CREATE AGENT PARTICIPANT: ', participant.sid))
        .catch(e => console.log('Create agent participant: ', e));
}

module.exports = routingCallbackHandler;
