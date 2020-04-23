// @flow
import { ApplicationActions } from "./constants"

export const turnOnLoading = () => ({type: ApplicationActions.TURN_ON_LOADING})
export const turnOffLoading = () => ({type: ApplicationActions.TURN_OFF_LOADING})
export const changeLang = (lang: string) => ({type: ApplicationActions.CHANGE_LANGUAGE, lang})