const counterparty_data_mock = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    status: 'Active',
    department: ['Sales', 'Marketing'],
    actions: 'Edit | Delete',
    company: 'ABC Company'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    address: '456 Elm St, Anytown, USA',
    status: 'Inactive',
    department: ['Engineering', 'Design'],
    actions: 'Edit | Delete',
    company: 'Tech Solutions Inc'
  },
  {
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '555-123-4567',
    address: '789 Oak Ave, Springfield, USA',
    status: 'Active',
    department: ['Finance', 'Accounting', 'Sales', 'Marketing', 'Engineering', 'Design'],
    actions: 'Edit | Delete',
    company: 'Global Finance Corp'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '555-987-6543',
    address: '321 Pine Rd, Riverside, USA',
    status: 'Active',
    department: ['Human Resources'],
    actions: 'Edit | Delete',
    company: 'People First LLC'
  },
  {
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '555-222-3333',
    address: '654 Maple Dr, Lakeside, USA',
    status: 'Pending',
    department: ['Operations', 'Logistics'],
    actions: 'Edit | Delete',
    company: 'Logistics Pro Services'
  },
  {
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    phone: '555-444-5555',
    address: '987 Cedar Ln, Hilltown, USA',
    status: 'Active',
    department: ['Marketing', 'Sales'],
    actions: 'Edit | Delete',
    company: 'Marketing Dynamics'
  },
  {
    name: 'James Martinez',
    email: 'james.m@example.com',
    phone: '555-666-7777',
    address: '147 Birch St, Greenfield, USA',
    status: 'Inactive',
    department: ['IT', 'Support'],
    actions: 'Edit | Delete',
    company: 'InfoTech Systems'
  },
  {
    name: 'Jennifer Garcia',
    email: 'jennifer.g@example.com',
    phone: '555-888-9999',
    address: '258 Walnut Blvd, Oakville, USA',
    status: 'Active',
    department: ['Legal', 'Compliance'],
    actions: 'Edit | Delete',
    company: 'Legal Partners Group'
  },
  {
    name: 'Robert Anderson',
    email: 'robert.a@example.com',
    phone: '555-111-2222',
    address: '369 Spruce Way, Meadowville, USA',
    status: 'Active',
    department: ['Engineering'],
    actions: 'Edit | Delete',
    company: 'Engineering Excellence'
  },
  {
    name: 'Linda Thomas',
    email: 'linda.thomas@example.com',
    phone: '555-333-4444',
    address: '741 Ash Ct, Brookside, USA',
    status: 'Pending',
    department: ['Design', 'UX'],
    actions: 'Edit | Delete',
    company: 'Creative Design Studio'
  },
  {
    name: 'William Taylor',
    email: 'william.t@example.com',
    phone: '555-555-6666',
    address: '852 Elm Park, Riverside, USA',
    status: 'Active',
    department: ['Sales'],
    actions: 'Edit | Delete',
    company: 'Sales Force Pro'
  },
  {
    name: 'Patricia Moore',
    email: 'patricia.m@example.com',
    phone: '555-777-8888',
    address: '963 Oak Ridge, Sunnydale, USA',
    status: 'Active',
    department: ['Finance'],
    actions: 'Edit | Delete',
    company: 'Capital Investments'
  }, {
    name: 'Daniel Harris',
    email: 'daniel.harris@example.com',
    phone: '555-232-3232',
    address: '468 Cedar Grove, Northpoint, USA',
    status: 'Active',
    department: ['IT', 'Security'],
    actions: 'Edit | Delete',
    company: 'CyberSecure Inc'
  },
  {
    name: 'Elizabeth Martin',
    email: 'elizabeth.m@example.com',
    phone: '555-343-4343',
    address: '579 Birch Lane, Southbay, USA',
    status: 'Pending',
    department: ['Human Resources', 'Recruiting'],
    actions: 'Edit | Delete',
    company: 'Talent Solutions'
  },
  {
    name: 'Matthew Thompson',
    email: 'matthew.t@example.com',
    phone: '555-454-5454',
    address: '680 Walnut Street, Centertown, USA',
    status: 'Active',
    department: ['Engineering', 'Research'],
    actions: 'Edit | Delete',
    company: 'Research & Development Corp'
  },
  {
    name: 'Nancy Jackson',
    email: 'nancy.jackson@example.com',
    phone: '555-565-6565',
    address: '791 Spruce Avenue, Lakeview, USA',
    status: 'Active',
    department: ['Legal'],
    actions: 'Edit | Delete',
    company: 'Justice Law Firm'
  },
  {
    name: 'Anthony Robinson',
    email: 'anthony.r@example.com',
    phone: '555-676-7676',
    address: '802 Ash Boulevard, Hillcrest, USA',
    status: 'Inactive',
    department: ['Sales', 'Business Development'],
    actions: 'Edit | Delete',
    company: 'Business Growth Partners'
  },
  {
    name: 'Karen Clark',
    email: 'karen.clark@example.com',
    phone: '555-787-8787',
    address: '913 Elm Circle, Riverside Heights, USA',
    status: 'Active',
    department: ['Design'],
    actions: 'Edit | Delete',
    company: 'Pixel Perfect Design'
  },
  {
    name: 'Mark Rodriguez',
    email: 'mark.rodriguez@example.com',
    phone: '555-898-9898',
    address: '124 Oak Terrace, Sunset Valley, USA',
    status: 'Active',
    department: ['Operations', 'Supply Chain'],
    actions: 'Edit | Delete',
    company: 'Supply Chain Solutions'
  },
  {
    name: 'Betty Lewis',
    email: 'betty.lewis@example.com',
    phone: '555-909-0909',
    address: '235 Pine Court, Woodland, USA',
    status: 'Pending',
    department: ['Finance', 'Treasury'],
    actions: 'Edit | Delete',
    company: 'Treasury Management Group'
  },
  {
    name: 'Steven Walker',
    email: 'steven.walker@example.com',
    phone: '555-010-1010',
    address: '346 Maple Road, Bayshore, USA',
    status: 'Active',
    department: ['Marketing'],
    actions: 'Edit | Delete',
    company: 'Digital Marketing Agency'
  },
  {
    name: 'Dorothy Hall',
    email: 'dorothy.hall@example.com',
    phone: '555-121-3131',
    address: '457 Cedar Place, Mountainview, USA',
    status: 'Active',
    department: ['IT', 'Infrastructure'],
    actions: 'Edit | Delete',
    company: 'Cloud Infrastructure Ltd'
  },
  {
    name: 'Paul Allen',
    email: 'paul.allen@example.com',
    phone: '555-232-4242',
    address: '568 Birch Drive, Parkside, USA',
    status: 'Inactive',
    department: ['Engineering', 'DevOps'],
    actions: 'Edit | Delete',
    company: 'DevOps Automation'
  },
  {
    name: 'Helen Young',
    email: 'helen.young@example.com',
    phone: '555-343-5353',
    address: '679 Walnut Way, Beachtown, USA',
    status: 'Active',
    department: ['Human Resources', 'Training'],
    actions: 'Edit | Delete',
    company: 'Learning & Development Co'
  },
  {
    name: 'Andrew King',
    email: 'andrew.king@example.com',
    phone: '555-454-6464',
    address: '780 Spruce Street, Valley View, USA',
    status: 'Active',
    department: ['Sales', 'Account Management'],
    actions: 'Edit | Delete',
    company: 'Account Masters Inc'
  },
  {
    name: 'Sandra Wright',
    email: 'sandra.wright@example.com',
    phone: '555-565-7575',
    address: '891 Ash Road, Clearwater, USA',
    status: 'Pending',
    department: ['Legal', 'Contracts'],
    actions: 'Edit | Delete',
    company: 'Contract Law Associates'
  },
  {
    name: 'Joshua Lopez',
    email: 'joshua.lopez@example.com',
    phone: '555-676-8686',
    address: '902 Elm Lane, Redwood, USA',
    status: 'Active',
    department: ['Design', 'Product'],
    actions: 'Edit | Delete',
    company: 'Product Innovation Labs'
  },
  {
    name: 'Carol Hill',
    email: 'carol.hill@example.com',
    phone: '555-787-9797',
    address: '113 Oak Avenue, Fairview, USA',
    status: 'Active',
    department: ['Finance', 'Planning'],
    actions: 'Edit | Delete',
    company: 'Strategic Planning Group'
  },
  {
    name: 'Christopher Lee',
    email: 'chris.lee@example.com',
    phone: '555-999-0000',
    address: '159 Pine Valley, Westwood, USA',
    status: 'Inactive',
    department: ['Operations'],
    actions: 'Edit | Delete',
    company: 'Operations Hub'
  },
  {
    name: 'Barbara White',
    email: 'barbara.w@example.com',
    phone: '555-121-2121',
    address: '357 Maple Heights, Eastville, USA',
    status: 'Active',
    department: ['Marketing', 'Communications'],
    actions: 'Edit | Delete',
    company: 'Brand Communications'
  },
  {
    name: 'Daniel Harris',
    email: 'daniel.harris@example.com',
    phone: '555-232-3232',
    address: '468 Cedar Grove, Northpoint, USA',
    status: 'Active',
    department: ['IT', 'Security'],
    actions: 'Edit | Delete',
    company: 'CyberSecure Inc'
  },
  {
    name: 'Elizabeth Martin',
    email: 'elizabeth.m@example.com',
    phone: '555-343-4343',
    address: '579 Birch Lane, Southbay, USA',
    status: 'Pending',
    department: ['Human Resources', 'Recruiting'],
    actions: 'Edit | Delete',
    company: 'Talent Solutions'
  },
  {
    name: 'Matthew Thompson',
    email: 'matthew.t@example.com',
    phone: '555-454-5454',
    address: '680 Walnut Street, Centertown, USA',
    status: 'Active',
    department: ['Engineering', 'Research'],
    actions: 'Edit | Delete',
    company: 'Research & Development Corp'
  },
  {
    name: 'Nancy Jackson',
    email: 'nancy.jackson@example.com',
    phone: '555-565-6565',
    address: '791 Spruce Avenue, Lakeview, USA',
    status: 'Active',
    department: ['Legal'],
    actions: 'Edit | Delete',
    company: 'Justice Law Firm'
  },
  {
    name: 'Anthony Robinson',
    email: 'anthony.r@example.com',
    phone: '555-676-7676',
    address: '802 Ash Boulevard, Hillcrest, USA',
    status: 'Inactive',
    department: ['Sales', 'Business Development'],
    actions: 'Edit | Delete',
    company: 'Business Growth Partners'
  },
  {
    name: 'Karen Clark',
    email: 'karen.clark@example.com',
    phone: '555-787-8787',
    address: '913 Elm Circle, Riverside Heights, USA',
    status: 'Active',
    department: ['Design'],
    actions: 'Edit | Delete',
    company: 'Pixel Perfect Design'
  },
  {
    name: 'Mark Rodriguez',
    email: 'mark.rodriguez@example.com',
    phone: '555-898-9898',
    address: '124 Oak Terrace, Sunset Valley, USA',
    status: 'Active',
    department: ['Operations', 'Supply Chain'],
    actions: 'Edit | Delete',
    company: 'Supply Chain Solutions'
  },
  {
    name: 'Betty Lewis',
    email: 'betty.lewis@example.com',
    phone: '555-909-0909',
    address: '235 Pine Court, Woodland, USA',
    status: 'Pending',
    department: ['Finance', 'Treasury'],
    actions: 'Edit | Delete',
    company: 'Treasury Management Group'
  },
  {
    name: 'Steven Walker',
    email: 'steven.walker@example.com',
    phone: '555-010-1010',
    address: '346 Maple Road, Bayshore, USA',
    status: 'Active',
    department: ['Marketing'],
    actions: 'Edit | Delete',
    company: 'Digital Marketing Agency'
  },
  {
    name: 'Dorothy Hall',
    email: 'dorothy.hall@example.com',
    phone: '555-121-3131',
    address: '457 Cedar Place, Mountainview, USA',
    status: 'Active',
    department: ['IT', 'Infrastructure'],
    actions: 'Edit | Delete',
    company: 'Cloud Infrastructure Ltd'
  },
  {
    name: 'Paul Allen',
    email: 'paul.allen@example.com',
    phone: '555-232-4242',
    address: '568 Birch Drive, Parkside, USA',
    status: 'Inactive',
    department: ['Engineering', 'DevOps'],
    actions: 'Edit | Delete',
    company: 'DevOps Automation'
  },
  {
    name: 'Helen Young',
    email: 'helen.young@example.com',
    phone: '555-343-5353',
    address: '679 Walnut Way, Beachtown, USA',
    status: 'Active',
    department: ['Human Resources', 'Training'],
    actions: 'Edit | Delete',
    company: 'Learning & Development Co'
  },
  {
    name: 'Andrew King',
    email: 'andrew.king@example.com',
    phone: '555-454-6464',
    address: '780 Spruce Street, Valley View, USA',
    status: 'Active',
    department: ['Sales', 'Account Management'],
    actions: 'Edit | Delete',
    company: 'Account Masters Inc'
  },
  {
    name: 'Sandra Wright',
    email: 'sandra.wright@example.com',
    phone: '555-565-7575',
    address: '891 Ash Road, Clearwater, USA',
    status: 'Pending',
    department: ['Legal', 'Contracts'],
    actions: 'Edit | Delete',
    company: 'Contract Law Associates'
  },
  {
    name: 'Joshua Lopez',
    email: 'joshua.lopez@example.com',
    phone: '555-676-8686',
    address: '902 Elm Lane, Redwood, USA',
    status: 'Active',
    department: ['Design', 'Product'],
    actions: 'Edit | Delete',
    company: 'Product Innovation Labs'
  },
  {
    name: 'Carol Hill',
    email: 'carol.hill@example.com',
    phone: '555-787-9797',
    address: '113 Oak Avenue, Fairview, USA',
    status: 'Active',
    department: ['Finance', 'Planning'],
    actions: 'Edit | Delete',
    company: 'Strategic Planning Group'
  }
];

module.exports = {
  counterparty_data_mock
}