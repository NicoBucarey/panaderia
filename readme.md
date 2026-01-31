# 🥖 Web Panadería de Barrio

Proyecto web full‑stack desarrollado para una panadería de barrio, con el objetivo de mostrar productos, facilitar la consulta de precios vía WhatsApp y brindar información clara del local, sin implementar ventas online.

La aplicación está pensada para ser **simple, rápida y mobile‑first**, ya que los clientes accederán principalmente desde un **código QR**.

---

## 🚀 Tecnologías utilizadas

### Frontend

* **React**
* **Tailwind CSS** (estilos y diseño responsive)

### Backend

* **Node.js**
* **Express.js**

### Base de datos

* **PostgreSQL**

### Deploy (cuando el proyecto esté finalizado)

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Base de datos: Railway PostgreSQL / Supabase

---

## 👥 Roles del sistema

### 🔐 Encargado / Administrador

Único rol con autenticación.

Funciones principales:

* Login de administrador
* Gestión de productos (CRUD)
* Gestión de categorías
* Marcar productos como disponibles / no disponibles
* Marcar productos como destacados
* Configuración de información del local (horarios, contacto, ubicación)

> No existe registro público. El acceso es exclusivo del encargado.

---

### 👤 Cliente (vista pública)

Acceso sin autenticación, principalmente desde un **QR**.

Funciones disponibles:

* Visualizar productos
* Filtrar productos por categoría
* Ver precios, imágenes y descripciones
* Consultar productos vía WhatsApp
* Ver ubicación del local en el mapa
* Acceder al contacto directo por WhatsApp
* Ver horarios de atencion 

---

## 📦 Productos

Cada producto cuenta con la siguiente información:

* Nombre
* Descripción
* Precio
* Imagen
* Categoría
* Estado (Disponible / No disponible)
* Destacado (sí / no)

Los productos **no disponibles** no se muestran al público, evitando eliminarlos de la base de datos.

---

## 🗂️ Categorías

* Las categorías permiten organizar los productos (ej: Panes, Facturas, Tortas, Promos)
* Se utilizan para filtros en la vista del cliente
* Son administrables desde el panel del encargado

---

## 🟢 Consulta por WhatsApp (feature principal)

La aplicación **no permite realizar pedidos online**, pero sí ofrece una experiencia guiada para consultar productos vía WhatsApp.

### 🧠 Funcionamiento

* El cliente puede **seleccionar productos** que desea consultar
* Los productos seleccionados se agrupan automáticamente
* Aparece una **barra flotante verde (estilo WhatsApp)** indicando la cantidad de productos seleccionados

Ejemplo:

> 🟢 Seleccionaste 2 productos – Consultar por WhatsApp

---

### ✍️ Mensaje automático de WhatsApp

Al confirmar la consulta, se genera un mensaje automático como el siguiente:

```
Hola! 😊
Quería consultar por los siguientes productos:

• Cheesecake – $10.000
• Lemon Pie – $12.000

Gracias!
```

El cliente es redirigido directamente a WhatsApp con el mensaje predefinido.

---

### 🔁 Opción alternativa

Además de la consulta por selección de productos, la página también cuenta con:

* Un botón directo de contacto por WhatsApp
* Mensaje genérico sin productos seleccionados

---

## 🗺️ Ubicación del local

* Mapa integrado (Google Maps o Mapbox)
* Ubicación fija del comercio
* Visible para todos los clientes

---

## ⏰ Horarios de atención

* Sección visible en la página pública
* Indica horarios del local
* Puede mostrar si el comercio está abierto o cerrado
* Editable desde el panel del encargado

---

## 🎨 Diseño y experiencia de usuario

* Diseño **mobile‑first**
* Interfaz simple e intuitiva
* Estilos realizados con Tailwind CSS
* Botones y elementos claros para usuarios de todas las edades
* Colores coherentes con WhatsApp para las acciones de consulta

---

## 🎯 Objetivo del proyecto

* Brindar una solución real para una panadería de barrio
* Facilitar la consulta de productos sin ventas online
* Mejorar la comunicación entre clientes y encargado
* Servir como proyecto full‑stack demostrable

---

## 📌 Estado del proyecto

🔧 En desarrollo

Próximos pasos:

* Definición del modelo de base de datos
* Implementación del backend
* Desarrollo del frontend
* Deploy final

---

## 🤝 Autores

Proyecto desarrollado en conjunto por dos estudiantes/desarrolladores como práctica de desarrollo web full‑stack.
