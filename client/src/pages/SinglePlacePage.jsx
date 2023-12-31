import { useEffect, useState } from "react"
import { fetchPlace } from "../api/userApi";
import { IMG_URL } from "../constants/urls";
import { useParams } from "react-router-dom";
import PerkItem from "../components/PerkItem";
import { AcUnit, Balcony, BedroomParentOutlined, DirectionsCar, DryCleaning, Flatware, KingBed, Kitchen, Pets, TableRestaurant, Weekend } from "@mui/icons-material";
import PlaceFacility from "../components/PlaceFacility";

function SinglePlacePage() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  useEffect(() => {
    async function getPlace(id) {
      const { data } = await fetchPlace(id);
      setPlace(data)
    }
    getPlace(placeId)
  }, [placeId])
  return (
    <div>
      <h1 className="text-3xl">{place.title}</h1>

      <div className="grid h-72 rounded-2xl grid-cols-2 gap-1 m-2 overflow-hidden">
        <div className="">
          {place?.cover &&
            <img className="h-72 object-cover" src={IMG_URL + place?.cover} alt={place.cover} />
          }
        </div>
        <div className="grid gap-1 grid-cols-2">
          {place?.photos?.map((image, index) => (
            image !== place?.cover && (
              <img key={index} className="h-36 w-full object-cover" src={IMG_URL + image} alt={image} />
            )
          ))}
        </div>
      </div>

      <div className="py-4">
        <h2 className="text-2xl">{place.address}</h2>
        <p className="text-lg">{`${place.guests} guests . ${place.bedrooms} bedrooms . ${place.beds} beds . ${place.bathrooms} bathrooms`}</p>
      </div>
      <h2 className="text-2xl">Facilities</h2>
      <div className="border w-1/2 py-4 border-x-0 border-y-2">
        {place.facilities?.map((facility, index) => {
          switch (facility) {
            case "workspace":
              return (
                <PlaceFacility key={index}
                  icon={<TableRestaurant />}
                  text={"Dedicated workspace"}
                  description={"A common area with wifi that’s well suited for working."} />
              )
            case "bedroom":
              return (
                <PlaceFacility key={index}
                  icon={<BedroomParentOutlined />}
                  text={"Spacious Bedroom"}
                  description={"Very spacious bedrooms with comfortable beds."} />
              )
            case "beds":
              return (
                <PlaceFacility key={index}
                  icon={<KingBed />}
                  text={"King Size Beds"}
                  description={"King size beds suitable and comfortable for couples."} />
              )
            case "couch":
              return (
                <PlaceFacility key={index}
                  icon={<Weekend />}
                  text={"Living Room"}
                  description={"A common area for chilling, you can watch movies"} />
              )
            case "balcony":
              return (
                <PlaceFacility key={index}
                  icon={<Balcony />}
                  text={"Balcony"}
                  description={"A balcony with great view."} />
              )
            case "essentials":
              return (
                <PlaceFacility key={index}
                  icon={<DryCleaning />}
                  text={"Essentials"}
                  description={"Essential things such as towel, soap, shampoo, toilet paper etc."} />
              )
            case "cutlery":
              return (
                <PlaceFacility key={index}
                  icon={<Flatware />}
                  text={"Plates & Cutlery"}
                  description={"Plates and cutleries are available for your use."} />
              )
            default:
              return null;
          }
        }
        )}
      </div>
      <h2 className="text-2xl">About this place</h2>
      <div className="w-3/4 py-4">
        <p>{place.description}</p>
      </div>
      <h2 className="text-2xl">What this place offers</h2>
      <div className="grid w-3/4 py-4 md:grid-cols-3 sm:grid-cols-2">
        {place.perks?.map((perk, index) => {
          switch (perk) {
            case "wifi":
              return (
                <PerkItem key={index}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>}
                  text={"Wifi"} />
              )
            case "parking":
              return (
                <PerkItem key={index}
                  icon={<DirectionsCar />}
                  text={"Free Parking"} />
              )
            case "tv":
              return (
                <PerkItem key={index}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>}
                  text={"TV"} />
              )
            case "pets":
              return (
                <PerkItem key={index}
                  icon={<Pets />}
                  text={"Pets"} />
              )
            case "ac":
              return (
                <PerkItem key={index}
                  text={"AC"}
                  icon={<AcUnit />} />
              )
            case "fridge":
              return (
                <PerkItem key={index}
                  text={"Refrigerator"}
                  icon={<Kitchen />} />
              )
            case "camera":
              return (
                <PerkItem key={index}
                  text={"Security Camera"}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>} />
              )
            default:
              return null;
          }
        })}
      </div>
    </div>
  )
}

export default SinglePlacePage