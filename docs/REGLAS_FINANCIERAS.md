# Reglas financieras

- Montos se aceptan con máximo dos decimales y se guardan en MySQL `DECIMAL(13,2)`. Las operaciones de negocio convierten a centavos enteros (`BigInt`).
- Saldo disponible = ingresos − gastos − aportes a metas. Un aporte es transferencia interna: resta disponibilidad una vez, no es ingreso ni gasto de consumo.
- Gasto presupuestal suma movimientos `EXPENSE` de esa categoría cuya fecha cae entre inicio y fin, ambos incluidos. Disponible = límite − gasto. Porcentaje = gasto / límite × 100 sin tope; un monto excedido permanece visible.
- Presupuesto cercano empieza por defecto al 80% inclusive. `BUDGET_NEAR_THRESHOLD` configura el valor inicial (0.01–100.00); se conserva por presupuesto en `alert_threshold`. Excedido significa gasto > límite y tiene precedencia frente a cercano. La regla se calcula en `budgetState` del dominio.
- Progreso de meta = aportes acumulados / objetivo × 100. Los aportes no se aceptan si el saldo no alcanza, exceden el restante o la meta ya está completa.
- La contribución se guarda dentro de una transacción serializable; la clave `Idempotency-Key` identifica reintentos de una misma meta. La alerta de meta completada usa llave única usuario/tipo/meta.
- Alertas de presupuesto son persistentes e idempotentes por presupuesto y estado (cercano/excedido). Una transición normal→cercano→excedido puede generar una alerta por cada estado.
