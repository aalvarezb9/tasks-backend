# tasks-backend

API de gestión de tareas con Node.js, TypeScript, Express y Firebase Cloud Functions.
Aplica DDD (Domain-Driven Design), arquitectura limpia, principios SOLID, repositorios, inyección de dependencias, JWT para autenticación y emuladores de Firestore para desarrollo local.

---

## Decisiones de diseño

- **Arquitectura Hexagonal / DDD**: Separación clara en capas (dominio, aplicación, infraestructura, interfaces) para facilitar mantenibilidad y escalabilidad.
- **Inyección de dependencias (tsyringe)**: Evita acoplamientos, facilita tests y mocking.
- **Repositorios + Factories**: Centralizan la persistencia, permiten cambiar la fuente de datos sin tocar la lógica de negocio.
- **Patrón DTO**: Data Transfer Objects para validar y transformar datos entre capas.
- **Decoradores**: `@CatchErrors` para manejo uniforme de errores y `@RequireAuth` para controlar rutas protegidas.
- **JWT**: Autenticación stateless con tokens firmados y expiración configurada.
- **Firestore**: Base de datos NoSQL, uso de índices compuestos para consultas eficientes.

## Tecnologías utilizadas

- **Node.js 20**: Runtime moderno con soporte LTS.
- **TypeScript**: Tipado estático, interfaces, generics.
- **Express**: Framework HTTP minimalista.
- **Firebase Cloud Functions (GCFv2)**: Despliegue serverless en Google Cloud.
- **Firebase Firestore**: Almacenamiento de documentos, emulador local.
- **tsyringe**: Contenedor IoC para inyección de dependencias.
- **bcryptjs**: Hash de contraseñas.
- **jsonwebtoken**: Generación y verificación de JWT.
- **express-validator**: Validación de peticiones.
- **Jest**: Pruebas unitarias.
- **ESLint + Prettier**: Calidad y formateo de código.
- **GitHub Actions**: CI/CD para tests, build y despliegue.

---

## Requisitos

- Node.js ≥ 20
- npm
- Firebase CLI (`npm install -g firebase-tools`)


## Archivo `.env.example`

```ini
JWT_SECRET=TuSecretoJWT
KEYS_ROUTE='path/to/keys.json'
ENVIRONMENT=dev
```

## Instalación

```bash
git clone https://github.com/aalvarezb9/tasks-backend.git
cd tasks-backend
npm ci
```

Copiar `.env.example` a `.env` y completar las variables.

## Compilación y escucha de cambios

En una terminal, ejecuta el comando

```bash
npm run watch:ts
```

## Emuladores locales

Luego, en otra terminal, ejecuta

```bash
npm run emul
```

La API quedará disponible en:

```
http://localhost:5001/<project-id>/us-central1/api
```

## Pruebas unitarias

```bash
npm test
```

## Despliegue CI/CD con GitHub Actions

### Secrets necesarios en GitHub

| Name                       | Value                                  |
| -------------------------- | -------------------------------------- |
| FIREBASE_SERVICE_ACCOUNT   | JSON de la cuenta de servicio clave    |
| FIREBASE_CI_TOKEN          | Token generado con `firebase login:ci` |
| JWT_SECRET                 | El mismo valor que en `.env`           |

### Workflow: `.github/workflows/api-deploy.yml`

## URLs de producción

- Cloud Functions: `https://api-7i6f5y2s2a-uc.a.run.app`

