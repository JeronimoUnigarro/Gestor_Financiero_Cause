# Arquitectura

Monorepo con `apps/api` (NestJS) y `apps/web` (Next.js). La API expone REST/JSON y es la única frontera de acceso a MySQL.

## Backend por capas

- `src/domain`: políticas puras de dinero, presupuesto, progreso y saldo. Trabajan en centavos `BigInt`; no dependen de NestJS ni Prisma.
- `src/application`: casos de uso de autenticación, movimientos, categorías, presupuestos, metas, aportes y alertas. `AppService` recibe el contrato `CauceRepositoryPort` y coordina las operaciones.
- `src/application/ports`: contrato de persistencia para cuentas, categorías, movimientos, presupuestos, metas, aportes, alertas y transacciones.
- `src/infrastructure`: `PrismaService` implementa el puerto y adapta el contrato a MySQL/Prisma; los aportes usan aislamiento serializable.
- `src/presentation`: controladores REST, DTO, cookie HttpOnly, guard de autenticación y validación global.

El frontend organiza rutas en `apps/web/app`, componentes visuales y formularios en `page.tsx`, estilos adaptables en `style.css` y centraliza el transporte REST en `request`. El JWT firmado vive solo en cookie HttpOnly SameSite=Lax. El guard obtiene la identidad validada del token; no se acepta `userId` del formulario para filtrar datos.

## Límites actuales

El primer corte mantiene casos de uso relacionados en `AppService`; la persistencia se concentra en el adaptador Prisma y las reglas de cálculo permanecen en el dominio. Las filas de pagos recurrentes existentes se consultan para alertas; CAUCE no inventa pagos ni añade un formulario de pagos recurrentes al alcance de estos sprints.
