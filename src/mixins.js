import crypto from './utils/crypto'
import cryptoJs from 'crypto-js'
export default {
  methods: {
    newBack () {
      if (history.length <= 1) {
        this.$router.replace(
          {
            path: '/'
          }
        )
      } else {
        this.$router.back()
      }
    },
    clearLocalStorage (_key) {
      for (const key in localStorage) {
        if (key != _key) {
          localStorage.removeItem(key)
        }
      }
    },
    getColdUserList () {
      if (localStorage['coldUserList']) {
        return crypto.decrypt(localStorage['coldUserList'])
      } else {
        return []
      }
    },
    setColdUserList (data) {
      localStorage['coldUserList'] = crypto.encrypt(data)
    },
    // des加密
    desJiami (message, key) {
      let keyHex = cryptoJs.enc.Utf8.parse(key)
      let option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 }
      let encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
      return encrypted.ciphertext.toString()
    },
    // des解密
    desJiemi (message, key) {
      var keyHex = cryptoJs.enc.Utf8.parse(key)
      var decrypted = cryptoJs.DES.decrypt(
        {
          ciphertext: cryptoJs.enc.Hex.parse(message)
        },
        keyHex,
        {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7
        }
      )
      return decrypted.toString(cryptoJs.enc.Utf8)
    }
  }
}
