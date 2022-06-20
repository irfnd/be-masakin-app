CREATE TABLE "users" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone_number" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "photo_profile" TEXT
);

CREATE TABLE "recipes" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "ingredients" TEXT [],
  "photo_recipe" TEXT,
  "id_owner" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "like_count" INT DEFAULT 0,
  "saved_count" INT DEFAULT 0
);

CREATE TABLE "liked_recipes" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "id_user" INT NOT NULL,
  "id_recipe" INT NOT NULL,
  "liked_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
);

CREATE TABLE "saved_recipes" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "id_user" INT NOT NULL,
  "id_recipe" INT NOT NULL,
  "saved_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
);

CREATE TABLE "recipes_videos" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "id_recipe" INT NOT NULL,
  "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
);

CREATE TABLE "comments" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "id_user" INT NOT NULL,
  "id_recipe" INT NOT NULL,
  "comment" TEXT,
  "posted_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("id_owner") REFERENCES "users" ("id");
ALTER TABLE "comments" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
ALTER TABLE "comments" ADD FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id");
ALTER TABLE "liked_recipes" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
ALTER TABLE "liked_recipes" ADD FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id");
ALTER TABLE "saved_recipes" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
ALTER TABLE "saved_recipes" ADD FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id");
ALTER TABLE "recipes_videos" ADD FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id");

CREATE OR REPLACE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_add_like()
RETURNS TRIGGER AS $$
DECLARE
    recipe_like_count int;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        recipe_like_count := (SELECT COUNT(*) FROM liked_recipes WHERE id_recipe = NEW.id_recipe);
        IF recipe_like_count > 0 THEN
            UPDATE recipes SET like_count = recipe_like_count WHERE id = NEW.id_recipe;
        END IF;
        RAISE NOTICE 'Value: %', NEW.id_recipe;
    END IF;    
    
    IF (TG_OP = 'DELETE') THEN
        recipe_like_count := (SELECT COUNT(*) FROM liked_recipes WHERE id_recipe = OLD.id_recipe);
        IF recipe_like_count > 0 THEN
            UPDATE recipes SET like_count = recipe_like_count WHERE id = OLD.id_recipe;
        END IF;
        RAISE NOTICE 'Value: %', OLD.id_recipe;
    END IF;
    RETURN NULL;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_add_save()
RETURNS TRIGGER AS $$
DECLARE
    recipe_save_count int;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        recipe_save_count := (SELECT COUNT(*) FROM saved_recipes WHERE id_recipe = NEW.id_recipe);
        IF recipe_save_count > 0 THEN
            UPDATE recipes SET save_count = recipe_save_count WHERE id = NEW.id_recipe;
        END IF;
        RAISE NOTICE 'Value: %', NEW.id_recipe;
    END IF;    
    
    IF (TG_OP = 'DELETE') THEN
        recipe_save_count := (SELECT COUNT(*) FROM saved_recipes WHERE id_recipe = OLD.id_recipe);
        IF recipe_save_count > 0 THEN
            UPDATE recipes SET save_count = recipe_save_count WHERE id = OLD.id_recipe;
        END IF;
        RAISE NOTICE 'Value: %', OLD.id_recipe;
    END IF;
    RETURN NULL;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_update_timestamp();

CREATE TRIGGER add_like
AFTER INSERT OR DELETE ON liked_recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_add_like();

CREATE TRIGGER add_save
AFTER INSERT OR DELETE ON saved_recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_add_save();
