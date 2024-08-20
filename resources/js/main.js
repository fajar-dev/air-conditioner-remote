//typed js
new Typed('#typed', {
  strings: [
    'Buat tautan pendek, Kode QR, dan bagikan di mana saja. <br> Semua di dalam Platform <span class="fw-bold">UNIMAL.LINK</span>',
  ],
  typeSpeed: 50,
  delaySpeed: 120,
  loop: false,
})

document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault()
  var button = document.getElementById('submitButton')
  button.disabled = true
  button.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
  setTimeout(function () {
    document.getElementById('myForm').submit()
  }, 2000)
})
