import {
  ACCOUNT_LINK,
  ACCOUNT_LINK_ERROR,
  ACCOUNT_LINK_INITIALIZE,
  ACCOUNT_LINK_SUCCESS
} from "../actions";

export const accountLink = () => ({
  type: ACCOUNT_LINK
})

export const accountLinkInitialize = () => ({
  type: ACCOUNT_LINK_INITIALIZE
})

export const accountLinkError = (error) => ({
  type: ACCOUNT_LINK_ERROR,
  payload: { error }
})

export const accountLinkSuccess = () => ({
  type: ACCOUNT_LINK_SUCCESS
})