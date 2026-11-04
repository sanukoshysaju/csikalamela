"use strict";

// Pastorate master list (21 churches), transcribed from the supplied image.
// These IDs must remain stable because published results reference them.
const PASTORATES = [
  ["p01", "HOLY IMMANUEL CHURCH, ELANTHOOR"],
  ["p02", "ST. JOHN’S CHURCH, KAATTOOR"],
  ["p03", "ST. MARY’S CHURCH, KUZHIKALA"],
  ["p04", "ST. PAUL’S CHURCH, PRAKANAM"],
  ["p05", "ST. THOMAS CHURCH, PUNNACKAD"],
  ["p06", "ST. JOSEPH CHURCH, KARIMPEKALLU"],
  ["p07", "ST. PAUL’S CHURCH, NALLANIKUNNU"],
  ["p08", "ST. PAUL’S CHURCH, VETTIPURAM"],
  ["p09", "ST. STEPHEN’S CHURCH, OMALLOOR"],
  ["p10", "ST. PAUL’S CHURCH, PARAYANALI"],
  ["p11", "HOLY TRINITY CHURCH, MALLASSERY"],
  ["p12", "ST. JOHN’S CHURCH, ATTACHACKAL"],
  ["p13", "ST. THOMAS CHURCH, KALLELY"],
  ["p14", "ST. JOHN’S CHURCH, THAVALAPARA"],
  ["p15", "ST. THOMAS CHURCH, KALLELY THOTTAM"],
  ["p16", "ALL SAINTS’ CHURCH, PATHANAMTHITTATA"],
  ["p17", "ST. PAUL’S CHURCH, NEDUMCHERY"],
  ["p18", "ST. THOMAS CHURCH, CHENNEERKARA"],
  ["p19", "ST. JOHN’S CHURCH, ERATHUMPAMON"],
  ["p20", "ST. MATHIAS’ CHURCH, KIDANGANNOOR"],
  ["p21", "ST. ANDREW’S CHURCH, NARANGANAM"]
].map(([id, name]) => ({ id, name }));

