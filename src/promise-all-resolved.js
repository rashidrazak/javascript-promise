'use strict'
;(async function () {
  const {performance} = require('perf_hooks')
  const timeOut = (timeout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Promise resolved in ${timeout}`)
      }, timeout)
    })
  }

  /**
   * Single promise running
   */
  timeOut(1000)
    .then((result) => console.log(result))
    
    .catch((error) => console.log(error))

  /**
   * Running multiple promises in parallel using Promise.all
   */
  const promises = [timeOut(2000), timeOut(3000), timeOut(3000), timeOut(3000)]
  const t0 = performance.now()
  const result = await Promise.all(promises)
  const t1 = performance.now()

  /**
   * The whole promise will take around 3000ms since the promises are run in parallel
   */
  console.log(`Started at ${t0}`)
  console.log(`Ended at ${t1}`)
  console.log(`Took ${t1 - t0}`)

  console.log(result)
})()
