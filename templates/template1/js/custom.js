// $('.flight-main').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   });

$(".flight-main").slick({
  autoplaySpeed: 2000,
  slidesToShow: 1,
  infinite:true,
  arrows:true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});



  function submitModal() {
    const fullName = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();

      // Check if required fields are not empty
      if (!fullName) {
        console.log("faiz")
          displayErrorMessage('username', 'Please enter your Full Name.');
          return;
      }

      if (!email) {
        console.log("sssfaiz")

          displayErrorMessage('email', 'Please enter your Email.');
          return;
      }

      // if (!isValidEmail(email)) {
      //     displayErrorMessage('email', 'Please enter a valid Email address.');
      //     return;
      // }

      // if (!phone) {
      //   console.log("fsssaiz")

      //     displayErrorMessage('phone', 'Please enter your Phone Number.');
      //     return;
      // }
      const formData = {
        username: document.getElementById('username').value,
     email: document.getElementById('email').value,
     phone: document.getElementById('phone').value,
     hospital: document.getElementById('hospital').value,
     month: document.getElementById('month').value,
     day: document.getElementById('day').value,

      };

      fetch('https://42rsudctvl.execute-api.us-west-2.amazonaws.com/mailing-lists', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(response => {
          console.log("--->");
          showSuccessMessage()
          // Check if the response is successful (status code 200-299)
          if (response.ok) {
              return response.json();
          } else {
              throw new Error(`Network response was not ok: ${response.status}`);
          }
      })
      .then(data => {
          console.log("response------", data);
          // Display success message
          showSuccessMessage();
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle errors, e.g., show an error message to the user
      });
  }

  function showSuccessMessage() {
      // Assuming you have an element with the ID 'successMessage'
      const successMessageElement = document.getElementById('successMessage');
      const joinformElement = document.getElementById('join-form');
console.log("successMessageElement",successMessageElement)
      // Display the success message element
      if (successMessageElement) {
          successMessageElement.style.display = 'block';
          joinformElement.style.display = 'none';
      }

      // setTimeout(() => {
      //     window.location.reload();
      // }, 5000); // 2000 milliseconds (2 seconds) delay
  }
    // Helper function to display error messages
    function displayErrorMessage(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    console.log("errorElement",errorElement)
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}

