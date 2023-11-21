import { Duffel } from '@duffel/api'

const duffel = new Duffel({
  token: "duffel_test_SFvy4hsjdO6lNXXjM0iGhcE42JockQZPaOAVo5BBKSn"
})

export async function getDuffel () {
    const offerRequest = await duffel.offerRequests.create({
      slices : [
        {
          "origin": "NYC",
          "destination": "ATL",
          "departure_date": "2023-12-22",
          
        },
        {
          "origin": "ATL",
          "destination": "NYC",
          "departure_date": "2023-12-29"
        }
      ],
      "passengers": [{ "type": "adult" }, { "type": "adult" }, { "age": 1 }],
      "cabin_class": "economy",
    })
      
      const offers = await duffel.offers.list({offer_request_id: offerRequest.data.id})

      return offers;
}
