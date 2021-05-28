const form = document.querySelector(".form");
const btn = document.querySelector(".search-btn");
const displayArea = document.querySelector(".display");

const getData = async () => {
  let city = document.querySelector(".search").value;
  const apiKey = "7fa17662dcd044f788215a86e8ce02ff";
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&units=metric`
  );
  if (response.status != 200) {
    throw new Error(`
    <p>Weather Info cannot be found</p>
    <ul>Tips
    <li>Make sure the city you are checking for exists</li>
    <li>Check if the field submitted was not empty</li>
    <li>Reload the page</li>
    <li>Check your internet connection</li>
    </ul>
    `).message;
  }
  const data = response.json();
  return data;
};
btn.addEventListener("click", (e) => {
  e.preventDefault();
  getData()
    .then((data) => {
      let city = document.querySelector(".search").value;
      displayArea.insertAdjacentHTML(
        "beforeend",
        `
    <div class="card">
        <div class="city">${city.toUpperCase()}</div>
        <p class="temperature">${
          data.data[0].app_temp
        }<sup class="measure-o-temp">°C</sup></p>
        <p class="icon"><i></i></p>
        <p class="descript">${data.data[0].weather.description}</p>
      </div>
    `
      );
      form.reset();
    })
    .catch((err) => {
      console.log(err);
      // error.innerHTML
    });
});
