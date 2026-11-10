"use strict";

// Pastorate master list (21 churches), transcribed from the supplied image.
// These IDs must remain stable because published results reference them.
const CHURCH_ENTRIES = [
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
];

// Each row in the supplied table names a pastorate family.
// The first church is the main pastorate; following churches are outstations.
// Existing p01–p21 IDs are intentionally unchanged for results.json compatibility.
const CHURCH_FAMILIES = [
  { pastorate: "ELANTHOOR", main: "p01", outstations: ["p02"] },
  { pastorate: "KUZHIKALA", main: "p03", outstations: ["p04"] },
  { pastorate: "PUNNACKADU", main: "p05", outstations: ["p06"] },
  { pastorate: "NALLANIKUNNU", main: "p07", outstations: ["p08"] },
  { pastorate: "OMALLOOR", main: "p09", outstations: ["p10"] },
  { pastorate: "MALLASSERY", main: "p11", outstations: ["p12"] },
  { pastorate: "KALLELY", main: "p13", outstations: ["p14", "p15"] },
  { pastorate: "PATHANAMTHITTA", main: "p16", outstations: ["p17"] },
  { pastorate: "CHENNEERKKARA", main: "p18", outstations: ["p19"] },
  { pastorate: "KIDANGANNOOR", main: "p20", outstations: ["p21"] }
];

const PASTORATES = CHURCH_ENTRIES.map(([id, name]) => {
  const family = CHURCH_FAMILIES.find(item => item.main === id || item.outstations.includes(id));
  if (!family) throw new Error("Church lacks a classification: " + id);
  return {
    id,
    name,
    category: family.main === id ? "pastorate" : "outstation",
    parentPastorate: family.pastorate,
    mainId: family.main
  };
});

const MASTER_EVENTS = [
  {"id": "e01", "name": "Solo Instrument — Junior (Boys) [Set A]", "category": "Music", "type": "individual", "awardGender": "Boy", "tag": "stage"},
  {"id": "e02", "name": "Solo Instrument — Junior (Girls) [Set A]", "category": "Music", "type": "individual", "awardGender": "Girl", "tag": "stage"},
  {"id": "e03", "name": "Solo Instrument — Senior (Boys) [Set A]", "category": "Music", "type": "individual", "awardGender": "Boy", "tag": "stage"},
  {"id": "e04", "name": "Solo Instrument — Senior (Girls) [Set A]", "category": "Music", "type": "individual", "awardGender": "Girl", "tag": "stage"},
  {"id": "e05", "name": "Solo Instrument — Junior (Boys) [Set B]", "category": "Music", "type": "individual", "awardGender": "Boy", "tag": "stage"},
  {"id": "e06", "name": "Solo Instrument — Junior (Girls) [Set B]", "category": "Music", "type": "individual", "awardGender": "Girl", "tag": "stage"},
  {"id": "e07", "name": "Solo Instrument — Senior (Boys) [Set B]", "category": "Music", "type": "individual", "awardGender": "Boy", "tag": "stage"},
  {"id": "e08", "name": "Solo Instrument — Senior (Girls) [Set B]", "category": "Music", "type": "individual", "awardGender": "Girl", "tag": "stage"},
  {"id": "e09", "name": "Elocution — Malayalam", "category": "Music", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e10", "name": "Elocution — English", "category": "Music", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e11", "name": "Classical Music", "category": "Music", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e12", "name": "Organ Recital", "category": "Music", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e13", "name": "Light Music — Male", "category": "Music", "type": "individual", "awardGender": "Boy", "tag": "stage"},
  {"id": "e14", "name": "Light Music — Female", "category": "Music", "type": "individual", "awardGender": "Girl", "tag": "stage"},
  {"id": "e15", "name": "Group Song", "category": "Music", "type": "group", "awardGender": null, "tag": "group"},
  {"id": "e16", "name": "Quartet", "category": "Music", "type": "group", "awardGender": null, "tag": "group"},
  {"id": "e17", "name": "Pencil Drawing", "category": "Fine Arts", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e18", "name": "Water Colour Painting", "category": "Fine Arts", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e19", "name": "Cartoon", "category": "Fine Arts", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e20", "name": "Fancy Dress", "category": "Literary Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e21", "name": "Mono Act", "category": "Literary Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e22", "name": "Mimicry", "category": "Literary Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e23", "name": "Tabla", "category": "Literary Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e24", "name": "Mime", "category": "Literary Competitions", "type": "group", "awardGender": null, "tag": "group"},
  {"id": "e25", "name": "Poetry Recitation — English", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e26", "name": "Poetry Recitation — Malayalam", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e27", "name": "Storytelling — English", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e28", "name": "Storytelling — Malayalam", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e29", "name": "Impromptu Speech — Junior (Malayalam)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e30", "name": "Impromptu Speech — Senior (English)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "writing"},
  {"id": "e31", "name": "Speech — Junior (Malayalam)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e32", "name": "Speech — Senior (Malayalam)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e33", "name": "Speech — Junior (English)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "stage"},
  {"id": "e34", "name": "Speech — Senior (English)", "category": "Speech and Language Competitions", "type": "individual", "awardGender": null, "tag": "stage"}
].map(event => ({
  ...event,
  // The editable master-data tag is authoritative: change only tag to change event kind.
  type: event.tag === "group" ? "group" : "individual"
}));

const EVENT_IDS = new Set(MASTER_EVENTS.map(event => event.id));
const PASTORATE_IDS = new Set(PASTORATES.map(church => church.id));
const JSON_URL = "data/results.json";
const DRAFT_STORAGE_KEY = "elanthoor_kalamela_editor_draft_v5";
const PREVIOUS_DRAFT_KEYS = ["elanthoor_kalamela_editor_draft_v4", "elanthoor_kalamela_editor_draft_v3"];
// This PIN is a local convenience only, NOT internet authentication.
const LOCAL_DEMO_PIN = "local-demo";
const IS_LOCAL_EDITOR = ["localhost", "127.0.0.1", "[::1]"]
  .includes(window.location.hostname) || window.location.protocol === "file:";

let data = emptyData();
let publishedData = emptyData();
let adminUnlocked = false;
let publishedLoaded = false;
let editingParticipantId = null;
let activeAdminTab = "churches";


const el = id => document.getElementById(id);
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));
const pointLabel = value => Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 4 });
const ordinal = n => ({ 1: "1st", 2: "2nd", 3: "3rd" })[n];
const churchName = id => PASTORATES.find(church => church.id === id)?.name ?? "Unknown church";
const eventById = id => MASTER_EVENTS.find(event => event.id === id);
const personById = id => data.participants.find(person => person.id === id);
const peopleForChurch = id => data.participants.filter(person => person.pastorateId === id)
  .sort((a, b) => a.name.localeCompare(b.name));
function emptyData() { return { schemaVersion: 5, updatedAt: null, participants: [], eventCounts: {}, results: {} }; }
const isValidPoints = n => Number.isFinite(n) && n >= 0 &&
  Math.abs(Math.round(n * 100) - n * 100) < 1e-7;

