$(document).ready(function () {
  function connect(targetId, url) {
    $(`#${targetId}`).load(url, function (response, status, xhr) {
      if (status == "error") {
        console.error(
          `Error loading HTML content: ${xhr.status} ${xhr.statusText}`
        );
      }
    });
  }
});
