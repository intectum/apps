CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE address;
DROP TABLE token;
DROP TABLE "user";

CREATE TABLE "user"
(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'verify',
  name VARCHAR(100) NOT NULL,
  image VARCHAR NOT NULL,
  contacts JSONB[] NOT NULL,
  groups JSONB[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE address
(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  latitude NUMERIC(9,6) NOT NULL,
  longitude NUMERIC(9,6) NOT NULL,
  meta JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id UUID NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES "user"(id)
      ON DELETE CASCADE
);

CREATE TABLE token
(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token VARCHAR(100) NOT NULL UNIQUE,
  access_token_expires_at TIMESTAMP NOT NULL,
  refresh_token VARCHAR(100) NOT NULL UNIQUE,
  refresh_token_expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id UUID NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES "user"(id)
      ON DELETE CASCADE
);
