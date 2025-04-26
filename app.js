let input = document.querySelector("#input");
let search = document.querySelector("#search");
let main1 = document.querySelector(".main");
let lastCity = "";

input.addEventListener("keyup", async function (event) {
  let cityName = event.target.value.trim();

  if (event.code == "Enter") { 
    main1.style.transform= "translateY(0px)"; 
     if (cityName !== lastCity){
      let api = await fetch(  
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9e1ac06a6f72dc48dc80d70b4f040583&units=metric`
      );  
      let data = await api.json();  

      if (input.value == ""){  
        main1.innerHTML = `<div class = "city1"> PLEASE ENTER CITY </div>`;  
        lastCity = "";  
        input.value = "";   
      } 
       else if (data.cod == 404) { 
        main1.innerHTML = `  <div class="error">  
                    <img src="404.png" alt="" width="200px">   
                    <div class = "city"> Oops! Location not found! </div>  
                   </div>`; 
                   lastCity = ""; 
                   input.value = "";  
      } else {
        let temps = Math.floor(data.main.temp); 
        main1.innerHTML = ` <div class="box"> 
                           <div class = "img-box" >
                               <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" >
                               <div class="temp"> ${temps}&deg;C </div>
                           </div>
                           <div class = "type1"> ${data.weather[0].main} </div>
                           <div class="type" >${cityName}</div>  
       
                           <div class="last">
                               <div class="humdity">
                                   <i class="bi bi-water"></i> 
                                   <div class="hum">
                                       <div>${data.main.humidity}%</div>
                                       <div>Humidity</div> 
                                   </div>
                               </div>
                               <div class="humdity">
                                   <i class="bi bi-wind"></i> 
                                   <div class="hum">
                                       <div>${data.wind.speed}Km/h</div>
                                       <div>Wind Speed</div> 
                                   </div>
                               </div>
                           </div>
                       </div>`;

        lastCity = cityName;
        input.value = "";
      }
    } else { 
      if (input.value == ""){ 
        main1.innerHTML = `<div class = "city1"> PLEASE ENTER CITY </div>`;  
        lastCity = "";  
        input.value = "";   
      } else{
        console.log("api is not call");
        input.value = ""; 
      }
      
    }
  }
});

search.addEventListener("click", async function () {
  let cityName = input.value.trim();
  if (cityName !== lastCity) {
    // console.log(cityName);

    let api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9e1ac06a6f72dc48dc80d70b4f040583&units=metric`
    );
    let data = await api.json();

    if (data.cod == 404) {
      main1.innerHTML = `  <div class="error">
                <img src="404.png" alt="" width="200px"> 
                <div class = "city"> Oops! Location not found! </div>
               </div>`; 
               lastCity = "";
               input.value = "";
    } else if (input.value == "") {
      main1.innerHTML = `<div class = "city1"> PLEASE ENTER CITY </div>`;
      lastCity = ""; 
      input.value = ""; 
    } else {
      let temps = Math.floor(data.main.temp);
      main1.innerHTML = ` <div class="box"> 
                       <div class = "img-box" >
                           <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" >
                           <div class="temp"> ${temps}&deg;C </div>
                       </div>
                       <div class = "type1"> ${data.weather[0].main} </div>
                       <div class="type" >${cityName}</div>  
    
                       <div class="last">
                           <div class="humdity">
                               <i class="bi bi-water"></i> 
                               <div class="hum">
                                   <div>${data.main.humidity}%</div>
                                   <div>Humidity</div> 
                               </div>
                           </div>
                           <div class="humdity">
                               <i class="bi bi-wind"></i> 
                               <div class="hum">
                                   <div>${data.wind.speed}Km/h</div>
                                   <div>Wind Speed</div> 
                               </div>
                           </div>
                       </div>
                   </div>`;
      lastCity = cityName;
      input.value = "";
    }
  } else {
    if (input.value == "") {
      main1.innerHTML = `<div class = "city1"> PLEASE ENTER CITY </div>`;
      lastCity = ""; 
      input.value = ""; 
    }
    else{
      console.log("API IS NOT CALL"); 
      input.value = "";  
    }
  }
  // console.log(event.target.value);
});
