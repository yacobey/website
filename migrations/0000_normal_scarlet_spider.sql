CREATE TABLE "agent_session_redemptions" (
        "id" serial PRIMARY KEY NOT NULL,
        "session_id" text NOT NULL,
        "stripe_customer_id" text NOT NULL,
        "redeemed_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "agent_session_redemptions_session_id_unique" UNIQUE("session_id")
);
