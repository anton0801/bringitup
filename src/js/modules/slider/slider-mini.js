import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoPlay) {
        super(container, next, prev, activeClass, animate, autoPlay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) { // метод closest() возвращает ближайшии родительскии элемент либо самого себя если он подходит по селектору который находится в скобках
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // slide
            this.container.appendChild(this.slides[1]); // button
            this.container.appendChild(this.slides[2]); // button
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // slide
            this.container.appendChild(this.slides[1]); // button
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }

    }

    bindTriggers() {
        this.next.addEventListener('click', () => { this.nextSlide() });

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i] .tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }


    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoPlay) {
                let paused = setInterval(() => {this.nextSlide()}, 5000);
                document.querySelector('.modules__slider').addEventListener('mouseenter', () => {
                    clearInterval(paused);
                });
            }

            this.next.addEventListener('mouseenter', () => {
                clearInterval(this.paused);
            });

            this.prev.addEventListener('mouseenter', () => {
                clearInterval(this.paused);
            });
        } catch (e) {}
    }
}
