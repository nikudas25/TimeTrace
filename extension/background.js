// -----------------------------
// GLOBAL VARIABLES
// -----------------------------
let activeTab = null;
let startTime = null;
let isActive = true;

// -----------------------------
// DAILY RESET LOGIC
// -----------------------------
function checkAndResetData() {
    const today = new Date().toDateString();

    chrome.storage.local.get(["lastResetDate"], (result) => {
        if (result.lastResetDate !== today) {
            chrome.storage.local.set({
                data: {},
                lastResetDate: today
            }, () => {
                console.log("✅ Data reset for new day");
            });
        }
    });
}

// Run on startup
checkAndResetData();

// Run every minute
setInterval(checkAndResetData, 60 * 1000);

// -----------------------------
// CLEAN DOMAIN FUNCTION
// -----------------------------
function getCleanDomain(url) {
    try {
        const domain = new URL(url).hostname;

        if (
            !domain ||
            domain === "localhost" ||
            domain === "127.0.0.1" ||
            domain.includes("chrome") ||
            domain.includes("newtab") ||
            domain.includes("extensions")
        ) {
            return null;
        }

        return domain;
    } catch {
        return null;
    }
}

// -----------------------------
// SAVE DATA FUNCTION
// -----------------------------
function saveData(url, timeSpent) {
    const domain = getCleanDomain(url);

    if (!domain) return; // skip junk

    chrome.storage.local.get(["data"], (result) => {
        let data = result.data || {};

        if (!data[domain]) {
            data[domain] = 0;
        }

        data[domain] += timeSpent;
        sendToBackend(domain, timeSpent);

        chrome.storage.local.set({ data }, () => {
            console.log("💾 Saved:", domain, data[domain]);
        });
    });
}

// -----------------------------
// IDLE DETECTION
// -----------------------------
chrome.idle.onStateChanged.addListener((state) => {
    isActive = (state === "active");
});

// -----------------------------
// TAB SWITCH TRACKING
// -----------------------------
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    // Save previous tab time
    if (activeTab && startTime && isActive) {
        const timeSpent = Date.now() - startTime;

        if (timeSpent >= 2000) { // ignore very small durations
            saveData(activeTab.url, timeSpent);
            console.log("⏱ Tracked:", activeTab.url, timeSpent);
        }
    }

    // Start tracking new tab
    activeTab = tab;
    startTime = Date.now();
});

// -----------------------------
// TAB UPDATE (URL CHANGE)
// -----------------------------
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        activeTab = tab;
        startTime = Date.now();
    }
});


// Connect Extension → Backend
function sendToBackend(domain, timeSpent) {
    console.log("🚀 Attempting fetch:", domain, timeSpent);

    fetch("http://127.0.0.1:8000/api/save/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            domain: domain,
            time_spent: timeSpent
        })
    })
    .then(res => {
        console.log("📡 Raw response:", res);
        console.log("📡 Status:", res.status);
        return res.json();
    })
    .then(data => console.log("✅ Parsed response:", data))
    .catch(err => console.error("❌ Fetch failed:", err));
}




function getCleanDomain(url) {
    try {
        const domain = new URL(url).hostname;

        // ❌ Block unwanted domains
        if (
            !domain ||
            domain === "localhost" ||
            domain === "127.0.0.1" ||
            domain.includes("chrome") ||
            domain.includes("newtab") ||
            domain.includes("extensions")
        ) {
            return null;
        }

        return domain;
    } catch {
        return null;
    }
}
