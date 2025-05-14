// script.js

async function fetchMenu() {
  const res = await fetch("/api/menu");
  const data = await res.json();
  const container = document.getElementById("cards");

  data.categories.forEach((cat) => {
    const category = document.createElement("div");
    category.className = "category";
    const title = document.createElement("h2");
    title.textContent = detectMedal(cat.name);
    title.className = "medal";
    category.appendChild(title);

    const items = document.createElement("div");
    items.className = "items";
    category.appendChild(items);
    cat.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";

      // Optional: Card header
      const header = document.createElement("div");
      header.className = "card-header";

      // Optional: Type label
      const type = detectType(item.type);
      if (type) {
        const typeLabel = document.createElement("span");
        typeLabel.className = "type-label";
        typeLabel.textContent = type;
        header.appendChild(typeLabel);
      }
      card.appendChild(header);

      // Card content
      const content = document.createElement("div");
      content.className = "card-content";

      const name = document.createElement("h3");
      name.textContent = item.name;
      content.appendChild(name);

      const brand = document.createElement("p");
      brand.className = "brand";
      brand.textContent = item.brand;
      content.appendChild(brand);

      // Footer (flag + abv)
      const footer = document.createElement("div");
      footer.className = "card-footer";

      const country = document.createElement("span");
      country.className = "fi fi-" + item.country.toLowerCase();
      footer.appendChild(country);

      const alcohol = document.createElement("span");
      alcohol.className = "abv";
      alcohol.textContent = item.abv;
      footer.appendChild(alcohol);

      card.appendChild(content);
      card.appendChild(footer);

      items.appendChild(card);
    });

    container.appendChild(category);
  });
}

function detectType(description) {
  description = description.toLowerCase();
  if (description.includes("blanche")) return "blanche";
  if (description.includes("blonde")) return "blonde";
  if (description.includes("ambrée")) return "ambrée";
  if (description.includes("brune")) return "brune";
  if (description.includes("ipa")) return "ipa";
  if (description.includes("stout")) return "stout";
  if (description.includes("cidre")) return "cidre";
  if (description.includes("lager")) return "lager";
  return "";
}

function detectMedal(description) {
  description = description.toLowerCase();
  if (description.includes("1")) return "🥇";
  if (description.includes("2")) return "🥈";
  if (description.includes("3")) return "🥉";
  return "";
}

fetchMenu();
