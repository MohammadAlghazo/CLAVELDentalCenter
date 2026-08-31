SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

INSERT IGNORE INTO `Admin` (`username`, `passwordHash`, `createdAt`) VALUES ('admin', '$2b$10$IypQouxyFjSjM74WD3D6gu7ECm2usndQjQM2vwBanQA9ir3gdWOP2', NOW());
SET FOREIGN_KEY_CHECKS = 1;
