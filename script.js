const issuesContainer = document.getElementById('issuesContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
// console.log(issuesContainer);

function showLoading() {
    loadingSpinner.classList.remove('hidden');
    issuesContainer.innerHTML = '';
}
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

async function loadIssues() {
    showLoading();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json();
    // console.log(data);
    hideLoading();
    displayIssues(data.data);
}

function displayIssues(issues) {
    // console.log(issues);
    issues.forEach(issue => {
        // console.log(issue.labels[1]);
        const image = issue.status === "open" ? "Open-Status.png" : "Closed- Status .png";
        const card = document.createElement('div');
        card.className = 'shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md ';

        card.innerHTML = `
            <div class="px-2 py-4">
                        <div class="flex justify-between py-4">
                            <img src="assets/${image}" alt="${issue.status}">
                            <h5 class="font-medium text-[12px] bg-[#FEECEC] text-[#EF4444] px-6 py-1 rounded-full">${issue.priority.toUpperCase()}
                            </h5>
                        </div>
                        <h3 class="font-semibold text-[14px]pb-2">${issue.title}</h3>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>
                        <div class="flex gap-2 py-4">
                            ${issue.labels?.[0] ? `
                            <a class="flex justify-center items-center gap-1 font-medium text-[10px] bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-full" href="">
                            <img class="scale-90" src="assets/Vector.png" alt="vector">
                            <span>${issue.labels[0].toUpperCase()}</span>
                            </a> ` : ""}

                            ${issue.labels?.[1] ? `
                            <a class="flex justify-center items-center gap-1 font-medium text-[10px] bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-full static" href="">
                            <img class="scale-90" src="assets/Lifebuoy.png" alt="vector">
                            <span>${issue.labels[1].toUpperCase()}</span>
                            </a> ` : ""}
                            </div>
                    </div>
                    <div class="border-t-2 border-[#E4E4E7]">
                        <p class="text-[#64748B] text-[12px] px-4 py-3">${issue.author} <br>
                        <span class="block mt-2">${new Date(issue.createdAt).toLocaleDateString()}</span></p>
                    </div>
        `;
        issuesContainer.appendChild(card);
    })
}

loadIssues();