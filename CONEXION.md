# Conexión MySQL

La API usa Prisma para conectarse a MySQL en la base `cause`. La cadena se configura únicamente en `DATABASE_URL` dentro del archivo local `.env`, excluido de Git. Ajusta usuario y contraseña a la instalación local; el repositorio no publica credenciales de conexión.

El backend valida que exista `JWT_SECRET` con al menos 32 caracteres al iniciar. En desarrollo puede generarse uno aleatorio y guardarse en `.env`. Usa valores diferentes en producción y almacénalos en el gestor de secretos de la plataforma.

La base inspeccionada contiene las tablas existentes del sistema y no se reemplazó ni se alteró. Revisa primero [el inventario del esquema](docs/INVENTARIO_BASE_DATOS.md) antes de aplicar futuras migraciones.
