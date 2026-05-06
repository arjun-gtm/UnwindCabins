const image = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85&crop=entropy&cs=tinysrgb`

export const heroData = {
  image: image('photo-1449158743715-0a90ebb6d2d8', 2000),
  title: 'Leave the office behind and unwind',
  highlight: 'unwind',
  description: 'Welcome to our cozy cabin nestled in the heart of the mountains! Our cabin is the perfect getaway for those seeking peace and relaxation in a natural setting.',
  badge: '4.5 / 5',
  reviews: 82,
  reviewText: 'Trustpilot',
  avatars: [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
  ],
}

export const cabins = [
  {
    id: 'rustic-country-retreat',
    location: 'Hampshire · England',
    title: 'Rustic country retreat',
    price: '£210pp',
    description: 'Step outside and take in the stunning views. Our cabin sits on a quiet and secluded property, providing the perfect setting for a peaceful retreat.',
    rating: 4.8,
    reviews: 82,
    image: image('photo-1449158743715-0a90ebb6d2d8', 900),
  },
  {
    id: 'cozy-getaway-cabin',
    location: 'Norfolk · England',
    title: 'Cozy getaway cabin',
    price: '£312pp',
    description: 'Step outside and take in the stunning views. Our cabin sits on a quiet and secluded property, providing the perfect setting for a peaceful retreat.',
    rating: 4.9,
    reviews: 82,
    image: image('photo-1542718610-a1d656d1884c', 900),
  },
  {
    id: 'oakwood-hideaway',
    location: 'Hampshire · England',
    title: 'Oakwood hideaway',
    price: '£210pp',
    description: 'Step outside and take in the stunning views. Our cabin sits on a quiet and secluded property, providing the perfect setting for a peaceful retreat.',
    rating: 4.7,
    reviews: 82,
    image: image('photo-1518780664697-55e3ad937233', 900),
  },
]

export const inspirationItems = [
  {
    title: 'To Explore nature',
    subtitle: 'For those who love',
    description: 'Discover some of the most beautiful scenery, from the wonders of Snowdonia to the famous beauty of the Scottish Highlands.',
    image: image('photo-1500534314209-a25ddb2bd429', 900),
  },
  {
    title: 'To Relax, rest & re-set',
    subtitle: 'For those who want',
    description: 'Experience mind and body connection through breathing exercises and relaxation with our yoga inspired getaway for you and the family.',
    image: image('photo-1506126613408-eca07ce68773', 900),
  },
  {
    title: 'Four-legged friends',
    subtitle: 'For those who have',
    description: 'When going on holiday nobody wants to put their dog in a kennel. So, lets keep the family together with our pet friendly cabins.',
    image: image('photo-1548199973-03cce0bbc87b', 900),
  },
]

export const reviewSection = {
  image: image('photo-1500534314209-a25ddb2bd429', 1900),
  title: 'A truly wonderful experience',
  description: 'Brilliant for anyone looking to get away from the hustle and bustle of city life or detox from their tech for a few days. I could have stayed another week! They really have thought about everything here down to the finest details.',
  date: '01 Jan 2023',
  rating: 5,
}

export const mediaSection = {
  title: 'Get ready to unwind',
  description: 'A cabin getaway can be a wonderful way to relax and reconnect with nature. Many cabin rentals are located in beautiful, secluded areas, surrounded by trees and other natural beauty. A cabin getaway can be a wonderful way to escape the hustle and bustle of daily life and reconnect with nature.',
  button: 'Learn more',
  image: image('photo-1501785888041-af3ef285b470', 1200),
}

export const ctaSection = {
  title: 'Nourish the mind, body, and spirit.',
  description: 'Many people find that the combination of being in a peaceful natural setting and engaging in activities that nourish the mind, body, and spirit leave them feeling rejuvenated and refreshed.',
  button: 'Find available cabins',
  image: image('photo-1493809842364-78817add7ffb', 1600),
}

export const escapeSection = {
  title: 'Escape from endless Zoom calls',
  description: 'Discover the wonders of spending time offline and away from the office with our 3 day weekend getaway cabin retreats.',
  button: 'Find the perfect getaway',
  image: image('photo-1504280390367-361c6d9f38f4', 2000),
}

export const faqs = [
  {
    question: 'About our cabins',
    title: 'About Unwind Cabins',
    details: ['How long have you been in business?', 'Why did you start this journey?'],
  },
  {
    question: 'Tell me more about the cabin',
    title: 'Tell me more about the cabin',
    details: ['What do I need to bring?', 'How do I get to the cabin?'],
  },
  {
    question: 'Pets, family & friends',
    title: 'Pets, family & friends',
    details: ['Please tell me I can bring my dog', 'How many people do you cabins sleep?'],
  },
]

export const footerLinks = [
  {
    title: 'About us',
    links: ['Our story', 'Why us', 'How it works', 'FAQ'],
  },
  {
    title: 'Our cabins',
    links: ['North of London', 'Golden Hideaway', 'Oak Treehouse', 'Acacia Retreat', 'Blue Lagoon', 'South of London', 'Lavender Retreat', 'Butterfly Treehouse', 'Mahogany Hideaway'],
  },
  {
    title: 'Get inspired',
    links: ['Explore nature', 'Hiking trails', 'Swimming', 'Fishing', 'Boating', 'Cycling', 'Rest, relax and re-set', 'Spa treatments', 'Hot tubs', 'Nature Trails', 'Great food and drink', 'Pubs', 'Restaurants', 'Food markets', 'Picnics', 'For you and yours', 'Solo or a couple', 'Pet friendly', 'Accessible cabins'],
  },
  {
    title: 'Support',
    links: ['Help', 'Contact us', 'Privacy Policy', 'Terms of Service', 'Complaints Policy'],
  },
]
