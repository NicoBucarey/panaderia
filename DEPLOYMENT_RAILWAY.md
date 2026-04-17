# 🚀 Guía de Deployment en Railway

## 📋 Requisitos previos

1. Cuenta en [Railway.app](https://railway.app)
2. Proyecto git pusheado a GitHub/GitLab
3. Variables de entorno configuradas

---

## 1️⃣ Desplegar Base de Datos PostgreSQL en Railway

### Pasos:

1. Ve a [Railway.app](https://railway.app) y crea un nuevo proyecto
2. Haz click en "+ New" → "Database" → "PostgreSQL"
3. Railway generará automáticamente la `DATABASE_URL` (variables)
4. **Guarda esta URL** - la necesitarás en el paso siguiente

---

## 2️⃣ Desplegar Backend en Railway

### Pasos:

1. En tu proyecto de Railway, haz click en "+ New" → "GitHub Repo"
2. Selecciona tu repositorio del proyecto
3. Selecciona la carpeta raíz `/server` como "Base Directory"

### Configurar Variables de Entorno:

1. Ve a la pestaña de tu servicio de Node.js
2. Ve a "Variables" y agrega:

```
DATABASE_URL=postgresql://...  # La que generó Railway
JWT_SECRET=tu-secreto-muy-largo-y-aleatorio-minimo-32-caracteres-aleatorios
NODE_ENV=production
```

### Configurar Build & Deploy:

1. Railway debería detectar automáticamente que es un proyecto Node.js
2. **Start Command:** `node -r dotenv/config src/server.js` (ya configurado en package.json)
3. El servicio se deployará automáticamente

### Obtener la URL del Backend:

- Railway te asignará un dominio automáticamente (ej: `https://panaderia-api.up.railway.app`)
- **Guarda esta URL** - la necesitarás para el frontend

---

## 3️⃣ Actualizar Vercel (Frontend) con la URL del Backend

### Pasos:

1. Ve a tu proyecto en [Vercel.app](https://vercel.com)
2. Ve a "Settings" → "Environment Variables"
3. Agrega una nueva variable:

```
VITE_API_URL=https://tu-backend-railway.up.railway.app
```

4. Vercel hará un redeploy automático con esta variable

---

## 4️⃣ Actualizar CORS en el Backend

Si la URL de Vercel es diferente a `https://panaderia.vercel.app`:

1. Ve a `server/src/server.js`
2. Actualiza el array `allowedOrigins`:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://tu-dominio-vercel.app",  // ← Actualiza aquí
]
```

3. Pushea a GitHub (Railway redesplegará automáticamente)

---

## 5️⃣ Ejecutar Migraciones en Railway

### En la consola SSH de Railway:

```bash
npx prisma migrate deploy
npx prisma db seed
```

O si Railway tiene un panel de ejecutar comandos:

1. Ve a tu servicio de Node.js
2. Pestaña "Deploy" → "Logs"
3. Haz click en los 3 puntitos → "SSH"
4. Ejecuta los comandos arriba

---

## ⚠️ Problemas Comunes

### "Connection refused"
- Verifica que `DATABASE_URL` sea correcta
- Verifica que `NODE_ENV=production` está configurado

### "CORS no permitido"
- Revisa que el dominio de Vercel esté en el array `allowedOrigins`
- Reinicia el servicio de Railway

### Uploads se pierden en cada deploy
- Los archivos subidos se almacenan en memoria (efímero)
- Solución futura: integrar AWS S3 o servicio similar

---

## 📌 URLs Finales Después del Deploy

- **Frontend:** https://tu-dominio-vercel.app
- **Backend API:** https://tu-backend-railway.up.railway.app
- **Base de datos:** Alojada automáticamente en Railway (privada)

---

## ✅ Verificar que Todo Funciona

1. Abre tu sitio en Vercel
2. Intenta ver productos (debe conectar a Railway)
3. Intenta crear un producto desde admin (debe guardar en BD)
4. Verifica los logs en Railway para errores

---

**¡Listo! Tu aplicación debe estar completamente desplegada.** 🎉