function makeId() {
  if (globalThis.crypto?.randomUUID) return "member-" + crypto.randomUUID();
  return "member-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}

// Compatibility: preserve v3 results and create provisional participant records.
// Gender may be 'Unspecified' for legacy winners from mixed events: organiser must set it.
// Group results from v3 have no member names and must be assigned by the organiser.
function migrateVersion3(old) {
  if (!old.results || typeof old.results !== "object" || Array.isArray(old.results)) {
    throw new Error("Invalid version 3 results document.");
  }
  const next = emptyData();
  next.updatedAt = old.updatedAt || null;
  const known = new Map();
  let counter = 1;
  for (const competition of MASTER_EVENTS) {
    const positions = old.results[competition.id];
    if (!positions) continue;
    next.results[competition.id] = {};
    for (const [rank, entry] of Object.entries(positions)) {
      if (competition.type === "group") {
        next.results[competition.id][rank] = {
          pastorateId: entry.pastorateId, points: entry.points, participantIds: []
        };
        continue;
      }
      const name = String(entry.winner || "").trim();
      const key = entry.pastorateId + "|" + name.toLocaleLowerCase("en-IN").replace(/\s+/g, " ");
      let participant = known.get(key);
      const gender = competition.awardGender === "Boy" ? "Male" :
        competition.awardGender === "Girl" ? "Female" : "Unspecified";
      if (!participant) {
        participant = {
          id: "legacy-" + String(counter++).padStart(4, "0"),
          pastorateId: entry.pastorateId, name, gender
        };
        known.set(key, participant);
        next.participants.push(participant);
      } else if (participant.gender === "Unspecified" && gender !== "Unspecified") {
        participant.gender = gender;
      }
      next.results[competition.id][rank] = {
        pastorateId: entry.pastorateId, participantId: participant.id, points: entry.points
      };
    }
  }
  return next;
}

function migrateVersion2(old) {
  if (!Array.isArray(old.events) || !old.results || typeof old.results !== "object") {
    throw new Error("Invalid version 2 results document.");
  }
  const next = { schemaVersion: 3, updatedAt: old.updatedAt || null, results: {} };
  for (const previousEvent of old.events) {
    const positions = old.results[previousEvent.id];
    if (!positions || Object.keys(positions).length === 0) continue;
    const match = MASTER_EVENTS.find(item => item.name.toLowerCase() ===
      String(previousEvent.name).toLowerCase() && item.type === previousEvent.type);
    if (!match) throw new Error("Cannot match old competition: " + previousEvent.name);
    if (next.results[match.id]) throw new Error("Duplicate event during migration: " + match.name);
    next.results[match.id] = positions;
  }
  return migrateVersion3(next);
}

function validateDocument(source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    throw new Error("Invalid JSON document.");
  }
  if (source.schemaVersion === 2) source = migrateVersion2(source);
  if (source.schemaVersion === 3) source = migrateVersion3(source);
  // Old v4 data has no entry counts. Preserve it, but exclude unknown-size events
  // from special award eligibility until an organiser records their counts.
  if (source.schemaVersion === 4) source = { ...source, schemaVersion: 5, eventCounts: {} };
  if (source.schemaVersion !== 5 || !Array.isArray(source.participants) ||
      !source.results || typeof source.results !== "object" || Array.isArray(source.results) ||
      !source.eventCounts || typeof source.eventCounts !== "object" || Array.isArray(source.eventCounts)) {
    throw new Error("Expected schemaVersion 5 with participants, eventCounts and results.");
  }
  const checked = emptyData();
  checked.updatedAt = typeof source.updatedAt === "string" ? source.updatedAt : null;
  for (const [eventId, count] of Object.entries(source.eventCounts)) {
    if (!EVENT_IDS.has(eventId) || !Number.isInteger(count) || count < 1 || count > 100000) {
      throw new Error("Invalid event participation count for " + eventId);
    }
    checked.eventCounts[eventId] = count;
  }
  const personIds = new Set();
  for (const person of source.participants) {
    if (!person || typeof person !== "object" || typeof person.id !== "string" ||
        !/^[A-Za-z0-9_-]{1,100}$/.test(person.id) || personIds.has(person.id) ||
        !PASTORATE_IDS.has(person.pastorateId) || typeof person.name !== "string" ||
        !person.name.trim() || person.name.trim().length > 120 ||
        !["Male", "Female", "Unspecified"].includes(person.gender)) {
      throw new Error("Invalid registered participant or duplicate participant ID.");
    }
    personIds.add(person.id);
    checked.participants.push({
      id: person.id, pastorateId: person.pastorateId,
      name: person.name.trim(), gender: person.gender
    });
  }
  const lookup = new Map(checked.participants.map(p => [p.id, p]));
  for (const [eventId, places] of Object.entries(source.results)) {
    const competition = eventById(eventId);
    if (!competition || !places || typeof places !== "object" || Array.isArray(places)) {
      throw new Error("Unknown event ID or invalid placements: " + eventId);
    }
    const cleanedPlaces = {};
    const usedThisEvent = new Set();
    for (const [place, result] of Object.entries(places)) {
      if (!["1", "2", "3"].includes(place) || !result || typeof result !== "object" ||
          !PASTORATE_IDS.has(result.pastorateId) ||
          typeof result.points !== "number" || !isValidPoints(result.points)) {
        throw new Error("Invalid placing, church or points for " + competition.name);
      }
      if (competition.type === "individual") {
        const person = lookup.get(result.participantId);
        if (!person || person.pastorateId !== result.pastorateId) {
          throw new Error("Winner must belong to their selected church: " + competition.name);
        }
        if (competition.awardGender && person.gender !== "Unspecified" &&
            person.gender !== (competition.awardGender === "Boy" ? "Male" : "Female")) {
          throw new Error("Gender does not match competition category: " + competition.name);
        }
        if (usedThisEvent.has(person.id)) throw new Error("One participant has multiple places in " + competition.name);
        usedThisEvent.add(person.id);
        cleanedPlaces[place] = {
          pastorateId: result.pastorateId, participantId: person.id, points: result.points
        };
      } else {
        if (!Array.isArray(result.participantIds) ||
            new Set(result.participantIds).size !== result.participantIds.length) {
          throw new Error("Invalid group member list for " + competition.name);
        }
        // Empty lists are permitted ONLY to retain earlier group results lacking member names.
        if (result.participantIds.length === 1) {
          throw new Error("Group entries must have at least two members: " + competition.name);
        }
        for (const memberId of result.participantIds) {
          const person = lookup.get(memberId);
          if (!person || person.pastorateId !== result.pastorateId || usedThisEvent.has(memberId)) {
            throw new Error("Group member belongs to another church or placing: " + competition.name);
          }
          usedThisEvent.add(memberId);
        }
        cleanedPlaces[place] = {
          pastorateId: result.pastorateId,
          participantIds: [...result.participantIds], points: result.points
        };
      }
    }
    if (checked.eventCounts[eventId] !== undefined &&
        checked.eventCounts[eventId] < Object.keys(cleanedPlaces).length) {
      throw new Error("Entry count is smaller than the number of recorded places for " + competition.name);
    }
    if (Object.keys(cleanedPlaces).length) checked.results[eventId] = cleanedPlaces;
  }
  return checked;
}

