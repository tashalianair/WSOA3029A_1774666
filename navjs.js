const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

document.getElementById('go-back').addEventListener('click', () => {history.back(); });

document.getElementById('go-forward').addEventListener('click', e => {window.history.forward(); });