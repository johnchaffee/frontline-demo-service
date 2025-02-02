const { getCustomerById, getCustomersList } = require('../../providers/customers');

const crmCallbackHandler = async (req, res) => {
    const location = req.query.location;

    // Location helps to determine which information was requested.
    // CRM callback is a general purpose tool and might be used to fetch different kind of information
    const workerIdentity = req.tokenInfo.identity;
    if (workerIdentity !== req.body.Worker) {
        return res.status(401).send('Worker and token does not match');
    }

    switch (location) {
        case 'GetCustomerDetailsByCustomerId': {
            await handleGetCustomerDetailsByCustomerIdCallback(req, res);
            return;
        }
        case 'GetCustomersList': {
            await handleGetCustomersListCallback(req, res);
            return;
        }

        default: {
            console.log('Unknown location: ', location);
            res.sendStatus(422);
        }
    }
};

const handleGetCustomerDetailsByCustomerIdCallback = async (req, res) => {
    const body = req.body;
    console.log('GETTING CUSTOMER DETAILS: ', body.CustomerId);

    const workerIdentity = req.tokenInfo.identity;
    const customerId = body.CustomerId;

    // Fetch Customer Details based on his ID
    // and information about a worker, that requested that information
    const customerDetails = await getCustomerById(customerId);
    console.log(JSON.stringify(customerDetails, undefined, 2));

    // Respond with Contact object
    res.send({
        objects: {
            customer: {
                customer_id: customerDetails.customer_id,
                display_name: customerDetails.display_name,
                channels: customerDetails.channels,
                links: customerDetails.links,
                avatar: customerDetails.avatar,
                details: customerDetails.details
            }
        }
    });
};

const handleGetCustomersListCallback = async (req, res) => {
    console.log('GETTING CUSTOMERS LIST');

    const body = req.body;
    const workerIdentity = req.tokenInfo.identity;
    const pageSize = body.PageSize;
    const anchor = body.Anchor;

    // Fetch Customers list based on information about a worker, that requested it
    const customersList = await getCustomersList(workerIdentity, pageSize, anchor);
    console.log(JSON.stringify(customersList, undefined, 2));

    // Respond with Customers object
    res.send({
        objects: {
            customers: customersList
        }
    });
};

module.exports = crmCallbackHandler;
