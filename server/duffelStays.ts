import { Duffel } from '@duffel/api'

const duffel = new Duffel({
  token: "duffel_test_SFvy4hsjdO6lNXXjM0iGhcE42JockQZPaOAVo5BBKSn"
})

export async function getDuffelStays () {
    const staysRequest = await duffel.stays.search({
        rooms: 1,
        location: {
          radius: 2,
          geographic_coordinates: {
            longitude: -0.1416,
            latitude: 51.5071
          }
        },
        check_out_date: "2023-12-07",
        check_in_date: "2023-12-04",
        adults: 2
      })

      return staysRequest;
} 