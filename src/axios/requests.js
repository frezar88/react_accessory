import {$host} from "./index";

export const getAccessories = async (model,brand) => {
    return await $host.get(`/server/web/accessories/api?brand=${brand}&model=${model}`)
}
export const homePageRequest = async () => {
    return await $host.get(`/server/web/accessories/api`)
}
export const getAllAccessories = async () => {
        return await $host.get(`/server/web/accessories/api/get-all-accessories`)
}

export const sendDataToBack = async (data) => {
    return await $host.post(`/server/web/accessories/api/save-user-data`,data)
}