export function diameterToString(min, max) {
  if (min / 1000 < 0.1) {
    return `${min.toFixed(3)} – ${max.toFixed(3)} м`
  } else {
    return `${(min / 1000).toFixed(3)} –– ${(max / 1000).toFixed(3)} км`
  }
}

export function distanceToString(distance) {
  if (distance / 1000000 > 1) {
    return `${(distance / 1000000).toFixed(3)} млн.км`
  } else if (distance / 1000 > 1){
    return `${(distance / 1000).toFixed(3)} тыс.км`
  }
  return `${distance} км`
}

export function planetToRussia(planet) {
  const planets = {
    Mercury:'Меркурий',
    Venus:'Венера',
    Earth:'Земля',
    Mars:'Марс',
    Juptr:'Юпитер',
    Saturn:'Сатурн',
    Uranus:'Уран',
    Neptune:'Нептун',
    Pluto:'Плутон',
    Moon:'Луна'
  }
  if (planets[planet]) {
    return planets[planet]
  }
  return planet
}

export function getDateInFormat(date) {
  const d = new Date(date)
  const  year = d.getFullYear()
  let  month = '' + (d.getMonth() + 1)
  let  day = '' + d.getDate()

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-')
}

export default class API {
  constructor() {
    this.xhr = new XMLHttpRequest()
    this.api_key = 'EE339X3E9fRXHpwDD0JnP0iZUJo04j2Ta5wz6t9A'
    const loacalStorage = this.loadLocal()
    this.page = loacalStorage.page
    this.size = loacalStorage.size
  }

  saveLocal(page, size) {
    localStorage.setItem('page', page)
    localStorage.setItem('size', size)
  }

  loadLocal() {
    let page = localStorage.getItem('page')
    if (page == null) {
      page = 0
    }
    let size = localStorage.getItem('size')
    if (size == null) {
      size = 5
    }

    return {
      page: page,
      size: size
    }
  }


  sendRequest(path) {
    this.xhr.open('GET', path)
    this.xhr.send()
  }

  getTodayList() {
    const path = `https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${this.api_key}`
    this.sendRequest(path)
  }

  getPereodList(beginDate, endDate) {

    const path =
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${beginDate}&end_date=${endDate}&detailed=true&api_key=${this.api_key}`
    this.sendRequest(path)
  }


  getListOfAsteroids(page, size) {

    const path = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page}&size=${size}&api_key=${this.api_key}`
    this.sendRequest(path)
    this.saveLocal(page, size)
  }

  getAsteroid(id) {
    const path =
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${this.api_key}`
    this.sendRequest(path)
  }
}
