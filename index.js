'use strict'
;(async function () {
  const {performance} = require('perf_hooks')

  // A simple simulation of Promise that resolve or reject after a certain time
  const timeOut = (shippingId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shippingId === 'VX0000000002') {
          reject(`Rejected: ${shippingId}`)
        } else {
          resolve(`Resolved: ${shippingId}`)
        }
      }, 3000)
    })
  }

  const shippingIds = ['VX0000000001', 'VX0000000002', 'VX0000000003']

  const promises = shippingIds.map((shippingId) => {
    return timeOut(shippingId).catch((e) => e)
  })
  const t0 = performance.now()
  const result = await Promise.all(promises)
  const t1 = performance.now()

  console.log(`Started at ${t0}`)
  console.log(`Ended at ${t1}`)
  console.log(`Took ${t1 - t0}`)
  
  console.log(result)
})()
