// Map between customer address and worker identity
// Used to determine to which worker route a new conversation with a particular customer
//
// Example:
// {
//     customerAddress: workerIdentity
// }

// These are the default sms-to-worker mappings for new inbound conversations
const customersToWorkersMap = {
  "+12062842471": "jlarson@zipwhip.com",
  "+12062991349": "RMiller@zipwhip.com",
  "+12062991359": "MRosa@zipwhip.com",
  "+12062991395": "agupta@zipwhip.com",
  "+12063002992": "jwong@zipwhip.com",
  "+12063099553": "rgachet@zipwhip.com",
  "+12063099554": "acheslow@zipwhip.com",
  "+12063099565": "smehlhase@zipwhip.com",
  "+12063099567": "fbanna@zipwhip.com",
  "+12063099568": "amahajan@zipwhip.com",
  "+12063099569": "rsuzuki@zipwhip.com",
  "+12063219402": "tip@zipwhip.com",
  "+12063693826": "fred.chaffee@me.com",
  "+12063996576": "fred.chaffee@me.com",
  "+12064932020": "jkiga@zipwhip.com",
  "+12064932128": "jwong@zipwhip.com",
  "+12064996825": "jparrish@zipwhip.com",
  "+12065823733": "khoutchens@zipwhip.com",
  "+12065823748": "bbuchan@zipwhip.com",
  "+12065823770": "jlauer@zipwhip.com",
  "+12068001242": "bbremer@zipwhip.com",
  "+12068001254": "rangadi@zipwhip.com",
  "+12068061354": "bbremer@zipwhip.com",
  "+12068163571": "emartinez@zipwhip.com",
  "+12068163598": "fred.chaffee@me.com",
  "+12068163623": "tip@zipwhip.com",
  "+12068163671": "jparrish@zipwhip.com",
  "+12068163972": "srandolph@zipwhip.com",
  "+12068163991": "mamsberry@zipwhip.com",
  "+12068495332": "khoutchens@zipwhip.com",
  "+12392876019": "MRosa@zipwhip.com",
  "+12537404684": "jkiga@zipwhip.com",
  "+13125324371": "smehlhase@zipwhip.com",
  "+13134147502": "jlauer@zipwhip.com",
  "+14252699507": "mamsberry@zipwhip.com",
  "+14259222865": "acheslow@zipwhip.com",
  "+17042310736": "agupta@zipwhip.com",
  "+17209381640": "rangadi@zipwhip.com",
  "+17347180067": "jlarson@zipwhip.com",
  "+18312243884": "bbuchan@zipwhip.com",
  "+18329010083": "emartinez@zipwhip.com",
  "+15146545077": "pwheeler@zipwhip.com",
  "+12063838678": "mgomes@zipwhip",
  "+16048139264": "cmitchell@zipwhip.com,",
  "+15102197286": "abillings@zipwhip.com",
  "+12069485760": "sroben@zipwhip.com",
  "+12066013540": "Dwestra@zipwhip.com",
};

// Customers list
// Example:
// [
//   {
//      customer_id: 98,
//      display_name: 'Bobby Shaftoe',
//      channels: [
//          { type: 'email', value: 'bobby@example.com' },
//          { type: 'sms', value: '+123456789' },
//          { type: 'whatsapp', value: 'whatsapp:+123456789' }
//      ],
//      links: [
//          { type: 'Facebook', value: 'https://facebook.com', display_name: 'Social Media Profile' }
//      ],
//      details:{
//          title: "Information",
//          content: "Status: Active" + "\n\n" + "Score: 100"
//      },
//      worker: 'john@example.com'
//   }
// ]

