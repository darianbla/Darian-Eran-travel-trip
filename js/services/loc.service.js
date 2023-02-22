import { asyncStorageService } from "./async-storage.service.js";

export const locService = {
    getLocs,
    createLoc,
    save,
    addLoc,
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

function addLoc(x, y){
    var newLoc = createLoc()
    newLoc.lat = x
    newLoc.lng = y
    return newLoc
}

function createLoc(){
    return {
        id: '',
        locName: '',
        lat: '',
        lng: '',
    }
}

function save(loc){
    if (loc.id) {return asyncStorageService.put(LOCS_KEY, loc)}
    else {return asyncStorageService.post(LOCS_KEY, loc)}
}
