import xdnFetch from 'react-storefront/fetch'
import { EventEmitter } from 'events'

const ALL_DONE = 'alldone'
let openRequests = 0

export const events = new EventEmitter()

function markFinished() {
  openRequests--
  moovNextTick(() => openRequests === 0 && events.emit('alldone'))
}

export default async function fetch(...args) {
  try {
    openRequests++
    return await xdnFetch(...args)
  } finally {
    markFinished()
  }
}

/**
 * Register a callback to be called when all fetches have completed
 * @param {Function} cb 
 */
export function whenAllFetchesAreDone(cb) {
  if (openRequests === 0) {
    cb(Function.prototype) // if there are no open fetches, call the callback immediately, otherwise it would never get called
  } else {
    events.on(ALL_DONE, () => {
      events.removeListener(ALL_DONE, cb)
      cb()
    })
  }
}