// This is the list of contacts that shows up in the "My Customers" tab.
// The 'worker' propety identifies the default routing for new inbound conversations from that customer.
const customers = [
  {
    customer_id: "1021",
    display_name: "Aditi Gupta",
    worker: "agupta@zipwhip.com",
    channels: [
      { type: "sms", value: "+17042310736" },
      { type: "sms", value: "+12062991395" },
    ],
  },
  {
    customer_id: "1000",
    display_name: "Alan Cheslow",
    channels: [
      { type: "sms", value: "+14259222865" },
      { type: "sms", value: "+12063099554" },
    ],
    worker: "acheslow@zipwhip.com",
  },
  {
    customer_id: 1026,
    display_name: "Alison Billings",
    worker: "abillings@zipwhip.com",
    channels: [
      { type: "sms", value: "+15102197286" },
      { type: "sms", value: "+12065823708" },
    ],
  },
  {
    customer_id: "1012",
    display_name: "Amit Mahajan",
    channels: [{ type: "sms", value: "+12063099568" }],
    worker: "amahajan@zipwhip.com",
  },
  {
    customer_id: "1001",
    display_name: "Blane Bremmer",
    channels: [
      { type: "sms", value: "+12068061354" },
      { type: "sms", value: "+12068001242" },
    ],
    worker: "bbremer@zipwhip.com",
  },
  {
    customer_id: "1002",
    display_name: "Britt Buchan",
    channels: [
      { type: "sms", value: "+18312243884" },
      { type: "sms", value: "+12065823748" },
    ],
    worker: "bbuchan@zipwhip.com",
  },
  {
    customer_id: 1025,
    display_name: "Chris Mitchell",
    worker: "cmitchell@zipwhip.com,",
    channels: [
      { type: "sms", value: "+16048139264" },
      { type: "sms", value: "+18253052401" },
    ],
  },
  {
    customer_id: 1028,
    display_name: "Dan Westra",
    worker: "Dwestra@zipwhip.com",
    channels: [
      { type: "sms", value: "+12066013540" },
      { type: "sms", value: "+12062164962" },
    ],
  },
  {
    customer_id: "1022",
    display_name: "Dave Suzuki",
    channels: [{ type: "sms", value: "+12063099569" }],
    worker: "rsuzuki@zipwhip.com",
  },
  {
    customer_id: "1003",
    display_name: "Eduardo Martinez",
    channels: [
      { type: "sms", value: "+18329010083" },
      { type: "sms", value: "+12068163571" },
    ],
    worker: "emartinez@zipwhip.com",
  },
  {
    customer_id: "1004",
    display_name: "Fadi Banna",
    channels: [{ type: "sms", value: "+12063099567" }],
    worker: "fbanna@zipwhip.com",
  },
  {
    customer_id: "1005",
    display_name: "Jeff Parrish",
    channels: [
      { type: "sms", value: "+12064996825" },
      { type: "sms", value: "+12068163671" },
    ],
    worker: "jparrish@zipwhip.com",
  },
  {
    customer_id: "1006",
    display_name: "Johannes Wong",
    channels: [
      { type: "sms", value: "+12063002992" },
      { type: "sms", value: "+12064932128" },
    ],
    worker: "jwong@zipwhip.com",
  },
  {
    customer_id: "1007",
    display_name: "John Chaffee",
    channels: [
      { type: "sms", value: "+12063996576" },
      { type: "sms", value: "+12068163598" },
      { type: "email", value: "johnchaffee@mac.com" },
    ],
    worker: "fred.chaffee@me.com",
    links: [
      {
        type: "Facebook",
        value: "https://facebook.com",
        display_name: "Facebook",
      },
      {
        type: "LinkedIn",
        value: "https://linkedin.com",
        display_name: "LinkedIn",
      },
    ],
    details: {
      title: "Information",
      content: "Smart and good looking too.",
    },
  },
  {
    customer_id: "1008",
    display_name: "John Larson",
    channels: [
      { type: "sms", value: "+17347180067" },
      { type: "sms", value: "+12062842471" },
    ],
    worker: "jlarson@zipwhip.com",
  },
  {
    customer_id: "1009",
    display_name: "John Lauer",
    channels: [
      { type: "sms", value: "+13134147502" },
      { type: "sms", value: "+12065823770" },
    ],
    worker: "jlauer@zipwhip.com",
  },
  {
    customer_id: "1010",
    display_name: "Jordan Kiga",
    channels: [
      { type: "sms", value: "+12537404684" },
      { type: "sms", value: "+12064932020" },
    ],
    worker: "jkiga@zipwhip.com",
  },
  {
    customer_id: "1011",
    display_name: "Kelly Houtchens",
    channels: [
      { type: "sms", value: "+12068495332" },
      { type: "sms", value: "+12065823733" },
    ],
    worker: "khoutchens@zipwhip.com",
  },
  {
    customer_id: 3,
    display_name: "Lani Chaffee",
    channels: [{ type: "sms", value: "+12063693826" }],
    worker: "fred.chaffee@me.com",
  },
  {
    customer_id: "1013",
    display_name: "Marc Rosa",
    channels: [
      { type: "sms", value: "+12392876019" },
      { type: "sms", value: "+12062991359" },
    ],
    worker: "MRosa@zipwhip.com",
  },
  {
    customer_id: "1014",
    display_name: "Marc Amsberry",
    channels: [
      { type: "sms", value: "+14252699507" },
      { type: "sms", value: "+12068163991" },
    ],
    worker: "mamsberry@zipwhip.com",
  },
  {
    customer_id: 1024,
    display_name: "Matt Gomes",
    worker: "mgomes@zipwhip",
    channels: [
      { type: "sms", value: "+12063838678" },
      { type: "sms", value: "+12065823728" },
    ],
  },
  {
    customer_id: 1023,
    display_name: "Paul Wheeler",
    worker: "pwheeler@zipwhip.com",
    channels: [
      { type: "sms", value: "+15146545077" },
      { type: "sms", value: "+12069053394" },
    ],
  },
  {
    customer_id: "1015",
    display_name: "Ravi Angadi",
    channels: [
      { type: "sms", value: "+17209381640" },
      { type: "sms", value: "+12068001254" },
    ],
    worker: "rangadi@zipwhip.com",
  },
  {
    customer_id: "1016",
    display_name: "Ryan Gachet",
    channels: [{ type: "sms", value: "+12063099553" }],
    worker: "rgachet@zipwhip.com",
  },
  {
    customer_id: "1017",
    display_name: "Sascha Mehlhase",
    channels: [
      { type: "sms", value: "+13125324371" },
      { type: "sms", value: "+12063099565" },
    ],
    worker: "smehlhase@zipwhip.com",
  },
  {
    customer_id: 1027,
    display_name: "Sophie Roben",
    worker: "sroben@zipwhip.com",
    channels: [
      { type: "sms", value: "+12069485760" },
      { type: "sms", value: "+12068163515" },
    ],
  },
  {
    customer_id: "1018",
    display_name: "Stacy Randolph",
    channels: [{ type: "sms", value: "+12068163972" }],
    worker: "srandolph@zipwhip.com",
  },
  {
    customer_id: "1019",
    display_name: "Tony Ip",
    channels: [
      { type: "sms", value: "+12063219402" },
      { type: "sms", value: "+12068163623" },
    ],
    worker: "tip@zipwhip.com",
  },
  {
    customer_id: "1020",
    display_name: "Reilly Miller",
    channels: [{ type: "sms", value: "+12062991349" }],
    worker: "RMiller@zipwhip.com",
  },
];

