const search = document.getElementById("search");

search.addEventListener("keyup", (e) => {
  let searchFor = e.target.value;
  let filteredFood;
  filteredFood = foodArr.filter((food) => {
    return food.strMeal.toLowerCase().includes(searchFor);
  });
  renderFood(filteredFood);
  console.log(filteredFood);
});

fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    displayCountries(data.meals);
  });

const displayCountries = (countries) => {
  const countriesDiv = document.getElementById("countries");

  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.className = "col-md-3";
    const countryInfo = `
                   <div onclick="displayDetails('${country.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                   <img class="img-fluid rounded" src="${country.strMealThumb}" alt="">
                  <h4 class="h5">${country.strMeal}</h4>
                   </div>
               `;
    countryDiv.innerHTML = countryInfo;
    countriesDiv.appendChild(countryDiv);
  });
};

const displayDetails = (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderCountryInfo(data.meals[0]);
      console.log(data.meals[0]);
    });
};

const renderCountryInfo = (country) => {
  const countriesDetailsDiv = document.getElementById("countriesDetails");

  countriesDetailsDiv.innerHTML = `
        <img class="img-fluid rounded mb-4" src="${country.strMealThumb}" alt="">
        <h4>${country.strMeal}</h4>
        
        <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
        <ul class="list-unstyled mb-0">
            <li><i class="icon-check icons"></i> ${country.strIngredient1}</li>
            <li><i class="icon-check icons"></i> ${country.strIngredient2}</li>
            <li><i class="icon-check icons"></i> ${country.strIngredient3}</li>
            <li><i class="icon-check icons"></i> ${country.strIngredient4}</li>
            <li><i class="icon-check icons"></i> ${country.strIngredient5}</li>
        </ul>

    `;
};
