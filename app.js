window.onload = slider()

function slider() {

    const imgCollection = {
        slide1: ['img/img1.jpg', 'Deer', 'deer'],
        slide2: ['img/img2.jpg', 'Ostrich', 'ostrich'],
        slide3: ['img/img3.jpg', 'Porsche', 'porsche'],
        slide4: ['img/img4.jpg', 'Sparrow', 'sparrow'],
        slide5: ['img/img5.jpg', 'Sheep', 'sheep'],
    }

    let timerId //infinitySlider

    createGallery()
    const slideCollection = document.querySelectorAll('.slide')
    createBtns()
    const btnCollection = document.querySelectorAll('.btn')
    showFirstSlide()

    document.querySelector('.slide__img').addEventListener('load', resizeSlidesElem)
    window.addEventListener('resize', resizeSlidesElem)
    for (item of btnCollection) {
        item.addEventListener('click', toggleSlide)
    }

    infinitySlider()

    function createGallery() {
        let gallery = ''
        Object.keys(imgCollection).forEach((key) => {
            gallery += `<div class="slide"><div class="slide__wrapper"><img class="slide__img" src="${imgCollection[key][0]}" alt="${imgCollection[key][2]}"><h2 class="slide__subTitle">${imgCollection[key][1]}</h2> </div></div>`
        })
        document.querySelector('.container .slides').innerHTML = gallery
    }

    function createBtns() {
        let btns = ''
        counter = 0
        for (item of slideCollection) {
            btns += `<div class="btn" data-index="${counter}"></div>`
            counter++
        }
        document.querySelector('.btnContainer').innerHTML = btns
    }

    function resizeSlidesElem() {
        document.querySelector('.slides').style.height = document.querySelector('.slide-active').offsetHeight + 'px'
    }

    function showFirstSlide() {
        slideCollection[0].classList.add('slide-active')
        btnCollection[0].classList.add('btn-active')
    }

    function toggleSlide() {
        let currentBtn = this.getAttribute('data-index')

        document.querySelector('.slide-active').classList.remove('slide-active')
        document.querySelector('.btn-active').classList.remove('btn-active')

        slideCollection[currentBtn].classList.add('slide-active')
        btnCollection[currentBtn].classList.add('btn-active')
        resizeSlidesElem()
        clearInterval(timerId)
        infinitySlider()
    }

    function nextSlide() {

        let currentSlide = document.querySelector('.btn-active').getAttribute('data-index')

        document.querySelector('.slide-active').classList.remove('slide-active')
        document.querySelector('.btn-active').classList.remove('btn-active')

        if (currentSlide == slideCollection.length - 1) {
            slideCollection[0].classList.add('slide-active')
            btnCollection[0].classList.add('btn-active')
            resizeSlidesElem()
        } else {
            currentSlide++
            slideCollection[currentSlide].classList.add('slide-active')
            btnCollection[currentSlide].classList.add('btn-active')
            resizeSlidesElem()
        }
    }

    function infinitySlider(){
        timerId = setInterval(() => {
            nextSlide()
        }, 3000)
    }

}