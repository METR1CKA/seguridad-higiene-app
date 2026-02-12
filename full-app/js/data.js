// ============================================
// POSITION, ACTIVITY, AND PPE DATA
// ============================================
// Instructions: Replace these sample values with the real information

const EPP_DATA = [
  {
    id: 1,
    position: "Minero",
    icon: "⛏️",
    activities: [
      {
        id: 1,
        name: "Perforación de roca",
        icon: "🪨",
        ppe: [
          { name: "Casco de seguridad", icon: "⛑️" },
          { name: "Lentes de seguridad", icon: "🥽" },
          { name: "Respirador contra polvo", icon: "😷" },
          {
            name: "Protección auditiva (tapones u orejeras)",
            icon: "🔊",
          },
          { name: "Guantes resistentes", icon: "🧤" },
          { name: "Botas con casquillo", icon: "🥾" },
        ],
      },
      {
        id: 2,
        name: "Carga y transporte de material",
        icon: "🚧",
        ppe: [
          { name: "Casco de seguridad", icon: "⛑️" },
          { name: "Guantes de protección", icon: "🧤" },
          {
            name: "Botas antiderrapantes con casquillo",
            icon: "🥾",
          },
          { name: "Faja lumbar (si hay carga manual)", icon: "🎽" },
          { name: "Chaleco reflejante", icon: "🦺" },
        ],
      },
      {
        id: 3,
        name: "Manejo de maquinaria pesada",
        icon: "🚜",
        ppe: [
          { name: "Casco de seguridad", icon: "⛑️" },
          { name: "Lentes de protección", icon: "🥽" },
          { name: "Protección auditiva", icon: "🔊" },
          { name: "Botas de seguridad", icon: "🥾" },
          { name: "Chaleco reflejante", icon: "🦺" },
        ],
      },
    ],
  },
  {
    id: 2,
    position: "Trabajador de limpieza en área industrial",
    icon: "🧹",
    activities: [
      {
        id: 4,
        name: "Limpieza de maquinaria",
        icon: "🛠️",
        ppe: [
          { name: "Casco de seguridad", icon: "⛑️" },
          { name: "Lentes de protección", icon: "🥽" },
          { name: "Guantes resistentes a químicos", icon: "🧤" },
          { name: "Mascarilla o respirador", icon: "😷" },
          {
            name: "Botas con casquillo y suela antiderrapante",
            icon: "🥾",
          },
        ],
      },
      {
        id: 5,
        name: "Manejo de sustancias químicas de limpieza",
        icon: "🧪",
        ppe: [
          {
            name: "Guantes impermeables resistentes a químicos",
            icon: "🧤",
          },
          { name: "Lentes o goggles cerrados", icon: "🥽" },
          { name: "Careta facial (si hay riesgo de salpicadura)", icon: "🛡️" },
          {
            name: "Mascarilla o respirador con filtro adecuado",
            icon: "😷",
          },
          { name: "Botas impermeables", icon: "🥾" },
        ],
      },
      {
        id: 6,
        name: "Limpieza de pisos industriales",
        icon: "🧽",
        ppe: [
          { name: "Botas antiderrapantes", icon: "🥾" },
          { name: "Guantes de protección", icon: "🧤" },
          {
            name: "Chaleco reflejante (si hay tránsito de montacargas)",
            icon: "🦺",
          },
          { name: "Mascarilla (si hay polvo)", icon: "😷" },
        ],
      },
      {
        id: 7,
        name: "Recolección de residuos industriales",
        icon: "🗑️",
        ppe: [
          { name: "Guantes gruesos de protección", icon: "🧤" },
          { name: "Lentes de seguridad", icon: "🥽" },
          { name: "Mascarilla o respirador", icon: "😷" },
          { name: "Botas con casquillo", icon: "🥾" },
          { name: "Overol o ropa de trabajo resistente", icon: "🧰" },
        ],
      },
    ],
  },
]

// Do not modify this line - used for compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = { EPP_DATA }
}
