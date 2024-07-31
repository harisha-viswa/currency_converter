let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelectorAll(".options select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};
let apiKey = '5b8b33268d1481271ec97f22'; // Replace with your actual API key if required
let requestURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // Modify if API key is needed, e.g., `?apikey=${apiKey}`

async function fetchRates() {
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.conversion_rates; // Adjusted according to the API response structure
    populateOptions();
}

function populateOptions() {
    let val = "";
    Object.keys(rates).forEach(code => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach(s => s.innerHTML = val);
}

function convert(val, fromcurr, tocurr) {
    let v = (val / rates[fromcurr]) * rates[tocurr];
    let v1 = v.toFixed(3);
    return v1 == 0.0 ? v.toFixed(5) : v1;
}

function displayrate() {
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener("click", () => {
    let fromcurr = sel1.value;
    let fromval = parseFloat(inpt1.value);
    let tocurr = sel2.value;

    if (isNaN(fromval)) {
        alert("Please enter a number");
    } else {
        let cval = convert(fromval, fromcurr, tocurr);
        inpt2.value = cval;
    }
});

selects.forEach(s => s.addEventListener("change", displayrate));

document.querySelector(".swap").addEventListener("click", () => {
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    sel2.value = op1;
    sel1.value = op2;
    displayrate();
});

fetchRates(); // Call this function to populate options and get rates initially
