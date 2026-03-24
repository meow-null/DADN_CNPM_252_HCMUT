DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS bearings;
DROP TABLE IF EXISTS chains;
DROP TABLE IF EXISTS motors;
DROP TABLE IF EXISTS users;


-- USERS
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  reset_token VARCHAR(255),
  reset_token_expiry DATETIME,
  deletedBy INT DEFAULT 0,
  isDeleted BOOLEAN DEFAULT FALSE,
  deletedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- MOTORS
CREATE TABLE motors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  P_dm DECIMAL(10,2) NOT NULL,
  n_dm INT NOT NULL,
  cos_phi DECIMAL(4,2),
  eta_motor DECIMAL(4,2),
  mass_kg DECIMAL(10,2),
  price DECIMAL(12,2),
  is_active BOOLEAN DEFAULT TRUE,
  deletedBy INT DEFAULT 0,
  isDeleted BOOLEAN DEFAULT FALSE,
  deletedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PROJECTS
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  input_P DECIMAL(10,2) NOT NULL,
  input_n_ct DECIMAL(10,2) NOT NULL,
  input_L DECIMAL(10,2) NOT NULL,
  efficiency DECIMAL(5,4),
  Pct DECIMAL(10,2),
  total_ratio DECIMAL(10,2),
  transmission JSON,
  shafts JSON,
  safety_factor DECIMAL(4,2) DEFAULT 1.20,
  selected_motor_id INT,
  selected_motor_snapshot JSON,
  design_result JSON,
  step ENUM(
    'created',
    'inputs',
    'kinematics',
    'motor_selected',
    'design_partial',
    'design_done'
  ) DEFAULT 'created',
  deletedBy INT DEFAULT 0,
  isDeleted BOOLEAN DEFAULT FALSE,
  deletedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_projects_user_id (user_id),
  INDEX idx_projects_motor_id (selected_motor_id),

  CONSTRAINT projects_ibfk_1
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT projects_ibfk_2
    FOREIGN KEY (selected_motor_id) REFERENCES motors(id)
);

-- BEARINGS
CREATE TABLE bearings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(50),
  inner_d DECIMAL(10,2) NOT NULL,
  outer_D DECIMAL(10,2) NOT NULL,
  width_B DECIMAL(10,2) NOT NULL,
  C DECIMAL(12,2),
  C0 DECIMAL(12,2),
  is_active BOOLEAN DEFAULT TRUE,
  deletedBy INT DEFAULT 0,
  isDeleted BOOLEAN DEFAULT FALSE,
  deletedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY inner_d_unique (inner_d, outer_D, width_B)
);

-- CHAINS
CREATE TABLE chains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pitch DECIMAL(10,2) NOT NULL UNIQUE,
  breaking_load DECIMAL(12,2),
  mass_per_m DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  deletedBy INT DEFAULT 0,
  isDeleted BOOLEAN DEFAULT FALSE,
  deletedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);