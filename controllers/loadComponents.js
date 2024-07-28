$(document).ready(function () {
  function getNavbar() {
    $("#navbar").load("components/navbar.html");
  }

  function getFooter() {
    $("#footer").load("components/footer.html");
  }

  getNavbar();
  getFooter();
});
