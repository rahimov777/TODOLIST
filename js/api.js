import { getData } from "./dom.js"

let API = 'https://687f431aefe65e520088ff58.mockapi.io/USERS'

async function Delete(id) {
    await axios.delete(`${API}/${id}`)
    get()
}

async function edit(id, newUser) {
    await axios.put(`${API}/${id}`, newUser)
    get()
}

async function add(newUser) {
    await axios.post(API, newUser)
    get()
}

async function selectCitiess(value) {
    await axios.get(`${API}?city=${value}`)
    get()
} 

async function get(search = "", status = "") {
    let url = API

    if (search || status) {

        url += "?"

        if (search) {
            url += "name=" + search
        }
        if (status) {
            url += "status=" + status
        }
        if (search && status) {
            url += "&"
        }
    }
    let res = await axios.get(url)
    getData(res.data)
}

export { get, Delete, edit, add, selectCitiess }