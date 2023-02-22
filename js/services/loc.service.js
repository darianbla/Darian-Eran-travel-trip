import { asyncStorageService } from "./async-storage.service.js";


export const locService = {
    getLocs,
    createLoc,
    save,
    addLoc,
    query,
}

const LOCS_KEY = 'locations'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLoc(x, y, name) {
    var newLoc = createLoc()
    newLoc.locName = name
    newLoc.lat = x
    newLoc.lng = y
    newLoc.createdAt = Date.now()
    return newLoc
}

function createLoc() {
    return {
        id: '',
        locName: '',
        lat: '',
        lng: '',
        createdAt: '',
    }
}

function save(loc) {
    if (loc.id) { return asyncStorageService.put(LOCS_KEY, loc) }
    else { return asyncStorageService.post(LOCS_KEY, loc) }
}

function query() {
    return new Promise(resolve => { resolve(asyncStorageService.query(LOCS_KEY)) })
}

function setDelete(locId) {
    asyncStorageService.remove(LOCS_KEY, locId)
}
