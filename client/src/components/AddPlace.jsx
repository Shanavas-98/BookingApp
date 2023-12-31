// import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"
import { addNewPlace, editPlace, fetchPlaceData } from "../api/userApi";
import Perks from "./Perks";
import { useNavigate, useParams } from "react-router-dom";
import Facilities from "./Facilities";
import ErrorPage from "../pages/ErrorPage";

function AddPlace() {
    const navigate = useNavigate();
    //all the states required for each input box
    const { placeId } = useParams();
    const [title, setTitle] = useState('')
    const [building, setBuilding] = useState('')
    const [locality, setLocality] = useState('')
    const [street, setStreet] = useState('')
    const [town, setTown] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [rent, setRent] = useState('')
    const [uploaded, setUploaded] = useState([]);
    const [cover, setCover] = useState('');
    const [description, setDescription] = useState('')
    const [beds, setBeds] = useState(1)
    const [bedrooms, setBedrooms] = useState(1)
    const [bathrooms, setBathrooms] = useState(0)
    const [facilities, setFacilities] = useState([])
    const [perks, setPerks] = useState([])
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [guests, setGuests] = useState(1)
    // api call to fetch place data
    async function getPlace(id) {
        const { data } = await fetchPlaceData(id);
        setTitle(data.title);
        setBuilding(data.building);
        setLocality(data.locality);
        setStreet(data.street);
        setTown(data.town);
        setDistrict(data.district);
        setState(data.state);
        setPincode(data.pincode);
        setRent(data.rent);
        setUploaded(data.photos);
        setCover(data.cover)
        setDescription(data.description);
        setBeds(data.beds);
        setBedrooms(data.bedrooms);
        setBathrooms(data.bathrooms);
        setFacilities(data.facilities);
        setPerks(data.perks);
        setCheckin(data.checkIn);
        setCheckout(data.checkOut);
        setGuests(data.guests);
    }
    //use effect function for calling the function on page load
    useEffect(() => {
        if (!placeId) {
            return;
        } else {
            getPlace(placeId);
        }
    }, [placeId])
    //add and update place form submission
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const formData = {
                title, building, locality, street,
                town, district, state, pincode,
                rent, uploaded, cover, description,
                facilities, beds, bedrooms, bathrooms,
                perks, checkin, checkout, guests
            }
            if (placeId) {
                //update place api
                const { data } = await editPlace(placeId, formData);
                console.log(data);
            } else {
                //add place api
                const { data } = await addNewPlace(formData);
                console.log(data);
            }
            //after successfull form submission redirect to places page
            navigate('/account/places')
        } catch (error) {
            //print error on form submission
            console.error(error);
            const root = document.getElementById('root');

            const rootElement = root.createRoot();
            rootElement.render(<ErrorPage error={error} />);
        }
    }
    //input header and label component
    function inputHeader(text, description) {
        return (
            <>
                <h3 className="text-xl mt-2">{text}</h3>
                <label htmlFor="title">{description}</label>
            </>
        )
    }
    // main form component
    return (
        <div className="m-auto w-auto">
            <form
                className="mx-auto border border-gray-500"
                onSubmit={handleSubmit}>
                {inputHeader('Title', 'Title of your accommodation,should be short and catchy')}
                <input type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                {inputHeader('Address', 'exact location of your accommodation')}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <input type="text"
                        name="building"
                        placeholder="Flat/Building"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)} />
                    <input type="text"
                        name="locality"
                        placeholder="Locality"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)} />
                    <input type="text"
                        name="street"
                        placeholder="Street/Area"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)} />
                    <input type="text"
                        name="town"
                        placeholder="Town/City"
                        value={town}
                        onChange={(e) => setTown(e.target.value)} />
                    <input type="text"
                        name="district"
                        placeholder="District"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)} />
                    <input type="text"
                        name="state"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)} />
                    <input type="number"
                        name="pincode"
                        placeholder="Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)} />
                </div>
                {inputHeader('Rent', 'rent charged per night')}
                <input type="text"
                    name="rent"
                    placeholder="&#x20B9;1000"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)} />
                {inputHeader("Add Photos", "More it's better")}
                {/* <div className="flex">
                    <input type="text"
                        name="link"
                        placeholder="upload using link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)} />
                    <button>Add Photo</button>
                </div> */}
                <ImageUpload uploaded={uploaded} setUploaded={setUploaded} cover={cover} setCover={setCover} />
                {inputHeader('Describe', 'Briefly describe your accommodation and facilities')}
                <textarea type="text"
                    name="description"
                    placeholder="about the place"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>

                {inputHeader('Facilities', 'Select all the facilities you provide')}
                <Facilities selected={facilities} handleFacilities={setFacilities} />
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3>No. of Bedrooms</h3>
                        <input type="number"
                            name="bedrooms"
                            value={bedrooms}
                            min={1}
                            onChange={(e) => setBedrooms(e.target.value)} />
                    </div>
                    <div>
                        <h3>No. of Beds</h3>
                        <input type="number"
                            name="beds"
                            min={1}
                            value={beds}
                            onChange={(e) => setBeds(e.target.value)} />
                    </div>
                    <div>
                        <h3>No. of Bathrooms</h3>
                        <input type="number"
                            name="bathrooms"
                            min={0}
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)} />
                    </div>
                </div>
                {inputHeader('Perks', 'Select all the perks you offer')}
                <Perks selected={perks} handlePerks={setPerks} />
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3>Checkin</h3>
                        <input type="time"
                            name="checkin"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)} />
                    </div>
                    <div>
                        <h3>Checkout</h3>
                        <input type="time"
                            name="checkout"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)} />
                    </div>
                    <div>
                        <h3>Max Guests</h3>
                        <input type="number"
                            min={1}
                            name="guestCount"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="primary m-4">Save Place</button>
            </form>
        </div>
    )
}

export default AddPlace