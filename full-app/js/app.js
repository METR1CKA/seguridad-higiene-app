// ============================================
// SAFETY AND HYGIENE APPLICATION
// ============================================

// Default icons for auto-assignment
const DEFAULT_POSITION_ICONS = ["👷", "🔧", "👨‍💼", "🏭", "👨‍🔬", "👨‍⚕️", "🛠️", "🏗️"]
const DEFAULT_ACTIVITY_ICONS = ["📋", "⚙️", "🎯", "🔨", "📦", "🚀", "⚡", "🔍"]
const DEFAULT_PPE_ICONS = ["🛡️", "⚠️", "🔒", "🧤", "👁️", "👂", "🦴", "🧠"]

// Application state
let state = {
  selectedPosition: null,
  selectedActivity: null,
  positions: [], // Cargado desde storage
  adminSelectedPosition: null,
  adminSelectedActivity: null,
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Load data from storage (or use default EPP_DATA if first time)
  state.positions = initializeStorage()
  loadPositions()
  populateAdminSelects()
}

// ============================================
// STEP 1: LOAD POSITIONS
// ============================================
function loadPositions() {
  const grid = document.getElementById("positions-grid")
  grid.innerHTML = ""

  state.positions.forEach((position) => {
    const card = createPositionCard(position)
    grid.appendChild(card)
  })
}

function createPositionCard(position) {
  const card = document.createElement("div")
  card.className = "card"
  card.onclick = () => selectPosition(position.id)

  card.innerHTML = `
        <div class="card-icon">${position.icon}</div>
        <div class="card-title">${position.position}</div>
    `

  return card
}

function selectPosition(positionId) {
  const position = state.positions.find((p) => p.id === positionId)
  if (!position) return

  state.selectedPosition = position
  state.selectedActivity = null

  // Update UI
  document.getElementById("position-name").textContent = position.position
  loadActivities(position.activities)

  // Change step
  changeStep("step-2")
}

// ============================================
// STEP 2: LOAD ACTIVITIES
// ============================================
function loadActivities(activities) {
  const grid = document.getElementById("activities-grid")
  grid.innerHTML = ""

  activities.forEach((activity) => {
    const card = createActivityCard(activity)
    grid.appendChild(card)
  })
}

function createActivityCard(activity) {
  const card = document.createElement("div")
  card.className = "card"
  card.onclick = () => selectActivity(activity.id)

  card.innerHTML = `
        <div class="card-icon">${activity.icon}</div>
        <div class="card-title">${activity.name}</div>
    `

  return card
}

function selectActivity(activityId) {
  if (!state.selectedPosition) return

  const activity = state.selectedPosition.activities.find(
    (a) => a.id === activityId,
  )
  if (!activity) return

  state.selectedActivity = activity

  // Update details
  document.getElementById("ppe-position").textContent =
    state.selectedPosition.position
  document.getElementById("ppe-activity").textContent = activity.name

  loadPPE(activity.ppe)

  // Change step
  changeStep("step-3")
}

// ============================================
// STEP 3: RENDER PPE
// ============================================
function loadPPE(ppeList) {
  const container = document.getElementById("ppe-list")
  container.innerHTML = ""

  ppeList.forEach((ppeItem) => {
    const item = createPPEItem(ppeItem)
    container.appendChild(item)
  })
}

function createPPEItem(ppeItem) {
  const item = document.createElement("div")
  item.className = "epp-item"

  item.innerHTML = `
        <div class="epp-icon">${ppeItem.icon}</div>
        <div class="epp-text">${ppeItem.name}</div>
    `

  return item
}

// ============================================
// NAVIGATION
// ============================================
function changeStep(stepId) {
  // Hide all steps
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active")
    step.classList.add("hidden")
  })

  // Show the selected step
  const currentStep = document.getElementById(stepId)
  currentStep.classList.remove("hidden")
  currentStep.classList.add("active")

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function backToPositions() {
  state.selectedPosition = null
  state.selectedActivity = null
  changeStep("step-1")
}