const MASTER_EVENTS = [
  {"id": "e01", "name": "Solo Instrument — Junior (Boys) [Set A]", "category": "Music", "type": "individual", "awardGender": "Boy"},
  {"id": "e02", "name": "Solo Instrument — Junior (Girls) [Set A]", "category": "Music", "type": "individual", "awardGender": "Girl"},
  {"id": "e03", "name": "Solo Instrument — Senior (Boys) [Set A]", "category": "Music", "type": "individual", "awardGender": "Boy"},
  {"id": "e04", "name": "Solo Instrument — Senior (Girls) [Set A]", "category": "Music", "type": "individual", "awardGender": "Girl"},
  {"id": "e05", "name": "Solo Instrument — Junior (Boys) [Set B]", "category": "Music", "type": "individual", "awardGender": "Boy"},
  {"id": "e06", "name": "Solo Instrument — Junior (Girls) [Set B]", "category": "Music", "type": "individual", "awardGender": "Girl"},
  {"id": "e07", "name": "Solo Instrument — Senior (Boys) [Set B]", "category": "Music", "type": "individual", "awardGender": "Boy"},
  {"id": "e08", "name": "Solo Instrument — Senior (Girls) [Set B]", "category": "Music", "type": "individual", "awardGender": "Girl"},
  {"id": "e09", "name": "Elocution — Malayalam", "category": "Music", "type": "individual", "awardGender": null},
  {"id": "e10", "name": "Elocution — English", "category": "Music", "type": "individual", "awardGender": null},
  {"id": "e11", "name": "Classical Music", "category": "Music", "type": "individual", "awardGender": null},
  {"id": "e12", "name": "Organ Recital", "category": "Music", "type": "individual", "awardGender": null},
  {"id": "e13", "name": "Light Music — Male", "category": "Music", "type": "individual", "awardGender": "Boy"},
  {"id": "e14", "name": "Light Music — Female", "category": "Music", "type": "individual", "awardGender": "Girl"},
  {"id": "e15", "name": "Group Song", "category": "Music", "type": "group", "awardGender": null},
  {"id": "e16", "name": "Quartet", "category": "Music", "type": "group", "awardGender": null},
  {"id": "e17", "name": "Pencil Drawing", "category": "Fine Arts", "type": "individual", "awardGender": null},
  {"id": "e18", "name": "Water Colour Painting", "category": "Fine Arts", "type": "individual", "awardGender": null},
  {"id": "e19", "name": "Cartoon", "category": "Fine Arts", "type": "individual", "awardGender": null},
  {"id": "e20", "name": "Fancy Dress", "category": "Literary Competitions", "type": "individual", "awardGender": null},
  {"id": "e21", "name": "Mono Act", "category": "Literary Competitions", "type": "individual", "awardGender": null},
  {"id": "e22", "name": "Mimicry", "category": "Literary Competitions", "type": "individual", "awardGender": null},
  {"id": "e23", "name": "Tabla", "category": "Literary Competitions", "type": "individual", "awardGender": null},
  {"id": "e24", "name": "Mime", "category": "Literary Competitions", "type": "group", "awardGender": null},
  {"id": "e25", "name": "Poetry Recitation — English", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e26", "name": "Poetry Recitation — Malayalam", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e27", "name": "Storytelling — English", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e28", "name": "Storytelling — Malayalam", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e29", "name": "Impromptu Speech — Junior (Malayalam)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e30", "name": "Impromptu Speech — Senior (English)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e31", "name": "Speech — Junior (Malayalam)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e32", "name": "Speech — Senior (Malayalam)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e33", "name": "Speech — Junior (English)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null},
  {"id": "e34", "name": "Speech — Senior (English)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null}
];
const EVENT_IDS = new Set(MASTER_EVENTS.map(e => e.id));
const PASTORATE_IDS = new Set(PASTORATES.map(p => p.id));
const JSON_URL = "data/results.json";
const DRAFT_STORAGE_KEY = "elanthoor_kalamela_editor_draft_v3";
// Local convenience PIN, NOT a security mechanism. No public write API exists.
const LOCAL_DEMO_PIN = "local-demo";
const IS_LOCAL_EDITOR = ["localhost", "127.0.0.1", "[::1]"]
  .includes(window.location.hostname) || window.location.protocol === "file:";

let data = emptyData();
let publishedData = emptyData();
let adminUnlocked = false;
let currentPage = "home";
let publishedLoaded = false;

const el = id => document.getElementById(id);
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));
const pointLabel = value => Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
const ordinal = n => ({ 1: "1st", 2: "2nd", 3: "3rd" })[n];
const pastorateName = id => PASTORATES.find(p => p.id === id)?.name ?? "Unknown pastorate";
const eventById = id => MASTER_EVENTS.find(event => event.id === id);

function emptyData() {
  return { schemaVersion: 3, updatedAt: null, results: {} };
}

// The fixed master list lives in script.js, not in results.json.
// Version 2 files may be imported only when recorded event names match fixed items.
function validateDocument(document) {
  if (!document || typeof document !== "object") throw new Error("Invalid JSON document.");
  if (document.schemaVersion === 2) document = migrateVersion2(document);
  if (document.schemaVersion !== 3 ||
    !document.results || typeof document.results !== "object" ||
    Array.isArray(document.results)) {
    throw new Error("Expected schemaVersion 3 with a results object.");
  }
  const clean = emptyData();
  clean.updatedAt = typeof document.updatedAt === "string" ? document.updatedAt : null;
  for (const [eventId, places] of Object.entries(document.results)) {
    if (!EVENT_IDS.has(eventId)) throw new Error("Unknown event ID: " + eventId);
    if (!places || typeof places !== "object" || Array.isArray(places)) {
      throw new Error("Invalid placements for " + eventId);
    }
    const competition = eventById(eventId);
    const checked = {};
    for (const [position, winner] of Object.entries(places)) {
      if (!["1", "2", "3"].includes(position) || !winner || typeof winner !== "object") {
        throw new Error("Only 1st, 2nd and 3rd are supported.");
      }
      if (!PASTORATE_IDS.has(winner.pastorateId) ||
        typeof winner.points !== "number" || !Number.isFinite(winner.points) ||
        winner.points < 0 || Math.abs(Math.round(winner.points * 100) - winner.points * 100) > 1e-7) {
        throw new Error("Invalid pastorate or points for " + competition.name + " position " + position);
      }
      if (competition.type === "individual") {
        const name = typeof winner.winner === "string" ? winner.winner.trim() : "";
        if (!name || name.length > 120) {
          throw new Error("Participant name required for " + competition.name + " position " + position);
        }
        checked[position] = { pastorateId: winner.pastorateId, winner: name, points: winner.points };
      } else {
        checked[position] = { pastorateId: winner.pastorateId, points: winner.points };
      }
    }
    if (Object.keys(checked).length) clean.results[eventId] = checked;
  }
  return clean;
}

