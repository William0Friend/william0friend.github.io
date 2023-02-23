//
//
//
//

//usea intersectionObserver opbject to keep trak of where the user scrolls on the page
// if a section comes into the users view, the divs slide from the left, into view
// this is accomplished by use of css classes, when the section comes into view.
// Besides Navbar, Banner, and footer, all sections have the class hidden, from scrollMagic.css,
// if the user scrolls over where the section should be, the show class is added to the section, overriding hidden
// wen the section leaves view, the show class, again from scrollMagic.css, is removed and the section disappears 
// of to the left again. Transition speed for te slides is 1500 milliseconds
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else { // this else makes it so the item dispears again if you look away
            entry.target.classList.remove('show');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