function backToActivities() {
  state.selectedActivity = null
  changeStep("step-2")
}

// ============================================
// ADMIN PANEL NAVIGATION
// ============================================

function openAdminPanel() {
  state.positions = getDataFromStorage()
  // Reset admin selections
  state.adminSelectedPosition = null
  state.adminSelectedActivity = null
  populateAdminSelects()
  loadAdminPositionsList()
  changeStep("step-4")
}

function closeAdminPanel() {
  // Refresh all state when closing admin panel
  state.positions = getDataFromStorage()
  // Also refresh any selected position/activity in case they were deleted
  if (state.selectedPosition) {
    state.selectedPosition = state.positions.find(
      (p) => p.id === state.selectedPosition.id,
    )
    // If position was deleted, go back to step 1
    if (!state.selectedPosition) {
      state.selectedPosition = null
      state.selectedActivity = null
      loadPositions()
      changeStep("step-1")
      return
    }
    // If activity was deleted, go back to step 2
    if (state.selectedActivity) {
      state.selectedActivity = state.selectedPosition.activities.find(
        (a) => a.id === state.selectedActivity.id,
      )
      if (!state.selectedActivity) {
        changeStep("step-2")
        loadActivities(state.selectedPosition.activities)
        return
      }
    }
  }
  // Re-render positions before changing step
  loadPositions()
  changeStep("step-1")
}

function switchAdminTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".admin-tab-content").forEach((tab) => {
    tab.classList.remove("active")
    tab.classList.add("hidden")
  })

  // Remove active from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  const tab = document.getElementById(`tab-${tabName}`)
  if (tab) {
    tab.classList.remove("hidden")
    tab.classList.add("active")
  }

  // Mark button as active
  event.target.classList.add("active")

  // Reset forms when switching tabs
  if (tabName === "positions") {
    loadAdminPositionsList()
  } else if (tabName === "activities") {
    loadAdminActivitiesList()
  } else if (tabName === "ppe") {
    loadAdminPPEList()
  }
}

// ============================================
// ADMIN - POSITIONS MANAGEMENT
// ============================================

function loadAdminPositionsList() {
  const list = document.getElementById("positions-list")
  list.innerHTML = ""

  state.positions.forEach((position) => {
    const card = document.createElement("div")
    card.className = "admin-card"

    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-icon">${position.icon}</span>
        <span class="admin-card-title">${position.position}</span>
      </div>
      <div class="admin-card-actions">
        <button class="btn-sm btn-delete" onclick="deletePositionConfirm(${position.id})">🗑️ Eliminar</button>
      </div>
    `

    list.appendChild(card)
  })
}

function createNewPosition() {
  const name = document.getElementById("new-position-name").value.trim()

  if (!name) {
    alert("Por favor ingresa un nombre para la posición")
    return
  }

  // Assign default icon based on position count
  const iconIndex = state.positions.length % DEFAULT_POSITION_ICONS.length
  const icon = DEFAULT_POSITION_ICONS[iconIndex]

  addPosition(name, icon)
  state.positions = getDataFromStorage()

  // Clear form
  document.getElementById("new-position-name").value = ""

  loadAdminPositionsList()
  populateAdminSelects()
}

function deletePositionConfirm(positionId) {
  if (confirm("¿Eliminar esta posición y todas sus actividades?")) {
    deletePosition(positionId)
    state.positions = getDataFromStorage()
    loadAdminPositionsList()
    populateAdminSelects()
  }
}

// ============================================
// ADMIN - ACTIVITIES MANAGEMENT
// ============================================

function onActivityPositionChange() {
  const positionId = parseInt(
    document.getElementById("activity-position-select").value,
  )

  if (!positionId) {
    document.getElementById("add-activity-form").classList.add("hidden")
    document.getElementById("activities-list").innerHTML = ""
    return
  }

  state.adminSelectedPosition = state.positions.find((p) => p.id === positionId)
  document.getElementById("add-activity-form").classList.remove("hidden")
  loadAdminActivitiesList()
}

function loadAdminActivitiesList() {
  const list = document.getElementById("activities-list")
  list.innerHTML = ""

  if (!state.adminSelectedPosition) {
    return
  }

  state.adminSelectedPosition.activities.forEach((activity) => {
    const card = document.createElement("div")
    card.className = "admin-card"

    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-icon">${activity.icon}</span>
        <span class="admin-card-title">${activity.name}</span>
      </div>
      <div class="admin-card-actions">
        <button class="btn-sm btn-delete" onclick="deleteActivityConfirm(${state.adminSelectedPosition.id}, ${activity.id})">🗑️ Eliminar</button>
      </div>
    `

    list.appendChild(card)
  })
}

