import coconutFruit from "../assets/coconutFruit.png";
import coconutHusk from "../assets/coconutHusk.png";
import coconutShell from "../assets/coconutShell.png";
import deshuskCoconut from "../assets/deshuskCoconut.png";
import marketCoco from "../assets/marketCoco.svg";
import proCoco from "../assets/proCoco.svg";
import processingCoco from "../assets/processingCoco.svg";
import commCoco from "../assets/commCoco.svg";

export const productData = [
  {
    name: "Coconut Husk",
    img: coconutHusk,
    scale: "1Kg",
    amount: "₦60",
    id: 1,
  },
  {
    name: "Coconut Shell",
    img: coconutShell,
    scale: "1Kg",
    amount: "₦60",
    id: 2,
  },
  {
    name: "Coconut Fruit/Embryo",
    img: coconutFruit,
    scale: "1unit",
    amount: "₦300",
    id: 3,
  },
];

export const offerData = [
  {
    name: "Processed Coconuts",
    img: proCoco,
    content: "You can now order dehusked or deshelled coconuts for your business",
    btn: "Make a booking!",
    id: 1,
    active: true
  },
  {
    name: "Coconut Processing",
    img: processingCoco,
    content: "Explore our dehusking and deshelling servcices at the best prices available",
    btn: "Request a service.",
    id: 2,
    active: false

  },
  {
    name: "Coconut marketplace",
    img: commCoco,
    content: "Explore our large catalogue of diffrent coconut products different vendors around the nation.",
    btn: "Start Shopping",
    id: 3,
    active: false

  },
  {
    name: "Community",
    img: marketCoco,
    content: "We have aggregated a commuity of coconut farmers, processor and other players in value chain",
    btn: "Let’s network.",
    id: 4,
    active: false

  },
];
