/* eslint-disable react/prop-types */
// import React from 'react'

function PerkItem({key,icon,text}) {
    return (
        <div key={key} className="border p-4 m-2 flex rounded-2xl gap-4 items-center">
            {icon}
            <span>{text}</span>
        </div>
    )
}

export default PerkItem