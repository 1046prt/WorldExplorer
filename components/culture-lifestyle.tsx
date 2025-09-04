"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import "@/styles/cultural-lifestyle.css";

const culturalData = [
  {
    country: "Japan",
    socialNorms: [
      "Bow when greeting others respectfully",
      "Remove shoes before entering homes",
      "Use both hands when exchanging business cards",
      "Avoid loud conversations in public transport",
      "Wait in orderly lines without pushing",
      "Give gifts with both hands and receive gracefully",
      "Avoid pointing with fingers, use open hand",
      "Respect personal space in crowded areas",
    ],
    music: {
      genre: "Gagaku / Enka / J-Pop",
      artists: [
        "Hibari Misora",
        "Kitaro",
        "Utada Hikaru",
        "X Japan",
        "Ryuichi Sakamoto",
        "Ayumi Hamasaki",
        "B'z",
        "BABYMETAL",
      ],
      sample: "Sakura Sakura",
    },
    literature: {
      authors: [
        "Yi Mun-yol",
        "Park Kyung-ni",
        "Kim Young-ha",
        "Han Kang",
        "Cho Se-hui",
        "Kim Sowol",
        "Hwang Sok-yong",
        "Shin Kyung-sook",
      ],
      works: [
        "The Vegetarian",
        "Pachinko",
        "Please Look After Mom",
        "The Handmaiden",
      ],
    },
    cuisine: {
      dishes: [
        "Kimchi",
        "Bulgogi",
        "Bibimbap",
        "Korean BBQ",
        "Japchae",
        "Tteokbokki",
        "Samgyeopsal",
        "Naengmyeon",
      ],
      ingredients: [
        "Gochujang",
        "Sesame Oil",
        "Garlic",
        "Ginger",
        "Rice",
        "Seaweed",
        "Soju",
        "Doenjang",
      ],
    },
    festivals: {
      celebrations: [
        "Lunar New Year",
        "Chuseok",
        "Buddha's Birthday",
        "Children's Day",
        "Cherry Blossom Festival",
        "Lotus Lantern Festival",
        "Boryeong Mud Festival",
        "Jinju Lantern Festival",
      ],
      traditions: [
        "Ancestral rites",
        "Traditional games",
        "Hanbok wearing",
        "Temple visits",
      ],
    },
    architecture: {
      styles: [
        "Traditional hanok",
        "Buddhist temples",
        "Joseon palaces",
        "Modern skyscrapers",
        "Apartment complexes",
        "Contemporary museums",
        "Fortress walls",
        "Garden pavilions",
      ],
      landmarks: [
        "Gyeongbokgung Palace",
        "Bulguksa Temple",
        "N Seoul Tower",
        "Jeju Island",
        "Hahoe Village",
        "Seoraksan National Park",
        "Busan Tower",
        "Lotte World Tower",
      ],
    },
    values: {
      principles: [
        "Filial piety",
        "Educational excellence",
        "Hard work ethic",
        "Social harmony",
        "Respect for age",
        "Technology innovation",
        "Beauty standards",
        "Group conformity",
      ],
      concepts: ["Jeong", "Nunchi", "Han", "Aegyo"],
    },
  },
  {
    country: "Australia",
    socialNorms: [
      "Greet with casual 'G'day' or friendly wave",
      "Maintain relaxed and informal communication style",
      "Share drinks and meals in group settings",
      "Show respect for Aboriginal culture and land",
      "Use self-deprecating humor frequently",
      "Support the underdog in competitions",
      "Spend time outdoors and at beaches",
      "Value egalitarian and fair treatment",
    ],
    music: {
      genre: "Rock / Country / Electronic / Indigenous",
      artists: [
        "AC/DC",
        "INXS",
        "Kylie Minogue",
        "Midnight Oil",
        "Sia",
        "Tame Impala",
        "Yothu Yindi",
        "Keith Urban",
      ],
      sample: "Waltzing Matilda",
    },
    literature: {
      authors: [
        "Patrick White",
        "Tim Winton",
        "Colleen McCullough",
        "Peter Carey",
        "Thomas Keneally",
        "Christina Stead",
        "David Malouf",
        "Kate Grenville",
      ],
      works: [
        "The Thorn Birds",
        "Cloudstreet",
        "Oscar and Lucinda",
        "Schindler's Ark",
      ],
    },
    cuisine: {
      dishes: [
        "Meat Pie",
        "Pavlova",
        "Barramundi",
        "Lamington",
        "Vegemite Toast",
        "Anzac Biscuits",
        "Tim Tam",
        "Kangaroo Steak",
      ],
      ingredients: [
        "Beef",
        "Seafood",
        "Bush Tucker",
        "Macadamia",
        "Wine",
        "Beer",
        "Eucalyptus Honey",
        "Native Pepperberry",
      ],
    },
    festivals: {
      celebrations: [
        "Australia Day",
        "Melbourne Cup",
        "Sydney Festival",
        "Adelaide Fringe",
        "Byron Bay Blues",
        "Splendour in the Grass",
        "NAIDOC Week",
        "Anzac Day",
      ],
      traditions: [
        "BBQ gatherings",
        "Cricket watching",
        "Beach culture",
        "Indigenous celebrations",
      ],
    },
    architecture: {
      styles: [
        "Colonial buildings",
        "Federation houses",
        "Modern glass towers",
        "Aboriginal architecture",
        "Queenslander homes",
        "Contemporary museums",
        "Coastal resorts",
        "Outback stations",
      ],
      landmarks: [
        "Sydney Opera House",
        "Harbour Bridge",
        "Uluru",
        "Twelve Apostles",
        "Parliament House Canberra",
        "Royal Exhibition Building",
        "Cradle Mountain",
        "Kakadu National Park",
      ],
    },
    values: {
      principles: [
        "Mateship loyalty",
        "Fair go equality",
        "Laid-back attitude",
        "Outdoor lifestyle",
        "Multiculturalism",
        "Sports passion",
        "Environmental care",
        "Tall poppy syndrome",
      ],
      concepts: ["Mateship", "Fair Dinkum", "She'll be right", "No worries"],
    },
  },
  {
    country: "Nigeria",
    socialNorms: [
      "Greet elders with proper respect and titles",
      "Use right hand for eating and greeting",
      "Show deference to age and social status",
      "Participate in community celebrations together",
      "Dress modestly and appropriately for occasions",
      "Share food and resources generously",
      "Respect traditional and religious customs",
      "Maintain extended family connections strongly",
    ],
    music: {
      genre: "Afrobeat / Highlife / Juju / Contemporary",
      artists: [
        "Fela Kuti",
        "King Sunny Ade",
        "2Baba",
        "Wizkid",
        "Davido",
        "Burna Boy",
        "Tiwa Savage",
        "Yemi Alade",
      ],
      sample: "Water No Get Enemy",
    },
    literature: {
      authors: [
        "Chinua Achebe",
        "Wole Soyinka",
        "Chimamanda Ngozi Adichie",
        "Ben Okri",
        "Buchi Emecheta",
        "Cyprian Ekwensi",
        "Amos Tutuola",
        "Sefi Atta",
      ],
      works: [
        "Things Fall Apart",
        "Half of a Yellow Sun",
        "The Joys of Motherhood",
        "Purple Hibiscus",
      ],
    },
    cuisine: {
      dishes: [
        "Jollof Rice",
        "Pounded Yam",
        "Suya",
        "Egusi Soup",
        "Pepper Soup",
        "Akara",
        "Moi Moi",
        "Chin Chin",
      ],
      ingredients: [
        "Yam",
        "Plantain",
        "Palm Oil",
        "Pepper",
        "Stockfish",
        "Okra",
        "Cassava",
        "Kola Nut",
      ],
    },
    festivals: {
      celebrations: [
        "Independence Day",
        "Eid celebrations",
        "Christmas",
        "New Yam Festival",
        "Durbar Festival",
        "Calabar Carnival",
        "Ojude Oba",
        "Osun Festival",
      ],
      traditions: [
        "Traditional dancing",
        "Mask ceremonies",
        "Drumming",
        "Storytelling",
      ],
    },
    architecture: {
      styles: [
        "Traditional compounds",
        "Colonial buildings",
        "Modern skyscrapers",
        "Mosque architecture",
        "Church designs",
        "Palace structures",
        "Contemporary glass",
        "Vernacular housing",
      ],
      landmarks: [
        "National Theatre Lagos",
        "Zuma Rock",
        "Olumo Rock",
        "Nike Art Gallery",
        "National Mosque Abuja",
        "Benin City Walls",
        "Jos Plateau",
        "Yankari National Park",
      ],
    },
    values: {
      principles: [
        "Community solidarity",
        "Respect for elders",
        "Religious devotion",
        "Hospitality generosity",
        "Extended family bonds",
        "Cultural pride",
        "Hard work ethic",
        "Social harmony",
      ],
      concepts: ["Ubuntu", "Omoluwabi", "Harambee", "Communalism"],
    },
  },
  {
    country: "Argentina",
    socialNorms: [
      "Greet with warm kisses on both cheeks",
      "Eat dinner very late in the evening",
      "Show passion for football and sports",
      "Engage in animated political discussions",
      "Drink mate tea in social circles",
      "Take long afternoon siestas when possible",
      "Express emotions openly and dramatically",
      "Maintain close family relationships",
    ],
    music: {
      genre: "Tango / Folk / Rock Nacional / Classical",
      artists: [
        "Carlos Gardel",
        "Astor Piazzolla",
        "Mercedes Sosa",
        "Charly García",
        "Gustavo Cerati",
        "Manu Chao",
        "Fito Páez",
        "Soledad",
      ],
      sample: "La Cumparsita",
    },
    literature: {
      authors: [
        "Jorge Luis Borges",
        "Julio Cortázar",
        "Adolfo Bioy Casares",
        "Ernesto Sabato",
        "Manuel Puig",
        "Roberto Arlt",
        "Silvina Ocampo",
        "Tomás Eloy Martínez",
      ],
      works: [
        "Labyrinths",
        "Hopscotch",
        "On Heroes and Tombs",
        "Kiss of the Spider Woman",
      ],
    },
    cuisine: {
      dishes: [
        "Asado",
        "Empanadas",
        "Milanesa",
        "Locro",
        "Dulce de Leche",
        "Choripán",
        "Provoleta",
        "Alfajores",
      ],
      ingredients: [
        "Beef",
        "Wine",
        "Chimichurri",
        "Corn",
        "Cheese",
        "Yerba Mate",
        "Dulce de Leche",
        "Herbs",
      ],
    },
    festivals: {
      celebrations: [
        "Carnival",
        "Independence Day",
        "Day of Tradition",
        "Wine Harvest Festival",
        "Tango Festival",
        "Folklore Festival",
        "Oktoberfest",
        "Book Fair",
      ],
      traditions: [
        "Tango dancing",
        "Gaucho culture",
        "Mate sharing",
        "Asado gatherings",
      ],
    },
    architecture: {
      styles: [
        "Colonial Spanish",
        "European immigration",
        "Art deco",
        "Modern glass towers",
        "Tango neighborhood",
        "Estancia ranches",
        "Contemporary museums",
        "Patagonian lodges",
      ],
      landmarks: [
        "Casa Rosada",
        "Recoleta Cemetery",
        "Teatro Colón",
        "Iguazu Falls",
        "Perito Moreno Glacier",
        "Caminito",
        "Palacio Barolo",
        "Ushuaia",
      ],
    },
    values: {
      principles: [
        "Passion for life",
        "Family closeness",
        "Cultural sophistication",
        "Sports enthusiasm",
        "Social equality",
        "Artistic expression",
        "Political engagement",
        "European heritage pride",
      ],
      concepts: ["Porteño", "Che", "Tango spirit", "Gaucho tradition"],
    },
  },
  {
    country: "Turkey",
    socialNorms: [
      "Remove shoes when entering homes",
      "Show great respect for elderly people",
      "Accept hospitality tea offerings graciously",
      "Avoid showing soles of feet to others",
      "Greet with handshakes and cheek kisses",
      "Dress modestly when visiting mosques",
      "Use formal titles for respected individuals",
      "Participate in communal meal sharing",
    ],
    music: {
      genre: "Turkish Classical / Folk / Arabesque / Pop",
      artists: [
        "Sezen Aksu",
        "Tarkan",
        "Barış Manço",
        "Ajda Pekkan",
        "Müslüm Gürses",
        "Sertab Erener",
        "Kenan Doğulu",
        "Gülben Ergen",
      ],
      sample: "Üsküdar'a Gider İken",
    },
    literature: {
      authors: [
        "Orhan Pamuk",
        "Yaşar Kemal",
        "Nazim Hikmet",
        "Sabahattin Ali",
        "Aziz Nesin",
        "Elif Şafak",
        "Ahmet Hamdi Tanpınar",
        "Oğuz Atay",
      ],
      works: [
        "My Name is Red",
        "Memed, My Hawk",
        "The Time Regulation Institute",
        "The Bastard of Istanbul",
      ],
    },
    cuisine: {
      dishes: [
        "Kebab",
        "Baklava",
        "Turkish Delight",
        "Döner",
        "Meze",
        "Pide",
        "Börek",
        "Turkish Coffee",
      ],
      ingredients: [
        "Lamb",
        "Yogurt",
        "Olive Oil",
        "Spices",
        "Phyllo Dough",
        "Honey",
        "Turkish Tea",
        "Pomegranate",
      ],
    },
    festivals: {
      celebrations: [
        "Ramadan",
        "Eid celebrations",
        "Republic Day",
        "Children's Day",
        "Victory Day",
        "Oil Wrestling",
        "Cherry Festival",
        "Whirling Dervish Festival",
      ],
      traditions: [
        "Henna ceremonies",
        "Turkish baths",
        "Carpet weaving",
        "Tea culture",
      ],
    },
    architecture: {
      styles: [
        "Ottoman mosques",
        "Byzantine churches",
        "Seljuk architecture",
        "Modern Ankara",
        "Cappadocia caves",
        "Wooden houses",
        "Contemporary glass",
        "Ancient ruins",
      ],
      landmarks: [
        "Hagia Sophia",
        "Blue Mosque",
        "Topkapi Palace",
        "Cappadocia",
        "Pamukkale",
        "Ephesus",
        "Mount Ararat",
        "Galata Tower",
      ],
    },
    values: {
      principles: [
        "Hospitality generosity",
        "Family honor",
        "Religious respect",
        "Cultural bridge",
        "Historical pride",
        "Community solidarity",
        "Educational pursuit",
        "Secular modernity",
      ],
      concepts: ["Misafirperverlik", "Namus", "Gurur", "Hoşgörü"],
    },
  },
  {
    country: "Canada",
    socialNorms: [
      "Apologize frequently even when not at fault",
      "Hold doors open for others politely",
      "Show respect for both English and French",
      "Embrace multiculturalism and diversity",
      "Wait patiently in orderly queues",
      "Discuss weather as common conversation starter",
      "Remove shoes when entering most homes",
      "Show politeness and consideration to strangers",
    ],
    music: {
      genre: "Folk / Rock / Country / Indigenous",
      artists: [
        "Céline Dion",
        "Joni Mitchell",
        "Neil Young",
        "The Tragically Hip",
        "Shania Twain",
        "Drake",
        "Alanis Morissette",
        "Leonard Cohen",
      ],
      sample: "O Canada",
    },
    literature: {
      authors: [
        "Margaret Atwood",
        "Alice Munro",
        "Robertson Davies",
        "Mordecai Richler",
        "Michael Ondaatje",
        "Yann Martel",
        "Carol Shields",
        "Thomas King",
      ],
      works: [
        "The Handmaid's Tale",
        "Life of Pi",
        "The English Patient",
        "Anne of Green Gables",
      ],
    },
    cuisine: {
      dishes: [
        "Poutine",
        "Tourtière",
        "Butter Tarts",
        "Nanaimo Bars",
        "Maple Syrup",
        "Bannock",
        "Caesar Cocktail",
        "Montreal Bagels",
      ],
      ingredients: [
        "Maple Syrup",
        "Salmon",
        "Wild Game",
        "Cheese Curds",
        "Cranberries",
        "Fiddleheads",
        "Ice Wine",
        "Tim Hortons Coffee",
      ],
    },
    festivals: {
      celebrations: [
        "Canada Day",
        "Winter Carnival",
        "Calgary Stampede",
        "Toronto Film Festival",
        "Folklorama",
        "Just for Laughs",
        "Caribana",
        "Indigenous Pow Wows",
      ],
      traditions: [
        "Ice hockey",
        "Curling",
        "Maple syrup making",
        "Cottage life",
      ],
    },
    architecture: {
      styles: [
        "Log cabins",
        "Gothic Revival",
        "Modern glass towers",
        "Indigenous longhouses",
        "French colonial",
        "Prairie architecture",
        "Contemporary museums",
        "Sustainable design",
      ],
      landmarks: [
        "CN Tower",
        "Parliament Hill",
        "Château Frontenac",
        "Rocky Mountains",
        "Niagara Falls",
        "Bay of Fundy",
        "Northern Lights",
        "Banff National Park",
      ],
    },
    values: {
      principles: [
        "Politeness courtesy",
        "Multiculturalism acceptance",
        "Peace and order",
        "Environmental stewardship",
        "Healthcare universality",
        "Bilingualism respect",
        "Indigenous reconciliation",
        "Social equality",
      ],
      concepts: ["Eh?", "Sorry culture", "Multiculturalism", "True North"],
    },
  },
  {
    country: "Thailand",
    socialNorms: [
      "Greet with 'wai' gesture and bow",
      "Remove shoes before entering temples and homes",
      "Show deep respect for the royal family",
      "Avoid touching people's heads or pointing feet",
      "Keep calm and avoid showing anger publicly",
      "Dress modestly when visiting sacred places",
      "Use both hands when giving or receiving items",
      "Smile frequently and maintain pleasant demeanor",
    ],
    music: {
      genre: "Traditional Thai / Luk Thung / Pop / Classical",
      artists: [
        "Carabao",
        "Tata Young",
        "Palmy",
        "Bodyslam",
        "Pumpuang Duangjan",
        "Christina Aguilar",
        "Bird Thongchai",
        "Da Endorphine",
      ],
      sample: "Loy Krathong",
    },
    literature: {
      authors: [
        "Seni Saowaphong",
        "Kukrit Pramoj",
        "Chart Korbjitti",
        "Pira Sudham",
        "Siburapha",
        "Tomyantee",
        "Prabda Yoon",
        "Veeraporn Nitiprapha",
      ],
      works: [
        "Four Reigns",
        "The Politician",
        "Mad Dogs & Co",
        "Jasmine Nights",
      ],
    },
    cuisine: {
      dishes: [
        "Pad Thai",
        "Tom Yum",
        "Green Curry",
        "Som Tam",
        "Massaman Curry",
        "Mango Sticky Rice",
        "Pad Kra Pao",
        "Thai Fried Rice",
      ],
      ingredients: [
        "Rice",
        "Fish Sauce",
        "Coconut Milk",
        "Chili",
        "Lemongrass",
        "Galangal",
        "Thai Basil",
        "Lime",
      ],
    },
    festivals: {
      celebrations: [
        "Songkran",
        "Loy Krathong",
        "Vegetarian Festival",
        "Royal Ploughing Ceremony",
        "Rocket Festival",
        "Phi Ta Khon",
        "Yi Peng",
        "King's Birthday",
      ],
      traditions: [
        "Water splashing",
        "Floating offerings",
        "Temple visits",
        "Traditional dancing",
      ],
    },
    architecture: {
      styles: [
        "Buddhist temples",
        "Traditional Thai houses",
        "Royal palaces",
        "Modern Bangkok towers",
        "Floating markets",
        "Beach resorts",
        "Mountain lodges",
        "Contemporary museums",
      ],
      landmarks: [
        "Grand Palace",
        "Wat Pho",
        "Wat Arun",
        "Ayutthaya",
        "Sukhothai",
        "Chiang Mai temples",
        "Phi Phi Islands",
        "Golden Triangle",
      ],
    },
    values: {
      principles: [
        "Royal respect",
        "Buddhist teachings",
        "Sanuk (enjoyment)",
        "Mai pen rai (no worries)",
        "Face saving",
        "Family harmony",
        "Hospitality kindness",
        "Spiritual merit making",
      ],
      concepts: ["Sanuk", "Mai pen rai", "Kreng jai", "Bunkhun"],
    },
  },
  {
    country: "South Africa",
    socialNorms: [
      "Greet in local languages when possible",
      "Show respect for diverse cultural backgrounds",
      "Participate in 'braai' barbecue gatherings",
      "Address elders with proper titles and respect",
      "Share food and drinks in community settings",
      "Acknowledge apartheid history sensitively",
      "Support local sports teams enthusiastically",
      "Practice 'Ubuntu' philosophy of interconnectedness",
    ],
    music: {
      genre: "Jazz / Kwaito / House / Traditional",
      artists: [
        "Miriam Makeba",
        "Hugh Masekela",
        "Ladysmith Black Mambazo",
        "Brenda Fassie",
        "Johnny Clegg",
        "Freshlyground",
        "Black Coffee",
        "Master KG",
      ],
      sample: "Pata Pata",
    },
    literature: {
      authors: [
        "Nelson Mandela",
        "J.M. Coetzee",
        "Nadine Gordimer",
        "Alan Paton",
        "André Brink",
        "Zakes Mda",
        "Damon Galgut",
        "Lauren Beukes",
      ],
      works: [
        "Long Walk to Freedom",
        "Cry, the Beloved Country",
        "Disgrace",
        "July's People",
      ],
    },
    cuisine: {
      dishes: [
        "Braai",
        "Bobotie",
        "Biltong",
        "Potjiekos",
        "Sosaties",
        "Koeksisters",
        "Boerewors",
        "Milk Tart",
      ],
      ingredients: [
        "Rooibos Tea",
        "Game Meat",
        "Maize",
        "Sweet Potato",
        "Morogo",
        "Chakalaka",
        "Wine",
        "Rusks",
      ],
    },
    festivals: {
      celebrations: [
        "Heritage Day",
        "Freedom Day",
        "Youth Day",
        "Human Rights Day",
        "Cape Town Jazz Festival",
        "National Arts Festival",
        "Hermanus Whale Festival",
        "Knysna Oyster Festival",
      ],
      traditions: [
        "Traditional dancing",
        "Storytelling",
        "Craft making",
        "Community braais",
      ],
    },
    architecture: {
      styles: [
        "Cape Dutch",
        "Victorian colonial",
        "Art deco",
        "Apartheid townships",
        "Modern glass towers",
        "Traditional rondavels",
        "Contemporary museums",
        "Wine estate buildings",
      ],
      landmarks: [
        "Table Mountain",
        "Robben Island",
        "Kruger National Park",
        "Cape of Good Hope",
        "Drakensberg Mountains",
        "Victoria & Alfred Waterfront",
        "Sun City",
        "Blyde River Canyon",
      ],
    },
    values: {
      principles: [
        "Ubuntu philosophy",
        "Diversity celebration",
        "Reconciliation healing",
        "Community solidarity",
        "Resilience strength",
        "Natural beauty appreciation",
        "Sports passion",
        "Cultural preservation",
      ],
      concepts: [
        "Ubuntu",
        "Rainbow Nation",
        "Braai culture",
        "Vuvuzela spirit",
      ],
    },
  },
  {
    country: "Sweden",
    socialNorms: [
      "Value personal space and avoid crowding others",
      "Maintain punctuality for all appointments",
      "Practice 'lagom' moderation in lifestyle choices",
      "Remove shoes when entering homes",
      "Enjoy 'fika' coffee breaks with colleagues",
      "Support gender equality in all situations",
      "Respect environmental sustainability practices",
      "Communicate directly but diplomatically",
    ],
    music: {
      genre: "Pop / Folk / Electronic / Metal",
      artists: [
        "ABBA",
        "Roxette",
        "The Cardigans",
        "Robyn",
        "Avicii",
        "Swedish House Mafia",
        "Europe",
        "Kent",
      ],
      sample: "Du gamla, Du fria",
    },
    literature: {
      authors: [
        "Astrid Lindgren",
        "Stieg Larsson",
        "Henning Mankell",
        "Selma Lagerlöf",
        "August Strindberg",
        "Tomas Tranströmer",
        "Camilla Läckberg",
        "Jonas Jonasson",
      ],
      works: [
        "Pippi Longstocking",
        "The Girl with the Dragon Tattoo",
        "Wallander series",
        "The Hundred-Year-Old Man",
      ],
    },
    cuisine: {
      dishes: [
        "Meatballs",
        "Gravlax",
        "Prinsesstårta",
        "Knäckebröd",
        "Surströmming",
        "Janssons Frestelse",
        "Pepparkakor",
        "Semla",
      ],
      ingredients: [
        "Fish",
        "Potatoes",
        "Dill",
        "Lingonberries",
        "Aquavit",
        "Rye",
        "Cream",
        "Cardamom",
      ],
    },
    festivals: {
      celebrations: [
        "Midsummer",
        "Lucia Day",
        "Walpurgis Night",
        "Crayfish Party",
        "Nobel Prize Ceremony",
        "Stockholm Pride",
        "Göteborg Film Festival",
        "Way Out West",
      ],
      traditions: [
        "Maypole dancing",
        "Candle processions",
        "Bonfire lighting",
        "Herring eating",
      ],
    },
    architecture: {
      styles: [
        "Medieval churches",
        "Red wooden houses",
        "Functionalist design",
        "Modern glass buildings",
        "IKEA aesthetics",
        "Royal palaces",
        "Contemporary museums",
        "Sustainable architecture",
      ],
      landmarks: [
        "Vasa Museum",
        "Stockholm Old Town",
        "Icehotel",
        "Turning Torso",
        "Drottningholm Palace",
        "Abisko National Park",
        "Gotland",
        "Kiruna Mine",
      ],
    },
    values: {
      principles: [
        "Lagom balance",
        "Gender equality",
        "Environmental care",
        "Social welfare",
        "Work-life balance",
        "Democratic participation",
        "Innovation technology",
        "Cultural openness",
      ],
      concepts: ["Lagom", "Jantelagen", "Allemansrätten", "Trygghet"],
    },
  },
  {
    country: "Morocco",
    socialNorms: [
      "Greet with 'As-salaam alaikum' or 'Bonjour'",
      "Remove shoes when entering homes and mosques",
      "Use right hand for eating and greeting",
      "Dress modestly, covering shoulders and legs",
      "Accept mint tea hospitality graciously",
      "Bargain respectfully in traditional markets",
      "Show great respect for elders and parents",
      "Avoid public displays of affection",
    ],
    music: {
      genre: "Gnawa / Chaabi / Andalusian / Rai",
      artists: [
        "Nass El Ghiwane",
        "Cheb Khaled",
        "Saida Fikri",
        "Hamid El Kasri",
        "Master Musicians of Jajouka",
        "Hindi Zahra",
        "Douzi",
        "Asma Lmnawar",
      ],
      sample: "Lamma Bada Yatathanna",
    },
    literature: {
      authors: [
        "Tahar Ben Jelloun",
        "Mohammed Choukri",
        "Driss Chraïbi",
        "Fatima Mernissi",
        "Leila Abouzeid",
        "Mohamed Zafzaf",
        "Abdellah Taïa",
        "Youssef Fadel",
      ],
      works: [
        "The Sand Child",
        "For Bread Alone",
        "Dreams of Trespass",
        "The Simple Past",
      ],
    },
    cuisine: {
      dishes: [
        "Tagine",
        "Couscous",
        "Pastilla",
        "Harira",
        "Mechoui",
        "Chebakia",
        "Mint Tea",
        "Rfissa",
      ],
      ingredients: [
        "Argan Oil",
        "Preserved Lemons",
        "Ras el Hanout",
        "Saffron",
        "Olives",
        "Almonds",
        "Mint",
        "Dates",
      ],
    },
    festivals: {
      celebrations: [
        "Eid al-Fitr",
        "Eid al-Adha",
        "Ramadan",
        "Mawlid",
        "Gnawa Festival",
        "Fez Festival",
        "Rose Festival",
        "Cherry Festival",
      ],
      traditions: [
        "Henna ceremonies",
        "Traditional music",
        "Carpet weaving",
        "Calligraphy",
      ],
    },
    architecture: {
      styles: [
        "Islamic architecture",
        "Moorish designs",
        "Berber kasbahs",
        "French colonial",
        "Riad courtyards",
        "Minaret towers",
        "Modern Casablanca",
        "Desert fortifications",
      ],
      landmarks: [
        "Hassan II Mosque",
        "Fez Medina",
        "Marrakech Square",
        "Chefchaouen",
        "Ait Benhaddou",
        "Atlas Mountains",
        "Sahara Desert",
        "Rabat Kasbah",
      ],
    },
    values: {
      principles: [
        "Religious devotion",
        "Family honor",
        "Hospitality generosity",
        "Respect for tradition",
        "Community solidarity",
        "Artistic craftsmanship",
        "Multilingual ability",
        "Desert resilience",
      ],
      concepts: ["Baraka", "Haram", "Inshallah", "Mektoub"],
    },
  },

  {
    country: "India",
    socialNorms: [
      "Use right hand for eating and greeting",
      "Remove shoes before entering homes and temples",
      "Greet elders with 'Namaste' and touching feet",
      "Dress modestly when visiting religious places",
      "Accept hospitality graciously when offered",
      "Avoid public displays of affection",
      "Respect cows as sacred animals",
      "Use proper titles when addressing elders",
    ],
    music: {
      genre: "Carnatic & Hindustani Classical / Bollywood",
      artists: [
        "Ravi Shankar",
        "Lata Mangeshkar",
        "A.R. Rahman",
        "Ustad Zakir Hussain",
        "M.S. Subbulakshmi",
        "Pandit Jasraj",
        "Kishore Kumar",
        "Asha Bhosle",
      ],
      sample: "Raga Bhairav",
    },
    literature: {
      authors: [
        "Rabindranath Tagore",
        "R.K. Narayan",
        "Salman Rushdie",
        "Arundhati Roy",
        "Vikram Seth",
        "Amitav Ghosh",
        "Khushwant Singh",
        "Premchand",
      ],
      works: [
        "Gitanjali",
        "Malgudi Days",
        "Midnight's Children",
        "The God of Small Things",
      ],
    },
    cuisine: {
      dishes: [
        "Biryani",
        "Curry",
        "Dosa",
        "Tandoori Chicken",
        "Samosa",
        "Dal",
        "Naan",
        "Masala Chai",
      ],
      ingredients: [
        "Turmeric",
        "Cumin",
        "Coriander",
        "Cardamom",
        "Garam Masala",
        "Basmati Rice",
        "Lentils",
        "Coconut",
      ],
    },
    festivals: {
      celebrations: [
        "Diwali",
        "Holi",
        "Dussehra",
        "Eid",
        "Christmas",
        "Ganesh Chaturthi",
        "Karva Chauth",
        "Navratri",
      ],
      traditions: [
        "Rangoli patterns",
        "Mehendi application",
        "Garland making",
        "Traditional dancing",
      ],
    },
    architecture: {
      styles: [
        "Mughal architecture",
        "Dravidian temples",
        "Colonial buildings",
        "Haveli mansions",
        "Buddhist stupas",
        "Jain temples",
        "Modern IT complexes",
        "Traditional courtyards",
      ],
      landmarks: [
        "Taj Mahal",
        "Red Fort",
        "Khajuraho Temples",
        "Hampi",
        "Golden Temple",
        "Ajanta Caves",
        "Gateway of India",
        "Lotus Temple",
      ],
    },
    values: {
      principles: [
        "Family unity",
        "Respect for teachers",
        "Spiritual seeking",
        "Hospitality to guests",
        "Ahimsa (non-violence)",
        "Dharma (righteous duty)",
        "Karma (action consequences)",
        "Unity in diversity",
      ],
      concepts: [
        "Atithi Devo Bhava",
        "Vasudhaiva Kutumbakam",
        "Satyameva Jayate",
        "Sarve Bhavantu Sukhinah",
      ],
    },
  },
  {
    country: "France",
    socialNorms: [
      "Greet with 'Bonjour' before any conversation",
      "Eat meals slowly and enjoy social dining",
      "Keep hands visible on the table while eating",
      "Dress elegantly and pay attention to style",
      "Maintain intellectual conversations",
      "Respect lunch hours and avoid work calls",
      "Use formal 'vous' until invited to use 'tu'",
      "Appreciate art, wine, and culinary excellence",
    ],
    music: {
      genre: "Chanson / Electronic / Classical",
      artists: [
        "Édith Piaf",
        "Charles Aznavour",
        "Daft Punk",
        "Serge Gainsbourg",
        "Céline Dion",
        "Stromae",
        "Zaz",
        "Christine and the Queens",
      ],
      sample: "La Vie en Rose",
    },
    literature: {
      authors: [
        "Victor Hugo",
        "Albert Camus",
        "Marcel Proust",
        "Voltaire",
        "Simone de Beauvoir",
        "Jean-Paul Sartre",
        "Alexandre Dumas",
        "Gustave Flaubert",
      ],
      works: [
        "Les Misérables",
        "The Stranger",
        "In Search of Lost Time",
        "The Count of Monte Cristo",
      ],
    },
    cuisine: {
      dishes: [
        "Coq au Vin",
        "Bouillabaisse",
        "Croissant",
        "Ratatouille",
        "Foie Gras",
        "Escargot",
        "Crème Brûlée",
        "Quiche Lorraine",
      ],
      ingredients: [
        "Wine",
        "Cheese",
        "Butter",
        "Herbs de Provence",
        "Baguette",
        "Truffle",
        "Champagne",
        "Olive Oil",
      ],
    },
    festivals: {
      celebrations: [
        "Bastille Day",
        "Cannes Film Festival",
        "Tour de France",
        "Fête de la Musique",
        "Christmas Markets",
        "Beaujolais Nouveau",
        "Nice Carnival",
        "Avignon Theatre Festival",
      ],
      traditions: [
        "Wine tasting",
        "Fashion weeks",
        "Art exhibitions",
        "Literary salons",
      ],
    },
    architecture: {
      styles: [
        "Gothic cathedrals",
        "Baroque palaces",
        "Art Nouveau",
        "Haussmann boulevards",
        "Châteaux",
        "Modern glass pyramids",
        "Romanesque churches",
        "Contemporary museums",
      ],
      landmarks: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame",
        "Palace of Versailles",
        "Arc de Triomphe",
        "Sacré-Cœur",
        "Mont Saint-Michel",
        "Château de Chambord",
      ],
    },
    values: {
      principles: [
        "Liberté, égalité, fraternité",
        "Intellectual discourse",
        "Culinary excellence",
        "Fashion and style",
        "Cultural preservation",
        "Secular values",
        "Work-life balance",
        "Artistic appreciation",
      ],
      concepts: [
        "Savoir-vivre",
        "L'art de vivre",
        "Joie de vivre",
        "Esprit critique",
      ],
    },
  },
  {
    country: "Brazil",
    socialNorms: [
      "Be friendly and greet people warmly",
      "Arrive fashionably late to social events",
      "Enjoy long meals with animated conversations",
      "Show physical affection through hugs and kisses",
      "Participate enthusiastically in group activities",
      "Respect personal relationships over punctuality",
      "Share food and drinks generously",
      "Express emotions openly and authentically",
    ],
    music: {
      genre: "Samba / Bossa Nova / MPB / Forró",
      artists: [
        "João Gilberto",
        "Antonio Carlos Jobim",
        "Gilberto Gil",
        "Caetano Veloso",
        "Ivete Sangalo",
        "Seu Jorge",
        "Anitta",
        "Djavan",
      ],
      sample: "Girl from Ipanema",
    },
    literature: {
      authors: [
        "Machado de Assis",
        "Paulo Coelho",
        "Clarice Lispector",
        "Jorge Amado",
        "Lygia Fagundes Telles",
        "Mário de Andrade",
        "Graciliano Ramos",
        "Carolina Maria de Jesus",
      ],
      works: [
        "Dom Casmurro",
        "The Alchemist",
        "The Hour of the Star",
        "Gabriela, Clove and Cinnamon",
      ],
    },
    cuisine: {
      dishes: [
        "Feijoada",
        "Pão de Açúcar",
        "Coxinha",
        "Brigadeiro",
        "Açaí Bowl",
        "Moqueca",
        "Churrasco",
        "Caipirinha",
      ],
      ingredients: [
        "Black Beans",
        "Cassava",
        "Coconut",
        "Açaí",
        "Cachaça",
        "Palm Hearts",
        "Guaraná",
        "Passion Fruit",
      ],
    },
    festivals: {
      celebrations: [
        "Carnival",
        "Festa Junina",
        "New Year's Eve at Copacabana",
        "Rock in Rio",
        "Parintins Folklore Festival",
        "Oktoberfest Blumenau",
        "Salvador Summer Festival",
        "São Paulo Art Biennial",
      ],
      traditions: [
        "Samba dancing",
        "Capoeira performances",
        "Beach celebrations",
        "Street parties",
      ],
    },
    architecture: {
      styles: [
        "Colonial baroque",
        "Modernist concrete",
        "Tropical architecture",
        "Favela organic growth",
        "Oscar Niemeyer designs",
        "Portuguese tiles",
        "Contemporary glass",
        "Sustainable eco-buildings",
      ],
      landmarks: [
        "Christ the Redeemer",
        "Brasília Cathedral",
        "Sugarloaf Mountain",
        "Amazon Theatre",
        "São Paulo Museum of Art",
        "Pelourinho",
        "Iguazu Falls",
        "Copacabana Beach",
      ],
    },
    values: {
      principles: [
        "Family togetherness",
        "Friendship loyalty",
        "Celebration of life",
        "Racial diversity acceptance",
        "Natural beauty appreciation",
        "Music and dance importance",
        "Hospitality to strangers",
        "Optimism despite challenges",
      ],
      concepts: ["Saudade", "Jeitinho brasileiro", "Ginga", "Alegria"],
    },
  },
  {
    country: "Germany",
    socialNorms: [
      "Be extremely punctual for all appointments",
      "Recycle properly and follow environmental rules",
      "Use formal titles until explicitly invited otherwise",
      "Maintain direct and honest communication",
      "Respect quiet hours in residential areas",
      "Follow rules and regulations precisely",
      "Plan activities well in advance",
      "Value efficiency and orderliness in work",
    ],
    music: {
      genre: "Classical / Krautrock / Electronic / Folk",
      artists: [
        "Beethoven",
        "Bach",
        "Kraftwerk",
        "Rammstein",
        "Nina Hagen",
        "Herbert Grönemeyer",
        "Nena",
        "Helene Fischer",
      ],
      sample: "Ode to Joy",
    },
    literature: {
      authors: [
        "Johann Wolfgang von Goethe",
        "Thomas Mann",
        "Franz Kafka",
        "Hermann Hesse",
        "Heinrich Böll",
        "Günter Grass",
        "Bertolt Brecht",
        "Friedrich Nietzsche",
      ],
      works: [
        "Faust",
        "The Magic Mountain",
        "The Metamorphosis",
        "Steppenwolf",
      ],
    },
    cuisine: {
      dishes: [
        "Sauerbraten",
        "Bratwurst",
        "Sauerkraut",
        "Pretzel",
        "Schnitzel",
        "Black Forest Cake",
        "Currywurst",
        "Spätzle",
      ],
      ingredients: [
        "Beer",
        "Rye Bread",
        "Mustard",
        "Cabbage",
        "Pork",
        "Potatoes",
        "Hops",
        "Apples",
      ],
    },
    festivals: {
      celebrations: [
        "Oktoberfest",
        "Christmas Markets",
        "Carnival",
        "Unity Day",
        "May Day",
        "Walpurgis Night",
        "Wine Festivals",
        "Berlin Film Festival",
      ],
      traditions: [
        "Beer gardens",
        "Christmas tree decorating",
        "Easter egg hunts",
        "Castle visits",
      ],
    },
    architecture: {
      styles: [
        "Gothic cathedrals",
        "Baroque palaces",
        "Bauhaus modernism",
        "Half-timbered houses",
        "Medieval castles",
        "Industrial heritage",
        "Contemporary glass",
        "Sustainable design",
      ],
      landmarks: [
        "Brandenburg Gate",
        "Neuschwanstein Castle",
        "Cologne Cathedral",
        "Bauhaus Dessau",
        "Berlin Wall Memorial",
        "Sanssouci Palace",
        "Heidelberg Castle",
        "Frauenkirche Dresden",
      ],
    },
    values: {
      principles: [
        "Punctuality and reliability",
        "Environmental responsibility",
        "Quality craftsmanship",
        "Educational excellence",
        "Rule of law",
        "Social responsibility",
        "Innovation and technology",
        "Historical awareness",
      ],
      concepts: ["Ordnung", "Gemütlichkeit", "Bildung", "Gründlichkeit"],
    },
  },
  {
    country: "Italy",
    socialNorms: [
      "Greet with warm embraces and air kisses",
      "Take long lunch breaks and enjoy meals",
      "Dress stylishly and care about appearance",
      "Speak expressively with hand gestures",
      "Show respect for family elders",
      "Close shops during afternoon riposo",
      "Appreciate art and beauty in daily life",
      "Maintain passionate discussions about topics",
    ],
    music: {
      genre: "Opera / Folk / Pop / Classical",
      artists: [
        "Luciano Pavarotti",
        "Andrea Bocelli",
        "Eros Ramazzotti",
        "Laura Pausini",
        "Adriano Celentano",
        "Mina",
        "Zucchero",
        "Il Volo",
      ],
      sample: "Nessun Dorma",
    },
    literature: {
      authors: [
        "Dante Alighieri",
        "Umberto Eco",
        "Italo Calvino",
        "Giuseppe Tomasi di Lampedusa",
        "Alberto Moravia",
        "Cesare Pavese",
        "Primo Levi",
        "Elena Ferrante",
      ],
      works: [
        "Divine Comedy",
        "The Name of the Rose",
        "If on a winter's night a traveler",
        "The Leopard",
      ],
    },
    cuisine: {
      dishes: [
        "Pasta Carbonara",
        "Pizza Margherita",
        "Risotto",
        "Gelato",
        "Tiramisu",
        "Osso Buco",
        "Bruschetta",
        "Parmigiana",
      ],
      ingredients: [
        "Olive Oil",
        "Parmesan",
        "Tomatoes",
        "Basil",
        "Mozzarella",
        "Prosciutto",
        "Wine",
        "Balsamic Vinegar",
      ],
    },
    festivals: {
      celebrations: [
        "Venice Carnival",
        "Palio di Siena",
        "La Tomatina",
        "Feast of San Gennaro",
        "Easter celebrations",
        "Christmas markets",
        "Opera season",
        "Fashion Week",
      ],
      traditions: [
        "Mask making",
        "Horse racing",
        "Religious processions",
        "Family gatherings",
      ],
    },
    architecture: {
      styles: [
        "Roman classical",
        "Renaissance palazzos",
        "Baroque churches",
        "Medieval towers",
        "Venetian Gothic",
        "Modern design",
        "Ancient ruins",
        "Coastal villages",
      ],
      landmarks: [
        "Colosseum",
        "Leaning Tower of Pisa",
        "St. Peter's Basilica",
        "Duomo Florence",
        "Doge's Palace",
        "Pompeii",
        "Amalfi Coast",
        "Cinque Terre",
      ],
    },
    values: {
      principles: [
        "Family loyalty",
        "Culinary excellence",
        "Artistic beauty",
        "Regional pride",
        "Fashion consciousness",
        "Religious tradition",
        "Hospitality warmth",
        "Passionate living",
      ],
      concepts: [
        "La Dolce Vita",
        "Bella Figura",
        "Sprezzatura",
        "Campanilismo",
      ],
    },
  },
  {
    country: "Spain",
    socialNorms: [
      "Greet with two kisses on cheeks",
      "Eat dinner very late in the evening",
      "Take afternoon siesta breaks when possible",
      "Speak loudly and expressively in groups",
      "Show physical affection openly",
      "Stay out late and socialize extensively",
      "Respect regional languages and cultures",
      "Participate in community festivals enthusiastically",
    ],
    music: {
      genre: "Flamenco / Pop / Classical Guitar / Regional Folk",
      artists: [
        "Paco de Lucía",
        "Enrique Iglesias",
        "Rosalía",
        "Alejandro Sanz",
        "Manu Chao",
        "Jesse & Joy",
        "Camaron de la Isla",
        "Joaquín Sabina",
      ],
      sample: "Asturias (Leyenda)",
    },
    literature: {
      authors: [
        "Miguel de Cervantes",
        "Federico García Lorca",
        "Pablo Neruda",
        "Isabel Allende",
        "Javier Marías",
        "Arturo Pérez-Reverte",
        "Camilo José Cela",
        "Ana María Matute",
      ],
      works: [
        "Don Quixote",
        "Blood Wedding",
        "Twenty Love Poems",
        "The Shadow of the Wind",
      ],
    },
    cuisine: {
      dishes: [
        "Paella",
        "Tapas",
        "Gazpacho",
        "Jamón Ibérico",
        "Tortilla Española",
        "Churros",
        "Sangria",
        "Fabada",
      ],
      ingredients: [
        "Saffron",
        "Olive Oil",
        "Garlic",
        "Sherry",
        "Manchego",
        "Paprika",
        "Almonds",
        "Seafood",
      ],
    },
    festivals: {
      celebrations: [
        "La Tomatina",
        "Running of Bulls",
        "Semana Santa",
        "Feria de Abril",
        "Las Fallas",
        "Day of the Dead",
        "Three Kings Day",
        "San Fermín",
      ],
      traditions: [
        "Flamenco dancing",
        "Bull fighting",
        "Religious processions",
        "Street parties",
      ],
    },
    architecture: {
      styles: [
        "Moorish architecture",
        "Gothic cathedrals",
        "Modernist Gaudí",
        "Roman ruins",
        "Medieval castles",
        "Contemporary museums",
        "Pueblo villages",
        "Coastal resorts",
      ],
      landmarks: [
        "Sagrada Família",
        "Alhambra",
        "Park Güell",
        "Santiago de Compostela",
        "Guggenheim Bilbao",
        "Royal Palace Madrid",
        "Alcázar Seville",
        "Ciudad de las Artes",
      ],
    },
    values: {
      principles: [
        "Family closeness",
        "Regional identity",
        "Artistic expression",
        "Social gathering",
        "Religious heritage",
        "Passion for life",
        "Hospitality generosity",
        "Work-life balance",
      ],
      concepts: ["Tertulia", "Sobremesa", "Duende", "Saudade"],
    },
  },
  {
    country: "Mexico",
    socialNorms: [
      "Greet with warm handshakes or embraces",
      "Show deep respect for elderly family members",
      "Celebrate life events with large gatherings",
      "Use formal titles when meeting new people",
      "Share food generously with others",
      "Honor religious traditions and saints",
      "Maintain close extended family relationships",
      "Express emotions openly and warmly",
    ],
    music: {
      genre: "Mariachi / Ranchera / Regional Mexican / Pop",
      artists: [
        "Vicente Fernández",
        "Juan Gabriel",
        "Lila Downs",
        "Jesse & Joy",
        "Maná",
        "Selena",
        "Luis Miguel",
        "Natalia Lafourcade",
      ],
      sample: "Cielito Lindo",
    },
    literature: {
      authors: [
        "Octavio Paz",
        "Carlos Fuentes",
        "Laura Esquivel",
        "Juan Rulfo",
        "Elena Poniatowska",
        "Sor Juana Inés de la Cruz",
        "Mariano Azuela",
        "Angeles Mastretta",
      ],
      works: [
        "The Labyrinth of Solitude",
        "Like Water for Chocolate",
        "Pedro Páramo",
        "The Death of Artemio Cruz",
      ],
    },
    cuisine: {
      dishes: [
        "Tacos",
        "Mole",
        "Tamales",
        "Pozole",
        "Enchiladas",
        "Chiles Rellenos",
        "Guacamole",
        "Tres Leches",
      ],
      ingredients: [
        "Corn",
        "Chili Peppers",
        "Avocado",
        "Lime",
        "Cilantro",
        "Chocolate",
        "Tequila",
        "Beans",
      ],
    },
    festivals: {
      celebrations: [
        "Day of the Dead",
        "Cinco de Mayo",
        "Christmas Posadas",
        "Independence Day",
        "Three Kings Day",
        "Semana Santa",
        "Guelaguetza",
        "Carnival",
      ],
      traditions: [
        "Altar making",
        "Piñata breaking",
        "Virgin of Guadalupe pilgrimage",
        "Quinceañera celebrations",
      ],
    },
    architecture: {
      styles: [
        "Pre-Columbian pyramids",
        "Colonial baroque",
        "Mexican modernism",
        "Pueblo architecture",
        "Hacienda style",
        "Contemporary muralism",
        "Art deco",
        "Sustainable design",
      ],
      landmarks: [
        "Chichen Itza",
        "Teotihuacan",
        "Palace of Fine Arts",
        "Frida Kahlo Museum",
        "Chapultepec Castle",
        "Monte Albán",
        "Palenque",
        "Anthropology Museum",
      ],
    },
    values: {
      principles: [
        "Family devotion",
        "Religious faith",
        "Cultural pride",
        "Hospitality generosity",
        "Community solidarity",
        "Ancestral respect",
        "Artistic expression",
        "Resilience strength",
      ],
      concepts: ["Familismo", "Personalismo", "Simpatía", "Respeto"],
    },
  },
  {
    country: "China",
    socialNorms: [
      "Show deep respect for elders and authority",
      "Maintain face and avoid public embarrassment",
      "Offer and receive business cards with both hands",
      "Eat family-style meals with shared dishes",
      "Practice patience in long queues",
      "Give gifts in even numbers except four",
      "Remove shoes when entering homes",
      "Avoid pointing feet toward people",
    ],
    music: {
      genre: "Traditional Chinese / C-Pop / Opera / Folk",
      artists: [
        "Teresa Teng",
        "Faye Wong",
        "Jay Chou",
        "Cui Jian",
        "Liu Huan",
        "Na Ying",
        "Eason Chan",
        "G.E.M.",
      ],
      sample: "Mo Li Hua (Jasmine Flower)",
    },
    literature: {
      authors: [
        "Lu Xun",
        "Mo Yan",
        "Pearl S. Buck",
        "Amy Tan",
        "Ha Jin",
        "Yu Hua",
        "Gao Xingjian",
        "Liu Cixin",
      ],
      works: [
        "Dream of the Red Chamber",
        "Journey to the West",
        "The Three-Body Problem",
        "Red Sorghum",
      ],
    },
    cuisine: {
      dishes: [
        "Peking Duck",
        "Kung Pao Chicken",
        "Dim Sum",
        "Hot Pot",
        "Fried Rice",
        "Mapo Tofu",
        "Spring Rolls",
        "Sweet and Sour Pork",
      ],
      ingredients: [
        "Soy Sauce",
        "Rice",
        "Ginger",
        "Garlic",
        "Star Anise",
        "Sesame Oil",
        "Rice Wine",
        "Green Tea",
      ],
    },
    festivals: {
      celebrations: [
        "Chinese New Year",
        "Mid-Autumn Festival",
        "Dragon Boat Festival",
        "Qingming Festival",
        "National Day",
        "Lantern Festival",
        "Double Ninth Festival",
        "Winter Solstice",
      ],
      traditions: [
        "Dragon dancing",
        "Fireworks",
        "Moon cake eating",
        "Ancestor veneration",
      ],
    },
    architecture: {
      styles: [
        "Imperial palaces",
        "Traditional hutongs",
        "Buddhist temples",
        "Modern skyscrapers",
        "Garden pavilions",
        "Great Wall fortifications",
        "Pagoda towers",
        "Contemporary glass",
      ],
      landmarks: [
        "Great Wall",
        "Forbidden City",
        "Temple of Heaven",
        "Terracotta Army",
        "Summer Palace",
        "Potala Palace",
        "Shanghai Skyline",
        "West Lake",
      ],
    },
    values: {
      principles: [
        "Filial piety",
        "Harmony maintenance",
        "Educational achievement",
        "Hard work ethic",
        "Collective good",
        "Face preservation",
        "Ancestor respect",
        "Continuous learning",
      ],
      concepts: ["Guanxi", "Mianzi", "Harmony", "Zhengming"],
    },
  },
  {
    country: "Russia",
    socialNorms: [
      "Shake hands firmly with direct eye contact",
      "Remove hats and gloves when greeting indoors",
      "Bring gifts when visiting someone's home",
      "Toast before drinking alcoholic beverages",
      "Dress formally for business and social occasions",
      "Show respect for elderly people in public",
      "Avoid whistling indoors as it's unlucky",
      "Stand when older people enter the room",
    ],
    music: {
      genre: "Classical / Folk / Chanson / Rock",
      artists: [
        "Tchaikovsky",
        "Rachmaninoff",
        "t.A.T.u.",
        "Alla Pugacheva",
        "Viktor Tsoi",
        "Bulat Okudzhava",
        "Igor Stravinsky",
        "Sergei Prokofiev",
      ],
      sample: "Kalinka",
    },
    literature: {
      authors: [
        "Leo Tolstoy",
        "Fyodor Dostoevsky",
        "Anton Chekhov",
        "Vladimir Nabokov",
        "Boris Pasternak",
        "Aleksandr Solzhenitsyn",
        "Ivan Turgenev",
        "Maxim Gorky",
      ],
      works: [
        "War and Peace",
        "Crime and Punishment",
        "Doctor Zhivago",
        "The Cherry Orchard",
      ],
    },
    cuisine: {
      dishes: [
        "Borscht",
        "Beef Stroganoff",
        "Blini",
        "Pelmeni",
        "Caviar",
        "Chicken Kiev",
        "Solyanka",
        "Olivier Salad",
      ],
      ingredients: [
        "Beets",
        "Sour Cream",
        "Dill",
        "Buckwheat",
        "Cabbage",
        "Vodka",
        "Rye Bread",
        "Mushrooms",
      ],
    },
    festivals: {
      celebrations: [
        "Maslenitsa",
        "New Year",
        "Victory Day",
        "Women's Day",
        "Orthodox Easter",
        "Russia Day",
        "Unity Day",
        "Defender of the Fatherland Day",
      ],
      traditions: [
        "Pancake eating",
        "Military parades",
        "Flower giving",
        "Church services",
      ],
    },
    architecture: {
      styles: [
        "Byzantine churches",
        "Imperial palaces",
        "Soviet constructivism",
        "Wooden architecture",
        "Art nouveau",
        "Stalinist gothic",
        "Modern glass towers",
        "Traditional dachas",
      ],
      landmarks: [
        "Red Square",
        "St. Basil's Cathedral",
        "Hermitage",
        "Peterhof Palace",
        "Trans-Siberian Railway",
        "Kremlin",
        "Bolshoi Theatre",
        "Catherine Palace",
      ],
    },
    values: {
      principles: [
        "Collective solidarity",
        "Cultural pride",
        "Educational respect",
        "Family loyalty",
        "Hospitality generosity",
        "Artistic appreciation",
        "Historical awareness",
        "Resilience strength",
      ],
      concepts: ["Dusha", "Toska", "Sobornost", "Intelligentsia"],
    },
  },
  {
    country: "Egypt",
    socialNorms: [
      "Greet with 'As-salaam alaikum' in Arabic",
      "Show great respect for elders and parents",
      "Remove shoes when entering mosques",
      "Use right hand for eating and greeting",
      "Dress modestly, especially in religious areas",
      "Accept hospitality tea and coffee graciously",
      "Bargain respectfully in traditional markets",
      "Avoid showing soles of feet to others",
    ],
    music: {
      genre: "Arabic Classical / Shaabi / Modern Pop",
      artists: [
        "Umm Kulthum",
        "Mohammed Abdel Wahab",
        "Amr Diab",
        "Fairuz",
        "Omar Khairat",
        "Mohamed Mounir",
        "Sherine",
        "Tamer Hosny",
      ],
      sample: "Alf Leila wa Leila",
    },
    literature: {
      authors: [
        "Naguib Mahfouz",
        "Taha Hussein",
        "Nawal El Saadawi",
        "Alaa Al Aswany",
        "Yusuf Idris",
        "Tawfiq el-Hakim",
        "Radwa Ashour",
        "Ahmed Khaled Towfik",
      ],
      works: [
        "Cairo Trilogy",
        "Cities of Salt",
        "Woman at Point Zero",
        "The Yacoubian Building",
      ],
    },
    cuisine: {
      dishes: [
        "Koshari",
        "Ful Medames",
        "Molokhia",
        "Mahshi",
        "Kebab",
        "Baklava",
        "Basbousa",
        "Fattah",
      ],
      ingredients: [
        "Rice",
        "Lentils",
        "Cumin",
        "Coriander",
        "Tahini",
        "Dates",
        "Mint Tea",
        "Pomegranate",
      ],
    },
    festivals: {
      celebrations: [
        "Eid al-Fitr",
        "Eid al-Adha",
        "Ramadan",
        "Coptic Christmas",
        "Sham el-Nessim",
        "Moulid festivals",
        "Wafaa El-Nil",
        "Abu Simbel Sun Festival",
      ],
      traditions: [
        "Lantern decorating",
        "Family feasting",
        "Charity giving",
        "Temple visits",
      ],
    },
    architecture: {
      styles: [
        "Ancient pyramids",
        "Islamic architecture",
        "Coptic churches",
        "Ottoman mosques",
        "Colonial buildings",
        "Modern Cairo towers",
        "Nubian houses",
        "Desert monasteries",
      ],
      landmarks: [
        "Pyramids of Giza",
        "Sphinx",
        "Karnak Temple",
        "Abu Simbel",
        "Islamic Cairo",
        "Alexandria Library",
        "Valley of Kings",
        "Philae Temple",
      ],
    },
    values: {
      principles: [
        "Family honor",
        "Religious devotion",
        "Hospitality generosity",
        "Respect for heritage",
        "Community solidarity",
        "Elder wisdom",
        "Educational pursuit",
        "Patience and endurance",
      ],
      concepts: ["Karam", "Haram", "Inshallah", "Habibi"],
    },
  },
];

