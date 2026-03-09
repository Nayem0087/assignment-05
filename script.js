
// loadingSpinner
const loadingSpinner = document.getElementById('loadingSpinner');

function showLoading() {
    loadingSpinner.classList.remove('hidden');
}
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// btn toggling
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

const buttons = [allBtn, openBtn, closedBtn];

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(primary => primary.classList.remove('btn-primary'));
        btn.classList.add('btn-primary')
    });
});

let allIssues = [];

const loadIssues = async () => {

    showLoading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);
    updateCount(allIssues);

    hideLoading();
};

loadIssues();

const displayIssues = (issues) => {

    const container = document.getElementById("card-container");
    container.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");
        
        const image = issue.status === "open" ? "Open-Status.png" : "Closed- Status .png";
        const borderColor = issue.status === "open" ? "border-green-500" : "border-violet-500";

        card.classList = `shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg border-t-4 ${borderColor}`;

        card.innerHTML = `
            <div class="px-4 py-4">
                <div class="flex justify-between py-4">
                    <img src="assets/${image}" alt="${issue.status}">
                    <h5 class="font-medium text-[12px] bg-[#FEECEC] text-[#EF4444] px-6 py-1 rounded-full">
                        ${issue.priority.toUpperCase()}
                    </h5>
                </div>

                <h3 class="font-semibold text-[14px] pb-2">${issue.title}</h3>

                <p class="text-[#64748B] text-[12px] line-clamp-2">
                    ${issue.description}
                </p>

                <div class="flex gap-2 py-4">

                    ${issue.labels?.[0] ? `
                    <a class="flex justify-center items-center gap-1 font-medium text-[10px] bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-full">
                        <img class="scale-90" src="assets/Vector.png">
                        <span>${issue.labels[0].toUpperCase()}</span>
                    </a>` : ""}

                    ${issue.labels?.[1] ? `
                    <a class="flex justify-center items-center gap-1 font-medium text-[10px] bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-full">
                        <img class="scale-90" src="assets/Lifebuoy.png">
                        <span>${issue.labels[1].toUpperCase()}</span>
                    </a>` : ""}

                </div>
            </div>

            <div class="border-t-2 border-[#E4E4E7]">
                <p class="text-[#64748B] text-[12px] px-4 py-3">
                    ${issue.author}
                    <br>
                    <span class="block mt-2">
                        ${new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                </p>
            </div>
        `;

        container.appendChild(card);
    });

};

const updateCount = (issues) => {
    
    const count = document.getElementById("issuesCount");
    count.innerText = `${issues.length} issues`;
};

document.getElementById("allBtn").addEventListener("click", () => {
    displayIssues(allIssues);
    updateCount(allIssues);
});

document.getElementById("openBtn").addEventListener("click", () => {

    const openIssues = allIssues.filter(issue => issue.status === "open");

    displayIssues(openIssues);
    updateCount(openIssues);
});

document.getElementById("closedBtn").addEventListener("click", () => {

    const closedIssues = allIssues.filter(issue => issue.status === "closed");

    displayIssues(closedIssues);
    updateCount(closedIssues);
});

// search
const searchInput = document.getElementById("searchInput");

document.getElementById("searchBtn")
.addEventListener("click", async () => {

    const text = searchInput.value.trim();

    if (!text) {
        displayIssues(allIssues);
        return;
    }

    showLoading();

    try {

        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;
        console.log(url);

        const res = await fetch(url);
        console.log(res);

        const data = await res.json();
        console.log(data);

        displayIssues(data.data);
        updateCount(data.data);

    } catch (err) {
        console.log(err);
    }

    hideLoading();

});

