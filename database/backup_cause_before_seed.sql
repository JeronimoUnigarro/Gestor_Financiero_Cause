-- Respaldo previo de datos financieros de users 20 (david) y 21 (jacobo).
-- Excluye users, credenciales y categorías compartidas.
-- Restaurar después de limpiar filas actuales de estos usuarios.
START TRANSACTION;
INSERT INTO `financial_transactions` (`id`,`user_id`,`category_id`,`type`,`amount`,`transaction_date`,`description`,`created_at`,`updated_at`) VALUES (19,20,2,'EXPENSE','4000','2026-10-20 00:00:00',NULL,'2026-10-20 20:47:50','2026-10-20 20:47:50');
INSERT INTO `financial_transactions` (`id`,`user_id`,`category_id`,`type`,`amount`,`transaction_date`,`description`,`created_at`,`updated_at`) VALUES (21,20,8,'INCOME','6000000','2026-10-20 00:00:00',NULL,'2026-10-20 20:49:32','2026-10-20 20:49:32');
COMMIT;
