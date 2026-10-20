# CAUCE

Aplicación de finanzas personales para Colombia. Este repositorio contiene un frontend Next.js, una API NestJS y persistencia MySQL mediante Prisma. El alcance funcional corresponde a los Sprints 2–5.

## Requisitos

- Node.js 20 o superior y npm.
- MySQL 8.0 o superior ejecutándose localmente.
- Base de datos de desarrollo `cause`.

## Inicio rápido

1. Crea la base con `mysql -u root -p < sql/instalar.sql` o `CREATE DATABASE cause;`.
2. Copia `.env.example` a `.env`. La configuración local solicitada es `root` / `root`; ajusta la contraseña si tu servidor usa otra.
3. Instala paquetes: `npm install`.
4. Genera Prisma: `npm run db:generate`.
5. Si `cause` está vacía, aplica el baseline con `npm run db:migrate`. Si ya tiene las tablas CAUCE existentes pero no un historial Prisma (como la base inspeccionada), marca el baseline una vez con `npm --workspace apps/api exec -- prisma migrate resolve --applied 20261020000000_baseline` y luego corre `npm run db:migrate`.
6. Carga categorías globales si no instalaste el SQL: `npm run db:seed`.
7. Ejecuta interfaz y API: `npm run dev`.

Frontend: http://localhost:3000. API: http://localhost:3001/api. La interfaz llama únicamente a la API; el navegador nunca accede a MySQL.

Para desarrollo de esquema usa `npm --workspace apps/api run prisma:dev -- --name nombre_cambio`. El SQL revisable está en `sql/instalar.sql`; migraciones incrementales se guardan en `apps/api/prisma/migrations`.

## Pruebas

`npm test` ejecuta políticas unitarias y pruebas de integración de aplicación contra MySQL `cause`. Las pruebas crean dos cuentas con correo único y eliminan sus filas de prueba al terminar; no borran datos ajenos.

## Funciones

- Registro, login, logout, perfil y protección de API mediante cookie de sesión HttpOnly.
- Movimientos propios de ingreso y gasto, categorías iniciales y personalizadas, saldo consolidado.
- Presupuestos por categoría/periodo, resumen de uso y alertas al 80% o al exceder.
- Metas, aportes transaccionales con aislamiento serializable y clave idempotente, progreso y alertas de logro.
- Dashboard adaptable en COP; formularios conectados a endpoints reales.

## Configuración sensible

`.env` y secretos no se versionan. `CONEXION.md` describe los valores de conexión pedidos para desarrollo. Antes de cualquier despliegue configura secretos fuertes, TLS y una cuenta MySQL de privilegio mínimo.
