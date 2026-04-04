(function () {
  var data = window.HARMONOGRAM_DATA;
  if (!data || !Array.isArray(data.slots)) return;

  var TZ = "Europe/Bratislava";
  var LS_KEY = "stropkovFestDisplayName";

  function parseMinutes(hm) {
    var p = String(hm).split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  function formatMinutes(m) {
    var h = Math.floor(m / 60);
    var min = m % 60;
    return (h < 10 ? "0" : "") + h + ":" + (min < 10 ? "0" : "") + min;
  }

  function bratislavaYmd() {
    return new Date().toLocaleDateString("sv-SE", { timeZone: TZ });
  }

  function bratislavaMinutesNow() {
    var s = new Date().toLocaleString("en-GB", {
      timeZone: TZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    var m = s.match(/(\d{1,2}):(\d{2})/);
    if (!m) return 0;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }

  function isFestivalDay() {
    return bratislavaYmd() === data.festivalDate;
  }

  function renderTable() {
    var tbody = document.getElementById("schedule-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    for (var i = 0; i < data.slots.length; i++) {
      var s = data.slots[i];
      var tr = document.createElement("tr");
      tr.setAttribute("data-slot-index", String(i));
      var tdT = document.createElement("td");
      tdT.className = "time";
      tdT.textContent =
        s.start + (s.end && s.end !== s.start ? " – " + s.end : "");
      var tdP = document.createElement("td");
      tdP.textContent = s.title;
      tr.appendChild(tdT);
      tr.appendChild(tdP);
      tbody.appendChild(tr);
    }
  }

  function findActiveIndex(minutes) {
    for (var i = 0; i < data.slots.length; i++) {
      var s = data.slots[i];
      var a = parseMinutes(s.start);
      var b = parseMinutes(s.end);
      if (minutes >= a && minutes < b) return i;
    }
    return -1;
  }

  function findNextIndex(minutes) {
    for (var i = 0; i < data.slots.length; i++) {
      if (parseMinutes(data.slots[i].start) > minutes) return i;
    }
    return -1;
  }

  function renderActivitiesList(ul, activities) {
    ul.innerHTML = "";
    if (!activities || !activities.length) return;
    for (var i = 0; i < activities.length; i++) {
      var li = document.createElement("li");
      li.textContent = activities[i];
      ul.appendChild(li);
    }
  }

  function highlightTableRow(activeIndex) {
    var rows = document.querySelectorAll("#schedule-tbody tr");
    for (var i = 0; i < rows.length; i++) {
      if (parseInt(rows[i].getAttribute("data-slot-index"), 10) === activeIndex) {
        rows[i].classList.add("schedule-row-active");
      } else {
        rows[i].classList.remove("schedule-row-active");
      }
    }
  }

  function updateLiveBlock() {
    var live = document.getElementById("harmonogram-live");
    if (!live) return;

    var titleEl = live.querySelector(".live-schedule-title");
    var bodyEl = live.querySelector(".live-schedule-body");
    var subEl = live.querySelector(".live-schedule-sub");
    var listEl = live.querySelector(".live-schedule-activities");
    if (!titleEl || !bodyEl || !subEl || !listEl) return;

    if (!isFestivalDay()) {
      titleEl.textContent = "Živý harmonogram";
      bodyEl.textContent =
        "V deň festivalu (" +
        data.festivalDate +
        ") sa tu zobrazí, čo práve prebieha a čo môžete robiť. Dátum upravíte v súbore js/harmonogram-data.js.";
      if (subEl) subEl.textContent = "";
      listEl.innerHTML = "";
      highlightTableRow(-1);
      return;
    }

    var nowM = bratislavaMinutesNow();
    var idx = findActiveIndex(nowM);
    var nextIdx = findNextIndex(nowM);

    highlightTableRow(idx);

    var lastSlot = data.slots[data.slots.length - 1];
    var lastEnd = parseMinutes(lastSlot.end);
    var firstStart = parseMinutes(data.slots[0].start);
    var nextP = live.querySelector(".live-schedule-next");

    if (idx >= 0) {
      var slot = data.slots[idx];
      titleEl.textContent = "Práve prebieha";
      bodyEl.textContent =
        formatMinutes(parseMinutes(slot.start)) +
        " – " +
        formatMinutes(parseMinutes(slot.end)) +
        " · " +
        slot.title;
      if (subEl) subEl.textContent = "Čo môžete teraz robiť";
      renderActivitiesList(listEl, slot.activities);
    } else {
      if (nowM < firstStart) {
        titleEl.textContent = "Ešte pred začiatkom";
        bodyEl.textContent =
          "Program dnes začína o " + data.slots[0].start + ".";
      } else if (nowM >= lastEnd) {
        titleEl.textContent = "Program sa skončil";
        bodyEl.textContent =
          "Ďakujeme za návštevu! Veríme, že sa uvidíme znova.";
      } else {
        titleEl.textContent = "Prestávka medzi blokmi";
        bodyEl.textContent =
          "Práve neprebieha hlavný blok — využite čas na oddych alebo stánky.";
      }
      if (subEl) subEl.textContent = "";
      listEl.innerHTML = "";
    }

    if (nextIdx >= 0 && nowM < lastEnd) {
      var n = data.slots[nextIdx];
      if (nextP) {
        nextP.style.display = "block";
        nextP.innerHTML =
          "<strong>Ďalej:</strong> " + n.start + " — " + n.title;
      }
    } else {
      if (nextP) nextP.style.display = "none";
    }
  }

  function initProfile() {
    var form = document.getElementById("profile-form");
    var input = document.getElementById("profile-display-name");
    var greet = document.getElementById("profile-greeting");
    var pill = document.getElementById("nav-profile-pill");
    if (!form || !input) return;

    try {
      var saved = localStorage.getItem(LS_KEY);
      if (saved) input.value = saved;
    } catch (e) {}

    function applyGreeting() {
      var name = (input.value || "").trim();
      if (greet) {
        if (name) {
          greet.hidden = false;
          greet.textContent = "Vitajte, " + name + "!";
        } else {
          greet.hidden = true;
        }
      }
      if (pill) {
        if (name) {
          pill.hidden = false;
          pill.textContent =
            name.length > 14 ? name.slice(0, 12) + "…" : name;
        } else {
          pill.hidden = true;
        }
      }
    }

    applyGreeting();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (input.value || "").trim();
      try {
        if (v) localStorage.setItem(LS_KEY, v);
        else localStorage.removeItem(LS_KEY);
      } catch (err) {}
      applyGreeting();
    });
  }

  renderTable();
  updateLiveBlock();
  initProfile();
  setInterval(updateLiveBlock, 60000);
})();
