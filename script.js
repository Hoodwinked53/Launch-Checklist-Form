// Write your JavaScript code here!

window.addEventListener('load', function() {
   let form = document.querySelector("form");
   let pilotInput = document.querySelector("input[name=pilotName]");
   let copilotInput = document.querySelector("input[name=copilotName]");
   let fuelInput = document.querySelector("input[name=fuelLevel]");
   let cargoInput = document.querySelector("input[name=cargoMass]");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let missionTarget = document.getElementById("missionTarget");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let currentPlanet = json[Math.floor(Math.random()*json.length)];
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${currentPlanet.name}</li>
            <li>Diameter: ${currentPlanet.diameter}</li>
            <li>Star: ${currentPlanet.star}</li>
            <li>Distance from Earth: ${currentPlanet.distance}</li>
            <li>Number of Moons: ${currentPlanet.moons}</li>
         </ol>
         <img src="${currentPlanet.image}">
         `;
      })
   })

   form.addEventListener("submit", function(event) {
      event.preventDefault();

      if(pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoInput.value === "") {
         alert('Please answer all inputs!')
      } else if (isNaN(fuelInput.value)) {
         alert('Please enter a valid number for the fuel level.')
      } else if (isNaN(cargoInput.value)) {
         alert('Please enter a valid number for the cargo mass.')
      } else {
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `${pilotInput.value} is ready for launch!`;
         copilotStatus.innerHTML = `${copilotInput.value} is ready for launch!`;

         if (fuelInput.value <= 10000) {
            fuelStatus.innerHTML = "Not enough fuel to launch.";
         } else {
            fuelStatus.innerHTML = "Enough fuel to launch.";
         }

         if (cargoInput.value >= 10000) {
            cargoStatus.innerHTML = "Too much cargo mass to launch.";
         } else {
            cargoStatus.innerHTML = "Cargo mass is at acceptable level for launch.";
         }

         if (fuelInput.value <= 10000 || cargoInput.value >= 10000) {
            launchStatus.innerHTML = "Shuttle not ready to launch.";
            launchStatus.style.color = "red";
         } else {
            launchStatus.innerHTML = "Shuttle ready for launch.";
            launchStatus.style.color = "green";
         }
      }
   });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
