const createNavigationLinks = (navigate) => {

  const links = [ ...document.querySelectorAll('.content a.navigate_link') ]

  links.forEach((link) => {

    link.addEventListener('click', (event) => {

      event.preventDefault()

      navigate(event.target.pathname)

    })

  })


}

module.exports = createNavigationLinks
