import Vue from 'vue'
import moment from 'moment'
moment.locale('ko')

const filters = {
  install (Vue) {
    Vue.filter('PROFILE_IMAGE', function (value, fieldName) {
      if (!value || !fieldName) { return '/img/card-no-img.svg' }
      return value[fieldName] ? value[fieldName] : '/img/card-no-img.svg'
    })
    Vue.filter('ICON_IMAGE', function (value) {
      if (!value || value === '') { return '/img/card-no-img.svg' }
      return process.env.S3_URL + value
    })
    Vue.filter('BG_IMAGE', function (value) {
      if (!value || value === '') { return '/img/card-no-bg.svg' }
      return process.env.S3_URL + value
    })
    Vue.filter('NL2BR', function (value, isXhtml) {
      if (!value) { return '' }
      // Adjust comment to avoid issue on phpjs.org display
      const breakTag =
        isXhtml || typeof isXhtml === 'undefined' ? '<br ' + '/>' : '<br>'
      return (value + '').replace(
        /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
        '$1' + breakTag + '$2'
      )
    })
    Vue.filter('COMMA', function (value) {
      if (!value) { return 0 }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
    Vue.filter('PROTOCOL', function (value) {
      if (!value) { return null }
      if (/(http|https):\/\//gi.test(value)) {
        return value
      }
      return `http://${value}`
    })
    Vue.filter('YYYYMMDD', function (value, format) {
      if (!value) { return null }
      if (!format) {
        format = 'YYYY.MM.DD'
      }
      return moment(value).format(format)
    })
    Vue.filter('YYYYMMDDHHIISS', function (value, format) {
      if (!value) { return null }
      if (!format) {
        format = 'YYYY.MM.DD HH:MM:SS'
      }
      return moment(value).format(format)
    })
    Vue.filter('YYYYMMDDHHII', function (value, format) {
      if (!value) { return null }
      if (!format) {
        format = 'YYYY.MM.DD HH:MM'
      }
      return moment(value).format(format)
    })
    Vue.filter('FROMNOW', function (value) {
      if (!value) { return null }
      return moment(value).fromNow()
    })
    Vue.filter('PHONENUMBER', function (value) {
      if (!value) { return null }
      if (value.length < 10) {
        return value
      }
      const tmp = value.replace(/[^\d]/g, '')
      return tmp.slice(0, 3) + '-' + tmp.slice(3, 7) + '-' + tmp.slice(7)
    })
    Vue.filter('PHONENUMBERMASK', function (value) {
      if (!value) { return null }
      const tmp = value.replace(/[^\d]/g, '')
      return tmp.slice(0, 3) + '-' + tmp.slice(3, 7).substr(0, tmp.slice(3, 7).length - 2) + '**' + '-' + tmp.slice(7).substr(0, 2) + '**'
    })
    Vue.filter('PHONENUMBERRESET', function (value) {
      return value.replaceAll('-', '')
    })
    Vue.filter('CHECKAGE', function (birth) {
      const date = new Date()
      const year = date.getFullYear()
      let month = (date.getMonth() + 1)
      let day = date.getDate()
      if (month < 10) { month = '0' + month }
      if (day < 10) { day = '0' + day }
      const monthDay = month + day
      birth = birth.replace('-', '').replace('-', '')
      const birthdayy = birth.substr(0, 4)
      const birthdaymd = birth.substr(4, 4)
      const age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy
      return age
    })
    Vue.filter('CURRENCY', function (value, currency) {
      if (typeof value !== 'number') {
        return value
      }
      try {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0
        })
        return formatter.format(value)
      } catch (e) {
        throw new Error(e)
      }
    })
    Vue.filter('SERVICE_URL', function (value) {
      if (!value) { return '-' }
      return `https://${process.env.DINGDONGU_ENDPOINT}/${value}`
    })
  }
}

export default () => {
  Vue.use(filters)
}
