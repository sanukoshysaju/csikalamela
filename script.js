
const STORAGE_KEY = "elanthoorYouthKalamela_v1";

// Demo password only. Change this before using the website.
const ADMIN_PASSWORD = "action@2026";

let data = loadData();
let isAdmin = false;

function emptyData() {
  return { units: [], participants: [], results: [] };
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed.units) &&
        Array.isArray(parsed.participants) &&
        Array.isArray(parsed.results)
      ) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error loading saved data:", error);
  }

  return emptyData();
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    alert("Could not save data in this browser.");
    console.error(error);
  }
  refreshAll();
}

function makeId() {
  return Date.now().toString(36) +
    Math.random().toString(36).slice(2, 9);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

function formatPoints(points) {
  return Number(points || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });
}

function showPage(pageId, clickedButton) {
  document.querySelectorAll(".page").forEach(function (page) {
    page.classList.add("hidden");
  });

  const page = document.getElementById(pageId);
  if (!page) return;
  page.classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(function (button) {
    button.classList.remove("active");
  });

  if (clickedButton && clickedButton.classList.contains("nav-btn")) {
    clickedButton.classList.add("active");
  } else {
    document.querySelectorAll(".nav-btn").forEach(function (button) {
      if (button.textContent.trim().toLowerCase() === pageId) {
        button.classList.add("active");
      }
    });
  }

  if (pageId === "scoreboard") renderScoreboard();
  if (pageId === "leaderboard") renderLeaderboard();
  if (pageId === "admin" && isAdmin) refreshAll();
}

function loginAdmin() {
  const password = document.getElementById("adminPassword").value;
  const message = document.getElementById("loginMessage");

  if (password === ADMIN_PASSWORD) {
    isAdmin = true;
    document.getElementById("adminLogin").classList.add("hidden");
    document.getElementById("adminWorkspace").classList.remove("hidden");
    message.textContent = "";
    document.getElementById("adminPassword").value = "";
    refreshAll();
  } else {
    message.textContent = "Incorrect password. Please try again.";
  }
}

function logoutAdmin() {
  isAdmin = false;
  document.getElementById("adminLogin").classList.remove("hidden");
  document.getElementById("adminWorkspace").classList.add("hidden");
  document.getElementById("adminPassword").value = "";
  document.getElementById("loginMessage").textContent = "";
}

function requireAdmin() {
  if (!isAdmin) {
    alert("Please login to the Admin Panel first.");
    return false;
  }
  return true;
}

// ---------------- CHURCH UNITS ----------------

function addUnit(event) {
  event.preventDefault();
  if (!requireAdmin()) return;

  const input = document.getElementById("newUnitName");
  const name = input.value.trim();

  if (!name) return;

  const duplicate = data.units.some(function (unit) {
    return unit.name.toLowerCase() === name.toLowerCase();
  });

  if (duplicate) {
    document.getElementById("unitMessage").textContent =
      "This unit already exists.";
    return;
  }

  data.units.push({ id: makeId(), name: name });
  input.value = "";

  document.getElementById("unitMessage").textContent =
    "Unit added successfully.";
  saveData();
}

function renameUnit(unitId) {
  if (!requireAdmin()) return;

  const unit = data.units.find(function (item) {
    return item.id === unitId;
  });
  if (!unit) return;

  const answer = prompt("Enter the new unit name:", unit.name);
  if (answer === null) return;

  const name = answer.trim();
  if (!name) {
    alert("Unit name cannot be empty.");
    return;
  }

  const duplicate = data.units.some(function (item) {
    return item.id !== unitId &&
      item.name.toLowerCase() === name.toLowerCase();
  });

  if (duplicate) {
    alert("A unit with that name already exists.");
    return;
  }

  unit.name = name;
  saveData();
}

function deleteUnit(unitId) {
  if (!requireAdmin()) return;

  const unit = data.units.find(function (item) {
    return item.id === unitId;
  });
  if (!unit) return;

  if (!confirm(
    'Delete "' + unit.name +
    '" and all participants and results belonging to it?'
  )) return;

  const participantIds = data.participants
    .filter(function (p) {
      return p.unitId === unitId;
    })
    .map(function (p) {
      return p.id;
    });

  data.units = data.units.filter(function (u) {
    return u.id !== unitId;
  });

  data.participants = data.participants.filter(function (p) {
    return p.unitId !== unitId;
  });

  data.results = data.results.filter(function (r) {
    return r.unitId !== unitId &&
      !participantIds.includes(r.participantId);
  });

  saveData();
}

