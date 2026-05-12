# Comandos de Drizzle Kit

Guía de referencia rápida sobre los principales comandos de [Drizzle Kit](https://orm.drizzle.team/docs/overview), la herramienta CLI utilizada para gestionar el esquema y las migraciones de la base de datos en este proyecto.

## Configuración del proyecto

Este proyecto usa la siguiente configuración (ver `drizzle.config.ts`):

- **Dialecto:** `postgresql`
- **Esquema:** `./db/schema`
- **Salida de migraciones:** `./drizzle`
- **Credenciales:** `process.env.DATABASE_URL`

> Todos los comandos se ejecutan con `npx drizzle-kit <comando>` (o `npx drizzle-kit <comando>` si no usas Bun).

---

## `generate`

Genera archivos SQL de migración a partir de los cambios detectados en el esquema declarado en TypeScript.

```bash
npx drizzle-kit generate
```

**¿Cuándo usarlo?**

- Cada vez que modifiques o añadas tablas, columnas, índices o relaciones en `db/schema`.
- Es el flujo recomendado para entornos productivos donde se mantiene un historial de migraciones versionadas.

**¿Qué hace?**

1. Compara el esquema actual con la última snapshot guardada en `./drizzle/meta`.
2. Crea un nuevo archivo `.sql` con los `ALTER`, `CREATE` o `DROP` necesarios.
3. Actualiza el snapshot interno para que la próxima generación parta del estado nuevo.

**Opciones útiles**

- `--name <nombre>` → asigna un nombre legible al archivo de migración.
- `--custom` → crea una migración vacía para escribir SQL a mano.

---

## `migrate`

Aplica los archivos de migración generados sobre la base de datos definida en `dbCredentials`.

```bash
npx drizzle-kit migrate
```

**¿Cuándo usarlo?**

- En CI/CD o al desplegar para sincronizar la base de datos con el código.
- Después de hacer `generate` y revisar el SQL generado.

**¿Qué hace?**

1. Lee los archivos en `./drizzle` por orden cronológico.
2. Verifica la tabla interna `__drizzle_migrations` para saber qué falta por aplicar.
3. Ejecuta cada migración pendiente dentro de una transacción.

> Para entornos serverless puedes ejecutar las migraciones programáticamente con `migrate()` desde `drizzle-orm/node-postgres/migrator` (u otro adaptador).

---

## `push`

Sincroniza directamente la base de datos con el esquema de TypeScript, **sin generar archivos de migración**.

```bash
npx drizzle-kit push
```

**¿Cuándo usarlo?**

- Prototipado rápido y desarrollo local.
- Bases de datos efímeras (entornos de pruebas, branch databases, etc.).

**¿Cuándo NO usarlo?**

- En producción. Al no haber historial, perderás trazabilidad y control de cambios destructivos.

**Opciones útiles**

- `--force` → aplica cambios potencialmente destructivos sin pedir confirmación.
- `--verbose` → imprime el SQL que se ejecutará antes de correrlo.

---

## `pull`

Hace ingeniería inversa: introspecciona la base de datos existente y genera el esquema TypeScript de Drizzle a partir de ella.

```bash
npx drizzle-kit pull
```

**¿Cuándo usarlo?**

- Cuando heredas una base de datos ya existente y quieres adoptar Drizzle.
- Para sincronizar un esquema local con cambios manuales hechos directamente en la DB.

**¿Qué hace?**

1. Se conecta usando `dbCredentials`.
2. Lee tablas, columnas, tipos, claves, índices y relaciones.
3. Crea archivos `schema.ts`, `relations.ts` y un snapshot inicial dentro de la carpeta `out`.

---

## `export`

Exporta el SQL del esquema actual sin escribir archivos de migración. Útil para inspección o para integrarlo con otras herramientas.

```bash
npx drizzle-kit export
```

**¿Cuándo usarlo?**

- Para imprimir el `CREATE TABLE` completo del esquema y compartirlo o auditarlo.
- Como entrada de pipelines externos (formateadores SQL, generadores de docs, etc.).

**Opciones útiles**

- `--sql` → imprime el SQL en stdout (formato por defecto).

---

## `check`

Valida la integridad del historial de migraciones y detecta conflictos o colisiones (por ejemplo, dos migraciones con el mismo timestamp tras un merge de Git).

```bash
npx drizzle-kit check
```

**¿Cuándo usarlo?**

- Tras hacer merge/rebase en una rama con migraciones nuevas.
- Como paso de verificación en CI antes de aplicar `migrate`.

**¿Qué detecta?**

- Migraciones duplicadas o desordenadas.
- Inconsistencias entre el snapshot y los archivos `.sql`.
- Hashes corruptos en `_journal.json`.

---

## `studio`

Inicia [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview), una interfaz web para explorar y editar los datos de la base de datos.

```bash
npx drizzle-kit studio
```

Por defecto se levanta en `https://local.drizzle.studio`.

**¿Cuándo usarlo?**

- Para inspeccionar datos durante el desarrollo sin abrir un cliente SQL aparte.
- Para editar registros puntualmente, ejecutar consultas y ver relaciones gráficamente.

**Opciones útiles**

- `--port <num>` → cambia el puerto local (por defecto `4983`).
- `--host <ip>` → expone Studio en otra interfaz de red.
- `--verbose` → muestra logs detallados de las consultas.

---

## Flujo recomendado en este proyecto

1. Modifica el esquema en `db/schema/*.ts`.
2. Ejecuta `npx drizzle-kit generate --name <descripcion>` y revisa el SQL.
3. Aplica con `npx drizzle-kit migrate` (o `push` si es desarrollo desechable).
4. Verifica con `npx drizzle-kit check` antes de subir a CI.
5. Inspecciona los datos con `npx drizzle-kit studio` cuando lo necesites.

## Scripts sugeridos para `package.json`

Puedes añadir estos scripts para no tener que escribir el comando completo cada vez:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:pull": "drizzle-kit pull",
    "db:export": "drizzle-kit export",
    "db:check": "drizzle-kit check",
    "db:studio": "drizzle-kit studio"
  }
}
```
