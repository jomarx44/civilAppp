import { FINGERPRINT_COMPATIBLE, FINGERPRINT_ENROLLED } from "../actions";

export const setFingerprintCompatibility = ( isCompatible ) => ({
  type: FINGERPRINT_COMPATIBLE,
  payload: {
    isCompatible
  }
});

export const setFingerprintEnrolled = ( isEnrolled ) => ({
  type: FINGERPRINT_ENROLLED,
  payload: {
    isEnrolled
  }
});