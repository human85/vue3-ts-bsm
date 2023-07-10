export function getTime() {
  let time = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    time = '早上好'
  } else if (hours <= 12) {
    time = '上午好'
  } else if (hours <= 18) {
    time = '下午好'
  } else {
    time = '晚上好'
  }
  return time
}
