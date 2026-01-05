-- Re-order `createdAt` in `video`
ALTER TABLE `video`
  MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  AFTER `thumbnail`;
