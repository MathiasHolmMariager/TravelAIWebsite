import { Duffel } from '@duffel/api'

const duffel = new Duffel({
  token: "duffel_test_SFvy4hsjdO6lNXXjM0iGhcE42JockQZPaOAVo5BBKSn"
})

export async function getDuffel () {
    const offerRequest = await duffel.offerRequests.create({
        "slices": [
          {
            "origin": 'LHR',
            "destination": 'JFK',
            "departure_date": "2024-04-29T11:10:45.261Z"
          },
        ],
        "passengers": [{ "type": "adult" }],
        "cabin_class": undefined
      })
      
      const offers = await duffel.offers.list({offer_request_id: offerRequest.data.id})

      return offers;
}
