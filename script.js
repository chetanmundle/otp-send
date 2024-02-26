// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the submit button inside the modal
var submitBtn = document.querySelector(".submit-btn");
var submitotpBtn = document.querySelector(".submit-otp");

// Get the email, OTP, and password divs
var emailDiv = document.querySelector(".email-div");
var otpDiv = document.querySelector(".otp-div");
var passwordDiv = document.querySelector(".password-div");

// Function to switch between email, OTP, and password divs
function switchDivs(divToShow) {
  emailDiv.style.display = "none";
  otpDiv.style.display = "none";
  passwordDiv.style.display = "none";

  if (divToShow === "email") {
    emailDiv.style.display = "block";
  } else if (divToShow === "otp") {
    otpDiv.style.display = "block";
  } else if (divToShow === "password") {
    passwordDiv.style.display = "block";
  }
}

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  switchDivs("email"); // Show email div by default
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// When the user clicks on submit button, switch to OTP div
submitBtn.onclick = function () {
  const email = document.getElementById("email").value;

  if (!(email === "" || email === null) && email.endsWith("@gmail.com")) {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch("https://polliwog-immune-stallion.ngrok-free.app/email/sendotp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        if (response.ok) {
          console.log("Otp send successfullly");
          switchDivs("otp");
        } else if (response.status == 404) {
          const responsetext = await response.text();
          alert(responsetext);
        } else {
          console.log("Unable to send otp");
        }
      } catch (error) {
        console.error("Error To send otp");
      }
    };

    fetchInvoiceData();
  } else {
    alert("Please Enter the Valid Email Id");
  }
};

// this call whenever the submit otp calls
submitotpBtn.onclick = function () {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  console.log(email, otp);

  if (!(otp === "" || otp === null)) {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(
          "https://polliwog-immune-stallion.ngrok-free.app/email/authenticate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
              email: email,
              otp: parseInt(otp),
            }),
          }
        );

        if (response.ok) {
          console.log("Otp successfullly Varified");
          switchDivs("password");
        } else if (response.status == 401) {
          const responsetext = await response.text();
          alert(responsetext);
        } else if (response.status == 404) {
          const responsetext = await response.text();
          alert(responsetext);
        } else {
          console.log("Incorrect OTP");
        }
      } catch (error) {
        console.error("Error To send otp");
      }
    };

    fetchInvoiceData();
  } else {
    alert("Please Eneter the Valid OTP");
  }
};
