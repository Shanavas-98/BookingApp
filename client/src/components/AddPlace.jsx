import { useState } from "react"
import '../assets/javascripts/imageUpload'

function AddPlace() {
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [maxGuest, setMaxGuest] = useState(0)
    const [link, setLink] = useState('')
    async function addPlace() {
        try {
            console.log(title, address, description, maxGuest);
            // const {data} = await addNewPlace()
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="m-auto max-w-lg">
            <form
                className="mx-auto border border-gray-500"
                onSubmit={addPlace}>
                <h3 className="text-xl">Title</h3>
                <label htmlFor="title">Title of your accommodation,should be short and catchy</label>
                <input type="text"
                    name="title"
                    placeholder="Skyline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <h3 className="text-xl">Address</h3>
                <label htmlFor="title">exact location of your accommodation</label>
                <textarea type="text"
                    name="address"
                    placeholder="Flatno.123,Street,City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}></textarea>
                <h3 className="text-xl">Describe</h3>
                <label htmlFor="title">Briefly describe your accommodation and facilities</label>
                <textarea type="text"
                    name="description"
                    placeholder="about the place"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <h3 className="text-xl">Guests Count</h3>
                <label htmlFor="title">Maximum no. of guests you can accommodate</label>
                <input type="number"
                    name="guestCount"
                    placeholder="1"
                    value={maxGuest}
                    onChange={(e) => setMaxGuest(e.target.value)} />
                <h3 className="text-xl">Add Photos</h3>
                <label htmlFor="title">More it&apos;s better</label>
                <input type="text"
                    name="link"
                    placeholder="upload using link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)} />
                <button>Add Photo</button>
                <label htmlFor="input-file" id="drop-area">
                    <input type="file" accept="image/*" id="input-file" hidden/>
                    <div id="img-view">
                        <img src="/images/upload_cloud.png" alt="" />
                        <p>Drag and drop or click here <br/> to upload image</p>
                        <span>Upload any image from desktop</span>
                    </div>
                </label>
                <button type="submit" className="primary">Add</button>
            </form>
        </div>
    )
}

export default AddPlace