import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
// import { placesService } from './services/place.service.js'
// import { storageService } from './services/storage.service.js'
import { asyncStorageService } from './services/async-storage.service.js'

export const controller = {
    onAddLocation,
}



window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat = 32, lng = 32) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function loadLocations() {
    locService.query().then((locs) => {
        console.log('locs', locs)
        renderLocs(locs)
    })

}

function onAddLocation(lat, lng){
    var locName = prompt('Name the location')
    let newLoc = locService.addLoc(lat,lng, locName)
        locService.save(newLoc)
        .then(loadLocations())
}


function renderLocs(locs){
    console.log(locs)
    var elLocations = document.querySelector('.locs')
    var strHTMLS = locs.map(loc => {
        return `<div>${loc.locName}
        <button onclick="onPanTo(${loc.lat}, ${loc.lng})">Go</button>
        <button onclick="onDelete(${loc.id})">Delete</button>
        </div>`
    })
    console.log(strHTMLS)
    elLocations.innerHTML = strHTMLS.join('')
}