function migrateVersion2(source) {
  if (!Array.isArray(source.events) || !source.results || typeof source.results !== "object") {
    throw new Error("Invalid old results JSON file.");
  }
  const converted = emptyData();
  converted.updatedAt = source.updatedAt || null;
  for (const entry of source.events) {
    const oldPlaces = source.results[entry.id];
    if (!oldPlaces || !Object.keys(oldPlaces).length) continue;
    const match = MASTER_EVENTS.find(e => e.name.toLowerCase() === String(entry.name).toLowerCase() && e.type === entry.type);
    if (!match) {
      throw new Error("Old result for '" + entry.name + "' cannot be matched to the fixed list. Back up the old JSON and adjust the event name in script.js if necessary.");
    }
    if (converted.results[match.id]) throw new Error("Duplicate old results for " + match.name);
    converted.results[match.id] = {};
    for (const [position, winner] of Object.entries(oldPlaces)) {
      const row = { pastorateId: winner.pastorateId, points: winner.points };
      if (match.type === "individual") row.winner = winner.winner;
      converted.results[match.id][position] = row;
    }
  }
  return converted;
}

async function fetchPublished() {
  const url = JSON_URL + "?fresh=" + Date.now();
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load " + JSON_URL + " (HTTP " + response.status + ").");
  return validateDocument(await response.json());
}

function message(id, content, isError = false) {
  const target = el(id);
  target.textContent = content;
  target.style.color = isError ? "#b42318" : "#17663b";
}

function setStatus(text, kind = "normal") {
  el("statusBar").textContent = text;
  el("statusBar").dataset.kind = kind;
}

function saveDraft() {
  if (!IS_LOCAL_EDITOR || !adminUnlocked) return;
  data.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
    setStatus("Local draft saved • Not published to GitHub Pages", "draft");
  } catch (error) {
    setStatus("Unable to save local draft. Export JSON now.", "error");
    console.error(error);
  }
  renderAll();
}

function showPage(page, clickedButton) {
  currentPage = page;
  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle("hidden", section.id !== page);
  });
  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });
  if (page === "admin") updateAdminVisibility();
}

function updateAdminVisibility() {
  el("adminPublicNotice").classList.toggle("hidden", IS_LOCAL_EDITOR);
  el("adminLogin").classList.toggle("hidden", !IS_LOCAL_EDITOR || adminUnlocked);
  el("adminWorkspace").classList.toggle("hidden", !IS_LOCAL_EDITOR || !adminUnlocked);
}

function loginAdmin() {
  if (!IS_LOCAL_EDITOR) return;
  if (el("adminPassword").value !== LOCAL_DEMO_PIN) {
    message("loginMessage", "Incorrect local demo PIN.", true);
    return;
  }
  adminUnlocked = true;
  el("adminPassword").value = "";
  message("loginMessage", "");
  updateAdminVisibility();
  renderAll();
}

function logoutAdmin() {
  adminUnlocked = false;
  updateAdminVisibility();
}

function requireEditor() {
  if (IS_LOCAL_EDITOR && adminUnlocked) return true;
  alert("Editing is available only in the local Admin Panel.");
  return false;
}

function renderPastorates() {
  el("pastorateList").innerHTML = PASTORATES.map((p, index) =>
    `<div><strong>${index + 1}.</strong> ${escapeHTML(p.name)}</div>`).join("");
}

function renderEventManager() {
  el("eventRows").innerHTML = MASTER_EVENTS.map(e => `<tr>
    <td>${escapeHTML(e.category)}</td>
    <td>${escapeHTML(e.name)}</td>
    <td>${e.type === "group" ? "Group" : "Individual"}</td>
  </tr>`).join("");
}

