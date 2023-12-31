/* eslint-disable react/prop-types */
// import React from 'react'

function PlaceFacility({key, icon, text, description}) {
    return (
        <div key={key} className="border flex m-2 p-4 rounded-2xl items-center">
            {icon}
            <div className="flex flex-col px-4">
                <span className="text-lg font-semibold">{text}</span>
            <p>{description}</p>
            </div>
        </div>
    )
}

export default PlaceFacility