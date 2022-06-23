import {$host} from "./index";

export const getAccessories = async () => {

    // return await $host.get(`/server/web/accessories/api?model=${model}&brand=${brand}`)
    return await $host.get(`/server/web/accessories/api/get-all-accessories`)
}

export const sendDataToBack = async (data) => {
    return await $host.post(`/server/web/accessories/api/save-user-data`,data)
}