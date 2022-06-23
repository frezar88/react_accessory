import {$host} from "./index";

export const getData = async (id) => {
    return await $host.get(`/server/web/accessories/api/get-client-information?link=${id}`)
}