async function fetchPublished() {
  const response = await fetch(JSON_URL + "?fresh=" + Date.now(), { cache: "no-store" });
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
    const clean = validateDocument(data);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(clean));
    data = clean;
    setStatus("Local draft saved • Export JSON to publish your changes", "draft");
  } catch (error) {
    setStatus("Draft validation failed: " + error.message, "error");
    console.error(error);
    return;
  }
  renderAll();
}

function showPage(page) {
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
    message("loginMessage", "Incorrect local demo PIN.", true); return;
  }
  adminUnlocked = true;
  el("adminPassword").value = "";
  message("loginMessage", "");
  updateAdminVisibility();
  renderAll();
}
function logoutAdmin() { adminUnlocked = false; updateAdminVisibility(); }
function requireEditor() {
  if (IS_LOCAL_EDITOR && adminUnlocked) return true;
  alert("Editing is available only in the local Admin Panel.");
  return false;
}

function activateAdminTab(tabId, focus = false) {
  const valid = ["churches", "events", "participants", "winners", "recorded", "publish"];
  if (!valid.includes(tabId)) return;
  activeAdminTab = tabId;
  document.querySelectorAll("[data-admin-tab]").forEach(button => {
    const active = button.dataset.adminTab === tabId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focus) button.focus();
  });
  document.querySelectorAll(".admin-tab-panel").forEach(panel => {
    panel.classList.toggle("hidden", panel.id !== "pane-" + tabId);
  });
}
function renderPastorates() {
  const search = el("churchSearch").value.trim().toLowerCase();
  const filtered = CHURCH_FAMILIES.filter(family => {
    const churches = PASTORATES.filter(p => p.mainId === family.main);
    return !search || (family.pastorate + " " + churches.map(p => p.name).join(" ")).toLowerCase().includes(search);
  });
  el("directoryRegisteredCount").textContent = data.participants.length;
  el("pastorateList").innerHTML = filtered.length ? filtered.map((family, i) => {
    const main = PASTORATES.find(p => p.id === family.main);
    const outstations = PASTORATES.filter(p => p.mainId === family.main && p.category === "outstation");
    const familyParticipants = data.participants.filter(p => p.pastorateId === family.main || outstations.some(c => c.id === p.pastorateId));
    return `<article class="directory-card">
      <div class="directory-card-header"><div class="directory-family-icon" aria-hidden="true">${String(CHURCH_FAMILIES.indexOf(family) + 1).padStart(2,"0")}</div><div><span class="directory-kicker">PASTORATE FAMILY</span><h4>${escapeHTML(family.pastorate)}</h4></div><span class="directory-member-count">${familyParticipants.length} registered</span></div>
      <div class="directory-church main"><span class="directory-dot" aria-hidden="true"></span><div><span class="church-type pastorate">Main pastorate</span><strong>${escapeHTML(main.name)}</strong></div><span class="directory-points">${pointLabel(getPastorateTotal(main.id))} pts</span></div>
      <div class="directory-outstations"><span class="directory-section-label">${outstations.length} OUTSTATION${outstations.length === 1 ? "" : "S"}</span>
      ${outstations.map(p => `<div class="directory-church"><span class="directory-dot" aria-hidden="true"></span><div><span class="church-type outstation">Outstation</span><span>${escapeHTML(p.name)}</span></div><span class="directory-points">${pointLabel(getPastorateTotal(p.id))} pts</span></div>`).join("")}</div>
    </article>`;
  }).join("") : '<p class="directory-empty">No pastorates or outstations match your search.</p>';
}
function renderEventManager() {
  const search = el("eventSearch").value.trim().toLowerCase();
  const filter = el("eventTagFilter").value;
  const matches = MASTER_EVENTS.filter(e => (!filter || e.tag === filter) &&
    (!search || (e.name + " " + e.category).toLowerCase().includes(search)));
  el("eventRows").innerHTML = matches.length ? matches.map(e => `<tr><td>${escapeHTML(e.category)}</td>
    <td>${escapeHTML(e.name)}</td><td><span class="event-tag ${e.tag}">${escapeHTML(e.tag)}</span></td>
    <td>${data.eventCounts[e.id] ?? "Not recorded"}</td></tr>`).join("") : '<tr><td colspan="4">No matching events.</td></tr>';
}
function fillSelect(select, options, placeholder, preserve = true) {
  const previous = preserve ? select.value : "";
  select.replaceChildren();
  select.add(new Option(placeholder, ""));
  options.forEach(option => select.add(new Option(option.label, option.value)));
  if (previous && options.some(option => option.value === previous)) select.value = previous;
}
function fillChurchSelect(select, placeholder, preserve = true) {
  const previous = preserve ? select.value : "";
  select.replaceChildren();
  select.add(new Option(placeholder, ""));
  for (const group of ["pastorate", "outstation"]) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group === "pastorate" ? "Main Pastorates" : "Outstations";
    PASTORATES.filter(p => p.category === group).forEach(p => {
      optgroup.append(new Option(p.category === "outstation"
        ? `${p.name} (${p.parentPastorate})` : p.name, p.id));
    });
    select.append(optgroup);
  }
  if (previous && PASTORATE_IDS.has(previous)) select.value = previous;
}
function renderDropdowns() {
  fillChurchSelect(el("scorePastorate"), "Select a church");
  fillChurchSelect(el("memberChurch"), "Select church to register participants");
  fillSelect(el("resultEvent"), MASTER_EVENTS.map(event => ({ value: event.id, label: `[${event.tag.toUpperCase()}] ${event.name}` })), "Select competition");
}

