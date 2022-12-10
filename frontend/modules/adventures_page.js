
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let cityId = params.get('city');

  return cityId;
}






//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    
    let res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    let citiess = await res.json()
  
    
    return citiess;
  } catch(err) {
    return null;
  }

}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  adventures.forEach(element => {

    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";

    ele.innerHTML = `
    <a href="detail/?adventure=${element.id}" id="${element.id}">
                
                <div class ="category-banner">
                ${element.category}
                </div>
                <div class = "activity-card">
                 <img class ="img-responsive" src=${element.image} />
                 <div class ="activity-card-text text-md-center w-100 mt-3">
                  <div class ="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class ="text-left">${element.name}</h5>
                    <p>${element.costPerHead}</p>
                  </div>
                  <div class ="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">Duration</h5>
                    <p>${element.duration}</p>
                  </div>
                 </div>
                </div>        
            `;
            document.getElementById("data").appendChild(ele);
  });
    
 

 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  let filterDuration =list.filter(ele=>
  ele.duration>low && ele.duration<=high);
     
    return filterDuration;
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
let filterCategory =list.filter(ele=>
  categoryList.includes(ele.category));
   
  return filterCategory;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filterdList = [];
  let choice = filters["duration"].split("-");
  if(filters["duration"].length > 0 && filters["category"].length>0){
    filterdList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
    filterdList = filterByCategory(filterdList, filters["category"])

  }
  
  
  else if(filters["duration"].length > 0){
    filterdList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
    
  }else if(filters["category"].length>0){
  filterdList = filterByCategory(list, filters["category"])
  }else {
    filterdList = list;
  }
  
  // Place holder for functionality to work in the Stubs
  return filterdList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 
  let newObject = JSON.parse(localStorage.getItem("filters"));

  console.log(newObject) 


  // Place holder for functionality to work in the Stubs
  return newObject;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

document.getElementById("duration-select").value = filters.duration;
  filters.category.forEach(e => {
  let cate = document.createElement("div");
   cate.className = "category-filter";
   cate.innerHTML= `<div>${e}</div>`
  
   document.getElementById("category-list").append(cate);

})

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
