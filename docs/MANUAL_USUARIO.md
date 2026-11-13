# Guía rápida de CAUCE

## Crear cuenta y entrar

1. Abre la aplicación y elige **Regístrate**.
2. Ingresa nombre, correo y una contraseña de al menos ocho caracteres.
3. Usa ese correo y contraseña para iniciar sesión. La sesión queda en una cookie HttpOnly; cierra sesión desde la barra lateral al terminar.

## Registrar y consultar movimientos

En **Movimientos**, selecciona ingreso o gasto, monto en COP, categoría y fecha. CAUCE valida el monto y la categoría, asocia el movimiento a la cuenta activa y recalcula el saldo. El historial muestra los últimos movimientos y permite filtrar por tipo.

## Categorías y presupuestos

En **Categorías** puedes crear categorías propias de ingreso o gasto y cambiar su nombre. Las categorías iniciales son compartidas. En **Presupuestos**, elige una categoría de gasto, monto límite y periodo. La vista compara gasto acumulado con el límite, muestra lo disponible y marca el presupuesto cerca del umbral o excedido. Los movimientos dentro del periodo actualizan el cálculo y las alertas.

## Metas y aportes

En **Metas**, crea el objetivo y su fecha. Un aporte descuenta del saldo disponible, queda registrado y requiere saldo suficiente. Los reintentos con la misma clave de idempotencia no duplican el movimiento. La pantalla muestra valor ahorrado, porcentaje, saldo restante e historial de aportes.

## Dashboard, tendencias y alertas

**Resumen** presenta el saldo, actividad reciente, metas y presupuestos; incluye seis meses de ingresos/gastos, gastos por categoría y una proyección diaria a 30 días. La proyección usa el promedio neto registrado en los últimos 90 días y descuenta los pagos recurrentes activos que estén configurados en la base de datos. No es una garantía de saldo futuro: no predice ingresos que aún no estén registrados. Si estima saldo negativo, muestra la fecha aproximada y el motivo.

En **Alertas** puedes marcar avisos como leídos. Las alertas de presupuesto y meta se generan con los eventos del sistema. Las alertas de pagos recurrentes se calculan a partir de las filas existentes en `recurring_payments`.

## Perfil y seguridad

En **Perfil** puedes cambiar nombre, teléfono, ciudad y foto, y cambiar tu contraseña confirmando la actual. Las categorías, movimientos, presupuestos, metas y alertas se filtran con el identificador de usuario de la sesión. No compartas tu contraseña ni dejes una sesión abierta en un equipo compartido.