function createNewActivity() {
  if (!state.adminSelectedPosition) {
    alert("Por favor selecciona una posición primero")
    return
  }

  const name = document.getElementById("new-activity-name").value.trim()

  if (!name) {
    alert("Por favor ingresa un nombre para la actividad")
    return
  }

  // Assign default icon based on activity count
  const iconIndex =
    state.adminSelectedPosition.activities.length %
    DEFAULT_ACTIVITY_ICONS.length
  const icon = DEFAULT_ACTIVITY_ICONS[iconIndex]

  addActivity(state.adminSelectedPosition.id, name, icon)
  state.positions = getDataFromStorage()
  // Refresh the selected position reference
  state.adminSelectedPosition = state.positions.find(
    (p) => p.id === state.adminSelectedPosition.id,
  )

  // Clear form
  document.getElementById("new-activity-name").value = ""

  loadAdminActivitiesList()
}

function deleteActivityConfirm(positionId, activityId) {
  if (confirm("¿Eliminar esta actividad y su EPP?")) {
    deleteActivity(positionId, activityId)
    state.positions = getDataFromStorage()
    // Refresh the selected position reference
    state.adminSelectedPosition = state.positions.find(
      (p) => p.id === positionId,
    )
    loadAdminActivitiesList()
  }
}

// ============================================
// ADMIN - PPE MANAGEMENT
// ============================================

function onPPEPositionChange() {
  const positionId = parseInt(
    document.getElementById("ppe-position-select").value,
  )

  if (!positionId) {
    document.getElementById("ppe-activity-selector").classList.add("hidden")
    document.getElementById("add-ppe-form").classList.add("hidden")
    document.getElementById("ppe-list-admin").innerHTML = ""
    state.adminSelectedPosition = null
    state.adminSelectedActivity = null
    return
  }

  state.adminSelectedPosition = state.positions.find((p) => p.id === positionId)
  document.getElementById("ppe-activity-selector").classList.remove("hidden")

  // Populate activities select
  const select = document.getElementById("ppe-activity-select")
  select.innerHTML = '<option value="">-- Selecciona actividad --</option>'

  state.adminSelectedPosition.activities.forEach((activity) => {
    const option = document.createElement("option")
    option.value = activity.id
    option.textContent = activity.name
    select.appendChild(option)
  })

  state.adminSelectedActivity = null
  document.getElementById("add-ppe-form").classList.add("hidden")
  document.getElementById("ppe-list-admin").innerHTML = ""
}

function onPPEActivityChange() {
  const activityId = parseInt(
    document.getElementById("ppe-activity-select").value,
  )

  if (!activityId || !state.adminSelectedPosition) {
    document.getElementById("add-ppe-form").classList.add("hidden")
    document.getElementById("ppe-list-admin").innerHTML = ""
    state.adminSelectedActivity = null
    return
  }

  state.adminSelectedActivity = state.adminSelectedPosition.activities.find(
    (a) => a.id === activityId,
  )
  document.getElementById("add-ppe-form").classList.remove("hidden")
  loadAdminPPEList()
}