function fillSelect(select, options, placeholder, preserveValue) {
  const previousValue = preserveValue ? select.value : "";
  select.replaceChildren();
  select.add(new Option(placeholder, ""));
  options.forEach(option => select.add(new Option(option.label, option.value)));
  if (previousValue && options.some(option => option.value === previousValue)) {
    select.value = previousValue;
  }
}

function renderDropdowns() {
  fillSelect(el("scorePastorate"), PASTORATES.map(p => ({ value: p.id, label: p.name })), "Select a pastorate", true);
  fillSelect(el("resultEvent"), MASTER_EVENTS.map(e => ({ value: e.id, label: e.name })), "Select a competition", true);
}

function showEventForm() {
  const item = eventById(el("resultEvent").value);
  const container = el("podiumRows");
  container.replaceChildren();
  el("resultForm").classList.toggle("hidden", !item);
  if (!item) {
    el("resultEventHelp").textContent = "Select a competition from the fixed event list.";
    return;
  }
  el("resultEventHelp").textContent = item.type === "group"
    ? "Group event: choose the pastorate and enter points for each place. The score counts once for that pastorate."
    : "Individual event: choose the pastorate, type the participant's name, and enter points for each place.";
  for (let place = 1; place <= 3; place++) {
    const winner = (data.results[item.id] || {})[place] || null;
    const wrapper = document.createElement("fieldset");
    wrapper.className = "podium-row";
    const legend = document.createElement("legend");
    legend.textContent = ordinal(place) + " Place";
    wrapper.append(legend);
    const row = document.createElement("div");
    row.className = "podium-fields";
    const pWrap = fieldWrap("Pastorate", "podiumPastorate" + place);
    const pastorate = document.createElement("select");
    pastorate.id = "podiumPastorate" + place;
    fillSelect(pastorate, PASTORATES.map(p => ({ value: p.id, label: p.name })), "Select pastorate", false);
    pastorate.value = winner?.pastorateId || "";
    pWrap.append(pastorate);
    row.append(pWrap);
    if (item.type === "individual") {
      const wWrap = fieldWrap("Participant name", "podiumWinner" + place);
      const name = document.createElement("input");
      name.id = "podiumWinner" + place;
      name.type = "text";
      name.maxLength = 120;
      name.placeholder = "Enter participant name";
      name.value = winner?.winner || "";
      wWrap.append(name);
      row.append(wWrap);
    }
    const pointsWrap = fieldWrap("Points", "podiumPoints" + place);
    const points = document.createElement("input");
    points.type = "number";
    points.id = "podiumPoints" + place;
    points.min = "0";
    points.step = "0.01";
    points.placeholder = "Enter points";
    points.value = winner ? String(winner.points) : "";
    pointsWrap.append(points);
    row.append(pointsWrap);
    wrapper.append(row);
    const hint = document.createElement("small");
    hint.textContent = "Leave all fields empty if this position has not been announced.";
    wrapper.append(hint);
    container.append(wrapper);
  }
}

function fieldWrap(labelText, inputId) {
  const block = document.createElement("div");
  const label = document.createElement("label");
  label.htmlFor = inputId;
  label.textContent = labelText;
  block.append(label);
  return block;
}

function saveResultsForEvent(event) {
  event.preventDefault();
  if (!requireEditor()) return;
  const item = eventById(el("resultEvent").value);
  if (!item) return message("resultMessage", "Choose an event.", true);
  const entries = {};
  for (let place = 1; place <= 3; place++) {
    const pastorateId = el("podiumPastorate" + place).value;
    const winner = item.type === "individual" ? el("podiumWinner" + place).value.trim() : "";
    const pointsText = el("podiumPoints" + place).value.trim();
    const anyField = pastorateId || winner || pointsText;
    if (!anyField) continue;
    const points = Number(pointsText);
    if (!PASTORATE_IDS.has(pastorateId) ||
      (item.type === "individual" && !winner) ||
      !pointsText || !Number.isFinite(points) || points < 0 ||
      Math.abs(Math.round(points * 100) - points * 100) > 1e-7) {
      return message("resultMessage", ordinal(place) + ": select a pastorate, enter " +
        (item.type === "individual" ? "a participant name, " : "") + "and valid points.", true);
    }
    entries[place] = item.type === "individual"
      ? { pastorateId, winner, points }
      : { pastorateId, points };
  }
  if (!Object.keys(entries).length) {
    return message("resultMessage", "Enter at least one winner or use Clear This Event's Results.", true);
  }
  data.results[item.id] = entries;
  message("resultMessage", "Saved " + Object.keys(entries).length + " position(s) for " + item.name + ".");
  saveDraft();
  showEventForm();
}

