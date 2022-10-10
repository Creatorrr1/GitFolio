import React from "react"
import "../App.css"
import "./homeSection.css"

function HomeSection() {
  return (
    <>
      <div className="hero-container">
        <video src="/assets/videos/video-2.mp4" autoPlay loop muted />
        <h1>GitFolio</h1>
        <p>Git Your PortFolio</p>
      </div>
    </>
  )
}

export default HomeSection
