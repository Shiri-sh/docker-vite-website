USE GamingPlatformDB;
CREATE TABLE Games (
    GameId INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100),
    Description TEXT
);

CREATE TABLE Users (
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50),
    PasswordHash VARCHAR(256),
    Role VARCHAR(20) DEFAULT 'USER'
);

CREATE TABLE Ratings (
    RatingId INT PRIMARY KEY AUTO_INCREMENT,
    GameId INT,
    UserId INT,
    Score INT CHECK (Score BETWEEN 1 AND 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (GameId, UserId),
    FOREIGN KEY (GameId) REFERENCES Games(GameId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- הוספת נתוני דוגמה
INSERT INTO Games (Title, Description) VALUES
('CyberQuest', 'Futuristic RPG with hacking mechanics'),
('Pixel Racer', 'Retro-style racing game with pixel art'),
('Dragon Forge', 'Fantasy RPG with dragons and crafting'),
('Space Dominion', 'Strategy game set in outer space');

INSERT INTO Ratings (GameId, UserId, Score) VALUES
(1, 1, 5),
(2, 1, 4),
(3, 2, 3),
(4, 3, 5),
(2, 3, 4);
