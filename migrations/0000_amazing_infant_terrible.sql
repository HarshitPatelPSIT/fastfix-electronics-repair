CREATE TYPE "public"."device_type" AS ENUM('smartphone', 'tablet', 'computer', 'game_console', 'other');--> statement-breakpoint
CREATE TYPE "public"."repair_status" AS ENUM('received', 'diagnosed', 'repairing', 'ready', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "repair_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"repair_id" integer,
	"status" text NOT NULL,
	"notes" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repairs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"tracking_code" text NOT NULL,
	"device_type" text NOT NULL,
	"device_model" text NOT NULL,
	"issue_description" text NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"estimated_completion" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text,
	"technician_notes" text,
	"technician_id" text,
	CONSTRAINT "repairs_tracking_code_unique" UNIQUE("tracking_code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "repair_progress" ADD CONSTRAINT "repair_progress_repair_id_repairs_id_fk" FOREIGN KEY ("repair_id") REFERENCES "public"."repairs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repairs" ADD CONSTRAINT "repairs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;