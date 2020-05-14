export default class Differents {
   constructor(oldOfficer, newOfficer, items) {
       try {
           this.oldOfficer = document.querySelector(oldOfficer);
           this.newOfficer = document.querySelector(newOfficer);
           this.oldItems = this.oldOfficer.querySelectorAll(items);
           this.newItems = this.newOfficer.querySelectorAll(items);
           this.items = items;
           this.oldCounter = 0;
           this.newCounter = 0;
       } catch (e) {}
   }

   bindTriggers(officer, selector, counter, item) {
       officer.querySelector(selector).addEventListener('click', () => {
           if (counter !== item.length - 2) {
               item[counter].style.display = 'flex';
               //this.oldCounter[this.oldCounter].classList.add("animated", 'fadeInUp');
               counter++;
           } else {
               item[counter].style.display = 'flex';
               item[item.length - 1].remove();
           }
       });
   }

    hideItems() {
       function hide(items) {
            items.forEach((item, i, arr) => {
                if (i !== arr.length - 1) {
                    item.style.display = 'none';
                }
            });
       }
       hide(this.oldItems);
       hide(this.newItems);
    }

   init() {
       try {
           this.hideItems();
           this.bindTriggers(this.oldOfficer, '.plus', this.oldCounter, this.oldItems);
           this.bindTriggers(this.newOfficer, '.plus', this.newCounter, this.newItems);
       } catch (e) {}
   }
}