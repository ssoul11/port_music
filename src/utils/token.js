export function localGet(key) {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
        return value
    }
}

export function localSet(key, value) {
    // console.log("触发localset");
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key) {
    window.localStorage.removeItem(key)
}

export function SessionGet(key) {
    const value = window.sessionStorage.getItem(key)
    try {
        return JSON.parse(window.sessionStorage.getItem(key))
    } catch (error) {
        return value
    }
}

export function SessionSet(key, value) {
    // console.log("触发localset");
    window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function SessionRemove(key) {
    window.sessionStorage.removeItem(key)
}