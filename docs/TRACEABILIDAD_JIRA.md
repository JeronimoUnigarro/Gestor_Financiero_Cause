# Auditoría y trazabilidad Jira de CAUSE

Consulta de solo lectura: 29 de octubre de 2026. Proyecto Jira identificado como **Cause**, clave **SCRUM** (la búsqueda por “CAUSE” no identifica la clave del proyecto). Resultado completo: **81 incidencias: 8 épicas, 32 historias, 41 subtareas; 0 tareas independientes y 0 incidencias de tipo error**. Se leyeron comentarios en las 81 incidencias: **ninguno**. Enlaces/dependencias reportados: ninguno en las historias consultadas. No se modificaron estados de Jira.

## Resumen de verificación

- Historias: 21 completadas según inspección del código y verificación local; 10 parciales; 1 aplazada por instrucción del usuario.
- Las 32 historias tienen criterios de aceptación en su descripción. Las historias CAUCE-06 a CAUCE-32 expresan criterios, aunque varias no tienen una narrativa “Como/quiero/para”.
- Estados Jira: SCRUM-13–16 en revisión; SCRUM-17–44 por hacer. Un estado “Por hacer” no significa que el código esté pendiente: se comparó con la implementación real.
- La matriz de abajo conserva el texto/descripción y criterios extraídos de Jira. Archivos y estado real son evaluación del repositorio al 29-10-2026.

## Épicas

- SCRUM-5 — EP-01 — Levantamiento y arquitectura (Por hacer)
- SCRUM-6 — EP-02 — Gestión de usuarios (Por hacer)
- SCRUM-7 — EP-03 — Movimientos financieros (Por hacer)
- SCRUM-8 — EP-04 — Presupuestos (Por hacer)
- SCRUM-9 — EP-05 — Metas y alertas (Por hacer)
- SCRUM-10 — EP-06 — Dashboard y proyección (Por hacer)
- SCRUM-11 — EP-07 — Cauce IA (Por hacer)
- SCRUM-12 — EP-08 — Calidad, despliegue y cierre (Por hacer)

## Matriz de trazabilidad de historias

