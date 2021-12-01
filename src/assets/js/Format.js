export default {
  FormatTime(second) {
    var s = second % 60
    var m = parseInt(second / 60) % 60
    return this.FormatNumber(m) + ':' + this.FormatNumber(s)
  },
  FormatNumber(num, format = '00') {
    var numStr = num.toString()
    var len1 = format.length
    var len2 = numStr.length
    if (len2 < len1) {
      return format.substring(0, len1 - len2) + num
    }
    return numStr
  }
}