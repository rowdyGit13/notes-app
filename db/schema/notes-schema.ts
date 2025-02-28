import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userID: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
});

export type InsertNote = typeof notesTable.$inferInsert;
export type SelectNote = typeof notesTable.$inferSelect; 