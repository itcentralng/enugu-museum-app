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
    id: "0xB3 0xA5 0x57 0xF6",
    name: "Coal",
    lgas: [
      {
        name: "Enugu North",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
      {
        name: "Enugu South",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
      {
        name: "Udi",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
      {
        name: "Ezeagu",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
    ],
    image: "/static/assets/images/resources/quartz.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
    date: "(February 11, 1847 – October 18, 1931)",
  },
  {
    id: "0x03 0x6D 0x75 0xC5",
    name: "Limestone",
    lgas: ["Udi", "Nsukka", "Oji River"],
    lgas: [
      {
        name: "Udi",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
      {
        name: "Nsukka",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
      {
        name: "Oji River",
        description:
          "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
      },
    ],
    image: "/static/assets/images/resources/quartz.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
    date: "1960-05-14",
  },
  {
    id: "gypsum",
    name: "Gypsum",
    lgas: ["Awgu"],
    image: "/static/assets/images/resources/quartz.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
    date: "1982-03-23",
  },
  {
    id: "clay",
    name: "Clay",
    lgas: ["Nsukka", "Isi Uzo", "Nkanu East"],
    image: "/static/assets/images/resources/quartz.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
    date: "1978-09-15",
  },
  {
    id: "ironOre",
    name: "Iron Ore",
    lgas: ["Uzo-Uwani"],
    image: "/static/assets/images/resources/quartz.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
    date: "1991-07-30",
  },
  {
    id: "granite",
    name: "Granite",
    lgas: ["Aninri", "Udi"],
    image: "/static/assets/images/resources/quartz.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet non ornare vitae nisl pellentesque sit. Sed egestas non interdum praesent purus. Ac convallis aliquet tellus enim tortor orci tincidunt. Condimentum ac mauris orci facilisi elementum. Blandit nam egestas ipsum sapien. Non condimentum posuere amet enim mattis tincidunt ultrices. Nunc duis turpis nibh nibh. Gravida tortor nulla vitae urn",
    date: "1970-02-11",
  },
];
