const timer = {}

function startTimer(timeout) {
  timer.dataStart = Date.now()
  timer.timerId = setInterval(() => {
    timer.callback()
    timer.dataStart = Date.now()
  }, timeout)
}

export function initTimer(callback, timeout) {
  timer.callback = callback
  timer.timeout = timeout
  startTimer(timer.timeout)
}

export function freezeTimer() {
  timer.dataStop = Date.now()
  clearInterval(timer.timerId)
}

export function unfreezeTimer() {
  if (timer.refreshed) {
    timer.refreshed = false
  } else {
    timer.timerId = setTimeout(() => {
      timer.callback()
      startTimer(timer.timeout)
    }, timer.timeout - (timer.dataStop - timer.dataStart))
  }
}

export function clearTimer() {
  if (!timer.callback || !timer.timerId || !timer.timeout) {
    throw new Error('Init timer first!')
  }
  clearInterval(timer.timerId)
}

export function refreshTimer(timeout) {
  if (!timer.callback || !timer.timerId || !timer.timeout) {
    throw new Error('Init timer first!')
  }
  if (Date.now() - timer.dataStart > timeout) {
    clearInterval(timer.timerId)
    startTimer(timer.timeout)
    timer.refreshed = true
    timer.callback()
  } else alert(`less than ${timeout / 1000} seconds passed`)
}