function clearResultsForEvent(eventId = el("resultEvent").value) {
  if (!requireEditor()) return;
  const item = eventById(eventId);
  if (!item) return;
  if (!confirm("Remove all recorded positions for " + item.name + "?")) return;
  delete data.results[item.id];
  saveDraft();
  showEventForm();
  message("resultMessage", "Results cleared for " + item.name + ".");
}

function renderRecordedEvents() {
  const tbody = el("recordedEventRows");
  if (!MASTER_EVENTS.length) {
    tbody.innerHTML = '<tr><td colspan="4">No competition events yet.</td></tr>';
    return;
  }
  tbody.innerHTML = MASTER_EVENTS.map(event => {
    const positions = Object.keys(data.results[event.id] || {}).length;
    return `<tr>
      <td>${escapeHTML(event.name)}</td><td>${event.type === "group" ? "Group" : "Individual"}</td>
      <td>${positions} of 3</td><td class="action-cell">
      <button type="button" class="small-action edit-btn" data-result-action="edit" data-id="${event.id}">Edit</button>
      <button type="button" class="small-action danger-btn" data-result-action="clear" data-id="${event.id}">Clear</button>
      </td></tr>`;
  }).join("");
}

function getPastorateTotal(pastorateId) {
  let sum = 0;
  for (const placements of Object.values(data.results)) {
    for (const winner of Object.values(placements)) {
      if (winner.pastorateId === pastorateId) sum += winner.points;
    }
  }
  return sum;
}

function getPastoratePlacements(pastorateId) {
  const list = [];
  for (const event of MASTER_EVENTS) {
    for (const [place, winner] of Object.entries(data.results[event.id] || {})) {
      if (winner.pastorateId === pastorateId) {
        list.push({ event, place: Number(place), ...winner });
      }
    }
  }
  return list;
}

function renderScoreboard() {
  const pastorateId = el("scorePastorate").value;
  el("selectedPastorateName").textContent = pastorateId ? pastorateName(pastorateId) : "Select a pastorate";
  el("selectedPastoratePoints").textContent = pointLabel(pastorateId ? getPastorateTotal(pastorateId) : 0);
  const tbody = el("pastorateResultsRows");
  const list = getPastoratePlacements(pastorateId);
  tbody.innerHTML = list.length ? list.map(w => `
    <tr><td>${escapeHTML(w.event.name)}</td><td>${ordinal(w.place)}</td>
    <td>${escapeHTML(w.event.type === "group" ? "Group entry" : w.winner)}</td><td>${pointLabel(w.points)}</td></tr>`).join("") :
    '<tr><td colspan="4">No recorded winners for this pastorate.</td></tr>';
}

function matrixRows() {
  return PASTORATES.map(p => {
    const cells = MASTER_EVENTS.map(event => {
      const values = Object.entries(data.results[event.id] || {})
        .filter(([, w]) => w.pastorateId === p.id)
        .map(([place, w]) => `${ordinal(Number(place))}: ${pointLabel(w.points)}`);
      return values.length ? values.join("; ") : "—";
    });
    return { pastorate: p.name, cells, total: getPastorateTotal(p.id) };
  });
}

function renderMatrix() {
  const table = el("matrixTable");
  const head = table.querySelector("thead");
  const body = table.querySelector("tbody");
  head.innerHTML = `<tr><th>Pastorate</th>${MASTER_EVENTS.map(e => `<th title="${escapeHTML(e.name)}">${escapeHTML(e.name)}</th>`).join("")}<th>Total</th></tr>`;
  body.innerHTML = matrixRows().map(row => `<tr><th>${escapeHTML(row.pastorate)}</th>${row.cells.map(cell => `<td>${escapeHTML(cell)}</td>`).join("")}<td class="total-cell">${pointLabel(row.total)}</td></tr>`).join("");
}

