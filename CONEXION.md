# Conexión de desarrollo

La aplicación usa MySQL en `localhost:3306`, base de datos `cause`, usuario `root` y clave `root`.
La cadena está en `.env` como `DATABASE_URL`. Crea primero la base de datos con `sql/instalar.sql` o `npm run db:migrate`.

Estos datos son configuración local solicitada para desarrollo. No los reutilices en producción; cambia la clave y `JWT_SECRET` antes de desplegar.
