export type Cookie = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const cookies: Cookie[] = [
  {
    id: "eg-white-choc",
    name: "Earl Grey White Chcolate",
    description: "Classic. Brown butter, two kinds of chocolate.",
    price: 350,
    image: "/cookies/earl-grey-white-choc.jpg"
  },
  {
    id: "oreo",
    name: "Oreo",
    description: "Cinnamon sugar crust, soft center.",
    price: 300,
    image: "/cookies/oreo.jpg"
  },
  {
    id: "raspb-white-choc",
    name: "Raspberry White Chocolate",
    description: "Earthy matcha dough, sweet white chocolate chips.",
    price: 400,
    image: "/cookies/raspb-white-choc.jpg"
  },
  {
    id: "ubeh-toast",
    name: "Ube Halaya Toast",
    description: "Earthy matcha dough, sweet white chocolate chips.",
    price: 400,
    image: "/cookies/ube-halaya-toast.jpg"
  },
]