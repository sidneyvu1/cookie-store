import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Cookie } from "./cookies"

export type {CartItem}

type CartItem = {
  cookie: Cookie
  quantity: number
}

type CartStore = {
  items: CartItem[]
  itemCount: number
  addItem: (cookie: Cookie) => void
  removeItem: (id: string) => void
  decrementItem: (id: string) => void
  clearCart: () => void
  total: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      addItem: (cookie: Cookie) => {
        const index = get().items.findIndex(cartItem => cartItem.cookie.id === cookie.id)
        if (index === -1) {
          set({ 
            items: [...get().items, { cookie, quantity: 1 }], 
            itemCount: get().itemCount + 1
          })
        } else {
          const updatedItems = [...get().items]
          const current = updatedItems[index]
          updatedItems[index] = { ...current, quantity: current.quantity + 1 }
          set({ 
            items: updatedItems, 
            itemCount: get().itemCount + 1
          })
        }
      },

      removeItem: (id: string) => {
        const item = get().items.find(i => i.cookie.id === id)
        set({ 
          items: get().items.filter(cartItem => cartItem.cookie.id !== id),
          itemCount: get().itemCount - (item?.quantity ?? 0)
        })
      },

      decrementItem: (id: string) => {
        const index = get().items.findIndex(i => i.cookie.id === id)
        if (index === -1) return
        const current = get().items[index]
        if (current.quantity === 1) {
          set({
            items: get().items.filter(i => i.cookie.id !== id),
            itemCount: get().itemCount - 1
          })
        } else {
          const updatedItems = [...get().items]
          updatedItems[index] = { ...current, quantity: current.quantity - 1 }
          set({
            items: updatedItems,
            itemCount: get().itemCount - 1
          })
        }
      },

      clearCart: () => set({ items: [], itemCount: 0 }),

      total: () => {
        return get().items.reduce((sum, cartItem) => sum + cartItem.cookie.price * cartItem.quantity, 0)
      }
    }),
    {
      name: "cookie-cart",
    }
  )
)