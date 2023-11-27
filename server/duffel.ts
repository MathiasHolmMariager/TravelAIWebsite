// duffel.ts - unchanged
import { Duffel } from '@duffel/api'

const duffel = new Duffel({
  token: "duffel_test_SFvy4hsjdO6lNXXjM0iGhcE42JockQZPaOAVo5BBKSn"
})

export async function getDuffel(params: any) {
  const offerRequest = await duffel.offerRequests.create({
    slices: params.slices,
    passengers: params.passengers,
    cabin_class: params.cabin_class,
  });

  const offers = await duffel.offers.list({ offer_request_id: offerRequest.data.id });

  return offers;
}