| Jira | Historia | Descripción | Criterios de aceptación | Estado Jira | Estado real | Archivos relacionados | Trabajo necesario | Prioridad |
|---|---|---|---|---|---|---|---|---|
| SCRUM-13 | CAUCE-01 — Levantamiento de requisitos | Como desarrollador del proyecto,  <br>quiero identificar y documentar los requisitos funcionales y no funcionales de Cauce,  <br>para establecer claramente el alcance del MVP.<br><br> | Criterios de aceptación:<br><br>* Los requisitos funcionales están documentados.<br>* Los requisitos no funcionales están definidos.<br>* Se identifica qué funcionalidades pertenecen al MVP.<br>* Las funcionalidades fuera del MVP quedan identificadas como futuras.<br>* El documento es aprobado como base del desarrollo.<br><br> | En revisión | PARCIAL | docs/REGLAS_FINANCIERAS.md; docs/MATRIZ_CRITERIOS_JIRA.md; README.md | Completar alcance MVP/futuro y aprobación formal; falta evidencia de aprobación. | Highest |
| SCRUM-14 | CAUCE-02 — Diseño de arquitectura | Como desarrollador,  <br>quiero definir la arquitectura de Cauce,  <br>para contar con una estructura técnica organizada antes de implementar las funcionalidades.<br><br> | Criterios de aceptación:<br><br>* Arquitectura frontend/backend definida.<br>* Base de datos diseñada.<br>* Flujo de información definido.<br>* Componentes principales identificados.<br>* Estructura inicial del proyecto creada.<br><br> | En revisión | COMPLETADA | docs/ARQUITECTURA.md; docs/MODELO_DATOS.md; apps/api/prisma/schema.prisma | Sin trabajo esencial detectado. | Highest |
| SCRUM-15 | CAUCE-03 — Configuración inicial del MVP | Como desarrollador,  <br>quiero configurar la base técnica del proyecto,  <br>para comenzar la implementación del MVP.<br><br> | Criterios de aceptación:<br><br>* Aplicación ejecutándose localmente.<br>* Base de datos conectada.<br>* Estructura inicial funcional.<br>* Variables de configuración establecidas.<br>* Repositorio versionado.<br><br> | En revisión | COMPLETADA | package.json; .env.example; apps/api; apps/web; sql/instalar.sql | Arranque local verificado: frontend responde HTTP 200 y API inicia conectada a MySQL. | Highest |
| SCRUM-16 | CAUCE-04 — Diseño de interfaz base | Como usuario,  <br>quiero una interfaz clara y consistente,  <br>para poder utilizar Cauce fácilmente.<br><br> | Criterios de aceptación:<br><br>* Se implementa identidad visual de Cauce.<br>* Se define navegación principal.<br>* Se definen componentes reutilizables.<br>* Diseño responsive básico.<br>* Las pantallas principales tienen estructura inicial.<br><br> | En revisión | COMPLETADA | apps/web/app/page.tsx; apps/web/app/style.css | Validación visual de flujos en navegador pendiente. | High |
| SCRUM-17 | CAUCE-05 — Registro de usuario | Como usuario nuevo,  <br>quiero crear una cuenta con correo y contraseña,  <br>para acceder a Cauce.<br><br> | Criterios de aceptación:<br><br>* El usuario puede introducir correo.<br>* El usuario puede crear contraseña.<br>* Se validan campos obligatorios.<br>* No se permite registrar un correo duplicado.<br>* La contraseña se almacena de forma segura.<br>* Después del registro puede iniciar sesión.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/api/src/presentation/dto.ts; apps/web/app/page.tsx | Flujo implementado y cubierto por pruebas de integración; mantener. | Highest |
| SCRUM-18 | CAUCE-06 — Inicio de sesión |  | Criterios de aceptación:<br><br>* Usuario puede iniciar sesión.<br>* Credenciales incorrectas muestran error.<br>* Usuario autenticado accede al dashboard.<br>* Sesión protegida.<br>* Usuario puede cerrar sesión.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/api/src/presentation/auth.ts; apps/api/src/presentation/app.controller.ts | Flujo implementado y cubierto por pruebas de integración; mantener. | Highest |
| SCRUM-19 | CAUCE-07 — Gestión del perfil |  | Criterios de aceptación:<br><br>* Usuario puede consultar sus datos.<br>* Puede modificar información permitida.<br>* Cambios quedan almacenados.<br>* Usuario solo puede acceder a su información.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/api/src/presentation/app.controller.ts; apps/web/app/page.tsx | Perfil propio implementado y cubierto por pruebas; mantener. | High |
| SCRUM-20 | CAUCE-08 — Protección de rutas |  | Criterios de aceptación:<br><br>* Rutas privadas requieren autenticación.<br>* Usuario no autenticado es redirigido.<br>* Un usuario no puede consultar información de otro.<br><br> | Por hacer | COMPLETADA | apps/api/src/presentation/auth.ts; apps/api/src/presentation/app.controller.ts | Guard y aislamiento implementados; añadir E2E de rutas del navegador. | High |
| SCRUM-21 | CAUCE-09 — Crear gasto | Como usuario,  <br>quiero registrar un gasto rápidamente,  <br>para mantener actualizadas mis finanzas.<br><br> | Criterios de aceptación:<br><br>* Se puede ingresar monto.<br>* Se puede seleccionar categoría.<br>* Se puede registrar fecha.<br>* El gasto queda asociado al usuario.<br>* El saldo se actualiza.<br>* Se muestra confirmación.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Flujo y persistencia integrados; mantener. | Highest |
| SCRUM-22 | CAUCE-10 — Registrar ingreso |  | Criterios de aceptación:<br><br>* Se puede registrar un ingreso.<br>* Se registra monto.<br>* Se registra fecha.<br>* El ingreso aparece en movimientos.<br>* El saldo se actualiza correctamente.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Flujo y cálculo de saldo implementados; mantener. | Highest |
| SCRUM-23 | CAUCE-11 — Gestionar categorías |  | Criterios de aceptación:<br><br>* Existen categorías iniciales.<br>* Usuario puede crear categoría.<br>* Usuario puede editar categoría.<br>* Usuario puede seleccionar categoría al registrar movimiento.<br>* Las categorías pertenecen al usuario.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx; apps/api/prisma/seed.ts | Categorías globales y propias implementadas; mantener. | High |
| SCRUM-24 | CAUCE-12 — Consultar movimientos |  | Criterios de aceptación:<br><br>* Se muestran movimientos recientes.<br>* Se identifica ingreso/gasto.<br>* Se muestra categoría.<br>* Se muestra fecha.<br>* Se muestra valor.<br>* Solo se muestran movimientos del usuario.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Listado filtrable y aislamiento implementados; mantener. | High |
| SCRUM-25 | CAUCE-13 — Crear presupuesto |  | Criterios de aceptación:<br><br>* Puede seleccionar categoría.<br>* Puede definir límite.<br>* Se valida que el valor sea válido.<br>* El presupuesto queda asociado al periodo.<br>* Se almacena en BD.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Presupuesto por categoría y periodo implementado; mantener. | Highest |
| SCRUM-26 | CAUCE-14 — Consultar progreso del presupuesto |  | Criterios de aceptación:<br><br>* Se muestra valor utilizado.<br>* Se muestra límite.<br>* Se muestra porcentaje utilizado.<br>* Se muestra saldo disponible.<br>* La información se actualiza después de un movimiento.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Progreso derivado de movimientos y actualizado al cargar; mantener. | High |
| SCRUM-27 | CAUCE-15 — Detectar presupuesto cercano al límite |  | Criterios de aceptación:<br><br>* Sistema calcula porcentaje utilizado.<br>* Se identifica cuando una categoría está próxima al límite.<br>* Se genera evento de alerta.<br>* Se evitan alertas incorrectas.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Alertas de umbral con deduplicación implementadas; mantener. | High |
| SCRUM-28 | CAUCE-16 — Visualizar resumen presupuestal |  | Criterios de aceptación:<br><br>* Se muestran categorías.<br>* Cada categoría muestra progreso.<br>* Se diferencia estado normal y excedido.<br>* Información corresponde al periodo seleccionado.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Resumen y progreso por categoría/periodo implementados; mantener. | High |
| SCRUM-29 | CAUCE-17 — Crear meta de ahorro |  | Criterios de aceptación:<br><br>* Puede definir nombre.<br>* Puede definir monto objetivo.<br>* Puede establecer fecha.<br>* Meta queda asociada al usuario.<br>* Meta aparece en la sección de metas.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Meta asociada al usuario implementada; mantener. | Highest |
| SCRUM-30 | CAUCE-18 — Registrar aporte a una meta |  | Criterios de aceptación:<br><br>* Usuario puede aportar dinero.<br>* El valor se descuenta correctamente del saldo disponible.<br>* El progreso de la meta aumenta.<br>* Se registra la operación.<br>* No se permite aporte inválido.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/api/src/infrastructure/prisma.service.ts; apps/web/app/page.tsx | Aportes transaccionales, idempotentes y validados implementados; mantener. | High |
| SCRUM-31 | CAUCE-19 — Visualizar progreso de meta |  | Criterios de aceptación:<br><br>* Se muestra porcentaje.<br>* Se muestra monto acumulado.<br>* Se muestra monto objetivo.<br>* Se muestra progreso visual.<br>* Al alcanzar 100 % se identifica como completada.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Progreso y estado completado implementados; mantener. | High |
| SCRUM-32 | CAUCE-20 — Sistema de alertas financieras |  | Criterios de aceptación:<br><br>* Se detecta presupuesto cercano al límite.<br>* Se detectan pagos recurrentes próximos.<br>* Se muestra mensaje comprensible.<br>* La alerta corresponde al usuario.<br>* No se generan duplicados innecesarios.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Alertas personales, legibles y deduplicadas; recurrencias solo se leen desde la tabla existente, falta CRUD para pagos recurrentes. | High |
| SCRUM-33 | CAUCE-21 — Dashboard financiero |  | Criterios de aceptación:<br><br>* Se muestra saldo.<br>* Se muestran movimientos recientes.<br>* Se muestran gastos por categoría.<br>* Se muestran ingresos.<br>* Se muestran indicadores de presupuesto.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/api/src/presentation/app.controller.ts; apps/web/app/page.tsx | Dashboard con saldo, movimientos, categorías y presupuestos implementado; validar navegador. | Highest |
| SCRUM-34 | CAUCE-22 — Gráficas financieras |  | Criterios de aceptación:<br><br>* Se muestra distribución de gastos.<br>* Se muestran tendencias.<br>* Datos vienen de la BD.<br>* Gráficas se actualizan con nuevos movimientos.<br>* Se muestran tooltips.<br><br> | Por hacer | COMPLETADA | apps/api/src/application/app.service.ts; apps/api/src/presentation/app.controller.ts; apps/web/app/page.tsx; apps/web/app/style.css | Gráficas mensuales y por categoría alimentadas desde MySQL, con tooltips; validar navegador. | High |
| SCRUM-35 | CAUCE-23 — Proyección de flujo a 30 días |  | Criterios de aceptación:<br><br>* Se calcula saldo proyectado.<br>* Se consideran movimientos existentes.<br>* Se consideran gastos recurrentes.<br>* Se genera horizonte de 30 días.<br>* Se identifica posible saldo negativo.<br>* Se muestra gráficamente la proyección.<br><br> | Por hacer | PARCIAL | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Proyección basada en promedio neto reciente y pagos recurrentes conocidos; no hay pagos recurrentes configurables desde UI ni ingresos futuros modelados. | Highest |
| SCRUM-36 | CAUCE-24 — Identificación de riesgo financiero |  | Criterios de aceptación:<br><br>* Se identifica saldo proyectado negativo.<br>* Se identifica fecha aproximada del riesgo.<br>* Se genera alerta.<br>* Se explica el motivo.<br>* Se muestra la recomendación correspondiente.<br><br> | Por hacer | PARCIAL | apps/api/src/application/app.service.ts; apps/web/app/page.tsx | Riesgo negativo estimado y explicado en panel; aún no persiste una alerta de riesgo. | High |
| SCRUM-37 | CAUCE-25 — Análisis financiero con Cauce IA |  | Criterios de aceptación:<br><br>* IA recibe información financiera del usuario.<br>* Identifica patrones de gasto.<br>* Genera explicación comprensible.<br>* No analiza datos de otros usuarios.<br>* La respuesta está relacionada con datos reales.<br><br> | Por hacer | PARCIAL | apps/api/src/application/app.service.ts; apps/api/src/presentation/app.controller.ts; apps/web/app/page.tsx; docs/CAUCE_IA.md | Integración preparada con Gemini Flash-Lite y datos agregados aislados; falta GEMINI_API_KEY y una prueba real autorizada del servicio. | Highest |
| SCRUM-38 | CAUCE-26 — Recomendaciones financieras |  | Criterios de aceptación:<br><br>* IA puede identificar un problema.<br>* Propone una acción.<br>* Recomendación utiliza datos del usuario.<br>* Usuario puede aceptar o rechazar.<br>* Acción no se ejecuta sin confirmación cuando implique modificar dinero.<br><br> | Por hacer | PARCIAL | apps/api/src/application/app.service.ts; apps/web/app/page.tsx; docs/CAUCE_IA.md | Flujo de sugerencias y aceptación/rechazo implementado; falta GEMINI_API_KEY y validar contenido con respuestas reales. La decisión no modifica dinero. | High |
| SCRUM-39 | CAUCE-27 — Sugerencia de redirección |  | Criterios de aceptación:<br><br>* Sistema identifica situación de riesgo.<br>* Busca una alternativa disponible.<br>* Propone mover dinero entre metas/categorías.<br>* Muestra valor sugerido.<br>* Usuario puede aceptar o rechazar.<br><br> | Por hacer | PARCIAL | apps/api/src/application/app.service.ts; apps/web/app/page.tsx; docs/CAUCE_IA.md | El modelo puede sugerir origen/destino e importe con presupuestos y metas disponibles; falta clave y verificación real. La aceptación se registra solo en la sesión y no ejecuta transferencias. | High |
| SCRUM-40 | CAUCE-28 — Pruebas integrales del sistema |  | Criterios de aceptación:<br><br>* Registro funciona.<br>* Login funciona.<br>* Gastos e ingresos funcionan.<br>* Categorías funcionan.<br>* Presupuestos funcionan.<br>* Metas funcionan.<br>* Alertas funcionan.<br>* Dashboard funciona.<br>* Proyección funciona.<br>* Cauce IA funciona.<br><br> | Por hacer | PARCIAL | apps/api/test/database.integration.spec.ts; apps/api/src/domain/finance.spec.ts; apps/api/src/presentation/auth.spec.ts | Hay pruebas unitarias e integración MySQL; faltan E2E para frontend, proyección, IA y flujo desplegado. | Highest |
| SCRUM-41 | CAUCE-29 — Seguridad y validación |  | Criterios de aceptación:<br><br>* Contraseñas protegidas.<br>* Rutas privadas protegidas.<br>* Datos de usuarios aislados.<br>* Entradas validadas.<br>* Errores controlados.<br>* No se exponen datos sensibles.<br><br> | Por hacer | PARCIAL | apps/api/src/presentation/auth.ts; apps/api/src/presentation/dto.ts; apps/api/src/app.module.ts; apps/api/src/main.ts | Hash, guard, DTO, CORS, Helmet y secreto JWT requerido; completar revisión de seguridad y E2E de autorización. | High |
| SCRUM-42 | CAUCE-30 — Optimización de interfaz |  | Criterios de aceptación:<br><br>* Interfaz responsive.<br>* Navegación consistente.<br>* Formularios claros.<br>* Mensajes de error comprensibles.<br>* No existen elementos visuales cortados.<br>* Flujo de usuario validado.<br><br> | Por hacer | PARCIAL | apps/web/app/page.tsx; apps/web/app/style.css | Responsive base y mensajes implementados; falta inspección visual en tamaños/navegadores reales. | High |
| SCRUM-43 | CAUCE-31 — Despliegue del MVP |  | Criterios de aceptación:<br><br>* Aplicación desplegada.<br>* Base de datos configurada.<br>* Variables de entorno configuradas.<br>* Aplicación accesible.<br>* Funcionalidades principales verificadas en producción.<br><br> | Por hacer | BLOQUEADA | No existe proveedor/entorno de despliegue ni credenciales configurados. | Elegir hosting/API/MySQL, dominio, secretos y autorización de publicación. | Highest |
| SCRUM-44 | CAUCE-32 — Documentación y entrega final |  | Criterios de aceptación:<br><br>* README terminado.<br>* Arquitectura documentada.<br>* Instalación documentada.<br>* Funcionalidades documentadas.<br>* Manual básico de usuario.<br>* Evidencia de pruebas.<br>* Versión MVP etiquetada.<br><br> | Por hacer | PARCIAL | README.md; docs/ARQUITECTURA.md; docs/MODELO_DATOS.md; docs/REGLAS_FINANCIERAS.md | Completar manual de usuario, evidencia de pruebas y etiqueta de versión tras cerrar bloqueos. | High |

