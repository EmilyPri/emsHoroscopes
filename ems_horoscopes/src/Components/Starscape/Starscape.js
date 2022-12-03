import React from "react";
import { gsap } from "gsap";
import "./Starscape.css";

//useRef returns a mutable ref object whose .current property is initialized 
// to the passed argument (initialValue). The returned object will persist for 
// the full lifetime of the component.
// useRef is like a “box” that can hold a mutable value in its .current property.
// If you pass a ref object to React with <div ref={myRef} />, React will set its
//.current property to the corresponding DOM node whenever that node changes.

const Starscape = ({ densityRatio = 0.2, sizeLimit = 5, defaultAlpha = 0.7 }) => {
    const canvasRef = React.useRef(null)
    const contextRef = React.useRef(null)
    const starsRef = React.useRef(null)
    React.useEffect(() => {
      contextRef.current = canvasRef.current.getContext('2d')
      const LOAD = () => {
        const VMIN = Math.min(window.innerHeight, window.innerWidth)
        const STAR_COUNT = Math.floor(VMIN * densityRatio)
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        starsRef.current = new Array(STAR_COUNT).fill().map(() => ({
          x: gsap.utils.random(0, window.innerWidth, 1),
          y: gsap.utils.random(0, window.innerHeight, 1),
          size: gsap.utils.random(1, sizeLimit, 1),
          scale: 1,
          alpha: gsap.utils.random(0.1, defaultAlpha, 0.1),
        }))
      }
      const RENDER = () => {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        starsRef.current.forEach(star => {
          contextRef.current.fillStyle = `hsla(0, 100%, 100%, ${star.alpha})`
          contextRef.current.beginPath()
          contextRef.current.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2)
          contextRef.current.fill()
        })
      }
      LOAD()
      RENDER()
    }, [])
    return <canvas ref={canvasRef} />
  }

  

  export default Starscape;