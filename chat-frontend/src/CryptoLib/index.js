import CryptoJS from "crypto-js";
export default class Crypto{
    constructor(){
        this.keys="";
    }
    encrypt(text){
        const ciphertext = CryptoJS.AES.encrypt(text,this.keys);
        return ciphertext.toString();
    }
    decrypt(encrypt_text){
        const bytes = CryptoJS.AES.decrypt(
          encrypt_text,
          this.keys
        );
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
    }
}
// const obj=new Crypto();
// obj.keys="avunix9143";
// console.log(obj.encrypt("HI"));
// console.log(obj.decrypt("U2FsdGVkX199vIoJ9S7AnClIH9YOPn+VYr2y7ivInbY="));