# Modelo de datos

El esquema Prisma vive en `apps/api/prisma/schema.prisma`. `sql/instalar.sql` crea de forma no destructiva las tablas iniciales para `cause`; las migraciones futuras son incrementales.

| Tabla | Uso |
|---|---|
| User | Cuenta, correo único y hash de contraseña bcrypt. |
| Category | Categoría de ingreso/gasto; `userId` nulo identifica categorías iniciales globales. |
| Movement | Ingreso/gasto, dueño, importe `DECIMAL(15,2)`, categoría y fecha. |
| Budget | Categoría, dueño, límite y fechas del periodo. |
| Goal | Objetivo de ahorro y fecha objetivo. |
| Contribution | Aporte histórico, monto exacto y clave de idempotencia única por meta. |
| Alert | Mensaje/estado de lectura y vínculo opcional a presupuesto o meta; restricción única contra duplicados. |

Las relaciones tienen claves foráneas e índices por propietario/fecha. Los datos financieros se consultan a partir de movimientos y aportes; no se mantiene un saldo duplicado. La clave única de presupuesto por categoría/periodo se valida en la capa de aplicación para aceptar periodos de fechas explícitos.
