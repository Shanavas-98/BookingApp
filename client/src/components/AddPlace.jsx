import { useState } from "react"
import ImageUpload from "./ImageUpload"
import { addNewPlace } from "../api/userApi";
import Perks from "./Perks";
import { useNavigate } from "react-router-dom";

function AddPlace() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [uploaded, setUploaded] = useState([]);
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [maxGuest, setMaxGuest] = useState(1)

    // const [link, setLink] = useState('')
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const formData = {
                title, address, uploaded, 
                description, perks, checkin, 
                checkout, maxGuest
            }
            const { data } = await addNewPlace(formData);
            console.log(data);
            alert(data.message)
            navigate('/account/places')
        } catch (error) {
            console.error(error);
        }
    }
    function inputHeader(text, description) {
        return (
            <>
                <h3 className="text-xl mt-2">{text}</h3>
                <label htmlFor="title">{description}</label>
            </>
        )
    }
    return (
        <div className="m-auto w-auto">
            <form
                className="mx-auto border border-gray-500"
                onSubmit={handleSubmit}>
                {inputHeader('Title', 'Title of your accommodation,should be short and catchy')}
                <input type="text"
                    name="title"
                    placeholder="Skyline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                {inputHeader('Address', 'exact location of your accommodation')}

                <textarea type="text"
                    name="address"
                    placeholder="Flatno.123,Street,City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}></textarea>
                {inputHeader('Add Photos', 'More it&apos;s better')}
                {/* <div className="flex">
                    <input type="text"
                        name="link"
                        placeholder="upload using link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)} />
                    <button>Add Photo</button>
                </div> */}
                <ImageUpload uploaded={uploaded} setUploaded={setUploaded} />
                {inputHeader('Describe', 'Briefly describe your accommodation and facilities')}
                <textarea type="text"
                    name="description"
                    placeholder="about the place"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
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
                            value={maxGuest}
                            onChange={(e) => setMaxGuest(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="primary m-4">Save Place</button>
            </form>
        </div>
    )
}

export default AddPlace