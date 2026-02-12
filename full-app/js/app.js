// ============================================
// SAFETY AND HYGIENE APPLICATION
// ============================================

// Application state
let state = {
  selectedPosition: null,
  selectedActivity: null,
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  loadPositions()
}

// ============================================
// STEP 1: LOAD POSITIONS
// ============================================
function loadPositions() {
  const grid = document.getElementById("positions-grid")
  grid.innerHTML = ""

  EPP_DATA.forEach((position) => {
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
  const position = EPP_DATA.find((p) => p.id === positionId)
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
