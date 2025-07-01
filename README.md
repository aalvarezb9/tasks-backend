# tasks-backend

API de gestión de tareas con Node.js, TypeScript, Express y Firebase Cloud Functions. Aplica DDD, repositorios, inyección de dependencias, JWT y emulador de Firestore.

---

## Requisitos

- Node.js ≥ 20
- npm
- Firebase CLI (`npm install -g firebase-tools`)


## Archivo `.env.example`

```ini
JWT_SECRET=TuSecretoJWT
KEYS_ROUTE='path/to/google_keys.json  '
ENVIRONMENT=dev
```

## Instalación

```bash
git clone https://github.com/aalvarezb9/tasks-backend.git
cd tasks-backend
npm ci
```

Copiar `.env.example` a `.env` y completar las variables.

## Emuladores locales

En una terminal ejecutar

```bash
npm run watch:ts
```

Luego, en otra

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
| FIREBASE\_SERVICE\_ACCOUNT | JSON de la cuenta de servicio clave    |
| FIREBASE\_CI\_TOKEN        | Token generado con `firebase login:ci` |
| JWT\_SECRET                | El mismo valor que en `.env`           |

### Workflow: `.github/workflows/api-deploy.yml`

## URLs de producción

- Cloud Functions: `https://api-7i6f5y2s2a-uc.a.run.app`

