import { DRAWER_OPEN, DRAWER_CLOSE } from "./navConstants";

export const openDrawer = () => {
    return {
        type: DRAWER_OPEN
    }
}

export const closeDrawer = () => {
    return {
        type: DRAWER_CLOSE
    }
}
