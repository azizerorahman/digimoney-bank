import CryptoJS from "crypto-js";

const encryptPassword = (password) => {
    const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
    return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export default encryptPassword;