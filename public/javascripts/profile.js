const options = document.querySelectorAll(".h5")
 options.forEach(option =>{
    option.addEventListener("click", function(){
        options.forEach(h5 => h5.classList.remove("active"))
        this.classList.add("active")
    })
 })
 // Function to toggle visibility of user profile and purchase card
function toggleProfile() {
    const userProfile = document.getElementById('user-profile');
    const purchaseCard = document.getElementById('purchase-card');
  
    if (userProfile.style.display === 'none') {
      userProfile.style.display = 'block';
      purchaseCard.style.display = 'none';
    } else {
      userProfile.style.display = 'none';
      purchaseCard.style.display = 'block';
    }
  }
  
  // Example: Toggle visibility on a button click
  document.getElementById('toggle-button').addEventListener('click', toggleProfile);
  