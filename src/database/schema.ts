import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name").notNull(),
  // TODO: add banner fields
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (t)=> [uniqueIndex("clerk_id_idx").on(t.clerkId)]);

export const userRelations = relations(usersTable, ({ many }) => ({
  videos: many(videosTable)
}));

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (t)=> [uniqueIndex("name_idx").on(t.description)]);

export const categoryRelations = relations(usersTable, ({ many }) => ({
  videos: many(videosTable)
}));



export const videosTable = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  userId: uuid("user_id").references(()=>usersTable.id, {
    onDelete: "cascade"
  }).notNull(),
  categoryId: uuid("category_id").references(()=> categoriesTable.id, {
    onDelete: "set null"
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const videoRelations = relations(videosTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [videosTable.userId],
    references: [usersTable.id]
  }),
  category: one(categoriesTable, {
    fields: [videosTable.categoryId],
    references: [categoriesTable.id]
  })
}))
