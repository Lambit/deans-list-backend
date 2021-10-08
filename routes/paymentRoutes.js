const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../app/expressError");
const { client, myIdempotencyKey, paymentsApi, locationsApi } = require("../square-utilities/squareClient");
const { LOCATION_ID } = require('../secrets/secrets');
const paymentSchema = require("../schemas/paymentSchema.json"); 

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


router.post('/', async (req,res,next) => {
  try {
    const validator = jsonschema.validate(req.body, paymentSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const payloadParse = req.body;

    const payload = {
      sourceId: payloadParse.nonce,
      idempotencyKey: myIdempotencyKey,
      autocomplete: true,
      locationId: LOCATION_ID,
      amountMoney: {
        amount: 100,
        currency: "USD"
      },
    };
    
    const results = await client.paymentsApi.createPayment(payload).raw_body;
    console.log(results);
    res.json(results);
  } catch(e) {
    return next(e);
  }
});


module.exports = router;