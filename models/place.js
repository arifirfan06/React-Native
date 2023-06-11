export class Place {
  constructor(title, desc, imageUri, location, id) {
    this.title = title;
    this.desc = desc,
    this.imageUri = imageUri;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.141241, lng: 127.121 }
    this.id = id;
  }
}
