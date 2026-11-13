"use strict";
// Add the salon's exact Messenger URL here, e.g. https://m.me/PageUsername.
const MESSENGER_URL = "https://m.me/AlisaDalipasMagsanay";

if (/^https:\/\/(?:m\.me|www\.messenger\.com|messenger\.com)\/[^\s]+$/.test(MESSENGER_URL)) {
  const link = document.createElement("a");
  link.className = "btn";
  link.href = MESSENGER_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Message us on Messenger";
  document.getElementById("messenger-action").replaceChildren(link);
  document.getElementById("messenger-status").textContent = "Opens Messenger in a new tab. Appointments are arranged directly in chat.";
}

document.querySelectorAll(".card").forEach(card => {
  const link = document.createElement("a");
  link.className = "secondary";
  link.href = "#contact";
  link.textContent = "Ask about this service";
  card.append(link);
});

const dialog = document.getElementById("photo");
const fullPhoto = document.getElementById("fullPhoto");
document.querySelectorAll(".gallery img").forEach(img => {
  const button = document.createElement("button");
  button.type = "button";
  const placeholder = img.closest(".gallery-photo")?.querySelector(".gallery-placeholder");
  function photoUnavailable() { button.hidden = true; button.style.display = "none"; if (placeholder) placeholder.hidden = false; }
  img.addEventListener("error", photoUnavailable);
  img.addEventListener("load", () => { button.hidden = false; button.style.display = ""; if (placeholder) placeholder.hidden = true; });
  if (img.complete && !img.naturalWidth) photoUnavailable();
  button.setAttribute("aria-label", "Enlarge " + img.alt);
  img.loading = "lazy";
  img.replaceWith(button);
  button.append(img);
  button.addEventListener("click", () => {
    fullPhoto.src = img.src;
    fullPhoto.alt = img.alt;
    dialog.showModal();
  });
});
document.getElementById("closePhoto").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

