const DataFetcher = require('./DataFetcher')

class Predictor {
  static movingAverage(data, size = 100) {
    let closePrices = data.map((item) => {
      return parseFloat(item.close)
    })
    closePrices = closePrices.slice(0, size)
    let sum = closePrices.reduce((acc, curr) => {
      return acc += curr
    })
    let movingAverage = parseFloat((sum / closePrices.length).toFixed(2))
    return {
      movingAverage : movingAverage,
      size : closePrices.length
    }
  }
}

module.exports = Predictor