// @flow
import { ApplicationActions } from "./constants"

export const turnOnLoading = () => ({type: ApplicationActions.TURN_ON_LOADING})
export const turnOffLoading = () => ({type: ApplicationActions.TURN_OFF_LOADING})