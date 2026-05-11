const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/";
const COHORT = "2604-BRANDON"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let parties = [];
let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);

    const result = await response.json();
    parties = result.data || [];

    render();
  }  catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();

    selectedParty = result.data;
    render();
  }  catch (error) {
    console.error(error);
  }
}

function PartyListItem(party) {
  const $li = document.createElement("li");

  const a = document.createElement("a");
  a.href = "#selected";
  a.textContent = party.name;

  a.addEventListener("click", () => {
    getParty(party.id);
  });

  $li.appendChild(a);
  return $li;
}

function PartyList() {
  const ul = document.createElement("ul");
  ul.classList.add("party-list");

  parties.forEach((party) => {
    const li = PartyListItem(party);
    ul.appendChild(li);
  });

  return ul;
}


function PartyDetails() {
  if (!selectedParty) {
    const p = document.createElement("p");
    p.textContent = "Please select a party to learn more.";
    return p;
  }

  const section = document.createElement("section")
  section.classList.add("party");
  const h3 = document.createElement("h3");
  h3.textContent = `${selectedParty.name} #${selectedParty.id}`;

  const date = document.createElement("p");
  date.textContent = `${selectedParty.date}`;

  const location = document.createElement("p");
  location.textContent = `${selectedParty.location}`;

  const description = document.createElement("p");
  description.textContent = selectedParty.description;

  section.appendChild(h3);
  section.appendChild(date);
  section.appendChild(location);
  section.appendChild(description);

  return section;
}
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>All Parties</h2>
        <div id ="PartyList"></div>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <div id="PartyDetails"></div>
      </section>
    </main>
    `;
  $app.querySelector("#PartyList").replaceWith(PartyList());
  $app.querySelector("#PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();

