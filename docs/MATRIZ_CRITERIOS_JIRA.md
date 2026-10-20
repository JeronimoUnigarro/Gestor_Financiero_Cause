# Matriz de criterios Jira (SCRUM-17 a SCRUM-32)

Los estados Jira observados al consultar este trabajo eran «Por hacer» para las 16 historias. No se modificaron. La matriz relaciona aceptación y la implementación prevista; las pruebas de dominio existentes no reemplazan las pruebas de integración MySQL.

| Jira | Caso de uso / criterio cubierto | Implementación | Evidencia de prueba |
|---|---|---|---|
| SCRUM-17 | Crear cuenta, validar email/campos, evitar duplicados, hash de contraseña | `AppService.register`, `POST /api/auth/register` | Integración MySQL y bcrypt: pasa |
| SCRUM-18 | Login, error de credenciales, sesión y logout | `AppService.login`, rutas `/api/auth/*`, cookie HttpOnly | Login/credencial incorrecta: pasa; logout cookie implementado |
| SCRUM-19 | Consultar/editar nombre de perfil propio | `GET/PATCH /api/profile` | Lectura y edición del perfil en integración: pasa |
| SCRUM-20 | Proteger rutas privadas y aislar dueño | `AuthGuard`, propietario desde JWT en controladores | Unit de guard + acceso ajeno a categoría/alerta: pasa |
| SCRUM-21 | Registrar gasto con categoría, fecha y propietario | `POST /api/movements/expense` | Integración de movimientos y categoría inválida: pasa |
| SCRUM-22 | Registrar ingreso y actualizar saldo | `POST /api/movements/income`, `/api/balance` | Integración MySQL + monto decimal exacto: pasa |
| SCRUM-23 | Categorías iniciales, propias, creación/edición | `Category`, `GET/POST/PATCH /api/categories` | Seed, edición propia e intento de edición ajena: pasa |
| SCRUM-24 | Consultar movimientos propios, tipo, categoría, fecha | `GET /api/movements` con filtros | Integración MySQL filtra gasto: pasa |
| SCRUM-25 | Crear presupuesto positivo por periodo/categoría | `POST /api/budgets` | Integración MySQL: pasa |
| SCRUM-26 | Usado, límite, %, disponible y actualización | `GET /api/budgets`; recalcula desde movimientos | Integración: 125% excedido sin tope; pasa |
| SCRUM-27 | Detectar próximo/excedido y alertar sin duplicar | `refreshBudgets`, restricción única por alerta | Unit de umbral e integración de no duplicado: pasa |
| SCRUM-28 | Resumen por categoría y periodo | panel de presupuestos del frontend | Build de producción pasa; E2E visual pendiente |
| SCRUM-29 | Crear meta y asociarla a usuario | `POST /api/goals` | Integración MySQL: pasa |
| SCRUM-30 | Aporte válido, saldo suficiente, transacción/idempotencia | `POST /api/goals/:id/contributions` | Integración de aporte, reintento y saldo insuficiente: pasa |
| SCRUM-31 | Mostrar objetivo, acumulado, restante, porcentaje, estado | `goalView`, panel de metas frontend | Integración marca meta completa; build pasa |
| SCRUM-32 | Alertas propias, legibles, persistentes y sin duplicado | `Alert`, `GET /api/alerts`, `PATCH /api/alerts/:id/read` | Integración de alerta presupuestal/meta y aislamiento: pasa |
