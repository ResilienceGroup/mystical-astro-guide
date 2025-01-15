export type ZodiacSign = {
  name: string;
  dates: string;
  element: string;
  symbol: string;
};

export const zodiac: ZodiacSign[] = [
  {
    name: "Bélier",
    dates: "21 mars - 19 avril",
    element: "Feu",
    symbol: "♈"
  },
  {
    name: "Taureau",
    dates: "20 avril - 20 mai",
    element: "Terre",
    symbol: "♉"
  },
  {
    name: "Gémeaux",
    dates: "21 mai - 20 juin",
    element: "Air",
    symbol: "♊"
  },
  {
    name: "Cancer",
    dates: "21 juin - 22 juillet",
    element: "Eau",
    symbol: "♋"
  },
  {
    name: "Lion",
    dates: "23 juillet - 22 août",
    element: "Feu",
    symbol: "♌"
  },
  {
    name: "Vierge",
    dates: "23 août - 22 septembre",
    element: "Terre",
    symbol: "♍"
  },
  {
    name: "Balance",
    dates: "23 septembre - 22 octobre",
    element: "Air",
    symbol: "♎"
  },
  {
    name: "Scorpion",
    dates: "23 octobre - 21 novembre",
    element: "Eau",
    symbol: "♏"
  },
  {
    name: "Sagittaire",
    dates: "22 novembre - 21 décembre",
    element: "Feu",
    symbol: "♐"
  },
  {
    name: "Capricorne",
    dates: "22 décembre - 19 janvier",
    element: "Terre",
    symbol: "♑"
  },
  {
    name: "Verseau",
    dates: "20 janvier - 18 février",
    element: "Air",
    symbol: "♒"
  },
  {
    name: "Poissons",
    dates: "19 février - 20 mars",
    element: "Eau",
    symbol: "♓"
  }
];