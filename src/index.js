'use strict'

// Style
require('./index.scss')

let bindComparison = (handle, resized, container) => {

  let moveWidth = 0

  let scrollBlock = (e) => { 
    e.preventDefault()
  }

  let unbindScrollBlock = (e) => {
    document.removeEventListener('touchmove', scrollBlock)
  }

  let getPageX = (e) => {
    if(e.pageX || e.targetTouches[0].pageX) {
      return e.pageX || e.targetTouches[0].pageX
    } else if(typeof e.originalEvent !== 'undefined') {
      return e.originalEvent.targetTouches[0].pageX
    } else {
      return false
    }
  }

  let moveSlide = (e) => {

    document.addEventListener('touchmove', scrollBlock, false)

    let pageX = getPageX(e)

    if(pageX !== false) {
      moveWidth = ((pageX - container.offsetLeft) - 1) * 100 / container.offsetWidth + '%'

      handle.style.left = moveWidth
      resized.style.width = moveWidth
    }

  }

  // Bind events to container
  container.addEventListener("mousemove", moveSlide)
  container.addEventListener("touchmove", moveSlide)
  container.addEventListener("touchend", unbindScrollBlock)

}

// Get sliders and iterate on them
let sliders = Array.prototype.slice.call(document.querySelectorAll(".slide-comparison"), 0)
sliders.forEach((element, index, array) => {
  element.querySelector('.resized img').style.width = element.offsetWidth + 'px'
  bindComparison(element.querySelector('.divider'), element.querySelector('.resized'), element)
});

// On window resize
window.onresize = (event) => {
  sliders.forEach((element, index, array) => {
    element.querySelector('.resized img').style.width = element.offsetWidth + 'px'
  });
}