CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "phone_number" varchar NOT NULL,
  "password" varchar NOT NULL,
  "photo_profile" varchar
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "ingredients" varchar NOT NULL,
  "photo_recipe" varchar,
  "id_owner" int NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp NOT NULL,
  "like_count" int DEFAULT 0,
  "saved_count" int DEFAULT 0
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "id_user" int NOT NULL,
  "id_recipe" int NOT NULL,
  "commnet" varchar,
  "posted_at" timestamp DEFAULT (now())
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("id_owner") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id");
