const contentContainer = document.getElementById('content-container')
const loginForm = document.getElementById('login-form')
const baseEndpoint = "http://localhost:8000/api"
if (loginForm) {
    // handle this login form
    loginForm.addEventListener('submit', handleLogin)
}
// if (searchForm) {
//     // handle this login form
//     searchForm.addEventListener('submit', handleSearch)
// }

function handleLogin(event) {
    event.preventDefault()
    const loginEndpoint = `${baseEndpoint}/token/`
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(loginObjectData)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyStr
    }
    fetch(loginEndpoint, options) //  Promise
    .then(response=>{
        return response.json()
    })
    .then(authData => {
        handleAuthData(authData, getProductList)
    })
    .catch(err=> {
        console.log('err', err)
    })
}

function handleAuthData(authData,callback) {
    localStorage.setItem('access', authData.access)
    localStorage.setItem('refresh',  authData.refresh)
    if (callback) {
        callback()
    }
}

function writeToContainer(data) {
    if (contentContainer) {
        contentContainer.innerHTML = '<pre>' + JSON.stringify(data, null, 4) + '</pre>'
    }
}

function getFetchOptions(method, jsObject) {
    return {
        method: method === null ? 'GET': method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: body ? body : null
    }
}

function getProductList() {
    const endPoint = `${baseEndpoint}/products/`
    const options = getFetchOptions()
    fetch(endPoint, options)
    .then(response=>response.json())
    .then(data=> {
        console.log(data)
        writeToContainer(data)
    })
}

getProductList()