const findWorkerForCustomer = async (customerNumber) =>
  customersToWorkersMap[customerNumber];

const findRandomWorker = async () => {
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const workers = Object.values(customersToWorkersMap).filter(onlyUnique);
  const randomIndex = Math.floor(Math.random() * workers.length);

  return workers[randomIndex];
};

const getCustomersList = async (worker, pageSize, anchor) => {
  // This code builds the customer list per worker
  // I commented it out and added the code below it to show all customers to all workers

  //   const workerCustomers = customers.filter(
  //     (customer) => customer.worker === worker
  //   );

  //   const list = workerCustomers.map((customer) => ({
  //     display_name: customer.display_name,
  //     customer_id: customer.customer_id,
  //     avatar: customer.avatar,
  //   }));

  const list = customers.map((customer) => ({
    display_name: customer.display_name,
    customer_id: customer.customer_id,
    avatar: customer.avatar,
  }));

  if (!pageSize) {
    return list;
  }

  if (anchor) {
    const lastIndex = list.findIndex(
      (c) => String(c.customer_id) === String(anchor)
    );
    const nextIndex = lastIndex + 1;
    return list.slice(nextIndex, nextIndex + pageSize);
  } else {
    return list.slice(0, pageSize);
  }
};

const getCustomerByNumber = async (customerNumber) => {
  return customers.find((customer) =>
    customer.channels.find(
      (channel) => String(channel.value) === String(customerNumber)
    )
  );
};

const getCustomerById = async (customerId) => {
  return customers.find(
    (customer) => String(customer.customer_id) === String(customerId)
  );
};

module.exports = {
  customersToWorkersMap,
  findWorkerForCustomer,
  findRandomWorker,
  getCustomerById,
  getCustomersList,
  getCustomerByNumber,
};
