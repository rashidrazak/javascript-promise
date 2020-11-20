'use strict'
;(async function () {
  const timeOut = (timeout, shippingId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (timeout === 2000 || timeout === 4000) {
          reject(`Rejected: ${shippingId}`)
        } else {
          console.log('success')
          // resolve(`Resolved: ${shippingId}`)
          affectedShippingIds.push({timeout, shippingId})
          resolve({filePath: `${shippingId}.pdf`})
        }
      }, timeout)
    })
  }

  const affectedShippingIds = []
  const shippingIds = [
    {
      shippingId: 'VX0000000001',
      timeout: 1000
    },
    {
      shippingId: 'VX0000000002',
      timeout: 1000
    },
    {
      shippingId: 'VX0000000003',
      timeout: 5000
    }
  ]

  const promises = shippingIds.map(({timeout, shippingId}) => {
    return timeOut(timeout, shippingId)
  })

  const limitPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // class TimeOutError extends Error {
      //   constructor(message) {
      //     super(message)
      //     this.name = 'TimeOutError'
      //   }
      // }

      // const error = new TimeOutError('Async ops taking too long to complete')

      reject('Async ops taking too long to complete')
    }, 3000)
  })
  // .catch((error) => {
  //   class TimeOutError extends Error {
  //     constructor(message) {
  //       super(message)
  //       this.name = 'TimeOutError'
  //     }
  //   }

  //   return new TimeOutError(error)
  // })
  const exec = Promise.allSettled(promises)

  let result
  try {
    result = await Promise.race([exec, limitPromise])
  } catch (err) {
    console.log(err)
  }

  console.log(result)
  console.log(affectedShippingIds)
})()
