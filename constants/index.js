import icons from "./icons";
import images from "./images";

export { icons, images };

export const collectionData = [
  {
    id: "1",
    name: "Cleanse & Prep",
    image: images.cleanse,
  },
  {
    id: "2",
    name: "Moisturize & Protect",
    image: images.moisturize,
  },
  {
    id: "3",
    name: "Treat & Nourish",
    image: images.treat,
  },
  {
    id: "4",
    name: "Body Care",
    image: images.poster,
  },
];

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
