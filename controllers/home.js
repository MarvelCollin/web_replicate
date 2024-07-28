document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("ad-modal");

  var closeBtn = document.getElementsByClassName("close-btn")[0];

  setTimeout(function () {
    modal.style.display = "block";
  }, 1000);

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

});
