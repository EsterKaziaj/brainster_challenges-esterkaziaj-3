document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});




document.getElementById("subscribeButton").addEventListener("click", function() {
    // Get the value of the email input
    var email = document.getElementById("emailInput").value;
    
    // Perform any action you want here, for example, displaying an alert
    alert("urime,sapo bere subscribe: " + email);
})