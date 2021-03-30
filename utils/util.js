//获取当前日期，返回格式yyyy-mm--dd
function getDate() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('-')}`
}

//获取当前时间 格式喂hh-mm
function getTime(val) {
  if(val) {
    let date = new Date()
    let hour = date.getHours() + val
    let minute = date.getMinutes()  
    return `${[hour, minute].map(formatNumber).join(':')}`
  } else {
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes() 
    return `${[hour, minute].map(formatNumber).join(':')}` 
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  getDate,
  getTime
}
