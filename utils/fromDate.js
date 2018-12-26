import moment from 'moment-jalaali'
moment.loadPersian()

export default (date) => {
    console.log(date)
    let now = moment().unix()
    let time = moment(date).unix()
    let fromNow = now - time
    const times = [["ثانیه", 1], ["دقیقه", 60], ["ساعت", 3600], ["روز", 86400], ["هفته", 604800], ["ماه", 2592000], ["سال", 31536000]]
    let diff = Math.round(fromNow)
    for (let t = 0; t < times.length; t++) {
      if (diff < times[t][1]) {
        if (t == 0) {
          return "همین حالا"
        } else {
          diff = Math.round(diff / times[t - 1][1])
          return diff + " " + times[t - 1][0] + ' پیش '//(diff == 1?" پیش ":" پیشین ")
        }
      }
    }
  };