import { create } from "zustand"
import { Cookie } from "./cookies"

type CartItem = {
  cookie: Cookie
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (cookie: Cookie) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: () => number
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (cookie) => {
    const index = get().items.findIndex(cartItem => cartItem.cookie.id === cookie.id)
  
    if (index === -1) {
        set({ items: [...get().items, { cookie, quantity: 1 }] })
    } 
    else {
        const updatedItems = [...get().items]
        const current = updatedItems[index]
        updatedItems[index] = { ...current, quantity: current.quantity + 1 }
        set({ items: updatedItems })
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter(cartItem => cartItem.cookie.id !== id) })
  },

  clearCart: () => set({ items: [] }),

  total: () => {
    return get().items.reduce((sum, cartItem) => sum + cartItem.cookie.price * cartItem.quantity, 0)
  }
}))