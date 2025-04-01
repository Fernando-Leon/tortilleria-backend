## Pasos para iniciar el proyecto

### 1. Descargar las dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

---

### 2. Configurar la conexión a la base de datos (MySQL)

#### a) Crear la base de datos en MySQL

Ejecuta el siguiente comando en tu cliente de MySQL para crear la base de datos:

```sql
CREATE DATABASE nombre_base_datos;
```

#### b) Configurar la conexión en el archivo `data-source.ts`

Edita el archivo [`data-source.ts`](./db/data-source.ts) y actualiza los valores de conexión con los datos de tu servidor MySQL:

```typescript
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'tu_host', // Cambia esto por tu host (por ejemplo, localhost)
  port: 3306,      // Cambia esto si usas un puerto diferente
  username: 'root', // Cambia esto por tu usuario de MySQL
  password: 'root', // Cambia esto por tu contraseña de MySQL
  database: 'tortilleria', // Cambia esto por el nombre de tu base de datos
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
};
```

---

### 3. Ejecutar migraciones

Para aplicar las migraciones a la base de datos, ejecuta:

```bash
npm run migration:run
```

---

### 4. Compilar y ejecutar el proyecto

#### a) Modo desarrollo

Para iniciar el proyecto en modo desarrollo, ejecuta:

```bash
npm run start
```

#### b) Modo observación 

Para iniciar el proyecto en modo observación (útil para desarrollo), ejecuta:

```bash
npm run start:dev
```

#### c) Modo producción

Para iniciar el proyecto en modo producción, ejecuta:

```bash
npm run start:prod
```

---

### 5. Generar nuevas migraciones (solo si haces cambias la estructura en las tablas o agregas nuevas tablas, relaciones etc.)

Si necesitas crear una nueva migración, utiliza el siguiente comando, reemplazando `nombredelamigracion` por el nombre de tu migración:

```bash
npm run migration:generate -- db/migrations/nombredelamigracion
```

---
