import {$host} from "./index";

export const getData = async () => {
    return await $host.get(`/server/web/accessories/api/get-all-accessories`)
}
