
export const standardPhoneNumberWithoutCountryCode = (phoneNumber: string) => phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber;
export const emailFromPhoneNumber = (phoneNumber: string) => `84${standardPhoneNumberWithoutCountryCode(phoneNumber)}@vietlottlucky.vn`;
export const standardPhoneNumber = (phoneNumber: string) => `+84${standardPhoneNumberWithoutCountryCode(phoneNumber)}`;