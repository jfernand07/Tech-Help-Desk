# Tech Help Desk API (NestJS)

Implementación de mesa de ayuda con autenticación JWT, control de roles y gestión de tickets, clientes, técnicos, usuarios y categorías.

## Autor
- Jose Fernando Ospina Garcia – Clan: Ubuntu

## Requisitos previos
- Node.js >= 18
- PostgreSQL >= 14
- npm

## Configuración rápida
1. Instalar dependencias
   ```bash
   npm install
   ```
2. Configurar variables de entorno (`.env`)
   ```env
   PORT=3000
   NODE_ENV=development

   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=tech_helpdesk

   JWT_SECRET=super-secret
   JWT_REFRESH_SECRET=super-refresh-secret
   JWT_EXPIRES_IN=1d
   ```
3. Levantar base de datos y ejecutar migraciones si aplica
   ```bash
   npm run start:dev
   ```
4. Importar datos iniciales desde `database/seed.sql` si se requiere

## Ejecutar la aplicación
```bash
npm run start:dev
```
La API estará disponible en `http://localhost:3000` y la documentación Swagger en `http://localhost:3000/api`.

## Estructura principal
- `src/auth`: autenticación JWT, guards y decoradores de rol/usuario
- `src/tickets`: dominio de tickets con validaciones de negocio
- `src/usuarios`, `src/cliente`, `src/technicians`, `src/categories`: módulos CRUD por dominio
- `src/common`: filtros, interceptores y middleware comunes

## Endpoints destacados
- Autenticación
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/refresh`
- Tickets
  - `POST /tickets` (cliente/admin) crear ticket validando cliente y categoría
  - `PATCH /tickets/:id/status` (admin/técnico) cambio de estado con flujo Open -> In Progress -> Resolved -> Closed
  - `GET /tickets/client/:id` historial por cliente
  - `GET /tickets/technician/:id` tickets por técnico
- Administración (solo rol admin)
  - CRUD `/usuarios`, `/categories`, `/clientes`, `/technicians`

## Pruebas
- Unitarias: `npm test`
- Cobertura: `npm run test:cov` (mínimo esperado 40%)

## Datos y documentación
- Dump SQL inicial: `database/seed.sql`
- Swagger: `http://localhost:3000/api`
- Ejemplos de uso y modelos en los decoradores `@ApiProperty` de los DTOs.
