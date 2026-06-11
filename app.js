import countryList from "./code.js";

let output = document.querySelector(".out");
let button = document.querySelector(".Cbtn");
let input = document.getElementById("amt");
let from = document.getElementById("From");
let to = document.getElementById("To");
let dropdown = document.querySelectorAll(".dropdown");

for (let select of dropdown) {
    for (let code in countryList) {
        let option = document.createElement("option");

        option.value = code;
        option.innerText = code;

        if (select.name === "from" && code === "USD") {
            option.selected = true;
        } else if (select.name === "to" && code === "INR") {
            option.selected = true;
        }

        select.append(option);
    }
}

button.addEventListener("click", update);

async function update() {
    let money = Number(input.value);

    if (!money || money < 1) {
        money = 1;
        input.value = "1";
    }

    let fromval = from.value;
    let toval = to.value;

    const URL = `https://open.er-api.com/v6/latest/${fromval}`;

    try {
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        let data = await response.json();

        let rate = data.rates[toval];

        let finalAmount = money * rate;

        output.innerText =
            `${money} ${fromval} = ${finalAmount.toFixed(2)} ${toval}`;

    } catch (error) {
        output.innerText = "Something went wrong!";
        console.error(error);
    }
}