function resetParticipantEditor() {
  editingParticipantId = null;
  el("memberName").value = "";
  el("memberGender").value = "";
  el("saveMemberButton").textContent = "Add participant";
  el("cancelMemberEdit").classList.add("hidden");
}
function saveParticipant(event) {
  event.preventDefault();
  if (!requireEditor()) return;
  const pastorateId = el("memberChurch").value;
  const name = el("memberName").value.trim();
  const gender = el("memberGender").value;
  if (!PASTORATE_IDS.has(pastorateId) || !name || name.length > 120 ||
      !["Male", "Female"].includes(gender)) {
    return message("memberMessage", "Select a church, enter the full name and choose Male or Female.", true);
  }
  if (editingParticipantId) {
    const person = personById(editingParticipantId);
    if (!person) return message("memberMessage", "Participant no longer exists.", true);
    const referenced = participantIsInResults(person.id);
    if (referenced && person.pastorateId !== pastorateId) {
      return message("memberMessage", "This person already has results. To change churches, clear those entries first.", true);
    }
    const original = { ...person };
    person.pastorateId = pastorateId;
    person.name = name;
    person.gender = gender;
    try {
      validateDocument(data);
    } catch (error) {
      Object.assign(person, original);
      return message("memberMessage", "Cannot update participant: " + error.message, true);
    }
    message("memberMessage", "Participant updated.");
  } else {
    const duplicate = data.participants.some(p => p.pastorateId === pastorateId &&
      p.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (duplicate && !confirm("A participant with this name already exists in this church. Add another?")) return;
    data.participants.push({ id: makeId(), pastorateId, name, gender });
    message("memberMessage", "Participant added.");
  }
  resetParticipantEditor();
  saveDraft();
}
function bulkAddParticipants() {
  if (!requireEditor()) return;
  const churchId = el("memberChurch").value;
  if (!PASTORATE_IDS.has(churchId)) return message("memberMessage", "Select a church before bulk registration.", true);
  const lines = el("bulkMemberLines").value.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (!lines.length) return message("memberMessage", "Enter one participant per line.", true);
  const parsed = [];
  for (let i = 0; i < lines.length; i++) {
    const split = lines[i].lastIndexOf(",");
    if (split < 1) return message("memberMessage", `Line ${i + 1}: Use Full name, Male or Female.`, true);
    const name = lines[i].slice(0, split).trim();
    const genderText = lines[i].slice(split + 1).trim().toLowerCase();
    const gender = genderText === "male" ? "Male" : genderText === "female" ? "Female" : "";
    if (!name || name.length > 120 || !gender) {
      return message("memberMessage", `Line ${i + 1}: Check the full name and Male/Female gender.`, true);
    }
    parsed.push({ name, gender });
  }
  const existing = new Set(peopleForChurch(churchId).map(person => person.name.toLowerCase()));
  let added = 0;
  let skipped = 0;
  for (const person of parsed) {
    const nameKey = person.name.toLowerCase();
    if (existing.has(nameKey)) { skipped++; continue; }
    data.participants.push({ id: makeId(), pastorateId: churchId, name: person.name, gender: person.gender });
    existing.add(nameKey);
    added++;
  }
  el("bulkMemberLines").value = "";
  message("memberMessage", `${added} participant(s) added; ${skipped} duplicate name(s) skipped.`);
  if (added) saveDraft();
}
function editParticipant(id) {
  if (!requireEditor()) return;
  const person = personById(id);
  if (!person) return;
  editingParticipantId = id;
  el("memberChurch").value = person.pastorateId;
  el("memberName").value = person.name;
  el("memberGender").value = person.gender === "Unspecified" ? "" : person.gender;
  el("saveMemberButton").textContent = "Save participant changes";
  el("cancelMemberEdit").classList.remove("hidden");
  renderParticipantList();
  el("memberName").focus();
}
function participantIsInResults(id) {
  return Object.entries(data.results).some(([eventId, entries]) => Object.values(entries).some(w =>
    eventById(eventId).type === "group" ? w.participantIds.includes(id) : w.participantId === id));
}
function deleteParticipant(id) {
  if (!requireEditor()) return;
  const person = personById(id);
  if (!person) return;
  if (participantIsInResults(id)) {
    return message("memberMessage", "Cannot delete " + person.name + ". Remove them from event results first.", true);
  }
  if (!confirm("Delete " + person.name + " from " + churchName(person.pastorateId) + "?")) return;
  data.participants = data.participants.filter(person => person.id !== id);
  if (editingParticipantId === id) resetParticipantEditor();
  message("memberMessage", "Participant deleted.");
  saveDraft();
}
const DEMO_NAMES = [
  { name: "DEMO - Anu", gender: "Female" },
  { name: "DEMO - Arun", gender: "Male" },
  { name: "DEMO - Meera", gender: "Female" },
  { name: "DEMO - Rahul", gender: "Male" }
];
function loadDemoParticipants() {
  if (!requireEditor()) return;
  let added = 0;
  for (const church of PASTORATES) {
    DEMO_NAMES.forEach((template, index) => {
      const id = `demo-${church.id}-${index + 1}`;
      if (data.participants.some(person => person.id === id)) return;
      data.participants.push({
        id, pastorateId: church.id,
        name: `${template.name} [${church.id.toUpperCase()}]`,
        gender: template.gender
      });
      added++;
    });
  }
  if (added) saveDraft();
  message("demoMessage", added
    ? `Added ${added} DEMO participants across all 21 churches. They are local testing data until you export JSON.`
    : "Sample participants already loaded; no duplicates added.");
}
function removeDemoParticipants() {
  if (!requireEditor()) return;
  const demoPeople = data.participants.filter(p => /^demo-p\d{2}-\d+$/.test(p.id));
  if (!demoPeople.length) return message("demoMessage", "No sample participants found.");
  const removable = demoPeople.filter(p => !participantIsInResults(p.id));
  const retained = demoPeople.length - removable.length;
  if (!removable.length) return message("demoMessage", `${retained} demo participants are referenced by event results. Clear those results first.`, true);
  if (!confirm(`Remove ${removable.length} unused DEMO participants? ${retained} with results will remain.`)) return;
  const ids = new Set(removable.map(p => p.id));
  data.participants = data.participants.filter(p => !ids.has(p.id));
  resetParticipantEditor();
  saveDraft();
  message("demoMessage", `Removed ${removable.length} DEMO participants. ${retained} remain in recorded results.`);
}
function updateDemoStats() {
  const total = data.participants.filter(p => /^demo-p\d{2}-\d+$/.test(p.id)).length;
  el("tabParticipantCount").textContent = data.participants.length;
  el("tabResultsCount").textContent = Object.keys(data.results).filter(id => Object.keys(data.results[id]).length).length;
  el("demoDataSummary").textContent = total
    ? `${total} DEMO participants present. Remove them before publishing actual results.`
    : "No DEMO participants in the current draft.";
}

function renderParticipantList() {
  const churchId = el("memberChurch").value;
  const container = el("memberList");
  if (!churchId) {
    el("memberCount").textContent = "0 registered";
    container.innerHTML = '<p class="help-text">Select a church above to see its registered participants.</p>';
    return;
  }
  const people = peopleForChurch(churchId);
  el("memberCount").textContent = people.length + " registered";
  const scores = participantScores();
  container.innerHTML = people.length ? people.map(person => {
    const total = scores.get(person.id)?.total || 0;
    return `<div class="member-entry"><div><strong>${escapeHTML(person.name)}</strong>
      <small>${escapeHTML(person.gender)} · ${pointLabel(total)} pts</small></div>
      <div class="member-actions"><button type="button" class="small-action edit-btn" data-member-action="edit" data-id="${person.id}">Edit</button>
      <button type="button" class="small-action danger-btn" data-member-action="delete" data-id="${person.id}">Delete</button></div></div>`;
  }).join("") : '<p class="help-text">No participants registered for this church yet.</p>';
}

function fieldWrap(labelText, inputId) {
  const block = document.createElement("div");
  const label = document.createElement("label");
  label.htmlFor = inputId;
  label.textContent = labelText;
  block.append(label);
  return block;
}
// Each place owns a separate picker. A church change refreshes ONLY that place.
function renderWinnerSelection(place, selectedMemberIds = []) {
  const competition = eventById(el("resultEvent").value);
  const churchId = el("podiumPastorate" + place)?.value || "";
  const target = el("podiumMembers" + place);
  if (!target) return;
  target.replaceChildren();
  if (!competition) return;
  const people = peopleForChurch(churchId);
  if (competition.type === "individual") {
    const label = document.createElement("label");
    label.htmlFor = "podiumParticipant" + place;
    label.textContent = "Participant";
    const select = document.createElement("select");
    select.id = "podiumParticipant" + place;
    select.dataset.winnerParticipant = String(place);
    select.add(new Option(churchId ? "Select registered participant" : "Choose a church first", ""));
    const requiredGender = competition.awardGender === "Boy" ? "Male" :
      competition.awardGender === "Girl" ? "Female" : null;
    let eligibleCount = 0;
    for (const person of people) {
      const eligible = !requiredGender || person.gender === requiredGender || person.gender === "Unspecified";
      const option = new Option(person.name + " (" + person.gender + ")", person.id);
      // Show all registered names; indicate ineligible gender instead of an inexplicably empty list.
      option.disabled = !eligible;
      select.add(option);
      if (eligible) eligibleCount++;
    }
    if (selectedMemberIds.length && people.some(p => p.id === selectedMemberIds[0])) {
      select.value = selectedMemberIds[0];
    }
    target.append(label, select);
    const note = document.createElement("small");
    note.className = "picker-status";
    note.textContent = !churchId ? "Choose a church for this place to see its participants." :
      !people.length ? "No participants registered for this church. Open Participants tab to add them." :
      !eligibleCount ? `This church has ${people.length} registered participant(s), but no ${requiredGender || "eligible"} entrants for this competition.` :
      `${eligibleCount} eligible of ${people.length} registered participant(s) · Choose for ${ordinal(place)} place.`;
    target.append(note);
  } else {
    const label = document.createElement("label");
    label.textContent = "Group members (select two or more)";
    target.append(label);
    const details = document.createElement("details");
    details.className = "member-picker";
    const summary = document.createElement("summary");
    summary.id = "groupPickerSummary" + place;
    details.append(summary);
    const choices = document.createElement("div");
    choices.className = "member-choices";
    if (!people.length) {
      const note = document.createElement("p");
      note.textContent = churchId ? "No participants registered for this church. Add them in Participants." : "Select a church first.";
      choices.append(note);
    }
    for (const person of people) {
      const option = document.createElement("label");
      option.className = "member-choice";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = person.id;
      checkbox.checked = selectedMemberIds.includes(person.id);
      checkbox.addEventListener("change", () => updateGroupSummary(place));
      const name = document.createElement("span");
      name.textContent = person.name + " · " + person.gender;
      option.append(checkbox, name);
      choices.append(option);
    }
    details.append(choices);
    target.append(details);
    updateGroupSummary(place);
  }
}
function groupMemberIds(place) {
  return [...el("podiumMembers" + place).querySelectorAll('input[type="checkbox"]:checked')]
    .map(input => input.value);
}
function updateGroupSummary(place) {
  const summary = el("groupPickerSummary" + place);
  if (!summary) return;
  const count = groupMemberIds(place).length;
  summary.textContent = count + " member" + (count === 1 ? "" : "s") + " selected · Click to choose";
  const share = el("groupShareHint" + place);
  if (share) share.textContent =
    "The church receives the full group points once. Members receive NO regular individual points; " +
    "they receive a separate placing bonus (1st: 5, 2nd: 3, 3rd: 1) only for award tie-breaks.";
}
function showEventForm() {
  const competition = eventById(el("resultEvent").value);
  const container = el("podiumRows");
  container.replaceChildren();
  el("resultForm").classList.toggle("hidden", !competition);
  el("eventEntryCountWrap").classList.toggle("hidden", !competition);
  if (!competition) {
    el("resultEventHelp").textContent = "Choose an event to enter 1st, 2nd and 3rd places.";
    return;
  }
  const isGroup = competition.tag === "group";
  el("eventEntryCountLabel").textContent = isGroup
    ? "Total number of teams competing in this event"
    : "Total number of participants competing in this event";
  el("eventEntryCount").placeholder = isGroup ? "e.g. 6 teams" : "e.g. 12 participants";
  el("eventEntryCount").value = data.eventCounts[competition.id] ?? "";
  el("eventCountHint").textContent = isGroup
    ? "Count all competing teams, not just the winning teams. Required when saving results."
    : "Count all entrants in the entire event, not just the winners. If 2 or fewer compete, those individual points will NOT count toward Kala Thilakam / Kala Prathibha.";
  el("resultEventHelp").textContent = isGroup
    ? "Group event: choose winning churches and performing members. Full points go to the church only; members earn tie-break bonuses based on their group placing."
    : "Individual event: choose winning churches, registered participants and points. Awards count these points only if at least 3 people competed in this event.";
  for (let place = 1; place <= 3; place++) {
    const saved = (data.results[competition.id] || {})[place] || null;
    const fieldset = document.createElement("fieldset");
    fieldset.className = "podium-row";
    const legend = document.createElement("legend");
    legend.textContent = ordinal(place) + " Place";
    fieldset.append(legend);
    const fields = document.createElement("div");
    fields.className = "podium-fields";
    const churchWrap = fieldWrap("Pastorate / Outstation", "podiumPastorate" + place);
    const church = document.createElement("select");
    church.id = "podiumPastorate" + place;
    fillChurchSelect(church, "Select a church", false);
    church.value = saved?.pastorateId || "";
    church.dataset.winnerChurch = String(place);
    churchWrap.append(church);
    fields.append(churchWrap);
    const personBlock = document.createElement("div");
    personBlock.id = "podiumMembers" + place;
    personBlock.className = "podium-member-field";
    fields.append(personBlock);
    const pointsWrap = fieldWrap("Points", "podiumPoints" + place);
    const points = document.createElement("input");
    points.type = "number";
    points.id = "podiumPoints" + place;
    points.min = "0";
    points.step = "0.01";
    points.placeholder = "Enter points";
    points.value = saved ? String(saved.points) : "";
    points.addEventListener("input", () => updateGroupSummary(place));
    pointsWrap.append(points);
    fields.append(pointsWrap);
    fieldset.append(fields);
    const hint = document.createElement("small");
    hint.id = "groupShareHint" + place;
    hint.textContent = "Leave this entire place empty if not announced yet.";
    fieldset.append(hint);
    container.append(fieldset);
    const preselected = competition.type === "group" ? (saved?.participantIds || []) :
      (saved?.participantId ? [saved.participantId] : []);
    renderWinnerSelection(place, preselected);
  }
}
function saveResultsForEvent(event) {
  event.preventDefault();
  if (!requireEditor()) return;
  const competition = eventById(el("resultEvent").value);
  if (!competition) return message("resultMessage", "Choose an event.", true);
  const countText = el("eventEntryCount").value.trim();
  const totalEntries = Number(countText);
  if (!countText || !Number.isInteger(totalEntries) || totalEntries < 1 || totalEntries > 100000) {
    return message("resultMessage", "Enter the total number of " +
      (competition.tag === "group" ? "competing teams" : "competing participants") +
      " as a positive whole number.", true);
  }
  const entries = {};
  const used = new Set();
  for (let place = 1; place <= 3; place++) {
    const churchId = el("podiumPastorate" + place).value;
    const pointsText = el("podiumPoints" + place).value.trim();
    const chosen = competition.type === "group" ? groupMemberIds(place) :
      [el("podiumParticipant" + place)?.value || ""].filter(Boolean);
    if (!churchId && !pointsText && chosen.length === 0) continue;
    const points = Number(pointsText);
    if (!PASTORATE_IDS.has(churchId) || !pointsText || !isValidPoints(points)) {
      return message("resultMessage", ordinal(place) + ": Select a church and valid points (up to two decimal places).", true);
    }
    if (competition.type === "individual" && chosen.length !== 1) {
      return message("resultMessage", ordinal(place) + ": Select one registered participant.", true);
    }
    if (competition.type === "group" && chosen.length < 2) {
      return message("resultMessage", ordinal(place) + ": Select at least two group members.", true);
    }
    for (const id of chosen) {
      const person = personById(id);
      if (!person || person.pastorateId !== churchId || used.has(id)) {
        return message("resultMessage", ordinal(place) + ": Check participant church and avoid using the same person in multiple places.", true);
      }
      if (competition.type === "individual" && competition.awardGender &&
          person.gender !== (competition.awardGender === "Boy" ? "Male" : "Female")) {
        return message("resultMessage", ordinal(place) + ": Participant gender does not match event category. Edit registration first.", true);
      }
      used.add(id);
    }
    entries[place] = competition.type === "group"
      ? { pastorateId: churchId, participantIds: chosen, points }
      : { pastorateId: churchId, participantId: chosen[0], points };
  }
  if (!Object.keys(entries).length) {
    return message("resultMessage", "Enter at least one place, or use Clear This Event's Results.", true);
  }
  if (totalEntries < Object.keys(entries).length) {
    return message("resultMessage", "Total competitors cannot be fewer than the recorded placing entries.", true);
  }
  const previous = data.results[competition.id];
  const previousCount = data.eventCounts[competition.id];
  data.results[competition.id] = entries;
  data.eventCounts[competition.id] = totalEntries;
  try {
    data = validateDocument(data);
  } catch (error) {
    if (previous) data.results[competition.id] = previous;
    else delete data.results[competition.id];
    if (previousCount === undefined) delete data.eventCounts[competition.id];
    else data.eventCounts[competition.id] = previousCount;
    return message("resultMessage", error.message, true);
  }
  saveDraft();
  message("resultMessage", `Saved ${Object.keys(entries).length} place(s) for ${competition.name} (${totalEntries} competing ${competition.tag === "group" ? "teams" : "participants"}).`);
}
function clearResultsForEvent(eventId = el("resultEvent").value) {
  if (!requireEditor()) return;
  const competition = eventById(eventId);
  if (!competition || !confirm("Remove all results for " + competition.name + "?")) return;
  delete data.results[eventId];
  delete data.eventCounts[eventId];
  saveDraft();
  message("resultMessage", "Cleared results and competing entry count for " + competition.name + ".");
}
function renderRecordedEvents() {
  const search = el("recordedSearch").value.trim().toLowerCase();
  const filtered = MASTER_EVENTS.filter(e => !search || (e.name + " " + e.tag).toLowerCase().includes(search));
  el("recordedEventRows").innerHTML = filtered.length ? filtered.map(competition => {
    const positions = Object.keys(data.results[competition.id] || {}).length;
    const missing = competition.type === "group" && Object.values(data.results[competition.id] || {})
      .some(entry => !entry.participantIds.length);
    return `<tr><td>${escapeHTML(competition.name)}</td><td>${escapeHTML(competition.tag)}</td>
    <td>${data.eventCounts[competition.id] ?? "—"}</td>
    <td>${positions} / 3${missing ? ' <span class="missing-members">· Assign group members for tie-breaks</span>' : ""}</td>
    <td class="action-cell"><button type="button" class="small-action edit-btn" data-result-action="edit" data-id="${competition.id}">Edit</button>
    <button type="button" class="small-action danger-btn" data-result-action="clear" data-id="${competition.id}">Clear</button></td></tr>`;
  }).join("") : '<tr><td colspan="5">No matching events.</td></tr>';
}

// The pastorate receives the FULL result points once, regardless of group size.
function getPastorateTotal(churchId) {
  let total = 0;
  for (const positions of Object.values(data.results)) {
    for (const winner of Object.values(positions)) {
      if (winner.pastorateId === churchId) total += winner.points;
    }
  }
  return total;
}
// Personal totals are ONLY individual points. Group points belong solely to churches.
// Award-eligible individual points must come from events with >= 3 total entrants.
// Group placings provide only a secondary tie-break bonus: 1st 5, 2nd 3, 3rd 1.
const GROUP_TIE_BREAK_POINTS = { 1: 5, 2: 3, 3: 1 };
function participantScores() {
  const totals = new Map(data.participants.map(person => [person.id, {
    id: person.id, name: person.name, gender: person.gender, pastorateId: person.pastorateId,
    individual: 0, eligibleIndividual: 0, excludedIndividual: 0, groupBonus: 0, total: 0
  }]));
  for (const competition of MASTER_EVENTS) {
    for (const [place, entry] of Object.entries(data.results[competition.id] || {})) {
      if (competition.tag !== "group") {
        const member = totals.get(entry.participantId);
        if (!member) continue;
        member.individual += entry.points;
        if ((data.eventCounts[competition.id] ?? 0) >= 3) {
          member.eligibleIndividual += entry.points;
        } else {
          member.excludedIndividual += entry.points;
        }
      } else {
        const bonus = GROUP_TIE_BREAK_POINTS[place] || 0;
        // No division, and no addition of group points to personal totals.
        for (const id of entry.participantIds) {
          const member = totals.get(id);
          if (member) member.groupBonus += bonus;
        }
      }
    }
  }
  for (const entry of totals.values()) entry.total = entry.individual;
  return totals;
}
function churchPlacements(churchId) {
  const rows = [];
  for (const competition of MASTER_EVENTS) {
    for (const [place, winner] of Object.entries(data.results[competition.id] || {})) {
      if (winner.pastorateId === churchId) rows.push({ competition, place: Number(place), ...winner });
    }
  }
  return rows;
}
function renderScoreboard() {
  const churchId = el("scorePastorate").value;
  const church = PASTORATES.find(c => c.id === churchId);
  el("selectedPastorateName").textContent = church ? church.name : "Select a church";
  el("selectedChurchContext").textContent = church
    ? (church.category === "pastorate" ? `Main church · ${church.parentPastorate} Pastorate`
      : `Outstation · ${church.parentPastorate} Pastorate`)
    : "Choose a main pastorate church or an outstation";
  el("selectedPastoratePoints").textContent = pointLabel(church ? getPastorateTotal(church.id) : 0);
  const entries = churchPlacements(churchId);
  el("pastorateResultsRows").innerHTML = entries.length ? entries.map(entry => {
    const isGroup = entry.competition.type === "group";
    const names = isGroup ? entry.participantIds.map(id => personById(id)?.name || "Unknown member") :
      [personById(entry.participantId)?.name || "Unknown participant"];
    const displayed = isGroup ? (names.length ? names.join(", ") : "Group members not assigned") : names[0];
    return `<tr><td>${escapeHTML(entry.competition.name)} <small class="tag-inline">${escapeHTML(entry.competition.tag)}</small></td><td>${ordinal(entry.place)}</td>
    <td>${isGroup ? "<strong>Group:</strong> " : ""}${escapeHTML(displayed)}${isGroup && names.length ? `<small class="share-note">Group tie-break per member: +${GROUP_TIE_BREAK_POINTS[entry.place]} (only if individual award points tie)</small>` : ""}${!isGroup ? `<small class="share-note">${data.eventCounts[entry.competition.id] ?? "Unknown"} total competitors · ${data.eventCounts[entry.competition.id] >= 3 ? "award-eligible" : "not award-eligible"}</small>` : ""}</td>
    <td>${pointLabel(entry.points)}</td></tr>`;
  }).join("") : '<tr><td colspan="4">No results recorded for this church.</td></tr>';
  const scores = participantScores();
  const people = peopleForChurch(churchId);
  el("churchMemberScoreRows").innerHTML = people.length ? people.map(person => {
    const score = scores.get(person.id);
    return `<tr><td>${escapeHTML(person.name)}</td><td>${escapeHTML(person.gender)}</td>
      <td>${pointLabel(score.individual)}</td><td>${pointLabel(score.eligibleIndividual)}</td>
      <td><strong>+${pointLabel(score.groupBonus)}</strong></td></tr>`;
  }).join("") : '<tr><td colspan="5">No registered participants for this church yet.</td></tr>';
}
function matrixRows() {
  return PASTORATES.map(church => {
    const cells = MASTER_EVENTS.map(event => {
      const positions = Object.entries(data.results[event.id] || {})
        .filter(([, w]) => w.pastorateId === church.id)
        .map(([place, w]) => `${ordinal(Number(place))}: ${pointLabel(w.points)}`);
      return positions.length ? positions.join("; ") : "—";
    });
    return { pastorate: church.name, category: church.category,
      parentPastorate: church.parentPastorate, cells, total: getPastorateTotal(church.id) };
  });
}
function renderMatrix() {
  const table = el("matrixTable");
  table.querySelector("thead").innerHTML = `<tr><th>Church</th><th>Type</th><th>Parent pastorate</th>${MASTER_EVENTS.map(e => `<th title="${escapeHTML(e.name)}">${escapeHTML(e.name)}</th>`).join("")}<th>Total</th></tr>`;
  table.querySelector("tbody").innerHTML = matrixRows().map(row => `<tr><th>${escapeHTML(row.pastorate)}</th>
    <td>${row.category === "pastorate" ? "Main pastorate" : "Outstation"}</td><td>${escapeHTML(row.parentPastorate)}</td>
    ${row.cells.map(cell => `<td>${escapeHTML(cell)}</td>`).join("")}<td class="total-cell">${pointLabel(row.total)}</td></tr>`).join("");
}
function leaderboardPositions(category) {
  const ranked = PASTORATES.filter(p => p.category === category)
    .map(p => ({ ...p, points: getPastorateTotal(p.id) }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  let previous = null;
  let rank = 0;
  return ranked.map((p, index) => {
    const position = p.points <= 0 ? "—" :
      (Math.abs(p.points - previous) < 1e-9 ? rank : index + 1);
    if (p.points > 0) { previous = p.points; rank = position; }
    return { ...p, rank: position };
  });
}
function renderCategoryPodium(category, id) {
  const top = leaderboardPositions(category).filter(c => c.points > 0).slice(0, 3);
  el(id).innerHTML = top.length ? top.map((church, index) => `<article class="podium-card podium-${index + 1}">
    <div class="podium-top"><span>${index === 0 ? "✦" : "✧"}</span><span>Rank ${church.rank}</span></div>
    <div class="podium-rank">${String(church.rank).padStart(2, "0")}</div>
    <h4>${escapeHTML(church.name)}</h4>${category === "outstation" ? `<p class="podium-parent">${escapeHTML(church.parentPastorate)} Pastorate</p>` : ""}
    <div class="podium-points"><strong>${pointLabel(church.points)}</strong><span>points</span></div></article>`).join("") :
    '<div class="empty-podium"><strong>Results coming soon</strong><p>Rankings will appear after results are published.</p></div>';
}
function renderLeaderboard() {
  el("pastorateLeaderboardRows").innerHTML = leaderboardPositions("pastorate").map(c => `<tr><td>${c.rank}</td>
    <td>${escapeHTML(c.name)}</td><td><strong>${pointLabel(c.points)}</strong></td></tr>`).join("");
  el("outstationLeaderboardRows").innerHTML = leaderboardPositions("outstation").map(c => `<tr><td>${c.rank}</td>
    <td>${escapeHTML(c.name)}</td><td>${escapeHTML(c.parentPastorate)}</td><td><strong>${pointLabel(c.points)}</strong></td></tr>`).join("");
  renderAwards();
}
function renderAwards() {
  const scores = [...participantScores().values()];
  for (const [gender, nameId, detailId] of [
    ["Female", "kalaThilakamName", "kalaThilakamDetails"],
    ["Male", "kalaPrathibhaName", "kalaPrathibhaDetails"]
  ]) {
    // Group results cannot create an award winner. Only eligible individual
    // scores select the finalists; group placing bonuses resolve an actual tie.
    const candidates = scores.filter(p => p.gender === gender && p.eligibleIndividual > 0);
    const highestIndividual = Math.max(0, ...candidates.map(p => p.eligibleIndividual));
    const tied = candidates.filter(p => Math.abs(p.eligibleIndividual - highestIndividual) < 1e-9);
    const highestBonus = Math.max(0, ...tied.map(p => p.groupBonus));
    const winners = tied.filter(p => Math.abs(p.groupBonus - highestBonus) < 1e-9);
    el(nameId).textContent = winners.length ? winners.map(p => p.name).join(" / ") : "Not decided yet";
    el(detailId).textContent = winners.length ? winners.map(p =>
      `${churchName(p.pastorateId)} · ${pointLabel(p.eligibleIndividual)} eligible individual pts` +
      (tied.length > 1 ? ` · group tie-break +${pointLabel(p.groupBonus)}` : "")
    ).join(" | ") + (winners.length > 1 ? " · Tied after group tie-break" : "") :
      "No eligible individual results yet (events need at least 3 competitors).";
  }
}
function renderPublicEnhancements() {
  const completed = Object.values(data.results).filter(places => Object.keys(places).length > 0).length;
  const places = Object.values(data.results).reduce((n, entries) => n + Object.keys(entries).length, 0);
  el("homePastorates").textContent = PASTORATES.length;
  el("homeEvents").textContent = MASTER_EVENTS.length;
  el("homeCompleted").textContent = completed;
  el("homePlaces").textContent = places;
  renderCategoryPodium("pastorate", "topPastoratePodium");
  renderCategoryPodium("outstation", "topOutstationPodium");
}
function renderAll() {
  updateDemoStats();
  renderDropdowns();
  renderPastorates();
  renderEventManager();
  renderParticipantList();
  renderRecordedEvents();
  showEventForm();
  renderScoreboard();
  renderMatrix();
  renderLeaderboard();
  renderPublicEnhancements();
}

function csvCell(value) { return '"' + String(value).replace(/"/g, '""') + '"'; }
function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
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
  const header = ["Church", "Type", "Parent Pastorate", ...MASTER_EVENTS.map(e => e.name), "Total Points"];
  const rows = [header, ...matrixRows().map(row => [row.pastorate,
    row.category === "pastorate" ? "Main Pastorate" : "Outstation", row.parentPastorate,
    ...row.cells, row.total])];
  const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");
  downloadFile("kalamela-results-matrix.csv", csv, "text/csv;charset=utf-8");
}
function exportJson() {
  if (!requireEditor()) return;
  try {
    const clean = validateDocument({ ...data, updatedAt: new Date().toISOString() });
    downloadFile("results.json", JSON.stringify(clean, null, 2) + "\n", "application/json");
    const incomplete = Object.entries(clean.results).reduce((count, [eventId, places]) =>
      count + (eventById(eventId).type === "group" ? Object.values(places)
        .filter(entry => !entry.participantIds.length).length : 0), 0);
    const missingCounts = Object.keys(clean.results).filter(id => clean.eventCounts[id] === undefined).length;
    message("publishMessage", "Downloaded results.json (schema v5). Replace data/results.json, commit and push." +
      (incomplete ? ` WARNING: ${incomplete} older group results have no members, so group tie-break bonuses cannot be awarded.` : "") +
      (missingCounts ? ` WARNING: ${missingCounts} event(s) need a total competitor count; their individual results are currently excluded from awards.` : ""), Boolean(incomplete || missingCounts));
  } catch (error) { message("publishMessage", "Export failed: " + error.message, true); }
}
async function importJson(file) {
  if (!requireEditor() || !file) return;
  try {
    const clean = validateDocument(JSON.parse(await file.text()));
    if (!confirm("Replace your current browser draft with the imported data?")) return;
    data = clean;
    resetParticipantEditor();
    saveDraft();
    message("publishMessage", "Imported " + clean.participants.length + " registered participants and results.");
  } catch (error) { message("publishMessage", "Import failed: " + error.message, true); }
}
async function resetDraft() {
  if (!requireEditor() || !confirm("Discard local edits and load published data/results.json?")) return;
  try {
    publishedData = await fetchPublished();
    data = structuredClone(publishedData);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    PREVIOUS_DRAFT_KEYS.forEach(key => localStorage.removeItem(key));
    resetParticipantEditor();
    renderAll();
    setStatus("Local draft discarded • Published JSON loaded");
    message("publishMessage", "Published JSON loaded.");
  } catch (error) { message("publishMessage", "Cannot load published data: " + error.message, true); }
}
function attachHandlers() {
  document.querySelectorAll("[data-admin-tab]").forEach(button => {
    button.addEventListener("click", () => activateAdminTab(button.dataset.adminTab));
    button.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const tabs = [...document.querySelectorAll("[data-admin-tab]")];
      const index = tabs.indexOf(button);
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 :
        (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      event.preventDefault();
      activateAdminTab(tabs[next].dataset.adminTab, true);
    });
  });
  el("churchSearch").addEventListener("input", renderPastorates);
  el("eventSearch").addEventListener("input", renderEventManager);
  el("eventTagFilter").addEventListener("change", renderEventManager);
  el("recordedSearch").addEventListener("input", renderRecordedEvents);
  el("addDemoParticipants").addEventListener("click", loadDemoParticipants);
  el("removeDemoParticipants").addEventListener("click", removeDemoParticipants);
  el("podiumRows").addEventListener("change", event => {
    const churchPicker = event.target.closest("select[data-winner-church]");
    if (churchPicker) {
      renderWinnerSelection(Number(churchPicker.dataset.winnerChurch));
    }
  });
  document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });
  el("scorePastorate").addEventListener("change", renderScoreboard);
  el("downloadMatrix").addEventListener("click", downloadMatrixCsv);
  el("loginButton").addEventListener("click", loginAdmin);
  el("adminPassword").addEventListener("keydown", event => { if (event.key === "Enter") loginAdmin(); });
  el("logoutButton").addEventListener("click", logoutAdmin);
  el("memberForm").addEventListener("submit", saveParticipant);
  el("bulkAddButton").addEventListener("click", bulkAddParticipants);
  el("memberChurch").addEventListener("change", renderParticipantList);
  el("cancelMemberEdit").addEventListener("click", () => { resetParticipantEditor(); renderParticipantList(); });
  el("memberList").addEventListener("click", event => {
    const button = event.target.closest("button[data-member-action]");
    if (!button) return;
    if (button.dataset.memberAction === "edit") editParticipant(button.dataset.id);
    if (button.dataset.memberAction === "delete") deleteParticipant(button.dataset.id);
  });
  el("resultEvent").addEventListener("change", () => { showEventForm(); message("resultMessage", ""); });
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
    const eventId = button.dataset.id;
    if (button.dataset.resultAction === "clear") clearResultsForEvent(eventId);
    if (button.dataset.resultAction === "edit") {
      el("resultEvent").value = eventId;
      showEventForm();
      activateAdminTab("winners");
      el("resultEvent").scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}
async function initialise() {
  attachHandlers();
  activateAdminTab("churches");
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
      const draftText = localStorage.getItem(DRAFT_STORAGE_KEY);
      const oldDraft = !draftText ? PREVIOUS_DRAFT_KEYS.map(key => localStorage.getItem(key)).find(Boolean) : null;
      if (draftText || oldDraft) {
        data = validateDocument(JSON.parse(draftText || oldDraft));
        setStatus(oldDraft
          ? "Previous draft migrated • Enter event competitor counts, review genders and group members, then export schema v5 JSON"
          : "Local results draft loaded • Not yet published", "draft");
      } else if (publishedLoaded) {
        setStatus("Published results loaded • Local editor available");
      } else {
        setStatus("Could not load data/results.json. Open using VS Code Live Server. " + loadError?.message, "error");
      }
    } catch (error) {
      setStatus("Draft could not be loaded: " + error.message, "error");
      console.error(error);
    }
  } else if (publishedLoaded) {
    setStatus("Published results" + (data.updatedAt ? " · " + new Date(data.updatedAt).toLocaleString("en-IN") : " · Awaiting results"));
    setInterval(async () => {
      try {
        const next = await fetchPublished();
        if (JSON.stringify(next) !== JSON.stringify(data)) {
          data = next;
          renderAll();
          setStatus("Published results updated" + (data.updatedAt ? " · " + new Date(data.updatedAt).toLocaleString("en-IN") : ""));
        }
      } catch (error) { console.warn("Could not refresh published JSON:", error); }
    }, 60000);
  } else {
    setStatus("Unable to load results. Please retry when results.json is available.", "error");
  }
  renderAll();
}
document.addEventListener("DOMContentLoaded", initialise);
