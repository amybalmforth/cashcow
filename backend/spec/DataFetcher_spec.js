const DataFetcher = require('../models/DataFetcher')
const fs = require("fs")

describe("DataFetcher", () =>{
  describe(".parseQuote", () => {
    let rawDummy = fs.readFileSync(`${__dirname}/dummyData/dummy.json`);
    let dummyData = JSON.parse(rawDummy)

    it("parses a response", () => {
      expect(DataFetcher.parseQuote(dummyData)).toEqual({
        symbol: 'AAPL',
        open: 297.1600,
        high: 300.0500,
        low: 297.1560,
        price: 299.8400,
        volume: 9146058,
        last_trade_day: '2020-01-08',
        prev_close: 298.3900,
        change: 1.4500,
        percent_change: 0.4859,
      })
    })
  })

  describe(".parseWeekData", () => {
    let rawDummy = fs.readFileSync(`${__dirname}/dummyData/weekDummy.json`);
    let dummyData = JSON.parse(rawDummy)

    it("parses a response from the Time Series (Daily) API", () => {
      let expectedResponse = {
        symbol: 'AAPL',
        closePrices: [
          // NB last seven *working days* - no data on holidays/weekends
          {
            date: new Date("2020-1-8"),
            closePrice: 302.7100,
          },
          {
            date: new Date("2020-1-7"),
            closePrice: 298.3900
          },
          {
            date: new Date("2020-1-6"),
            closePrice: 299.8000
          },
          {
            date: new Date("2020-1-3"),
            closePrice: 297.4300
          },
          {
            date: new Date("2020-1-2"),
            closePrice: 300.3500
          },
          {
            date: new Date("2019-12-31"),
            closePrice: 293.6500
          },
          {
            date: new Date("2019-12-30"),
            closePrice: 291.5200
          },
        ],
      }
      expect(DataFetcher.parseWeekData(dummyData, 'AAPL')).toEqual(expectedResponse);
    })
  })

  describe(".getEncodedName", () => {
    it("returns Microsoft Corp from json data", () => {
      let rawDummy = fs.readFileSync(`${__dirname}/dummyData/dummyMicrosoft.json`);
      let dummyData = JSON.parse(rawDummy)
      expect(DataFetcher.getEncodedName(dummyData)).toEqual("Microsoft%20Corp.")
    })

    it("returns Apple Inc from json data", () => {
      let rawDummy = fs.readFileSync(`${__dirname}/dummyData/dummyApple.json`);
      let dummyData = JSON.parse(rawDummy)
      expect(DataFetcher.getEncodedName(dummyData)).toEqual("Apple,%20Inc.")
    })
  })
})