import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";

export const cookies = pgTable('cookies', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: integer("price").notNull(),
    imageUrl: text("image_url").notNull(),
    imageKey: text("image_key").notNull(),
    available: boolean("available").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "preparing", 
  "ready",
  "completed",
  "cancelled"
])

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  total: integer("total").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  cookieId: uuid("cookie_id").references(() => cookies.id).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(),
})

export type addCookie = typeof cookies.$inferInsert;
export type addOrder = typeof orders.$inferInsert;
export type addOrderItem = typeof orderItems.$inferInsert;

export type Cookie = typeof cookies.$inferSelect 