## Subtareas

Todos los estados observados son «Por hacer». Jira contiene duplicados de subtareas de SCRUM-13–16. Sin comentarios en ninguna subtarea.

- SCRUM-4 — Subtarea 2.1 → sin padre (Por hacer)
- SCRUM-45 — Identificar requisitos funcionales. → SCRUM-13 (Por hacer)
- SCRUM-46 — Definir requisitos no funcionales. → SCRUM-13 (Por hacer)
- SCRUM-47 — Delimitar funcionalidades del MVP. → SCRUM-13 (Por hacer)
- SCRUM-48 — Documentar funcionalidades futuras. → SCRUM-13 (Por hacer)
- SCRUM-49 — Validar documento de requisitos. → SCRUM-13 (Por hacer)
- SCRUM-50 — Diseñar arquitectura frontend/backend. → SCRUM-14 (Por hacer)
- SCRUM-51 — Diseñar base de datos. → SCRUM-14 (Por hacer)
- SCRUM-52 — Definir flujo de información. → SCRUM-14 (Por hacer)
- SCRUM-53 — Identificar componentes principales. → SCRUM-14 (Por hacer)
- SCRUM-54 — Crear estructura inicial del proyecto. → SCRUM-14 (Por hacer)
- SCRUM-55 — Crear proyecto base. → SCRUM-15 (Por hacer)
- SCRUM-56 — Configurar base de datos. → SCRUM-15 (Por hacer)
- SCRUM-57 — Configurar conexión. → SCRUM-15 (Por hacer)
- SCRUM-58 — Configurar frontend y backend. → SCRUM-15 (Por hacer)
- SCRUM-59 — Configurar variables de entorno. → SCRUM-15 (Por hacer)
- SCRUM-60 — Configurar Git y README. → SCRUM-15 (Por hacer)
- SCRUM-61 — Definir identidad visual. → SCRUM-16 (Por hacer)
- SCRUM-62 — Diseñar navegación principal. → SCRUM-16 (Por hacer)
- SCRUM-63 — Crear componentes reutilizables. → SCRUM-16 (Por hacer)
- SCRUM-64 — Implementar estructura responsive. → SCRUM-16 (Por hacer)
- SCRUM-65 — Identificar requisitos funcionales. → SCRUM-13 (Por hacer)
- SCRUM-66 — Definir requisitos no funcionales. → SCRUM-13 (Por hacer)
- SCRUM-67 — Delimitar funcionalidades del MVP. → SCRUM-13 (Por hacer)
- SCRUM-68 — Documentar funcionalidades futuras. → SCRUM-13 (Por hacer)
- SCRUM-69 — Validar documento de requisitos. → SCRUM-13 (Por hacer)
- SCRUM-70 — Diseñar arquitectura frontend/backend. → SCRUM-14 (Por hacer)
- SCRUM-71 — Diseñar base de datos. → SCRUM-14 (Por hacer)
- SCRUM-72 — Definir flujo de información. → SCRUM-14 (Por hacer)
- SCRUM-73 — Identificar componentes principales. → SCRUM-14 (Por hacer)
- SCRUM-74 — Crear estructura inicial del proyecto. → SCRUM-14 (Por hacer)
- SCRUM-75 — Crear proyecto base. → SCRUM-15 (Por hacer)
- SCRUM-76 — Configurar base de datos. → SCRUM-15 (Por hacer)
- SCRUM-77 — Configurar conexión. → SCRUM-15 (Por hacer)
- SCRUM-78 — Configurar frontend y backend. → SCRUM-15 (Por hacer)
- SCRUM-79 — Configurar variables de entorno. → SCRUM-15 (Por hacer)
- SCRUM-80 — Configurar Git y README. → SCRUM-15 (Por hacer)
- SCRUM-81 — Definir identidad visual. → SCRUM-16 (Por hacer)
- SCRUM-82 — Diseñar navegación principal. → SCRUM-16 (Por hacer)
- SCRUM-83 — Crear componentes reutilizables. → SCRUM-16 (Por hacer)
- SCRUM-84 — Implementar estructura responsive. → SCRUM-16 (Por hacer)

