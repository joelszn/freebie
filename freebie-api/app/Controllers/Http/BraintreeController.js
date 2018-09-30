'use strict'

const braintree = require("braintree")

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "hz4hyv7whqmbpnb8",
  publicKey: "dk4sfh8r78qtvzz5",
  privateKey: "c696b68675f1fb32943d346aafe783bb"
})

class BraintreeController {
  async getClientToken({ request, response })
  {
    const result = new Promise((resolve, reject) => {
        gateway.clientToken.generate({}, function(err, res){
          const token = res.clientToken
          resolve(token)
      })
    })
    result.then(data => {
      response.send({"client_token": data})
    })
    await result
  }

  async checkout({ request, response })
  {
    const nonceFromTheClient = request.body.payment_method_nonce
    const transactionResult = gateway.transaction.sale({
      amount: request.body.payment_amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if(err) { return err }
      return result
    })
    response.send({"data": transactionResult})
  }
}

module.exports = BraintreeController
