import { 
  date, 
  integer, 
  pgTable, 
  time, 
  varchar, 
  timestamp, 
  boolean,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);

// Optionnel : Enum pour le statut du ticket
export const ticketStatusEnum = pgEnum('ticket_status', ['valid', 'used', 'cancelled']);

// --- TABLE UTILISATEURS ---
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  // L'email doit être unique pour servir d'identifiant
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  // Ajout de timestamps pour le suivi
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- TABLE ÉVÉNEMENTS ---
export const eventsTable = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  // Le slug doit être unique pour les URLs
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description"), // Utile d'avoir une description
  date: date("date").notNull(),
  time: time("time").notNull(),
  place: varchar("place", { length: 255 }).notNull(),
  // Si null = illimité, sinon nombre max
  participantsLimit: integer("participants_limit"), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- TABLE TICKETS (Le lien manquant) ---
export const ticketsTable = pgTable("tickets", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  
  // Clés étrangères
  userId: integer("user_id").notNull().references(() => usersTable.id),
  eventId: integer("event_id").notNull().references(() => eventsTable.id),
  
  // Token unique pour le QR Code (ex: UUID v4)
  // C'est ce que contiendra le QR Code. Si on scanne, on cherche ce token.
  qrToken: uuid("qr_token").defaultRandom().notNull().unique(),
  
  // Statut du ticket
  status: ticketStatusEnum("status").default('valid').notNull(),
  
  // Date d'inscription
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Date à laquelle le ticket a été scanné/validé
  scannedAt: timestamp("scanned_at"),
});

// --- RELATIONS (Pour faciliter les requêtes avec Drizzle Query API) ---

export const usersRelations = relations(usersTable, ({ many }) => ({
  tickets: many(ticketsTable),
}));

export const eventsRelations = relations(eventsTable, ({ many }) => ({
  tickets: many(ticketsTable),
}));

export const ticketsRelations = relations(ticketsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [ticketsTable.userId],
    references: [usersTable.id],
  }),
  event: one(eventsTable, {
    fields: [ticketsTable.eventId],
    references: [eventsTable.id],
  }),
}));

// --- TABLES REQUISES PAR BETTER-AUTH ---

export const sessionsTable = pgTable("session", {
    id: varchar("id", { length: 255 }).primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: varchar("ip_address", { length: 255 }),
    userAgent: varchar("user_agent", { length: 255 }),
    userId: integer("user_id").notNull().references(() => usersTable.id),
});

export const accountsTable = pgTable("account", {
    id: varchar("id", { length: 255 }).primaryKey(),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    userId: integer("user_id").notNull().references(() => usersTable.id),
    accessToken: varchar("access_token", { length: 255 }),
    refreshToken: varchar("refresh_token", { length: 255 }),
    idToken: varchar("id_token", { length: 255 }),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: varchar("scope", { length: 255 }),
    password: varchar("password", { length: 255 }), // Important pour la connexion email/pass
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verificationsTable = pgTable("verification", {
    id: varchar("id", { length: 255 }).primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: varchar("value", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

// --- DRIZZLE DATABASE INSTANCE ---
export const db = drizzle(client, { 
  schema: { 
    usersTable, 
    eventsTable, 
    ticketsTable, 
    sessionsTable, 
    accountsTable, 
    verificationsTable 
  } 
});