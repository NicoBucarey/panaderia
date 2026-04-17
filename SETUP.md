# 📋 Setup Guide - Panadería Blasco

## 🖥️ Desarrollo Local

### 1. Backend Setup

```bash
cd server
npm install
```

Crear archivo `.env` en `/server`:
```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/panaderia_dev"
JWT_SECRET="tu-secreto-muy-largo-y-aleatorio-minimo-32-caracteres"
NODE_ENV=development
PORT=5000
```

Inicializar base de datos:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Iniciar servidor:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Crear archivo `.env.local` en `/client`:
```
VITE_API_URL=http://localhost:5000
```

Iniciar desarrollo:
```bash
npm run dev
```

---

## 🚀 Producción (Railway)

Ver archivo: [DEPLOYMENT_RAILWAY.md](./DEPLOYMENT_RAILWAY.md)

---

## 📁 Estructura del Proyecto

```
panaderia/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   ├── public/            # Assets (imágenes, logo)
│   ├── .env.example       # Variables de ejemplo
│   └── vite.config.js
├── server/                 # Backend (Express + Prisma)
│   ├── src/
│   ├── prisma/
│   ├── .env.example       # Variables de ejemplo
│   └── package.json
├── readme.md
└── DEPLOYMENT_RAILWAY.md  # Guía de deployment
```

---

## 🔐 Credenciales Iniciales

### Usuario Admin (después de seed)
- Email: `admin@panaderia.com`
- Password: `admin123` *(cambiar después)*

---

## 📝 Notas Importantes

1. **Uploads**: Los archivos subidos se guardan en `/server/uploads/`
2. **CORS**: Configurado para permitir localhost y dominios de producción
3. **JWT**: Usa `localStorage` para guardar tokens
4. **DB**: PostgreSQL requerida tanto en desarrollo como producción

---

**¿Preguntas? Revisa los archivos individuales README en cada carpeta.** 📚
