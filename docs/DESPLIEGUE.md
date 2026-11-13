# Despliegue de CAUCE

La aplicación se compone de tres servicios: Next.js en Vercel, NestJS en Render y PostgreSQL en Supabase. La API usa Prisma para persistencia. No publiques `.env` ni copies secretos a Git.

## Estado y prerrequisitos

- `apps/api/prisma/schema.prisma` y el baseline nuevo usan PostgreSQL.
- Las migraciones MySQL anteriores se conservan en `apps/api/prisma/mysql-migrations-legacy`; no son compatibles con Supabase.
- El baseline PostgreSQL crea un esquema vacío. Si quieres conservar información de MySQL, hace falta migrarla antes de conectar usuarios a producción.
- El navegador de esta sesión no está disponible para crear servicios ni vincular repositorios. Estos pasos quedan pendientes de ejecutar en los paneles.

## Supabase

1. Crea un proyecto Supabase y guarda la contraseña de base de datos en tu gestor de contraseñas.
2. En **Connect**, copia la cadena PostgreSQL. Usa una conexión compatible con Render y SSL (`sslmode=require`); reemplaza los valores de ejemplo sin compartir la cadena en el chat.
3. Usa esa cadena como `DATABASE_URL` del servicio Render.

## Render (API)

1. Importa el repositorio y usa el blueprint `render.yaml`.
2. En las variables del servicio define `DATABASE_URL` y `WEB_ORIGIN` con la URL final de Vercel. `JWT_SECRET` se genera automáticamente en el blueprint. `GEMINI_API_KEY` es opcional y solo se requiere para CAUCE IA.
3. El servicio escucha en el puerto que Render asigne y expone `/api/health`.
4. Render ejecuta `prisma migrate deploy` al iniciar. Revisa que Supabase sea una base nueva/vacía antes de aplicar el baseline.

## Vercel (web)

1. Importa el mismo repositorio y define **Root Directory** como `apps/web`.
2. Mantén el preset Next.js. En **Environment Variables** agrega `API_ORIGIN` con la URL pública de Render, sin `/api` al final. La reescritura `/api/*` pasa las solicitudes al backend conservando cookies.
3. Despliega y copia la URL pública que Vercel asigne.
4. Vuelve a Render y define `WEB_ORIGIN` con esa URL exacta; guarda y espera el redespliegue.

## Verificación manual

- Abre `https://<servicio-render>/api/health`; debe responder `{"status":"ok"}`.
- Abre la URL de Vercel, registra un usuario de prueba, inicia sesión y crea un movimiento.
- Comprueba que la sesión persiste al recargar y que el movimiento vuelve a aparecer.

## Variables locales

Consulta `.env.example` para el formato local de `DATABASE_URL`, `JWT_SECRET`, `WEB_ORIGIN` y la clave opcional de Gemini. En producción, configura secretos desde los paneles de Render y Vercel.
