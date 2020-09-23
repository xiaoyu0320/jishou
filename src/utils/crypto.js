export default {
  // 加密
  encrypt (data) {
    data = JSON.stringify(data)
    return data
  },
  // 解密
  decrypt (text) {
    return JSON.parse(text)
  }
}
