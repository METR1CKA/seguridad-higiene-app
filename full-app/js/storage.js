// ============================================
// LOCALSTORAGE MANAGEMENT
// ============================================

const STORAGE_KEY = "eppAppData"

/**
 * Initialize storage with default data or load existing data
 */
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    // First time - save default data
    saveDataToStorage(EPP_DATA)
  }
  return getDataFromStorage()
}

/**
 * Get data from localStorage
 */
function getDataFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : EPP_DATA
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return EPP_DATA
  }
}

/**
 * Save data to localStorage
 */
function saveDataToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

/**
 * Reset data to original EPP_DATA
 */
function resetDataToDefault() {
  saveDataToStorage(EPP_DATA)
  return getDataFromStorage()
}

/**
 * CRUD OPERATIONS - POSITIONS
 */

function addPosition(positionName, positionIcon) {
  const data = getDataFromStorage()
  const newId = Math.max(...data.map((p) => p.id), 0) + 1

  const newPosition = {
    id: newId,
    position: positionName,
    icon: positionIcon,
    activities: [],
  }

  data.push(newPosition)
  saveDataToStorage(data)
  return newPosition
}

function updatePosition(positionId, positionName, positionIcon) {
  const data = getDataFromStorage()
  const position = data.find((p) => p.id === positionId)

  if (position) {
    position.position = positionName
    position.icon = positionIcon
    saveDataToStorage(data)
    return true
  }
  return false
}

function deletePosition(positionId) {
  const data = getDataFromStorage()
  const index = data.findIndex((p) => p.id === positionId)

  if (index !== -1) {
    data.splice(index, 1)
    saveDataToStorage(data)
    return true
  }
  return false
}

/**
 * CRUD OPERATIONS - ACTIVITIES
 */

function addActivity(positionId, activityName, activityIcon) {
  const data = getDataFromStorage()
  const position = data.find((p) => p.id === positionId)

  if (position) {
    const newId = Math.max(...position.activities.map((a) => a.id), 0) + 1

    const newActivity = {
      id: newId,
      name: activityName,
      icon: activityIcon,
      ppe: [],
    }

    position.activities.push(newActivity)
    saveDataToStorage(data)
    return newActivity
  }
  return null
}

function updateActivity(positionId, activityId, activityName, activityIcon) {
  const data = getDataFromStorage()
  const position = data.find((p) => p.id === positionId)

  if (position) {
    const activity = position.activities.find((a) => a.id === activityId)
    if (activity) {
      activity.name = activityName
      activity.icon = activityIcon
      saveDataToStorage(data)
      return true
    }
  }
  return false
}

function deleteActivity(positionId, activityId) {
  const data = getDataFromStorage()
  const position = data.find((p) => p.id === positionId)

  if (position) {
    const index = position.activities.findIndex((a) => a.id === activityId)
    if (index !== -1) {
      position.activities.splice(index, 1)
      saveDataToStorage(data)
      return true
    }
  }
  return false
}

/**
 * CRUD OPERATIONS - PPE
 */

function addPPE(positionId, activityId, ppeName, ppeIcon) {
  const data = getDataFromStorage()
  const position = data.find((p) => p.id === positionId)

  if (position) {
    const activity = position.activities.find((a) => a.id === activityId)
    if (activity) {
      const newPPE = {
        name: ppeName,
        icon: ppeIcon,
      }
      activity.ppe.push(newPPE)
      saveDataToStorage(data)
      return newPPE
    }
  }
  return null
}

function deletePPE(positionId, activityId, ppeName) {
  const data = getDataFromStorage()
  const position = data.find((p) => p.id === positionId)

  if (position) {
    const activity = position.activities.find((a) => a.id === activityId)
    if (activity) {
      const index = activity.ppe.findIndex((p) => p.name === ppeName)
      if (index !== -1) {
        activity.ppe.splice(index, 1)
        saveDataToStorage(data)
        return true
      }
    }
  }
  return false
}
