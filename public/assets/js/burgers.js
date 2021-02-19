// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // UPDATE
  const devourBurgerBtn = document.querySelectorAll(".devour");

  // Set up the event listener for the create button
  if (devourBurgerBtn) {
    devourBurgerBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("test");
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const devoured = e.target.getAttribute("data-newdevour");
        console.log(devoured);
        const devourState = {
          devoured: devoured,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(devourState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`burger has been: ${devoured}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  // CREATE
  const createBurger = document.getElementById("create-form");

  if (createBurger) {
    createBurger.addEventListener("submit", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        name: document.getElementById("burg").value.trim(),
        devoured: document.getElementById("devoured").checked,
      };

      // Send POST request to create a new quote
      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById("burg").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new Burger!");
        location.reload();
      });
    });
  }
  const deleteBurgerBtn = document.querySelectorAll(".deleteBurger");

  // Set up the event listeners for each delete button

  deleteBurgerBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("test");
      const id = e.target.getAttribute("data-id");
      console.log("delete quote id", id);

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(res);
        console.log(`Deleted ID: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});
