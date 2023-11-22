// import React from 'react'
import {Facebook, Instagram, Twitter} from '@mui/icons-material';

function Footer() {
  return (
    <footer className="flex justify-between bg-gray-100 p-4 border-t-2">
        <div className="flex">
            &copy; 2023 Airbnb,Inc.
            <ul className='flex items-center list-none gap-2 px-2'>
                <li>.</li>
                <li>Privacy</li>
                <li>.</li>
                <li>Terms</li>
                <li>.</li>
                <li>Sitemap</li>
                <li>.</li>
                <li>Company details</li>
            </ul>
        </div>
        <div>
            <ul className='flex list-none gap-2 px-4'>
                <li><Facebook /></li>
                <li><Twitter /></li>
                <li><Instagram /></li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer