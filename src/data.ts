/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost, Destination, ChecklistItem, BudgetItem, PhotoAsset } from './types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    continent: 'Asia',
    country: 'Japan',
    overview: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It is famous for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
    bestTime: 'October to November (Autumn foliage) or April (Cherry blossoms)',
    budgetGuide: 'Moderate to High. Daily expenditure averages $120–$180 per traveler, covering high-speed transit, temple access, and premium matcha experiences.',
    thingsToDo: [
      'Stroll through the mesmerizing Arashiyama Bamboo Grove',
      'Walk under the thousands of vermilion torii gates at Fushimi Inari Shrine',
      'Visit Kinkaku-ji, the famous golden pavilion reflecting in its mirror pond',
      'Experience a peaceful traditional tea ceremony in Gion district'
    ],
    foodRecommendations: [
      'Matcha Parfet & authentic Uji green tea delicacies',
      'Yudofu (creamy hot tofu broth) – local Buddhist temple specialty',
      'Kyoto Ramen (Koto-style rich soy sauce broth with pork slices)',
      'Kaiseki (traditional Japanese multi-course fine dining art)'
    ],
    travelTips: [
      'Buy an ICOCA card for seamless subway and bus transitions across the city.',
      'Visit high-traffic temples (Golden Pavilion, Fushimi Inari) very early in the morning (before 7:30 AM) to avoid massive tour crowds.',
      'Keep cash available; older shrines and small ramen shops in Gion do not support card payments.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { x: 790, y: 195 },
    status: 'featured'
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    continent: 'Europe',
    country: 'Greece',
    overview: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape of whitewashed, cubiform houses clinging to caldera cliffs.',
    bestTime: 'September to October or May to June (Warm days, fewer crowds)',
    budgetGuide: 'High. Budget about $150–$250/day. Accommodations in Oia/Fira demand a high premium, while local transport and greek salads are quite affordable.',
    thingsToDo: [
      'Catch the world-famous golden hour sunset from Oia Castle walls',
      'Hike the caldera edge paths stretching from Fira to Oia (10km stretch)',
      'Explore the dynamic volcanic black sand beaches of Perissa and Kamari',
      'Tour the ancient archaeological excavations of Akrotiri (the Aegean Pompeii)'
    ],
    foodRecommendations: [
      'Fresh grilled octopus drizzled in lemon juice and oregano',
      'Tomatokeftedes (traditional crispy Santorini tomato fritters)',
      'Local Assyrtiko wine matching volcanic soil profiles',
      'Classic Greek moussaka baked with rich eggplant and creamy bechamel'
    ],
    travelTips: [
      'Wear sturdy shoes with solid grip; caldera walkways comprise high-gradient stone steps that become slippery.',
      'Consider staying in less crowded towns like Imerovigli or Pyrgos to save up to 40% on hotel rentals while maintaining pristine views.',
      'Rent an ATV or a small car to tour the wider southern beaches comfortably.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469796466635-455ede028ace?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { x: 535, y: 185 },
    status: 'visited'
  },
  {
    id: 'machu-picchu-peru',
    name: 'Machu Picchu',
    continent: 'South America',
    country: 'Peru',
    overview: 'Perched high in the Andes Mountains of Peru, Machu Picchu is an Incan citadel built in the 15th century and later abandoned. It is renowned for its sophisticated dry-stone walls, panoramic peaks, and astronomical alignments.',
    bestTime: 'May to September (Dry season with crystal clear mountain vistas)',
    budgetGuide: 'Moderate. Daily budget around $80–$140, mostly driven by PeruRail transit tickets and mandatory certified archaeological guide packages.',
    thingsToDo: [
      'Hike the rewarding and dramatic path up Huayna Picchu or Machu Picchu Mountain',
      'Witness the sunrise over the stone ruins upon crossing the Sun Gate entry',
      'Interact with the friendly grazing llamas roaming the terrace farms',
      'Explore Cusco, the ancient Incan historical capital filled with stone masonry'
    ],
    foodRecommendations: [
      'Lomo Saltado (savory stir-fried beef slices with peppers, onions, and fries)',
      'Ceviche Clasico (fresh sea-bass cured in tangy cilantro lime milk)',
      'Papa a la Huancaina (boiled sliced potatoes in mild warm yellow cheese sauce)',
      'Warm cup of traditional Coca Tea to soothe high altitude fatigue'
    ],
    travelTips: [
      'Book entry passes at least 3-4 months in advance; Peru strictly caps daily archaeological entries to preserve the site.',
      'Spend at least 48 hours acclimatizing in Cusco (3,400m altitude) before embarking on physically demanding hikes.',
      'Carry your physical current passport; they offer a unique collector stamp at the citadel exit.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94adb1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { x: 275, y: 345 },
    status: 'wishlist'
  },
  {
    id: 'serengeti-tanzania',
    name: 'Serengeti Park',
    continent: 'Africa',
    country: 'Tanzania',
    overview: 'The Serengeti National Park is a massive Tanzanian safari destination famed for its annual migration of over 1.5 million wildebeest, 250,000 zebra, and immense populations of lions, leopards, cheetahs, and elephants.',
    bestTime: 'June to October (Dry season, ideal for Great Migration herds)',
    budgetGuide: 'High. Safari packages, park logistics, conservation charges, and custom 4x4 land cruisers cost $200–$400/day.',
    thingsToDo: [
      'Take a breathtaking early morning hot air balloon flight over open savannahs',
      'Track the "Big Five" (Lion, Leopard, Rhino, Elephant, Buffalo) with veteran Maasai guides',
      'Witness the dramatic Mara River crossing migrations',
      'Spend a night listening to wildlife under the clear stars in a canvas eco-lodge'
    ],
    foodRecommendations: [
      'Ugali (dense, savory maize flour porridge) paired with slow-stewed meats',
      'Nyama Choma (succulent open-fire spit roasted goat/beef cuts)',
      'Fried plantains sprinkled with local Tanzanian spices',
      'Chai Mandazi (spiced tanzanian cardamom donuts with hot ginger milk tea)'
    ],
    travelTips: [
      'Dust is everywhere. Prepare sealed zip bags to secure camera bodies, lenses, and sensitive phone electronics during dry safaris.',
      'Tipping is deeply embedded in local culture; budget roughly $15-20 per day for your driver/tracker guide team.',
      'Consult your physician 4–6 weeks prior about necessary yellow fever certifications and malaria preventatives.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527112841300-4b36500683e4?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { x: 585, y: 315 },
    status: 'featured'
  },
  {
    id: 'banff-canada',
    name: 'Banff National Park',
    continent: 'North America',
    country: 'Canada',
    overview: 'Banff National Park is Canadas oldest national park, nestled in the heart of the Alberta Rocky Mountains. It is renowned for its surreal turquoise glacial lakes, towering limestone peaks, and abundant mountain wildlife.',
    bestTime: 'June to August (For hiking/lakes) or December to March (Skiing)',
    budgetGuide: 'Moderate to High. Plan $110–$190 daily. Glacial lodge fees are high, but outdoor hiking trails and public park passes are very reasonable.',
    thingsToDo: [
      'Paddle a crimson canoe on the vibrant, glacier-fed waters of Lake Louise',
      'Capture the mirror reflections of Valley of the Ten Peaks at Moraine Lake',
      'Soak your muscles in the healing geothermal mineral sulfur of Banff Upper Hot Springs',
      'Drive the Icefields Parkway, one of the most stunning mountain highway corridors on Earth'
    ],
    foodRecommendations: [
      'Local wild game dishes (bison burgers or slow-roasted venison backstrap)',
      'Poutine (crispy thick-cut fries topped with fresh cheese curds and rich brown gravy)',
      'Maple sugar pancakes stack paired with authentic Alberta cured bacon',
      'Classic BeaverTails (stretched hand-fried pastry with maple-butter sprinkles)'
    ],
    travelTips: [
      'Arrive at Moraine Lake and Lake Louise parking lots before 6:00 AM in high summer, or take the regional Parks Canada express shuttle.',
      'Always travel with bear spray readily visible and accessible on your belt or pack; know how to discharge it safely.',
      'Layer your clothing. Extreme mountain weather swings from hot sun to biting sleet in under an hour.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { x: 190, y: 140 },
    status: 'visited'
  },
  {
    id: 'sydney-australia',
    name: 'Sydney',
    continent: 'Oceania',
    country: 'Australia',
    overview: 'Sydney is Australs largest city, famous for its sparkling harbor, golden sand beaches, pristine botanic park reserves, and the striking sail-like shells of the architectural marvel, the Sydney Opera House.',
    bestTime: 'September to November (Spring) or March to May (Autumn)',
    budgetGuide: 'Moderate to High. Daily cost ~ $120–$175. Public trains and ferry crossings are highly cost-efficient, but dining and craft cocktails are premium.',
    thingsToDo: [
      'Embark on the breathtaking coastal ocean walk stretching from Bondi to Coogee Beach',
      'Catch a ferry transit across the glittering harbor to Manly Beach at golden hour',
      'Climb the massive steel framework of the iconic Sydney Harbour Bridge',
      'Wander through the peaceful exhibits of Royal Botanic Garden Sydney'
    ],
    foodRecommendations: [
      'Fresh Sydney rock oysters shucked with a squeeze of fresh ginger-lime vinaigrette',
      'Traditional Australian flat white coffee from a local Surry Hills espresso bar',
      'Aromatic barramundi fillet pan-seared with native wattle-seed spices',
      'Decadent chocolate-dipped Lamingtons rolled in toasted coconut flakes'
    ],
    travelTips: [
      'Leverage the Opal card, or simply tap your standard contact-free banking card on ferry and light-rail terminals.',
      'Sun safety is massive in Australia. Apply SPF 50+ broad-spectrum protection sunscreen hourly, wear a hat, and drink water.',
      'Keep an eye out for coastal ocean baths – these concrete pools are carved directly into rock ledges and refilled by tides.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524820197278-540916411e20?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544885935-98dd03b090da?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { x: 860, y: 395 },
    status: 'wishlist'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-uncovering-gion',
    title: 'Uncovering the Secret Geisha Quarters of Kyoto',
    slug: 'uncovering-geisha-quarters-gion',
    excerpt: 'Step away from the crowd and wander the quiet wooden machiya alleyways of Gion Shirazukawa, where lanterns light historic paths and spirits of old Japan whisper.',
    content: `As the copper sun slips below the wooden skyline of Kyoto, a calm silence falls over Gion. Tourists begin gathering on the main thoroughfare of Hanamikoji Street, brandishing cameras in hopes of turning a fleeting glimpse of a Geiko or Maiko into a digital trophy. But there is a better way to experience Gion—a way that respects the centuries-old living traditions of this enigmatic district.

Step off the paved lanes and enter the stone-paved paths of Gion Shirakawa. Along the calm canal lined with weeping willows and elegant cherry blossom trees, the wooden machiya houses cast warm glow onto the water. Here, the hum of traffic fades, replaced by the soothing clatter of wooden geta shoes on cobble.

### The Art of the Evening Tea
In these wooden architectures, traditional arts are guarded with pride. A tea master whisks stone-ground matcha with dynamic bamboo whisks, every slide representing a deliberate exercise in meditation. Meeting a Maiko is a rare privilege, requiring trusted introductions. These artists dedicate years to mastering classical court dances, the shamisen, and traditional conversation.

### Staying Respectful as a Travel Blogger
Recently, Kyoto has established signages reminding tourists not to photograph Geiko without consent or step inside private residential alleys. As a traveler, the best approach is simple: put your camera in your pocket, stand still, and listen. Observe the immaculate design of the paper screens, and feel the history woven into the very fabric of the city. For those wishing to capture the mood sustainably, Kyoto's Gion Shirakawa offers classic architectural snapshots that carry the timelessness and serenity of ancient Japan.`,
    date: 'June 12, 2026',
    category: 'Solo Travel',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    reads: 1240,
    comments: [
      {
        id: 'c1',
        author: 'Evelyn Thorne',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'This is beautiful! I completely agree about putting the camera down and simply soaking in the atmosphere. Shirakawa is vastly superior to the chaotic parts of Gion.',
        date: 'June 14, 2026'
      },
      {
        id: 'c2',
        author: 'Hiroshi Sato',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'As a Kyoto local, thank you for writing this respect-driven guide. It makes us very happy when travelers understand Gion\'s strict cultural etiquette.',
        date: 'June 15, 2026'
      }
    ]
  },
  {
    id: 'post-safari-under-stars',
    title: 'Sleeping in the Wild: A Night Under Serengeti Stars',
    slug: 'sleeping-wild-savannah-serengeti',
    excerpt: 'Lions roaring in the distance, a crackling campfire, and the infinite Milky Way canopy stretching above the plains of Tanzania. This is a real Serengeti experience.',
    content: `There is a vulnerability to being in the heart of Africa that no photo can capture. It is the realization that you are not simply an observer, but a raw visitor in a pristine, complex ecosystem that has existed for millennia.

It was 9:00 PM at our mobile eco-camp in the Central Serengeti, and the crackling yellow flames of our acacia campfire were the only defense against the dense, ink-black outer expanse. Overhead, the Milky Way was a bright ribbon of stardust. Here, thousands of miles from industrial light, cosmic constellations burn with sharp intensity.

### The Midnight Symphony
Once inside your canvas tent, the true magic begins. The canvas acts as a semi-permeable membrane filter for the sounds of the African wilderness:
- The low, bass-heavy grunts of zebras keeping watch
- The nervous giggling of spotted hyenas trailing a pack
- The deep, earth-vibrating growls of a pair of lions marking their Pride territories several kilometers away

Your senses instantly sharpen. You are lying in a bed, but your mind is acutely tuned to every rustle of dry grass outside.

### Sustainable Conservation Luxury
Our eco-lodge uses zero permanent concrete foundations. It is entirely solar-powered, utilizes micro-filtered greywater systems, and everything that enters must be packed out cleanly. True luxury in the travel sphere is no longer gold-plated bath taps—it is the pristine privilege of drinking single-origin Tanzanian coffee as a herd of elephants crosses the morning horizon in your backyard.`,
    date: 'May 28, 2026',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    reads: 980,
    comments: [
      {
        id: 'c3',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        content: 'Unbelievable story! Safari is at the absolute top of my lifetime list. Sleeping in a canvas tent with hyenas laughing outside sounds both terrifying and gorgeous.',
        date: 'May 30, 2026'
      }
    ]
  },
  {
    id: 'post-santorini-alternate',
    title: 'Santorini on a Shilling: An Honest Budget Guide',
    slug: 'santorini-budget-island-guide',
    excerpt: 'Think Santorini is only for honey-mooners and mega-yachts? Discover the hidden volcanic vineyards, cheap local bakeries, and free caldera hikes.',
    content: `If you opened Instagram right now and searched for #Santorini, you would be bombarded with infinity pools suspended over deep blue calderas, gold champagne flutes, and private sunset catamaran tours. Popular travel media has framed this Greek gem as a playground exclusively reserved for luxury jet-setters.

But Santorini has another face. It is an island of wild volcanic cliffs, ancient agricultural villages, volcanic soils yielding sweet cherry tomatoes, and warm Aegean hospitable hearts. Here is exactly how we explored Santorini on an honest, reasonable budget—under $75 a day!

### The Fira-Oia Caldera Hike (Price: Free!)
Instead of pay-to-access view terraces, the single best sight in Santorini is the public 10km footpath winding along the caldera rim. The hike starts in Fira, winds through the quiet, cobblestoned paths of Firostefani and Imerovigli, and crosses high, red clay mountain trails before descending into Oia. Every turn reveals dramatic 360-degree ocean panoramas with zero paywalls.

### Skip the Clichés: Picnic at Oia Castle
Instead of spending 150 Euros for a dinner table in Oia during sunset, head to the local "Sklavenitis" supermarket. Grab fresh olives, locally harvested feta, ripe tomatoes, a jar of tzatziki, and a freshly baked sourdough baguette for under 8 Euros. Grab a spot on the historical ruins of Oia Byzantine Castle early, pop open a bottle of local Assyrtiko, and watch the sun dip into the Aegean for pennies on the euro.

### Where to Stay
Skip Fira and Oia for lodging. Look at Pyrgos, a beautiful medieval fortress village located in the center of the island, or Karterados. Both towns offer traditional whitewashed vaulted rooms for a fraction of caldera prices, along with authentic tavernas where the locals actually eat.`,
    date: 'April 19, 2026',
    category: 'Budget Travel',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    reads: 2450,
    comments: [
      {
        id: 'c4',
        author: 'Chloe Dupont',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        content: 'Life saver! I am heading to Greece next month and literally booked a budget room in Pyrgos after reading this! Thank you for detailing the actual supermarket and bus options.',
        date: 'April 21, 2026'
      }
    ]
  },
  {
    id: 'post-banff-photography-expedition',
    title: 'Chasing the Cyan: Landscape Photography in Banff',
    slug: 'banff-landscape-photography-tips',
    excerpt: 'Strap on your hiking boots and grab your ND filters. We explore the complex science behind Albertas teal lakes and how to photograph them.',
    content: `If you have ever stood on the edge of Moraine Lake at sunrise, your eyes might play tricks on you. The water is not merely blue; it is a vivid, glowing turquoise, as if someone poured neon pigment straight into the glacier streams.

This visual phenomenon is due to "Rock Flour"—extremely fine particles of silt ground down by glaciers grinding against mountain limestone. These micro-silts remain suspended in the lake water, reflecting the green and blue wavelengths of the sun with extreme brilliance.

### Gear Guide for Alpine Trails
When hiking Banff's high ridges, every ounce of luggage counts. Here is what I pack on my camera rig:
- **Ultra-wide angle lens (16-35mm)**: Crucial for capturing the grand scale of glacier valleys.
- **Circular Polarizer filter (CPL)**: Emphasizes the deep cyan saturation and cuts through surface water glare, revealing sunken alpine trees underneath.
- **Carbon-fiber travel tripod**: Necessary for smooth, long exposure mountain streams in Johnston Canyon.

### The Secret of Moraine Lake Sunrise
To capture the iconic perspective—known globally as the "Twenty Dollar View" (as it was featured on the Canadian twenty-dollar bill)—you must climb the Moraine Lake Rockpile trail. Position yourself facing the Valley of the Ten Peaks. At sunrise, the peaks catch the red wavelengths first, lighting up like glowing coals while the lake in the basin remains in a calm, mystical blue shadowed state.`,
    date: 'March 05, 2026',
    category: 'Travel Photography',
    image: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=1200&q=80',
    reads: 1120,
    comments: []
  }
];

export const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'ch1', text: 'Validate passport validity (Minimum 6 months left)', completed: true, category: 'Documents' },
  { id: 'ch2', text: 'Purchase multi-country travel insurance plan', completed: false, category: 'Documents' },
  { id: 'ch3', text: 'Print high-commission physical Visa paperwork', completed: false, category: 'Documents' },
  { id: 'ch4', text: 'Universal power converter adapter with USB-C portals', completed: true, category: 'Electronics' },
  { id: 'ch5', text: 'Backup charger / High-capacity power bank', completed: false, category: 'Electronics' },
  { id: 'ch6', text: 'Comfortable micro-breathable trail hiking socks', completed: true, category: 'Clothing' },
  { id: 'ch7', text: 'Windproof & waterproof lightweight shell jacket', completed: false, category: 'Clothing' },
  { id: 'ch8', text: 'Travel size TSA-approved refillable toiletry tubes', completed: false, category: 'Toiletries' },
  { id: 'ch9', text: 'Compact micro-fiber quick drying towel', completed: true, category: 'Toiletries' },
  { id: 'ch10', text: 'Small first-aid kit with pain relievers & band-aids', completed: true, category: 'Essentials' },
  { id: 'ch11', text: 'Emergency offline map downloads on Google Maps app', completed: false, category: 'Essentials' }
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  { id: 'b1', category: 'Flights', cost: 650, notes: 'Multi-city international flight tickets' },
  { id: 'b2', category: 'Accommodation', cost: 420, notes: 'Local boutique hotels & eco-lodges' },
  { id: 'b3', category: 'Food & Drinks', cost: 250, notes: 'Authentic street food markets and dinner outings' },
  { id: 'b4', category: 'Activities', cost: 180, notes: 'Museum admissions, temple tickets, and guides' },
  { id: 'b5', category: 'Local Transport', cost: 95, notes: 'Metro passes, high-speed rail, & ferry tags' },
  { id: 'b6', category: 'Insurance / Miscellaneous', cost: 75, notes: 'Travel protection covers' }
];

export const PHOTO_GALLERY: PhotoAsset[] = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80', title: 'Torii Alignment', location: 'Fushimi Inari, Kyoto', category: 'Traditional' },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80', title: 'Caldera Whitewash', location: 'Oia, Santorini', category: 'Architectural' },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80', title: 'Lioness on Ridge', location: 'Serengeti, Tanzania', category: 'Wildlife' },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=600&q=80', title: 'Turquoise Reflect', location: 'Moraine Lake, Canada', category: 'Alpine' },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80', title: 'Harbour Sails', location: 'Sydney, Australia', category: 'Urban' },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80', title: 'Mist Over Stone', location: 'Inca Terraces, Peru', category: 'Ancient' },
  { id: 'p7', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', title: 'Golden Sand Coastline', location: 'Bondi, Australia', category: 'Coastal' },
  { id: 'p8', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80', title: 'Glacier Stream Crossing', location: 'Alberta Trails, Canada', category: 'Alpine' }
];

export const TRAVEL_APPS = [
  { name: 'Google Maps Offline', category: 'Navigation', desc: 'Allows downloading high-fidelity navigation maps for areas with zero cellular signals.' },
  { name: 'Splitwise', category: 'Finance', desc: 'Saves hours of stressful accounting by tracking and organizing shared trip spendings automatically.' },
  { name: 'Google Translate', category: 'Communication', desc: 'Particularly the camera text translator - translates paper menus, signs, and timetables instantly.' },
  { name: 'Xe Currency', category: 'Finance', desc: 'Offline real-time conversion rates matching local exchange rates.' },
  { name: 'PackPoint', category: 'Preparation', desc: 'Smart packing checklist builder custom tailoring packing plans to local weather and activities.' }
];

export const VISA_RESOURCES = [
  { country: 'Schengen Area (Europe)', info: 'Short-stay Visa-exempt for up to 90 days for US/Canadian passport holders. Others must process Schengen applications online via certified partners.' },
  { country: 'Japan', info: 'Allows simple online eVisa registration systems for multiple nationalities. Short-term tourist stays of up to 15 or 90 days.' },
  { country: 'Tanzania', info: 'Requires Single Entry tourist visa. Highly recommended to file Tanzania electronic visa application online 3 weeks prior, or get Visa on Arrival at Kilimanjaro.' },
  { country: 'Australia', info: 'RequiresElectronic Travel Authority (ETA) or eVisitor authorization beforehand for US/UK/European citizens. Very fast, processed via a dedicated mobile app.' },
  { country: 'Peru', info: 'Visa-free for up to 90 days for tourist stays for citizens of North America, Europe, Australia, and South America.' }
];

export const SAFETY_TIPS = [
  { title: 'The "Two-Wallet" Countermeasure', desc: 'Keep your primary passport, bulk cash, and major backup cards in a concealed safe or RFID travel belt. Carry a lightweight decoy wallet filled with small daily cash and expiring cards for everyday street purchases.' },
  { title: 'Secure Digital Backups', desc: 'Take high-resolution photo scans of your passport bio pages, visas, health cards, and driver licenses. Save these securely inside a cloud folder available for offline access.' },
  { title: 'Public Wi-Fi Precaution', desc: 'Avoid signing into banking portals or loading private logins whilst connected to airport or cafe networks without active VPN filters.' },
  { title: 'Learn Local Emergencies', desc: 'Note down local equivalent numbers for ambulance and law authorities (e.g., 112 in Europe, 110 in Japan, 000 in Australia) instead of default 911.' }
];
