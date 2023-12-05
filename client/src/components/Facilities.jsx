/* eslint-disable react/prop-types */
import { Balcony, BedroomParentOutlined, DryCleaning, Flatware, KingBed, TableRestaurant, Weekend } from '@mui/icons-material';

function FacilityItem({ checked, name, text, icon, handleFacilities }) {
    function handleCheck(e) {
        const { checked, name } = e.target;
        console.log(checked, name);
        if (checked) {
            handleFacilities((prev) => ([...prev, name]))
        } else {
            handleFacilities((prev) => (prev.filter((item) => item !== name)))
        }
    }
    return (
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input type="checkbox" checked={checked} name={name} onChange={handleCheck} />
            {icon}
            <span>{text}</span>
        </label>
    )
}

function Facilities({ selected, handleFacilities }) {
    return (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
            <FacilityItem
                checked={selected.includes("workspace")}
                name={"workspace"}
                text={"Dedicated workspace"}
                icon={<TableRestaurant />}
                handleFacilities={handleFacilities} />
            <FacilityItem
                checked={selected.includes("bedroom")}
                name={"bedroom"}
                text={"Spacious Bedroom"}
                icon={<BedroomParentOutlined />}
                handleFacilities={handleFacilities} />
            <FacilityItem
                checked={selected.includes("beds")}
                name={"beds"}
                text={"King Size Beds"}
                icon={<KingBed />}
                handleFacilities={handleFacilities} />
            <FacilityItem
                checked={selected.includes("couch")}
                name={"couch"}
                text={"Living Room"}
                icon={<Weekend />}
                handleFacilities={handleFacilities} />
            <FacilityItem
                checked={selected.includes("balcony")}
                name={"balcony"}
                text={"Balcony"}
                icon={<Balcony />}
                handleFacilities={handleFacilities} />
            <FacilityItem
                checked={selected.includes("essentials")}
                name={"essentials"}
                text={"Essentials"}
                icon={<DryCleaning />}
                handleFacilities={handleFacilities} />
            <FacilityItem
                checked={selected.includes("cutlery")}
                name={"cutlery"}
                text={"Plates & Cutlery"}
                icon={<Flatware />}
                handleFacilities={handleFacilities} />
        </div>
    )
}

export default Facilities