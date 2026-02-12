# App EPP - Gael

Este archivo explica como editar la app sin romperla.

## Cambios rapidos (sin tocar el diseno)

- Edita SOLO la informacion en el objeto `data` dentro de `index.html`.
- No necesitas cambiar HTML ni CSS para actualizar puestos, actividades o EPP.

## Donde editar

En `index.html` busca este bloque:

```js
const data = {
  puestos: [
    {
      id: "auxiliar",
      nombre: "Auxiliar de Seguridad de Minas",
      actividades: [
        {
          id: "supervisar",
          nombre: "...",
          epp: ["...", "..."],
        },
      ],
    },
  ],
};
```

## Que puedes cambiar

- `nombre` del puesto.
- `actividades`: agrega o elimina actividades.
- `epp`: lista de equipo por actividad.

## Reglas simples

- `id` debe ser unico, sin espacios (usa guiones o guion_bajo).
- Cada actividad debe tener `id`, `nombre`, `epp`.
- `epp` es una lista de textos.

## Ejemplo (agregar actividad)

```js
{
  id: "nueva-actividad",
  nombre: "Nueva actividad",
  epp: ["Casco", "Guantes", "Botas"]
}
```

## Si usas una IA

Puedes pegarle este texto para que sepa que editar:

"Edita SOLO el objeto `data` en `index.html`. Cambia puestos, actividades y EPP. No modificar HTML ni CSS. Mantener estructura de `id`, `nombre`, `actividades` y `epp`."