## Validación técnica realizada

- `npm test --workspace apps/api -- --runInBand`: 4 suites, 14 pruebas pasaron tras adaptar CAUCE IA a Gemini; incluye integración con respuesta simulada sin llamadas externas.
- `npm run build`: compilación de API y frontend completada correctamente tras el cambio de proveedor.
- `npm run build`: compilación NestJS y build de producción Next.js pasaron con las analíticas y la interfaz de CAUCE IA.
- La suite comprueba registro, login, credenciales incorrectas, perfil propio, separación entre usuarios, movimientos, saldo, presupuesto, metas, aportes idempotentes y alertas.
- No se reconstruyó ni migró la base de datos. No se ejecutó SQL de escritura ni cambios de esquema.
- CAUCE IA se probó con `fetch` simulado. Falta configurar `GEMINI_API_KEY` y verificar una respuesta real; no se enviaron datos financieros al proveedor.

## Bloqueos que requieren definición o entorno

1. SCRUM-37–39: Gemini `gemini-3.1-flash-lite` (nivel gratuito) y flujo con consentimiento implementados. Falta configurar `GEMINI_API_KEY` y validar una llamada real. Las sugerencias de redirección no ejecutan transferencias.
2. SCRUM-43: despliegue aplazado explícitamente por instrucción del usuario.
3. SCRUM-13: falta aprobación formal del alcance MVP.
4. SCRUM-32/35: existe la tabla de pagos recurrentes y la proyección consume sus registros, pero no hay interfaz de administración; la proyección supone que la tendencia neta diaria reciente continúa y descuenta pagos recurrentes conocidos, no anticipa nuevos ingresos.
5. Validación visual y E2E en navegador pendiente; la build no demuestra por sí sola comportamiento de interfaz en producción.

