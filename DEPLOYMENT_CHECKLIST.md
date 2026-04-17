# ✅ Checklist de Deployment

## Antes de Desplegar

- [ ] Todo está pusheado a GitHub
- [ ] Probaste en local y funciona
- [ ] Vercel ya tiene el frontend deployado
- [ ] Tienes cuenta en Railway.app

---

## 🔧 Paso a Paso - Railway Deployment

### 1. Base de Datos
- [ ] Crea PostgreSQL en Railway
- [ ] Copia la `DATABASE_URL` que genera Railway
- [ ] Guarda en lugar seguro

### 2. Backend Service
- [ ] Agrega tu repo a Railway (carpeta: `/server`)
- [ ] Configura variables de entorno:
  - [ ] `DATABASE_URL` (de Railway PostgreSQL)
  - [ ] `JWT_SECRET` (genera uno aleatorio)
  - [ ] `NODE_ENV=production`
- [ ] Railway se deploya automáticamente
- [ ] Obtén la URL del backend (ej: `https://panaderia-api.up.railway.app`)

### 3. Actualizar Frontend (Vercel)
- [ ] Ve a Vercel Settings → Environment Variables
- [ ] Agrega: `VITE_API_URL=https://tu-backend-railway.app`
- [ ] Vercel redespliega automáticamente

### 4. Actualizar CORS (si es necesario)
- [ ] Si tu Vercel URL es distinta, actualiza `server/src/server.js`
- [ ] Modifica el array `allowedOrigins`
- [ ] Pushea a GitHub (Railway redespliega)

### 5. Ejecutar Migraciones
- [ ] Accede SSH en Railway
- [ ] Ejecuta: `npx prisma migrate deploy`
- [ ] Ejecuta: `npx prisma db seed`

---

## ✅ Verificación Final

- [ ] Abre tu sitio en Vercel
- [ ] Ve a Admin y crea un producto
- [ ] Verifica que se guardó en la BD
- [ ] Intenta subir una imagen
- [ ] Abre el WhatsApp desde FloatingBar
- [ ] Revisa logs en Railway para errores

---

## 🎯 URLs Finales

- **Frontend:** `https://tu-dominio.vercel.app`
- **Backend:** `https://tu-dominio-api.up.railway.app`

---

## 📞 Si Algo Falla

1. Revisa los logs en Railway (tab "Logs")
2. Revisa la consola del navegador (F12 en Vercel)
3. Verifica CORS: debe coincidir exactamente el dominio de Vercel
4. Verifica DATABASE_URL: prueba la conexión
5. Verifica JWT_SECRET: debe estar seteada

---

**Suerte! 🚀**
