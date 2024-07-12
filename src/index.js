document.addEventListener("DOMContentLoaded", function () {
  // See the image received from the server, including its title, likes and
  //    comments when the page loads.
  const h2 = document.getElementById("card-title");
  const img = document.getElementById("card-image");
  const span = document.getElementById("like-count");
  const ul = document.getElementById("comments-list");
  const likeBtn = document.getElementById("like-button");
  const commentForm = document.getElementById("comment-form");
  const input = document.getElementById("comment");
  fetch("http://localhost:3000/images/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        h2.textContent = element.title;
        img.src = element.image;
        span.textContent = `${element.likes} likes`;
        fetch("http://localhost:3000/comments/")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((comment) => {
              const li = document.createElement("li");
              li.textContent = comment.content;
              ul.appendChild(li);
              // ### Bonus Deliverables
              // Remove a comment from the page when it is clicked. (Note: no persistence is
              // needed; it's fine if the comment shows up again when the page is refreshed)
              li.addEventListener("click", function () {
                ul.removeChild(li);
              });
            });
          });
      });
    });
  // Click on the heart icon to increase image likes on the page. **No persistence
  // is needed**
  likeBtn.addEventListener("click", function () {
    const likeCount = parseInt(span.textContent);
    span.textContent = `${likeCount + 1} likes`;
  });
  // Add a new comment to the page when the comment form is submitted. **No
  // persistence is needed**
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const li = document.createElement("li");
    li.textContent = input.value;
    ul.appendChild(li);
    // ### Bonus Deliverables
    // Remove a comment from the page when it is clicked. (Note: no persistence is
    // needed; it's fine if the comment shows up again when the page is refreshed)
    li.addEventListener("click", function () {
      ul.removeChild(li);
    });
  });
  // Click the title of the image to toggle whether or not the image is being
  // displayed.
  h2.addEventListener("click", function () {
    if (img.style.display === "none") {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
  /* Click the image and see a new random image of a dog. Make a GET request to
     this API to request a random dog image:
     [https://dog.ceo/api/breeds/image/random](https://dog.ceo/api/breeds/image/random)
     Then replace the image of the dog with the new random image returned by the
     API.
     */
  img.addEventListener("click", function () {
    fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
      response.json().then((data) => {
        img.src = data.message;
      })
    );
  });
});