function leaderboardPositions() {
  const sorted = PASTORATES.map(p => ({ ...p, points: getPastorateTotal(p.id) }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  let lastScore = null;
  let lastRank = 0;
  return sorted.map((p, index) => {
    const rank = p.points <= 0 ? "—" :
      (p.points === lastScore ? lastRank : index + 1);
    if (p.points > 0) {
      lastScore = p.points;
      lastRank = rank;
    }
    return { ...p, rank };
  });
}

function renderLeaderboard() {
  el("leaderboardRows").innerHTML = leaderboardPositions().map(p => `
    <tr><td>${p.rank}</td><td>${escapeHTML(p.name)}</td>
    <td><strong>${pointLabel(p.points)}</strong></td></tr>`).join("");
  renderAwards();
}

function renderAwards() {
  const totals = new Map();
  // Gender is inferred only for event names that explicitly identify Boys/Girls/Male/Female.
  // Group scores and unclassified individual events are not assigned to individual titles.
  for (const event of MASTER_EVENTS) {
    if (event.type !== "individual" || !event.awardGender) continue;
    for (const winner of Object.values(data.results[event.id] || {})) {
      const normalized = winner.winner.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-IN");
      const key = [winner.pastorateId, event.awardGender, normalized].join("|");
      const current = totals.get(key) || {
        name: winner.winner, gender: event.awardGender,
        pastorateId: winner.pastorateId, points: 0
      };
      current.points += winner.points;
      totals.set(key, current);
    }
  }
  for (const [gender, nameId, detailId] of [
    ["Girl", "kalaThilakamName", "kalaThilakamDetails"],
    ["Boy", "kalaPrathibhaName", "kalaPrathibhaDetails"]
  ]) {
    const eligible = [...totals.values()].filter(p => p.gender === gender && p.points > 0);
    const highest = Math.max(0, ...eligible.map(p => p.points));
    const winners = eligible.filter(p => p.points === highest);
    el(nameId).textContent = winners.length ? winners.map(p => p.name).join(" / ") : "Not decided yet";
    el(detailId).textContent = winners.length
      ? winners.map(p => `${pastorateName(p.pastorateId)} — ${pointLabel(p.points)} points`).join(" • ")
      : "No gender-categorised individual scores yet";
  }
}

function renderPublicEnhancements() {
  // These counters reflect the actually published or locally drafted document.
  const populatedEvents = Object.values(data.results).filter(places => Object.keys(places).length > 0).length;
  const placedWinners = Object.values(data.results).reduce((n, places) => n + Object.keys(places).length, 0);
  el("homePastorates").textContent = PASTORATES.length;
  el("homeEvents").textContent = MASTER_EVENTS.length;
  el("homeCompleted").textContent = populatedEvents;
  el("homePlaces").textContent = placedWinners;
  const leaders = leaderboardPositions().filter(p => p.points > 0).slice(0, 3);
  const podium = el("topPodium");
  if (leaders.length === 0) {
    podium.innerHTML = '<div class="empty-podium"><span>✳</span><strong>A little anticipation...</strong><p>Our first results will appear here once published.</p></div>';
  } else {
    const labels = { 1: "First", 2: "Second", 3: "Third" };
    podium.innerHTML = leaders.map((p, i) => `<article class="podium-card podium-${i + 1}">
      <div class="podium-top"><span>${i === 0 ? "✦" : "✧"}</span><span>${labels[i + 1]} in standings</span></div>
      <div class="podium-rank">${String(p.rank).padStart(2, "0")}</div>
      <h4>${escapeHTML(p.name)}</h4><div class="podium-points"><strong>${pointLabel(p.points)}</strong><span>points</span></div>
    </article>`).join("");
  }
}

function renderAll() {
  renderDropdowns();
  renderPastorates();
  renderEventManager();
  renderRecordedEvents();
  showEventForm();
  renderScoreboard();
  renderMatrix();
  renderLeaderboard();
  renderPublicEnhancements();
}

function csvCell(value) {
  return '"' + String(value).replace(/"/g, '""') + '"';
}

function downloadFile(name, contents, type) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadMatrixCsv() {
  const header = ["Pastorate", ...MASTER_EVENTS.map(e => e.name), "Total Points"];
  const rows = [header, ...matrixRows().map(row => [row.pastorate, ...row.cells, row.total])];
  const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");
  downloadFile("kalamela-results-matrix.csv", csv, "text/csv;charset=utf-8");
}

function exportJson() {
  if (!requireEditor()) return;
  const updated = { ...data, updatedAt: new Date().toISOString() };
  const validated = validateDocument(updated);
  downloadFile("results.json", JSON.stringify(validated, null, 2) + "\n", "application/json");
  message("publishMessage", "Downloaded results.json. Replace data/results.json in your repository, commit and push.");
}

async function importJson(file) {
  if (!requireEditor() || !file) return;
  try {
    const imported = validateDocument(JSON.parse(await file.text()));
    if (!confirm("Replace this browser's draft with the imported JSON?")) return;
    data = imported;
    saveDraft();
    message("publishMessage", "JSON imported into local draft. Export again when ready to publish.");
  } catch (error) { message("publishMessage", "Import failed: " + error.message, true); }
}

async function resetDraft() {
  if (!requireEditor()) return;
  if (!confirm("Discard local edits and reload the published data/results.json?")) return;
  try {
    const published = await fetchPublished();
    publishedData = published;
    data = structuredClone(published);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    renderAll();
    setStatus("Local draft discarded • Loaded published JSON");
    message("publishMessage", "Loaded data/results.json.");
  } catch (error) { message("publishMessage", "Cannot restore published JSON: " + error.message, true); }
}

function attachHandlers() {
  document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page, button));
  });
  el("scorePastorate").addEventListener("change", renderScoreboard);
  el("downloadMatrix").addEventListener("click", downloadMatrixCsv);
  el("loginButton").addEventListener("click", loginAdmin);
  el("adminPassword").addEventListener("keydown", event => {
    if (event.key === "Enter") loginAdmin();
  });
  el("logoutButton").addEventListener("click", logoutAdmin);
  el("resultEvent").addEventListener("change", () => {
    showEventForm();
    message("resultMessage", "");
  });
  el("resultForm").addEventListener("submit", saveResultsForEvent);
  el("clearEventResults").addEventListener("click", () => clearResultsForEvent());
  el("exportJsonButton").addEventListener("click", exportJson);
  el("importJsonInput").addEventListener("change", async event => {
    await importJson(event.target.files?.[0]);
    event.target.value = "";
  });
  el("resetDraftButton").addEventListener("click", resetDraft);
  el("recordedEventRows").addEventListener("click", event => {
    const button = event.target.closest("button[data-result-action]");
    if (!button) return;
    const id = button.dataset.id;
    if (button.dataset.resultAction === "clear") clearResultsForEvent(id);
    if (button.dataset.resultAction === "edit") {
      el("resultEvent").value = id;
      showEventForm();
      el("resultEvent").scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}

async function initialise() {
  attachHandlers();
  updateAdminVisibility();
  renderAll();
  showPage("home");
  let loadError = null;
  try {
    publishedData = await fetchPublished();
    publishedLoaded = true;
    data = structuredClone(publishedData);
  } catch (error) {
    loadError = error;
    console.error(error);
  }
  if (IS_LOCAL_EDITOR) {
    try {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draft) {
        data = validateDocument(JSON.parse(draft));
        setStatus("Local draft loaded • Changes not yet published", "draft");
      } else if (publishedLoaded) {
        setStatus("Published JSON loaded • Editor available on localhost");
      } else {
        setStatus("Could not load data/results.json. Run via Live Server, not file://. " + loadError?.message, "error");
      }
    } catch (error) {
      setStatus("Local draft is invalid. Published results loaded where available.", "error");
      console.error(error);
    }
  } else if (publishedLoaded) {
    setStatus("Published results" + (data.updatedAt ? " • Updated " + new Date(data.updatedAt).toLocaleString("en-IN") : " • Awaiting competition results"));
    // GitHub Pages is static; polling is read-only and can show a new JSON
    // once the organiser's GitHub Pages deployment has completed.
    setInterval(async () => {
      try {
        const next = await fetchPublished();
        if (JSON.stringify(next) !== JSON.stringify(data)) {
          data = next;
          renderAll();
          setStatus("Published results refreshed" + (data.updatedAt ? " • " + new Date(data.updatedAt).toLocaleString("en-IN") : ""));
        }
      } catch (error) { console.warn("Refresh failed:", error); }
    }, 60000);
  } else {
    setStatus("Results could not be loaded. Please retry when the published JSON is available.", "error");
  }
  renderAll();
}

document.addEventListener("DOMContentLoaded", initialise);
