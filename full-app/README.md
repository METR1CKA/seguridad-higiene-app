# 🛡️ App de Seguridad e Higiene - EPP

Aplicación web para consultar el Equipo de Protección Personal (EPP) requerido según el puesto de trabajo y actividad.

## 📋 Funcionalidad

1. **Seleccionar Puesto de Trabajo** - Elige entre diferentes puestos industriales
2. **Elegir Actividad** - Selecciona una actividad específica del puesto
3. **Ver EPP Requerido** - Consulta el equipo de protección necesario

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente

1. Abre el archivo `index.html` en cualquier navegador
2. ¡Listo! La app funciona sin necesidad de servidor

### Opción 2: Con Live Server (recomendado para desarrollo)

1. Si usas VS Code, instala la extensión "Live Server"
2. Click derecho en `index.html` → "Open with Live Server"

## 📁 Estructura del Proyecto

```
app3/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos de la aplicación
├── js/
│   ├── app.js          # Lógica principal
│   └── data.js         # Base de datos (MODIFICA AQUÍ)
└── README.md
```

## ✏️ Cómo Modificar los Datos

Abre el archivo `js/data.js` y edita el array `EPP_DATA`. Cada puesto tiene esta estructura:

```javascript
{
    id: 1,                          // ID único
    puesto: "Nombre del Puesto",   // Nombre del puesto
    icono: "🔥",                    // Emoji representativo
    actividades: [
        {
            id: 1,
            nombre: "Nombre de la Actividad",
            icono: "⚡",
            epp: [
                { nombre: "EPP 1", icono: "🥽" },
                { nombre: "EPP 2", icono: "🧤" }
            ]
        }
    ]
}
```

### Ejemplo: Agregar un Nuevo Puesto

```javascript
{
    id: 6,
    puesto: "Pintor Industrial",
    icono: "🎨",
    actividades: [
        {
            id: 12,
            nombre: "Pintura en spray",
            icono: "💨",
            epp: [
                { nombre: "Respirador con filtros para vapores", icono: "😷" },
                { nombre: "Lentes de seguridad", icono: "🥽" },
                { nombre: "Guantes de nitrilo", icono: "🧤" },
                { nombre: "Overol desechable", icono: "👔" }
            ]
        }
    ]
}
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
  --primary-color: #2563eb; /* Color principal */
  --secondary-color: #10b981; /* Color secundario */
  /* ... más variables */
}
```

### Cambiar el Título

En `index.html` línea 6 y línea 13:

```html
<title>Tu Título Aquí</title>
<h1>🛡️ Tu Título Aquí</h1>
```

## 📱 Compatibilidad

✅ Chrome, Firefox, Safari, Edge (modernos)  
✅ Responsive - funciona en móviles y tablets  
✅ No requiere Internet (funciona offline)  
✅ No requiere instalación

## 🔧 Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, Animaciones)
- JavaScript Vanilla (ES6+)

## 📄 Licencia

Proyecto educativo - Úsalo libremente

---

**Desarrollado para Seguridad e Higiene Industrial**
