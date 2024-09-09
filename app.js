const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
let dropdowns = document.querySelectorAll(".drop-down select");
let btn = document.getElementById("#button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (select of dropdowns) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.text = code;
    newOption.value = code;
    if (name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("button clicked");
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal < 0 || amtVal === "") {
    amtVal = 1;
    amount.value = 1;
  }
  const fromCurrency = fromCurr.value.toLowerCase();
  const toCurrency = toCurr.value.toLowerCase();
  const URL = `${BASE_URL}/${fromCurrency}/${toCurrency}.json`;
  // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = rate * amtVal;
  // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

  msg.innerText = "Rate: ";
});
