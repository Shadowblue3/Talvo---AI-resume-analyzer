import React from 'react'
import "../../../style/loader.scss"
const Loader = () => {
    return (
        <>
            <div className="loader-container">
                <div className="pulse"></div>
                <div className="pulse"></div>
                <div className="scanner"></div>
                <div className="ai-core"></div>
                <div className="loading-text">Loading</div>
            </div>
            
        </>
    )
}

export default Loader