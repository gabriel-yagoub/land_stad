async function getDataLand(){                                               //Funktion för att ta in JSON information
    const response = await fetch("land.json");
    const data = await response.json();
    return data;
}

async function getDataStad(){                                               //Funktion för att ta in JSON information
    const response = await fetch("stad.json");
    const data = await response.json();
    return data;
}



async function printData(){                             //
    const countrys = await getDataLand();
    const cities = await getDataStad();
    for (const country of countrys){
        const cityDiv = document.querySelector(".stader")
        const countryBtn = document.createElement("button");
        countryBtn.innerText = country.countryname;
        document.body.appendChild(countryBtn);
        countryBtn.addEventListener("click", function(){
            cityDiv.innerHTML = "";
            for (const city of cities){                                      //Loop för plocka in innehållet var för sig 
                if (country.id === city.countryid){                          //Villkor för att säkerställa att rätt städer hämnar under rätt land
                    const cityBtn = document.createElement("button");
                    cityBtn.innerText = city.stadname;
                    cityDiv.appendChild(cityBtn);
                    cityBtn.addEventListener("click", () => invanarAntal(city.stadname, city.population));

                    const visitedBtn = document.createElement("button");
                    visitedBtn.innerText = "Besökt";
                    cityDiv.appendChild(visitedBtn);
                    visitedBtn.addEventListener("click", () => saveToLocalStorage(city.id,));
                    visitedBtn.addEventListener("click", () => saveCityToLocalStorage(city.stadname,));
                    
                }
            }
        })
    }
}

function saveToLocalStorage(stadId){                                        //Funktion som gör 1. Om localstorage inte är tomt, lägg till item på array 2. Om localstorage är tomt skapar den en array
    let visitedCities = JSON.parse(localStorage.getItem("cityIds"))         //Skickas upp till EventListener
    if (visitedCities){
        visitedCities.push(stadId)
    
    }
    else {
        visitedCities = [stadId]
    }
    localStorage.setItem("cityIds", JSON.stringify(visitedCities))
}

function saveCityToLocalStorage(stadNamn){                                  //Funktion som gör 1. Om localstorage inte är tomt, lägg till item på array 2. Om localstorage är tomt skapar den en array
    let nameCity = JSON.parse(localStorage.getItem("cityName"))             //Skickas upp till EventListener
    if (nameCity){
        nameCity.push(stadNamn)
    
    }
    else {
        nameCity = [stadNamn]
    }
    localStorage.setItem("cityName", JSON.stringify(nameCity))
}


function invanarAntal(stad, population){                                    //Funktion som skriver ut text 
    const invanarDiv = document.querySelector(".invanare");
    invanarDiv.innerHTML = `${stad} är en stad som har ${population} invånare`;
}


function besoktaStader(){                                                   //Funktion som skriver ut text 
    let staderILocal = JSON.parse(localStorage.getItem("cityName"));
    const besokataDiv = document.querySelector(".besokta");
    besokataDiv.innerHTML = "Du har besökt: " + staderILocal;
}

const clearBtn = document.getElementById("radera");                         //Funktion som rensar localstorage vis knapptryck
clearBtn.addEventListener("click", function(){
    localStorage.clear();
})



besoktaStader();
printData();
