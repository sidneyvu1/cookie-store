export type Cookie = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const cookies: Cookie[] = [
  {
    id: "choc-chip",
    name: "Chocolate Chip",
    description: "Classic. Brown butter, two kinds of chocolate.",
    price: 350,
    image: "/cookies/choc-chip.jpg"
  },
  {
    id: "snickerdoodle",
    name: "Snickerdoodle",
    description: "Cinnamon sugar crust, soft center.",
    price: 300,
    image: "/cookies/snickerdoodle.jpg"
  },
  {
    id: "matcha-white-choc",
    name: "Matcha White Chocolate",
    description: "Earthy matcha dough, sweet white chocolate chips.",
    price: 400,
    image: "/cookies/matcha.jpg"
  },
]