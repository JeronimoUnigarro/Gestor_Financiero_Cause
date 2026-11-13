# Inventario de MySQL `cause`

Inspección de solo lectura del servidor configurado el 29-10-2026: se consultaron `information_schema.TABLES`, `COLUMNS`, `STATISTICS` y `KEY_COLUMN_USAGE`, y se contrastaron con Prisma. Motor InnoDB en las nueve tablas. No se ejecutó DDL, migración ni cambio de datos para esta inspección.

## Tablas y conteos

Conteos exactos en el instante de consulta. Se informa solo cantidad de filas; no se leyeron ni copiaron datos personales.

| Tabla | Filas | Uso |
|---|---:|---|
| `users` | 3 | Identidad, correo único, hash bcrypt, perfil y estado |
| `categories` | 10 | Categorías globales o propias, tipo y estado |
| `financial_transactions` | 5 | Ingresos y gastos por usuario, categoría, monto y fecha |
| `budgets` | 1 | Límites por usuario/categoría/periodo |
| `savings_goals` | 1 | Metas de ahorro por usuario |
| `goal_contributions` | 1 | Aportes históricos e idempotencia |
| `alerts` | 1 | Alertas por usuario, lectura y clave de deduplicación |
| `recurring_payments` | 0 | Pagos recurrentes con fecha, frecuencia y recordatorio |
| `_prisma_migrations` | 2 | Historial de migraciones Prisma |

## Estructura, relaciones e integridad

- Las ocho tablas de negocio corresponden a los modelos Prisma. `users` contiene `id BIGINT UNSIGNED` autoincremental, `name`, `email VARCHAR(191)`, `password_hash`, `phone`, `city`, `avatar_data`, `currency`, `is_active` y marcas de tiempo. La cuenta identifica por correo único.
- `categories` referencia opcionalmente al usuario. `financial_transactions` referencia obligatoriamente a `users` y `categories`; `amount` es `DECIMAL(15,2)` positivo y `transaction_date` es `DATE`.
- `budgets` referencia usuario/categoría y usa `amount_limit DECIMAL(15,2)`, periodo de fechas, umbral decimal e indicador activo. Índice único compuesto por usuario, categoría e inicio/fin de periodo.
- `savings_goals` referencia usuario y tiene objetivo `DECIMAL(15,2)`, fecha y estado. `goal_contributions` referencia usuario/meta, almacena monto y fecha, y tiene clave de idempotencia.
- `alerts` referencia usuario, con clave única de deduplicación por usuario. `recurring_payments` referencia usuario/categoría y conserva monto, siguiente fecha, frecuencia semanal/mensual/trimestral/anual, días de aviso e indicador activo.
- Las 11 relaciones foráneas tienen `ON DELETE RESTRICT`. Los índices incluyen claves primarias, unicidad de correo, deduplicación, aportes idempotentes y búsquedas por usuario/fecha, periodo y estado.
- Restricciones `CHECK` verificadas en el SQL de tablas: montos positivos para transacciones, metas, aportes y pagos recurrentes; periodo válido, presupuesto positivo y umbral entre 0 y 100.

## Compatibilidad con la aplicación

`schema.prisma`, `sql/instalar.sql` y la base observada coinciden en tablas, columnas mapeadas e índices principales. Las dos migraciones registradas corresponden a baseline y seguridad del perfil; la aplicación ya conecta y lee/escribe mediante Prisma en las pruebas de integración. No se encontraron tablas de login adicionales fuera de `users`.

No se requiere cambio de esquema para las analíticas implementadas: usan movimientos, aportes y pagos recurrentes existentes. No se ejecutó respaldo porque no se propuso ni ejecutó modificación del esquema o los datos.