// ---------------- PARTICIPANTS ----------------

function addParticipant(event) {
  event.preventDefault();
  if (!requireAdmin()) return;

  const unitId = document.getElementById("participantUnit").value;
  const name = document.getElementById("participantName").value.trim();
  const gender = document.getElementById("participantGender").value;

  if (!data.units.some(function (u) { return u.id === unitId; })) {
    document.getElementById("participantMessage").textContent =
      "Please add and select a church unit first.";
    return;
  }

  if (!name || !["Boy", "Girl"].includes(gender)) {
    document.getElementById("participantMessage").textContent =
      "Enter the participant name and select gender.";
    return;
  }

  data.participants.push({
    id: makeId(),
    unitId: unitId,
    name: name,
    gender: gender
  });

  document.getElementById("participantName").value = "";
  document.getElementById("participantGender").value = "";
  document.getElementById("participantMessage").textContent =
    "Participant added successfully.";

  saveData();
}

function editParticipant(participantId) {
  if (!requireAdmin()) return;

  const participant = data.participants.find(function (p) {
    return p.id === participantId;
  });
  if (!participant) return;

  const newName = prompt("Edit participant name:", participant.name);
  if (newName === null) return;

  const name = newName.trim();
  if (!name) {
    alert("Participant name cannot be empty.");
    return;
  }

  const newGender = prompt(
    'Enter gender: type "Boy" or "Girl".',
    participant.gender
  );
  if (newGender === null) return;

  const gender = newGender.trim().toLowerCase();
  if (!["boy", "girl"].includes(gender)) {
    alert('Gender must be "Boy" or "Girl".');
    return;
  }

  participant.name = name;
  participant.gender = gender === "boy" ? "Boy" : "Girl";
  saveData();
}

function deleteParticipant(participantId) {
  if (!requireAdmin()) return;

  const participant = data.participants.find(function (p) {
    return p.id === participantId;
  });
  if (!participant) return;

  if (!confirm(
    'Delete "' + participant.name + '" and all their event results?'
  )) return;

  data.participants = data.participants.filter(function (p) {
    return p.id !== participantId;
  });

  data.results = data.results.filter(function (r) {
    return r.participantId !== participantId;
  });

  saveData();
}

// ---------------- EVENT RESULTS ----------------

function updateParticipantOptions() {
  const unitId = document.getElementById("resultUnit").value;
  const select = document.getElementById("resultParticipant");

  const participants = data.participants.filter(function (p) {
    return p.unitId === unitId;
  });

  select.innerHTML = '<option value="">Select participant</option>';

  participants.forEach(function (p) {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name + " (" + p.gender + ")";
    select.appendChild(option);
  });

  if (participants.length === 0) {
    select.innerHTML = '<option value="">No participants in this unit</option>';
  }
}

function addResult(event) {
  event.preventDefault();
  if (!requireAdmin()) return;

  const unitId = document.getElementById("resultUnit").value;
  const participantId = document.getElementById("resultParticipant").value;
  const eventName = document.getElementById("eventName").value.trim();
  const pointsText = document.getElementById("eventPoints").value;
  const points = Number(pointsText);

  const participant = data.participants.find(function (p) {
    return p.id === participantId && p.unitId === unitId;
  });

  if (
    !participant ||
    !eventName ||
    pointsText.trim() === "" ||
    !Number.isFinite(points) ||
    points < 0
  ) {
    document.getElementById("resultMessage").textContent =
      "Select a unit and participant, and enter a valid event and points.";
    return;
  }

  data.results.push({
    id: makeId(),
    unitId: unitId,
    participantId: participantId,
    event: eventName,
    points: points
  });

  document.getElementById("eventName").value = "";
  document.getElementById("eventPoints").value = "";
  document.getElementById("resultMessage").textContent =
    "Event points saved successfully.";

  saveData();
}

function editResult(resultId) {
  if (!requireAdmin()) return;

  const result = data.results.find(function (r) {
    return r.id === resultId;
  });
  if (!result) return;

  const newEvent = prompt("Edit event name:", result.event);
  if (newEvent === null) return;

  const eventName = newEvent.trim();
  if (!eventName) {
    alert("Event name cannot be empty.");
    return;
  }

  const pointsText = prompt("Edit points:", String(result.points));
  if (pointsText === null) return;

  const points = Number(pointsText);
  if (
    pointsText.trim() === "" ||
    !Number.isFinite(points) ||
    points < 0
  ) {
    alert("Please enter valid points.");
    return;
  }

  result.event = eventName;
  result.points = points;
  saveData();
}

