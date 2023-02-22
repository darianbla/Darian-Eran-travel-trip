export const placesService = {
    createPlace,
}
// import { mapService } from './async-storage.service.js'

let places = []

function createPlace(lat, lng){
    let place ={
        id: '123',
        name: 'new loc',
        lat,
        lng,
    }
    places.push(place)
    console.log(places)
}