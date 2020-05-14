export default class ShowInfo {

    constructor(trigggers = null, popup = null) {
        this.triggers = document.querySelectorAll(trigggers);
    }

    Show() {
        this.triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                const sibling = btn.closest('.module__info-show').nextElementSibling;
                sibling.classList.toggle('msg');
                sibling.classList.add("animated", "fadeInDown");
            });
        })
    }

    init() {
        this.Show();
    }
}