function deleteResult(resultId) {
  if (!requireAdmin()) return;
  if (!confirm("Delete this event result?")) return;

  data.results = data.results.filter(function (r) {
    return r.id !== resultId;
  });

  saveData();
}

// ---------------- CALCULATIONS ----------------

function getUnitTotal(unitId) {
  return data.results.reduce(function (total, result) {
    return total + (result.unitId === unitId ? Number(result.points) : 0);
  }, 0);
}

function getParticipantTotal(participantId) {
  return data.results.reduce(function (total, result) {
    return total + (
      result.participantId === participantId ? Number(result.points) : 0
    );
  }, 0);
}

function getUnitName(unitId) {
  const unit = data.units.find(function (u) {
    return u.id === unitId;
  });
  return unit ? unit.name : "Unknown Unit";
}

function getParticipant(participantId) {
  return data.participants.find(function (p) {
    return p.id === participantId;
  });
}

function getParticipantName(participantId) {
  const participant = getParticipant(participantId);
  return participant ? participant.name : "Unknown Participant";
}

// ---------------- DROPDOWNS ----------------

function renderUnitDropdowns() {
  ["scoreUnitSelect", "participantUnit", "resultUnit"].forEach(function (id) {
    const select = document.getElementById(id);
    const previousValue = select.value;

    select.innerHTML = '<option value="">Select church unit</option>';

    data.units.forEach(function (unit) {
      const option = document.createElement("option");
      option.value = unit.id;
      option.textContent = unit.name;
      select.appendChild(option);
    });

    if (data.units.some(function (unit) {
      return unit.id === previousValue;
    })) {
      select.value = previousValue;
    }
  });

  updateParticipantOptions();
}

// ---------------- RENDER UNIT LIST ----------------

function renderUnits() {
  const container = document.getElementById("unitNameList");

  if (data.units.length === 0) {
    container.innerHTML = "<p>No units added yet.</p>";
    return;
  }

  container.innerHTML = data.units.map(function (unit) {
    return `
      <div class="unit-item">
        <span>${escapeHTML(unit.name)}</span>
        <span>
          <button class="small-action edit-btn" onclick="renameUnit('${unit.id}')">Edit</button>
          <button class="small-action danger-btn" onclick="deleteUnit('${unit.id}')">Delete</button>
        </span>
      </div>
    `;
  }).join("");
}

// ---------------- RENDER PARTICIPANTS ----------------