// Christmas promotion: once per tab session, with a persistent reopen button.
const promo = document.getElementById("christmas-promo");
const promoImage = document.getElementById("promo-image");
const promoFallback = document.getElementById("promo-fallback");
function showPoster() {
  promoImage.hidden = false;
  promoFallback.hidden = true;
  // Keep the dialog's accessible title when the poster replaces the text.
  promo.setAttribute("aria-label", document.documentElement.lang === "en" ? "Gen-Magsanay Christmas rebond promotion" : "Promo sa Pasko sa Gen-Magsanay para sa rebond");
  promo.removeAttribute("aria-labelledby");
}
promoImage.addEventListener("load", showPoster);
if (promoImage.complete && promoImage.naturalWidth > 0) showPoster();
promoImage.addEventListener("error", () => { promoImage.hidden = true; promoFallback.hidden = false; });
function openPromo() {
  if (promo.open) return;
  promo.showModal();
  document.body.classList.add("promo-open");
  try { sessionStorage.setItem("gen-magsanay-christmas-seen", "1"); } catch (_) {}
}
function closePromo() { promo.close(); }
document.getElementById("open-promo").addEventListener("click", openPromo);
document.getElementById("close-promo").addEventListener("click", closePromo);
document.getElementById("promo-later").addEventListener("click", closePromo);
promo.addEventListener("close", () => document.body.classList.remove("promo-open"));
promo.addEventListener("click", event => {
  const bounds = promo.getBoundingClientRect();
  if (event.target === promo && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closePromo();
});
let promoSeen = false;
try { promoSeen = sessionStorage.getItem("gen-magsanay-christmas-seen") === "1"; } catch (_) {}
if (!promoSeen) openPromo();

const bisayaTranslations = {
  "Services": "Mga Serbisyo",
  "Gallery": "Mga Litrato",
  "About": "Bahin Kanamo",
  "Make the season shine": "Pasidlaka ang panahon sa Pasko",
  "View Christmas promo": "Tan-awa ang promo sa Pasko",
  "Beauty & Wellness": "Kaanyag ug Kahimsog",
  "Hair color, rebonding & treatments — your beauty, our passion": "Kolor, rebond ug pag-atiman sa buhok — ang imong kaanyag, among inspirasyon",
  "Message us to book": "Pagpa-iskedyul pinaagi sa mensahe",
  "Our Services": "Among mga Serbisyo",
  "Your beauty, our passion. Message us to find your perfect treatment.": "Ang imong kaanyag, among inspirasyon. Pagmensahe kanamo aron matabangan ka sa pagpili sa angay nga serbisyo.",
  "Hair Color Services": "Mga Serbisyo sa Pagkolor sa Buhok",
  "Rebond Packages": "Mga Rebond Package",
  "Salon Essentials": "Pangunang mga Serbisyo",
  "Hair Cut": "Pagpaputol sa Buhok",
  "Hair Treatment": "Pag-atiman sa Buhok",
  "Hair Rebonding": "Pagpa-rebond sa Buhok",
  "Hair Color": "Pagpakolor sa Buhok",
  "Our Salon Gallery": "Mga Litrato sa Among Salon",
  "Our space, our team, and a little everyday salon magic. Tap a photo to take a closer look.": "Tan-awa ang among salon ug mga kawani sa ilang pagtrabaho. Pislita ang litrato aron mapadako kini.",
  "Our Salon": "Among Salon",
  "Inside the Salon": "Sulod sa Salon",
  "Our Team at Work": "Among mga Kawani sa Trabaho",
  "Opening Hours": "Oras sa Pag-abli",
  "View on Facebook ↗": "Tan-awa sa Facebook ↗",
  "More photos": "Dugang mga litrato",
  "See more moments from our salon on Facebook.": "Tan-awa ang dugang mga litrato sa among salon sa Facebook.",
  "Explore our photos ↗": "Tan-awa ang among mga litrato ↗",
  "Visit us Monday–Sunday · 6:00 AM–8:00 PM": "Bisitaha kami Lunes–Domingo · 6:00 AM–8:00 PM",
  "About Gen-Magsanay": "Bahin sa Gen-Magsanay",
  "Welcome to Gen-Magsanay Salon & Spa. Explore our hair color, rebonding, and treatment packages, and let us help you plan your next salon visit. Your beauty, our passion.": "Maayong pag-abot sa Gen-Magsanay Salon & Spa. Tan-awa ang among mga package sa pagkolor, rebond ug pag-atiman sa buhok. Tabangan ka namo sa pagplano sa imong sunod nga pagbisita. Ang imong kaanyag, among inspirasyon.",
  "Let's plan your next visit": "Atong planohon ang imong sunod nga pagbisita",
  "Message us on Messenger for appointments, service questions, and availability. Tell us your preferred service, date, and time, and we will help arrange your visit.": "Pagmensahe kanamo sa Messenger para sa iskedyul, mga pangutana sa serbisyo, ug bakanteng oras. Isulti ang imong gustong serbisyo, petsa, ug oras aron matabangan ka namo.",
  "Message us on Messenger": "Pagmensahe kanamo sa Messenger",
  "Opens Messenger in a new tab. Appointments are arranged directly in chat.": "Moabli ang Messenger sa bag-ong tab. Didto sa chat nato saboton ang imong iskedyul.",
  "Ask about this service": "Pangutana bahin niini nga serbisyo",
  "Our Location": "Among Lokasyon",
  "Visit us at Magsanay Beauty Salon - Main Branch": "Bisitaha kami sa Magsanay Beauty Salon - Main Branch",
  "Open in Google Maps": "Ablihi sa Google Maps",
  "© 2026 Gen-Magsanay Salon & Spa. All rights reserved.": "© 2026 Gen-Magsanay Salon & Spa. Tanang katungod gigahin.",
  "A little Christmas magic": "Diyutayng kaanyag sa Pasko",
  "Healthy. Shiny.": "Himsog. Sinaw.",
  "Beautiful you.": "Matahom ka.",
  "Christmas Rebond Specials": "Espesyal nga Rebond sa Pasko",
  "Celebrate the season with our rebond and hair treatment packages.": "Saulogon nato ang Pasko uban sa among mga rebond ug hair treatment package.",
  "Ask about the Christmas promo": "Pangutana bahin sa promo sa Pasko",
  "Continue browsing": "Padayon sa pagtan-aw",
  "Close photo": "Sirad-i ang litrato",
  "Close Christmas promotion": "Sirad-i ang promo sa Pasko",
  "Gen-Magsanay Christmas rebond promotion": "Promo sa Pasko sa Gen-Magsanay para sa rebond",
  "More salon photos on Facebook (opens in a new tab)": "Dugang mga litrato sa salon sa Facebook (moabli sa bag-ong tab)",
  "Magsanay Beauty Salon gold logo": "Bulawanong logo sa Magsanay Beauty Salon",
  "Inside Magsanay Beauty Salon with clients and stylists": "Sulod sa Magsanay Beauty Salon uban sa mga kliyente ug mga stylist",
  "Magsanay salon team working on clients hair": "Mga kawani sa Magsanay nga nag-atiman sa buhok sa mga kliyente",
  "Magsanay Beauty Salon opening hours: 6 AM to 8 PM, Monday to Sunday": "Oras sa Magsanay Beauty Salon: alas 6 sa buntag hangtod alas 8 sa gabii, Lunes hangtod Domingo",
  "Magsanay Beauty Salon - Main Branch location": "Lokasyon sa Magsanay Beauty Salon - Main Branch",
  "Gen-Magsanay Salon and Spa Christmas rebond promotion poster": "Poster sa promo sa Pasko para sa rebond sa Gen-Magsanay Salon and Spa",
  "Hair Color + Regular Treatment": "Kolor sa Buhok + Regular nga Hair Treatment",
  "Hair Color + Special Treatment": "Kolor sa Buhok + Espesyal nga Hair Treatment",
  "Hair Color + Pure Brazilian Treatment": "Kolor sa Buhok + Pure Brazilian Treatment",
  "Hair Color + Protein Straight Bond": "Kolor sa Buhok + Protein Straight Bond",
  "Balayage + Pure Brazilian Treatment": "Balayage + Pure Brazilian Treatment",
  "Balayage + Protein Straight Bond": "Balayage + Protein Straight Bond",
  "Full Bleach Color + Pure Brazilian Treatment": "Full Bleach nga Kolor + Pure Brazilian Treatment",
  "Full Bleach Color + Protein Straight Bond": "Full Bleach nga Kolor + Protein Straight Bond",
  "Regular Rebond + Pure Brazilian Treatment": "Regular Rebond + Pure Brazilian Treatment",
  "Organic Rebond + Color + Pure Brazilian Treatment": "Organic Rebond + Kolor sa Buhok + Pure Brazilian Treatment",
  "Wella Rebond + Color + Pure Brazilian Treatment + Hair Cellophane": "Wella Rebond + Kolor sa Buhok + Pure Brazilian Treatment + Hair Cellophane",
  "L’Oréal Rebond + Color + Pure Brazilian Treatment + Hair Cellophane": "L’Oréal Rebond + Kolor sa Buhok + Pure Brazilian Treatment + Hair Cellophane",
  "Matrix Rebond + Color + Pure Brazilian Treatment + Hair Cellophane": "Matrix Rebond + Kolor sa Buhok + Pure Brazilian Treatment + Hair Cellophane",
  "Extenso Rebond + Color + Pure Brazilian Treatment + Hair Cellophane": "Extenso Rebond + Kolor sa Buhok + Pure Brazilian Treatment + Hair Cellophane",
  "Balayage Rebond + Pure Brazilian Treatment + Hair Cellophane": "Balayage Rebond + Pure Brazilian Treatment + Hair Cellophane"
};

Object.assign(bisayaTranslations, {
  "Hair color, rebonding, balayage, Brazilian treatments and haircuts.": "Hair color, rebonding, balayage, Brazilian treatment ug haircut.",
  "Monday?Sunday, 6:00 AM?8:00 PM (Philippine time)": "Lunes?Domingo, 6:00 AM?8:00 PM (oras sa Pilipinas)"
});

const englishTranslations = Object.fromEntries(Object.entries(bisayaTranslations).map(([en, ceb]) => [ceb, en]));
const languageNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    if (node.parentElement.closest("script, style, .language-switch")) return NodeFilter.FILTER_REJECT;
    return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }
});
while (walker.nextNode()) {
  const node = walker.currentNode;
  const original = node.textContent;
  const trimmed = original.trim();
  const english = englishTranslations[trimmed] || trimmed;
  if (bisayaTranslations[english]) languageNodes.push({node, original, trimmed, english});
}
const languageAttributes = [];
document.querySelectorAll("[alt], [title], [aria-label]").forEach(element => {
  for (const attribute of ["alt", "title", "aria-label"]) {
    const original = element.getAttribute(attribute);
    if (!original) continue;
    const english = englishTranslations[original] || original;
    if (bisayaTranslations[english]) languageAttributes.push({element, attribute, english});
  }
});
let currentLanguage = "ceb";
function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "ceb";
  document.documentElement.lang = currentLanguage;
  for (const item of languageNodes) {
    const value = currentLanguage === "en" ? item.english : bisayaTranslations[item.english];
    item.node.textContent = item.original.replace(item.trimmed, value);
  }
  for (const item of languageAttributes) item.element.setAttribute(item.attribute, currentLanguage === "en" ? item.english : bisayaTranslations[item.english]);
  document.querySelectorAll(".gallery-photo button").forEach(button => {
    const image = button.querySelector("img");
    if (image) button.setAttribute("aria-label", (currentLanguage === "en" ? "Enlarge " : "Padak-a ang litrato: ") + image.alt);
  });
  if (fullPhoto.src) {
    const source = [...document.querySelectorAll(".gallery img")].find(image => image.src === fullPhoto.src);
    if (source) fullPhoto.alt = source.alt;
  }
  document.querySelectorAll("[data-language]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage)));
  try { localStorage.setItem("salon-language", currentLanguage); } catch (_) {}
}
document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
let savedLanguage = "ceb";
try { savedLanguage = localStorage.getItem("salon-language") || "ceb"; } catch (_) {}
setLanguage(savedLanguage);
