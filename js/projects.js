/*
  ============================================================
  DG PROJECT LIST  —  edit this file to change the work on the site
  ============================================================
  Each project is one block between { and }. Order here = order on the site.

  slug     short web name, lowercase, no spaces (used in share links)
  client   who it was for
  title    project name
  type     one of: Live Event, Branded, Documentary, Music Video, Promo
  year     year it came out
  image    file name inside the img/ folder (also needs a -sm copy)
  videos   list of Vimeo videos. "id" is the number in the Vimeo link.
           Private Vimeo links have a ?h=xxxx part: put that in "hash".
           Leave videos as [] if there is no video yet.
  credit   optional line shown under the video, e.g. "DIR: Name · DP: Dave Garcia"

  To ADD a project: copy one block, paste it where you want it, change the words.
  To REMOVE one: delete its whole block (from { to },).
*/
window.PROJECTS = [
  {
    slug: 'tudum-pink-guards', client: 'Netflix', title: 'TUDUM “Pink Guards”',
    type: 'Live Event', year: 2025, image: 'tudum-guards',
    videos: [{ id: '1140817583', hash: '51dd4113e8' }]
  },
  {
    slug: 'tudum-cold-open', client: 'Netflix', title: 'TUDUM Cold Open',
    type: 'Live Event', year: 2025, image: 'tudum-open',
    videos: [{ id: '1140817686', hash: 'cc030c2d81' }]
  },
  {
    slug: 'woodford-ryder-cup', client: 'Woodford Reserve', title: 'Ryder Cup',
    type: 'Branded', year: 2021, image: 'woodford',
    videos: [
      { id: '579415261', label: 'Golf Channel' },
      { id: '586488693', label: 'Fall' },
      { id: '586490376', label: 'Open' }
    ]
  },
  {
    slug: 'chatting-through-steel', client: 'Cole Gallagher', title: 'Chatting Through Steel',
    type: 'Documentary', year: 2021, image: 'cole-g',
    videos: [{ id: '645253619' }]
  },
  {
    slug: 'kca-dj-khalid', client: 'Kids’ Choice Awards', title: 'DJ Khalid',
    type: 'Live Event', year: 2019, image: 'kca-khalid',
    videos: [{ id: '347914149' }]
  },
  {
    slug: 'mattel-rc-cybertruck', client: 'Mattel', title: 'RC Cybertruck',
    type: 'Branded', year: 2020, image: 'rc-cybertruck',
    videos: [{ id: '423057471' }]
  },
  {
    slug: 'kca-john-cena', client: 'Kids’ Choice Awards', title: 'John Cena',
    type: 'Live Event', year: 2018, image: 'kca-cena',
    videos: [{ id: '269037177' }]
  },
  {
    slug: 'teen-choice-cold-open', client: 'Teen Choice Awards', title: 'Cold Open',
    type: 'Live Event', year: 2019, image: 'tca-open',
    videos: [{ id: '366360553' }]
  },
  {
    slug: 'iheart-hart-seacrest', client: 'iHeart Music', title: 'Hart + Seacrest',
    type: 'Live Event', year: 2018, image: 'iheart',
    videos: [{ id: '272783343' }],
    credit: 'DIR: Chris Valenziano · DP: Dave Garcia'
  },
  {
    slug: 'tylers-story', client: 'Short Film', title: 'Tyler’s Story',
    type: 'Documentary', year: 2019, image: 'tylers-story',
    videos: [{ id: '366361192' }]
  },
  {
    slug: 'yellowcard-a-place-we-set-afire', client: 'Yellowcard', title: 'A Place We Set Afire',
    type: 'Music Video', year: 2017, image: 'yellowcard',
    videos: [{ id: '218232121' }]
  },
  {
    slug: 'spider-man-homecoming', client: 'Cartoon Network + Sony', title: 'Spider-Man: Homecoming',
    type: 'Promo', year: 2017, image: 'spiderman',
    videos: [{ id: '238484389' }]
  }
];

/* Contact details used across the site */
window.CONTACT = {
  name: 'Dave Garcia',
  email: 'dg@kombinemedia.com',
  phone: '310.292.1031',
  instagram: '______dg______'
};
