CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE Table roles (
	id SERIAL PRIMARY KEY,
	role_name VARCHAR(50) NOT NULL
);


Select * from roles;
INSERT INTO roles (role_name) VALUES('ADMIN');
INSERT INTO roles (role_name) VALUES('USER');


CREATE TABLE users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	role_id INT REFERENCES Roles(id),
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointments (
	appointment_id SERIAL PRIMARY KEY,
	appointment_date VARCHAR(50) NOT NULL,
	appointment_time VARCHAR(50) NOT NULL,
	location VARCHAR(255),
	type VARCHAR(255),
	doctor VARCHAR(255),
	user_id UUID REFERENCES Users(id),
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE medicines (
	medicine_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	medicine_name VARCHAR(255),
	medicine_expiry VARCHAR(50),
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE medicines_users (
	medicine_id UUID REFERENCES Medicines(medicine_id),
	user_id UUID REFERENCES Users(id),
	quantity INT NOT NULL,
	daily_dosage INT NOT NULL,
	start_date VARCHAR(50),
	end_date VARCHAR(50),
	PRIMARY KEY (medicine_id, user_id)
);