function renderParticipants() {
  const container = document.getElementById("participantList");

  if (data.participants.length === 0) {
    container.innerHTML = "<p>No participants added yet.</p>";
    return;
  }

  container.innerHTML = `
    <h4>Participants</h4>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Unit</th><th>Name</th><th>Gender</th><th>Total</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${data.participants.map(function (p) {
            return `
              <tr>
                <td>${escapeHTML(getUnitName(p.unitId))}</td>
                <td>${escapeHTML(p.name)}</td>
                <td>${escapeHTML(p.gender)}</td>
                <td>${formatPoints(getParticipantTotal(p.id))}</td>
                <td>
                  <button class="small-action edit-btn" onclick="editParticipant('${p.id}')">Edit</button>
                  <button class="small-action danger-btn" onclick="deleteParticipant('${p.id}')">Delete</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// ---------------- SCOREBOARD ----------------

function renderScoreboard() {
  const unitId = document.getElementById("scoreUnitSelect").value;
  const unit = data.units.find(function (u) {
    return u.id === unitId;
  });

  document.getElementById("selectedUnitName").textContent =
    unit ? unit.name : "Select a church unit";

  document.getElementById("selectedUnitScore").textContent =
    unit ? formatPoints(getUnitTotal(unitId)) : "0";

  const tbody = document.getElementById("participantScoreRows");

  if (!unit) {
    tbody.innerHTML = '<tr><td colspan="4">Add or select a unit.</td></tr>';
    return;
  }

  const participants = data.participants.filter(function (p) {
    return p.unitId === unitId;
  });

  if (participants.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">No participants added to this unit yet.</td></tr>';
    return;
  }

  const rows = [];

  participants.forEach(function (participant) {
    const results = data.results.filter(function (r) {
      return r.participantId === participant.id;
    });

    if (results.length === 0) {
      rows.push(`
        <tr>
          <td>${escapeHTML(participant.name)}</td>
          <td>${escapeHTML(participant.gender)}</td>
          <td>—</td>
          <td>0</td>
        </tr>
      `);
    } else {
      results.forEach(function (result) {
        rows.push(`
          <tr>
            <td>${escapeHTML(participant.name)}</td>
            <td>${escapeHTML(participant.gender)}</td>
            <td>${escapeHTML(result.event)}</td>
            <td>${formatPoints(result.points)}</td>
          </tr>
        `);
      });
    }
  });

  tbody.innerHTML = rows.join("");
}

// ---------------- LEADERBOARD & AWARDS ----------------

function renderLeaderboard() {
  const tbody = document.getElementById("leaderboardRows");

  const units = data.units.map(function (unit) {
    return {
      id: unit.id,
      name: unit.name,
      total: getUnitTotal(unit.id)
    };
  });

  units.sort(function (a, b) {
    return b.total - a.total || a.name.localeCompare(b.name);
  });

  if (units.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3">No units added yet.</td></tr>';
  } else {
    tbody.innerHTML = units.map(function (unit, index) {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHTML(unit.name)}</td>
          <td><strong>${formatPoints(unit.total)}</strong></td>
        </tr>
      `;
    }).join("");
  }

  renderAwards();
}

function renderAwards() {
  const girls = data.participants.filter(function (p) {
    return p.gender === "Girl";
  });

  const boys = data.participants.filter(function (p) {
    return p.gender === "Boy";
  });

  function findWinners(participants) {
    if (participants.length === 0) return [];

    const scored = participants.map(function (p) {
      return {
        participant: p,
        total: getParticipantTotal(p.id)
      };
    });

    const highest = Math.max.apply(null, scored.map(function (item) {
      return item.total;
    }));

    if (highest <= 0) return [];

    return scored.filter(function (item) {
      return item.total === highest;
    });
  }

  const girlWinners = findWinners(girls);
  const boyWinners = findWinners(boys);

  const girlName = document.getElementById("kalaThilakamName");
  const girlDetails = document.getElementById("kalaThilakamDetails");
  const boyName = document.getElementById("kalaPrathibhaName");
  const boyDetails = document.getElementById("kalaPrathibhaDetails");

  if (girlWinners.length === 0) {
    girlName.textContent = "Not decided yet";
    girlDetails.textContent = "Points: 0";
  } else {
    girlName.textContent = girlWinners.map(function (w) {
      return w.participant.name;
    }).join(" / ");

    girlDetails.textContent =
      "Unit: " + girlWinners.map(function (w) {
        return getUnitName(w.participant.unitId);
      }).join(" / ") +
      " • Points: " + formatPoints(girlWinners[0].total);
  }

  if (boyWinners.length === 0) {
    boyName.textContent = "Not decided yet";
    boyDetails.textContent = "Points: 0";
  } else {
    boyName.textContent = boyWinners.map(function (w) {
      return w.participant.name;
    }).join(" / ");

    boyDetails.textContent =
      "Unit: " + boyWinners.map(function (w) {
        return getUnitName(w.participant.unitId);
      }).join(" / ") +
      " • Points: " + formatPoints(boyWinners[0].total);
  }
}

// ---------------- RENDER RESULTS TABLE ----------------

function renderResults() {
  const tbody = document.getElementById("resultRows");

  if (data.results.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No results recorded yet.</td></tr>';
    return;
  }

  tbody.innerHTML = data.results.slice().reverse().map(function (result) {
    return `
      <tr>
        <td>${escapeHTML(getUnitName(result.unitId))}</td>
        <td>${escapeHTML(getParticipantName(result.participantId))}</td>
        <td>${escapeHTML(result.event)}</td>
        <td>${formatPoints(result.points)}</td>
        <td>
          <button class="small-action edit-btn" onclick="editResult('${result.id}')">Edit</button>
          <button class="small-action danger-btn" onclick="deleteResult('${result.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join("");
}

// ---------------- REFRESH EVERYTHING ----------------

function refreshAll() {
  renderUnitDropdowns();
  renderUnits();
  renderParticipants();
  renderScoreboard();
  renderLeaderboard();
  renderResults();
}

document.addEventListener("DOMContentLoaded", function () {
  refreshAll();
  showPage("home");
});
