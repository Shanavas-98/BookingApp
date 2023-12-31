// import React from 'react'
import PropTypes from 'prop-types';

function ErrorPage({error}) {
    ErrorPage.propTypes={
        error: PropTypes.shape({
            name: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            stack: PropTypes.string.isRequired,
        }).isRequired
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-gray-700">{error.name}</h1>
            <p className="text-2xl font-semibold text-gray-600">{error.message}</p>
            <p className="text-gray-500">{error.stack}</p>
          </div>
        </div>
    );
}

export default ErrorPage