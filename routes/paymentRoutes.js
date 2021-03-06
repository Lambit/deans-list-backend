const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const { client, myIdempotencyKey, paymentsApi, locationsApi } = require("../square-utilities/squareClient");
const { LOCATION_ID } = require('../config'); 

//  Test POST route for payments to Square API

// URL looks like http://localhost:3001/v2/payments

// response data looks like 
// {
//   payment: {
//     id: 'xW7uWNtWsAzLRTZFsF2GymltDv8YY',
//     createdAt: '2021-09-08T05:14:02.912Z',
//     updatedAt: '2021-09-08T05:14:03.104Z',
//     amountMoney: { amount: 200n, currency: 'USD' },
//     totalMoney: { amount: 200n, currency: 'USD' },
//     approvedMoney: { amount: 200n, currency: 'USD' },
//     status: 'COMPLETED',
//     delayDuration: 'PT168H',
//     delayAction: 'CANCEL',
//     delayedUntil: '2021-09-15T05:14:02.912Z',
//     sourceType: 'CARD',
//     cardDetails: {
//       status: 'CAPTURED',
//       card: [Object],
//       entryMethod: 'KEYED',
//       cvvStatus: 'CVV_ACCEPTED',
//       avsStatus: 'AVS_ACCEPTED',
//       statementDescription: 'SQ *DEFAULT TEST ACCOUNT',
//       cardPaymentTimeline: [Object]
//     },
//     locationId: 'LBRWT0ZR2RWSM',
//     orderId: 'mLnt2RvODDoxaJs3fADFEuV2OmLZY',
//     riskEvaluation: { createdAt: '2021-09-08T05:14:03.021Z', riskLevel: 'NORMAL' },
//     receiptNumber: 'xW7u',
//     receiptUrl: 'https://squareupsandbox.com/receipt/preview/xW7uWNtWsAzLRTZFsF2GymltDv8YY',
//     versionToken: 'r92JPJAeHgYrQIpk0IKKtUlJqsWwRTKP1kMssmyq3On6o'
//   }


// router.post("/", async function (req, res, next) {
//     try {
//         const response = await client.paymentsApi.createPayment({
//           sourceId: 'cnon:card-nonce-ok',
//           idempotencyKey: idempotencyKey,
//           amountMoney: {
//             amount: 1,
//             currency: 'USD'
//           },
//           autocomplete: true,
//         });
      
//         console.log(response.result);
//       } catch(error) {
//         console.log(error);
//       }
//   });

// router.post('/', async (req,res,next) => {
//   try {
//     const { nonce, buyerVerificationToken } = req.body;
//     const results = await client.paymentsApi.createPayment(nonce, buyerVerificationToken);
//     console.log(results);
//     return res.json(results);
//   } catch(e) {
//     return next(e);
//   }
// });



/* Post route sent to the API with data from the Square payment form. Parsed like above example. */ 

router.post('/', async (req,res,next) => {
  try {
    const payloadParse = req.body;

    const payload = {
      sourceId: payloadParse.nonce,
      verificationToken: payloadParse.token,
      idempotencyKey: myIdempotencyKey,
      autocomplete: true,
      locationId: LOCATION_ID,
      amountMoney: {
        amount: 100,
        currency: "USD"
      },
    };

    console.log(payload);
    
    const results = await client.paymentsApi.createPayment(payload).raw_body;
    
    res.json(results);

  } catch(e) {
    return next(e);
  }
});


module.exports = router;