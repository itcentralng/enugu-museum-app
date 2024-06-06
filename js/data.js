const enuguLGAs = [
  { id: "enuguNorth", name: "Enugu North", color: "#FF5733" },
  { id: "enuguSouth", name: "Enugu South", color: "#33FF57" },
  { id: "enuguEast", name: "Enugu East", color: "#3357FF" },
  { id: "anuocha", name: "Aninri", color: "#FF33A1" },
  { id: "awgu", name: "Awgu", color: "#A133FF" },
  { id: "ezzaSouth", name: "Ezza South", color: "#FF7F33" },
  { id: "igboEzeNorth", name: "Igbo Eze North", color: "#33FF7F" },
  { id: "igboEzeSouth", name: "Igbo Eze South", color: "#7F33FF" },
  { id: "isiUzo", name: "Isi Uzo", color: "#FF5733" },
  { id: "nkannuEast", name: "Nkanu East", color: "#33FF57" },
  { id: "nkannuWest", name: "Nkanu West", color: "#3357FF" },
  { id: "nsukka", name: "Nsukka", color: "#FF33A1" },
  { id: "ojiRiver", name: "Oji River", color: "#A133FF" },
  { id: "uden", name: "Udenu", color: "#FF7F33" },
  { id: "udu", name: "Udi", color: "#33FF7F" },
  { id: "uzoUwani", name: "Uzo-Uwani", color: "#7F33FF" },
];

const enuguResources = [
  {
    id: "coal",
    name: "Coal",
    lgas: ["Enugu North", "Enugu South", "Udi", "Ezeagu"],
    image: "https://example.com/images/coal.jpg",
    description:
      "Coal is a major resource found in Enugu, known for its high quality and extensive deposits.",
    dateDiscovered: "1909-11-18",
  },
  {
    id: "limestone",
    name: "Limestone",
    lgas: ["Udi", "Nsukka", "Oji River"],
    image: "https://example.com/images/limestone.jpg",
    description:
      "Limestone deposits in Enugu are used for cement production and other industrial purposes.",
    dateDiscovered: "1960-05-14",
  },
  {
    id: "gypsum",
    name: "Gypsum",
    lgas: ["Awgu"],
    image: "https://example.com/images/gypsum.jpg",
    description:
      "Gypsum is used in the production of plaster and other building materials.",
    dateDiscovered: "1982-03-23",
  },
  {
    id: "clay",
    name: "Clay",
    lgas: ["Nsukka", "Isi Uzo", "Nkanu East"],
    image: "https://example.com/images/clay.jpg",
    description:
      "Clay deposits in Enugu are utilized for pottery and ceramics.",
    dateDiscovered: "1978-09-15",
  },
  {
    id: "ironOre",
    name: "Iron Ore",
    lgas: ["Uzo-Uwani"],
    image: "https://example.com/images/iron_ore.jpg",
    description:
      "Iron ore deposits are important for steel production and industrial development.",
    dateDiscovered: "1991-07-30",
  },
  {
    id: "granite",
    name: "Granite",
    lgas: ["Aninri", "Udi"],
    image: "https://example.com/images/granite.jpg",
    description: "Granite is used for construction and architectural purposes.",
    dateDiscovered: "1970-02-11",
  },
];
