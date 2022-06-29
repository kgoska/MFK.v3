/* Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое */

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn,.dropbtn-text,.dropdown__picture')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}