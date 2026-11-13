# CAUCE IA

## Proveedor y modelo

CAUCE IA usa la Gemini API de Google con `gemini-3.1-flash-lite`, que dispone de nivel gratuito en la API según la [página oficial de precios](https://ai.google.dev/gemini-api/docs/pricing). El nivel gratuito tiene límites de uso que pueden cambiar y el proveedor puede usar el contenido enviado para mejorar sus productos. Comprueba las condiciones vigentes de Google antes de usar datos reales.

## Flujo y datos

1. El usuario abre **Cauce IA**, lee qué datos salen del sistema y confirma el consentimiento cada vez.
2. `POST /api/ai/analyze` exige una sesión válida y `consent: true`.
3. El backend consulta MySQL para el usuario autenticado y arma un resumen: totales mensuales, gastos por categoría, presupuestos, metas, saldo y proyección. No envía nombre, correo, identificadores ni descripciones o filas individuales.
4. Envía el resumen a Gemini con salida JSON estructurada. No guarda la solicitud o respuesta de IA en MySQL ni en registros de aplicación. Hay timeout y los errores del proveedor se muestran con mensajes genéricos.
5. El navegador puede marcar cada sugerencia como aceptada o rechazada durante la sesión. Esa decisión no ejecuta operaciones ni se persiste; el modelo no tiene herramientas para escribir datos financieros.

El consentimiento de la pantalla informa que Google puede usar contenido del nivel gratuito para mejorar sus productos. No uses este modo para información que no quieras compartir con el proveedor. Las claves permanecen en el backend y nunca se envían al navegador.

El análisis es orientativo, no asesoría financiera profesional. El modelo recibe instrucciones para no inventar hechos ni afirmar que hizo cambios monetarios. La respuesta se valida contra el esquema esperado antes de enviarse al cliente.

## Configuración local

1. Crea una API key en [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Añade estas variables al `.env` que carga la API:

```dotenv
GEMINI_API_KEY=tu_clave_de_google_ai_studio
GEMINI_MODEL=gemini-3.1-flash-lite
```

No pongas la clave en `NEXT_PUBLIC_*`, no la registres y no la incluyas en Git. Sin `GEMINI_API_KEY`, el endpoint responde con servicio no disponible. Las pruebas automáticas usan respuestas simuladas y no envían datos financieros a Google.