function loadAdminPPEList() {
  const list = document.getElementById("ppe-list-admin")
  list.innerHTML = ""

  if (!state.adminSelectedActivity) {
    return
  }

  if (state.adminSelectedActivity.ppe.length === 0) {
    list.innerHTML =
      '<p style="color: var(--text-light);">Sin EPP agregado aún</p>'
    return
  }

  state.adminSelectedActivity.ppe.forEach((ppe) => {
    const card = document.createElement("div")
    card.className = "admin-card"

    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-icon">${ppe.icon}</span>
        <span class="admin-card-title">${ppe.name}</span>
      </div>
      <div class="admin-card-actions">
        <button class="btn-sm btn-delete" onclick="deletePPEConfirm('${ppe.name.replace(/'/g, "\\'")}')">🗑️ Eliminar</button>
      </div>
    `

    list.appendChild(card)
  })
}

function createNewPPE() {
  if (!state.adminSelectedActivity) {
    alert("Por favor selecciona una actividad")
    return
  }

  const name = document.getElementById("new-ppe-name").value.trim()

  if (!name) {
    alert("Por favor ingresa un nombre para el EPP")
    return
  }

  // Assign default icon based on PPE count
  const iconIndex =
    state.adminSelectedActivity.ppe.length % DEFAULT_PPE_ICONS.length
  const icon = DEFAULT_PPE_ICONS[iconIndex]

  addPPE(
    state.adminSelectedPosition.id,
    state.adminSelectedActivity.id,
    name,
    icon,
  )
  state.positions = getDataFromStorage()
  // Refresh the selected position and activity references
  state.adminSelectedPosition = state.positions.find(
    (p) => p.id === state.adminSelectedPosition.id,
  )
  state.adminSelectedActivity = state.adminSelectedPosition.activities.find(
    (a) => a.id === state.adminSelectedActivity.id,
  )

  // Clear form
  document.getElementById("new-ppe-name").value = ""

  loadAdminPPEList()
}

function deletePPEConfirm(ppeName) {
  if (confirm("¿Eliminar este EPP?")) {
    deletePPE(
      state.adminSelectedPosition.id,
      state.adminSelectedActivity.id,
      ppeName,
    )
    state.positions = getDataFromStorage()
    // Refresh the selected position and activity references
    state.adminSelectedPosition = state.positions.find(
      (p) => p.id === state.adminSelectedPosition.id,
    )
    state.adminSelectedActivity = state.adminSelectedPosition.activities.find(
      (a) => a.id === state.adminSelectedActivity.id,
    )
    loadAdminPPEList()
  }
}

// ============================================
// ADMIN - DATA MANAGEMENT
// ============================================

function populateAdminSelects() {
  // Populate positions selects in activities and ppe tabs
  const activitySelect = document.getElementById("activity-position-select")
  const ppeSelect = document.getElementById("ppe-position-select")

  // Clear selects
  activitySelect.innerHTML =
    '<option value="">-- Selecciona posición --</option>'
  ppeSelect.innerHTML = '<option value="">-- Selecciona posición --</option>'

  // Populate with current positions
  state.positions.forEach((position) => {
    const option1 = document.createElement("option")
    option1.value = position.id
    option1.textContent = `${position.icon} ${position.position}`
    activitySelect.appendChild(option1)

    const option2 = document.createElement("option")
    option2.value = position.id
    option2.textContent = `${position.icon} ${position.position}`
    ppeSelect.appendChild(option2)
  })
}

function confirmResetData() {
  if (
    confirm(
      "¿Restaurar los datos originales? Esto eliminará todos los cambios hechos.",
    )
  ) {
    state.positions = resetDataToDefault()
    // Clear admin selections
    state.adminSelectedPosition = null
    state.adminSelectedActivity = null
    loadAdminPositionsList()
    populateAdminSelects()
    // Also refresh the main view
    loadPositions()
    // Clear activities and ppe panels
    document.getElementById("activities-list").innerHTML = ""
    document.getElementById("ppe-list-admin").innerHTML = ""
    document.getElementById("add-activity-form").classList.add("hidden")
    document.getElementById("add-ppe-form").classList.add("hidden")
    document.getElementById("ppe-activity-selector").classList.add("hidden")
    alert("Datos restaurados correctamente")
  }
}
