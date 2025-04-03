import { Client } from '../common/types';

const clients: Client[] =
[
  {
    slug: 'apolinar',
    name: 'Apolinar',
    active: true,
    description: 'Apolinar exists to advance the Human Experience (HX) of technology.',
    link:
    {
      url: 'https://www.apolinargroup.com'
    },
    reference: 'Lance Hambling (Head of Web and API Dev)',
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2019-10',
        endedAt: '2020-10'
      },
      {
        startedAt: '2021-02',
        endedAt: '2021-03'
      },
      {
        startedAt: '2022-10',
        endedAt: '2023-01'
      }
    ],
    iconUrl: '/images/clients/apolinar.svg'
  },
  {
    slug: 'bravura',
    name: 'Bravura Solutions',
    active: false,
    description: 'Bravura Solutions deliver solutions across multiple business lines, including products for wealth management and life insurance administration, eBusiness, funds administration and related technologies.',
    link:
    {
      url: 'http://www.bravurasolutions.com'
    },
    reference: 'David Keeley (Technical Program Manager)',
    position: 'Senior Developer',
    employmentType: 'employee',
    dates:
    [
      {
        startedAt: '2011-02',
        endedAt: '2012-08'
      },
      {
        startedAt: '2015-08',
        endedAt: '2015-12'
      }
    ]
  },
  {
    slug: 'colenso-bbdo',
    name: 'Colenso BBDO',
    active: true,
    link:
    {
      url: 'https://www.colensobbdo.co.nz'
    },
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2022-02',
        endedAt: '2022-04'
      }
    ],
    iconUrl: '/images/clients/colenso-bbdo.svg'
  },
  {
    slug: 'cucumber',
    name: 'Cucumber',
    active: true,
    description: 'Software Engineering, Digital Talent Solutions and Strategic Consulting services that make industry-leading solutions possible.',
    link:
    {
      url: 'https://www.cucumber.co.nz'
    },
    position: 'Senior Front End Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2019-06',
        endedAt: '2019-08'
      }
    ],
    iconUrl: '/images/clients/cucumber.png'
  },
  {
    slug: 'dotdot',
    name: 'DOTDOT',
    active: true,
    description: 'DOTDOT is an award-winning creative studio focused on generating impact through social and immersive experiences.',
    link:
    {
      url: 'https://dotdot.studio'
    },
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2023-02',
        endedAt: '2023-05'
      },
      {
        startedAt: '2024-02',
        endedAt: '2024-05'
      }
    ],
    iconUrl: '/images/clients/dotdot.png'
  },
  {
    slug: 'ghost-street',
    name: 'Ghost Street',
    active: true,
    description: 'We create simple and powerful digital products, for companies seeking to make a difference.',
    link:
    {
      url: 'https://ghost.st'
    },
    position: 'Game Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2020-09',
        endedAt: '2020-10'
      }
    ],
    iconUrl: '/images/clients/ghost-street.png'
  },
  {
    slug: 'marker',
    name: 'Marker',
    active: true,
    description: 'Marker create enterprise-quality digital products that fundamentally support, strengthen or enhance their clients’ product and service offerings.',
    link:
    {
      url: 'http://markerdigital.io'
    },
    reference: 'Lance Hambling (Head of Web and API Dev)',
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2018-03',
        endedAt: '2018-06'
      },
      {
        startedAt: '2018-10',
        endedAt: '2018-11'
      }
    ],
    iconUrl: '/images/clients/marker.png'
  },
  {
    slug: 'matrikon',
    name: 'Matrikon',
    active: false,
    description: 'Matrikon provided services for Maximo including implementations, upgrades and support.',
    link:
    {
      url: 'http://www.matrikon.com'
    },
    position: 'Software Engineer, Technical Consultant',
    employmentType: 'employee',
    dates:
    [
      {
        startedAt: '2005-12',
        endedAt: '2008-03'
      },
      {
        startedAt: '2009-02',
        endedAt: '2010-03'
      }
    ]
  },
  {
    slug: 'mitch-olson',
    name: 'Mitch Olson',
    active: true,
    description: 'Behavioural engineer, systems designer, philosopher and entrepreneur.',
    link:
    {
      url: 'https://www.mitcholson.co.nz'
    },
    position: 'Game Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2020-12',
        endedAt: '2021-03'
      }
    ],
    iconUrl: '/images/clients/mitch-olson.png'
  },
  {
    slug: 'octana',
    name: 'Octana',
    active: true,
    description: 'The easiest way to create beautiful websites on Contentful.',
    link:
    {
      url: 'https://octana.io'
    },
    reference: 'Lance Hambling (Head of Web and API Dev)',
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2023-08',
        endedAt: '2023-11'
      }
    ],
    iconUrl: '/images/clients/octana.svg'
  },
  {
    slug: 'osho-international',
    name: 'OSHO International',
    active: false,
    description: 'A foundation dedicated to Osho. I participate in the ‘work as meditation’ program at the meditation resort in Pune, India.',
    link:
    {
      url: 'http://osho.com'
    },
    position: 'Volunteer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2014-11',
        endedAt: '2015-02'
      },
      {
        startedAt: '2016-01',
        endedAt: '2016-03'
      },
      {
        startedAt: '2016-10',
        endedAt: '2016-11'
      },
      {
        startedAt: '2016-12',
        endedAt: '2017-03'
      },
      {
        startedAt: '2018-12',
        endedAt: '2019-01'
      }
    ],
    iconUrl: '/images/clients/osho-international.png'
  },
  {
    slug: 'propellerhead',
    name: 'Propellerhead',
    active: true,
    description: 'We are dedicated to creating future-focused technology solutions that propel people, businesses, the economy and the world forward.',
    link:
    {
      url: 'https://www.propellerhead.co.nz'
    },
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2021-04',
        endedAt: '2021-08'
      }
    ],
    iconUrl: '/images/clients/propellerhead.png'
  },
  {
    slug: 'quadratek',
    name: 'Quadratek',
    active: false,
    description: 'Quadratek provides complimentary and cohesive end-to-end technology solutions and products, reducing complexity, and improving the reliability of your IT Estate with Consulting, Infrastructure, People and Support.',
    link:
    {
      url: 'http://quadratek.net'
    },
    position: 'Subject Matter Expert, Software Engineer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2008-11',
        endedAt: '2009-01'
      }
    ]
  },
  {
    slug: 'red-fox',
    name: 'Red Fox Game Studio',
    active: true,
    description: 'A game development startup founded by one of my lecturers at Media Design School. Their vision is \'one million smiles per day\'.',
    link:
    {
      url: 'http://redfoxgamestudio.com'
    },
    reference: 'Stephen McIntyre (Founder and CEO)',
    position: 'Senior Game Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2016-07',
        endedAt: '2016-09'
      },
      {
        startedAt: '2016-11',
        endedAt: '2016-12'
      },
      {
        startedAt: '2017-06',
        endedAt: '2017-12'
      }
    ],
    iconUrl: '/images/clients/red-fox.png'
  },
  {
    slug: 'rush',
    name: 'RUSH',
    active: true,
    description: 'We’re RUSH, a design and technology company making better digital experiences.',
    link:
    {
      url: 'http://rush.co.nz/'
    },
    reference: 'Danushka Abeysuriya (Founder and CTO)',
    position: 'Senior Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2014-02',
        endedAt: '2014-10'
      },
      {
        startedAt: '2015-02',
        endedAt: '2015-05'
      },
      {
        startedAt: '2016-03',
        endedAt: '2016-07'
      },
      {
        startedAt: '2016-09',
        endedAt: '2016-10'
      },
      {
        startedAt: '2017-03',
        endedAt: '2017-05'
      }
    ],
    iconUrl: '/images/clients/rush.svg'
  },
  {
    slug: 'wintermute',
    name: 'Wintermute',
    active: true,
    description: 'A leading algorithmic trading firm, focused on harnessing the chaos of digital assets into liquid and efficient markets.',
    link:
    {
      url: 'https://wintemute.com/'
    },
    reference: ' Dmitrii Troitskii (Senior Software Engineer)',
    position: 'Senior Frontend Developer',
    employmentType: 'contractor',
    dates:
    [
      {
        startedAt: '2024-10',
        endedAt: '2025-4'
      }
    ],
    iconUrl: '/images/clients/wintermute.svg'
  }
];

export default clients;
