# CAUCE

Aplicación de finanzas personales para Colombia. Monorepo con frontend Next.js, API NestJS y persistencia MySQL mediante Prisma.

## Requisitos

- Node.js 20 o superior y npm.
- MySQL 8.0 o superior y una base `cause` accesible.

## Inicio local

1. Copia `.env.example` a `.env` y configura `DATABASE_URL` con las credenciales locales, además de `JWT_SECRET` con al menos 32 caracteres aleatorios. No subas `.env` al repositorio.
2. Instala paquetes con `npm install` y genera el cliente con `npm run db:generate`.
3. Para una base nueva y vacía, aplica el baseline con `npm run db:migrate`.
4. Para una base existente, no ejecutes el SQL inicial ni marques migraciones hasta inspeccionar su esquema y el historial Prisma. La base revisada ya tiene sus tablas y dos migraciones aplicadas; no requirió modificaciones.
5. Carga categorías globales con `npm run db:seed` solo si hace falta.
6. Inicia API y frontend con `npm run dev`.

Frontend: http://localhost:3000. API: http://localhost:3001/api. El navegador se comunica solo con la API; la conexión MySQL permanece en el backend.

Para evolucionar el esquema, crea migraciones incrementales revisables con `npm --workspace apps/api run prisma:dev -- --name nombre_cambio`. No alteres tablas con SQL manual en una base con datos sin respaldo y revisión previa.

## Funciones

- Registro, login, logout, perfil y cambio de contraseña; cookie de sesión HttpOnly y rutas protegidas.
- Ingresos, gastos, categorías, saldo, presupuestos y alertas de umbral.
- Metas de ahorro, aportes transaccionales/idempotentes, progreso y alertas.
- Dashboard en COP con movimientos recientes, gráficas mensuales y por categoría, y proyección de saldo a 30 días basada en la tendencia neta de los 90 días recientes y pagos recurrentes existentes.
- CAUCE IA analiza resúmenes financieros agregados con Gemini API y el modelo `gemini-3.1-flash-lite` (nivel gratuito sujeto a límites), tras consentimiento expreso en la interfaz. En el nivel gratuito Google puede usar el contenido para mejorar sus productos. Aceptar/rechazar una recomendación no ejecuta movimientos.

La proyección es una estimación explicable, no una garantía. No anticipa ingresos futuros no registrados. Las tablas de pagos recurrentes existen, pero aún no hay una pantalla para administrarlos.

## Pruebas y compilación

- `npm test`: pruebas unitarias y de integración contra MySQL `cause`. La integración crea cuentas de prueba con correo único y elimina únicamente sus filas al terminar.
- `npm run build`: compila la API y construye el frontend de producción.

## Despliegue

Define `DATABASE_URL`, `JWT_SECRET` (32 caracteres aleatorios o más), `API_PORT`, `WEB_ORIGIN`, `NEXT_PUBLIC_API_URL` y `GEMINI_API_KEY` en el entorno del backend. CAUCE IA usa `gemini-3.1-flash-lite` por defecto; `GEMINI_MODEL` permite cambiarlo. Obtén la clave en Google AI Studio. Guárdala en el backend, nunca en variables `NEXT_PUBLIC_*`. Usa TLS, una cuenta MySQL de privilegio mínimo y un gestor de secretos. El despliegue está explícitamente fuera del alcance actual. No apliques migraciones a producción sin respaldo verificado.

## Documentación

- [Arquitectura](docs/ARQUITECTURA.md)
- [Modelo de datos](docs/MODELO_DATOS.md)
- [Inventario verificado de MySQL](docs/INVENTARIO_BASE_DATOS.md)
- [Guía rápida de usuario](docs/MANUAL_USUARIO.md)
- [Integración CAUCE IA](docs/CAUCE_IA.md)
- [Trazabilidad de Jira](docs/TRACEABILIDAD_JIRA.md)
- [Reglas financieras](docs/REGLAS_FINANCIERAS.md)
