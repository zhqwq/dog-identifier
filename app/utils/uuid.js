/**
 * 生成uuid
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0, // 除去小数部分，Math.floor的trick写法
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