const categories = [
  "socialNorms",
  "music",
  "literature",
  "cuisine",
  "festivals",
  "architecture",
  "values",
] as const;
type Category = (typeof categories)[number];

export default function CulturalLifestyle() {
  const [selectedCountry, setSelectedCountry] = useState(culturalData[0]);
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);

  const renderCategoryContent = () => {
    const data = selectedCountry[activeCategory];

    if (!data) {
      return (
        <div className="category-section">
          <p>No data available for this category</p>
        </div>
      );
    }

    if (Array.isArray(data)) {
      return (
        <div className="category-section">
          <h4>
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h4>
          <ul>
            {data.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (typeof data === "object") {
      return (
        <div className="category-section">
          <h4>
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h4>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="category-section">
              <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              ) : (
                <p>{value}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="category-section">
        <h4>
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h4>
        <p>{data}</p>
      </div>
    );
  };

  return (
    <div className="cultural-lifestyle">
      <div className="cultural-lifestyle-header">
        <CardTitle className="flex items-center gap-4">
          <Users className="h-5 w-5" aria-hidden="true" />
          Global Culture & Lifestyle Explorer
        </CardTitle>
      </div>

      <section className="country-selection" aria-labelledby="country-heading">
        <h3 id="country-heading" className="categ">
          Choose Country
        </h3>
        <div
          className="country-chips"
          role="group"
          aria-labelledby="country-heading"
        >
          {culturalData.map((country) => (
            <button
              key={country.country}
              onClick={() => setSelectedCountry(country)}
              className={`chip ${
                selectedCountry.country === country.country ? "active" : ""
              }`}
              aria-pressed={selectedCountry.country === country.country}
              aria-label={`Select ${country.country}`}
            >
              {country.country}
            </button>
          ))}
        </div>
      </section>

      <section
        className="category-selection"
        aria-labelledby="category-heading"
      >
        <h3 id="category-heading" className="categ">
          Choose Category
        </h3>
        <div
          className="category-chips"
          role="group"
          aria-labelledby="category-heading"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip ${activeCategory === cat ? "active" : ""}`}
              aria-pressed={activeCategory === cat}
              aria-label={`Select ${
                cat.charAt(0).toUpperCase() + cat.slice(1)
              } category`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section
        className="category-content"
        aria-labelledby="content-heading"
        aria-live="polite"
      >
        <h3 id="content-heading" className="sr-only">
          {selectedCountry.country} -{" "}
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}{" "}
          Information
        </h3>
        {renderCategoryContent()}
      </section>
    </div>
  );
}
