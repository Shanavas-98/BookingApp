/* eslint-disable react/prop-types */
import { AcUnit, DirectionsCar, Kitchen, Pets } from '@mui/icons-material'
// import React from 'react'

function PerkItem({ checked, name, text, icon, handlePerks }) {
    function handleCheck(e) {
        const { checked, name } = e.target;
        console.log(checked, name);
        if (checked) {
            handlePerks((prev) => ([...prev, name]))
        } else {
            handlePerks((prev) => (prev.filter((item) => item !== name)))
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

function Perks({ selected,handlePerks }) {
    return (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
            <PerkItem
                checked={selected.includes("wifi")}
                name={"wifi"}
                text={"Wifi"}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>}
                handlePerks={handlePerks} />
            <PerkItem
                checked={selected.includes("parking")}
                name={"parking"}
                text={"Free Parking"}
                icon={<DirectionsCar />}
                handlePerks={handlePerks} />
            <PerkItem
                checked={selected.includes("tv")}
                name={"tv"}
                text={"TV"}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>}
                handlePerks={handlePerks} />
            <PerkItem
                checked={selected.includes("pets")}
                name={"pets"}
                text={"Pets"}
                icon={<Pets />}
                handlePerks={handlePerks} />
            <PerkItem
                checked={selected.includes("ac")}
                name={"ac"}
                text={"AC"}
                icon={<AcUnit />}
                handlePerks={handlePerks} />
            <PerkItem
                checked={selected.includes("fridge")}
                name={"fridge"}
                text={"Refrigerator"}
                icon={<Kitchen />}
                handlePerks={handlePerks} />
            <PerkItem
                checked={selected.includes("camera")}
                name={"camera"}
                text={"Security Camera"}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>}
                handlePerks={handlePerks} />
        </div>
    )
}

export default Perks