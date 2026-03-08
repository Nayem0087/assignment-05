
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
        card.classList = "shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg";

        const image = issue.status === "open" ? "Open-Status.png" : "Closed- Status .png";

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



// const issuesContainer = document.getElementById('issuesContainer');
// const loadingSpinner = document.getElementById('loadingSpinner');
// console.log(issuesContainer);

// function showLoading() {
//     loadingSpinner.classList.remove('hidden');
//     issuesContainer.innerHTML = '';
// }
// function hideLoading() {
//     loadingSpinner.classList.add('hidden');
// }

// // btn toggling
// const allBtn = document.getElementById("allBtn");
// const openBtn = document.getElementById("openBtn");
// const closedBtn = document.getElementById("closedBtn");

// const buttons = [allBtn, openBtn, closedBtn];

// buttons.forEach(btn => {
//     btn.addEventListener("click", () => {
//         buttons.forEach(primary => primary.classList.remove("btn-primary"));
//         btn.classList.add("btn-primary");

// //         const res =  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}')
// //         const data = res.json();
// //         console.log(data);
// //     });
// // });


// loadIssues();

// async function loadIssues() {
//     showLoading();
//     const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
//     const data = await res.json();
//     // console.log(data);
//     hideLoading();
//     displayIssues(data.data);
// }

// function displayIssues(issues) {
//     // console.log(issues);
//     issues.forEach(issue => {
//         // console.log(issue.labels[1]);
        // const image = issue.status === "open" ? "Open-Status.png" : "Closed- Status .png";
//         const card = document.createElement('div');
        // card.className = 'shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md ';

        // card.innerHTML = `
        //     <div class="px-4 py-4">
        //                 <div class="flex justify-between py-4">
        //                     <img src="assets/${image}" alt="${issue.status}">
        //                     <h5 class="font-medium text-[12px] bg-[#FEECEC] text-[#EF4444] px-6 py-1 rounded-full">${issue.priority.toUpperCase()}
        //                     </h5>
        //                 </div>
        //                 <h3 class="font-semibold text-[14px]pb-2">${issue.title}</h3>
        //                 <p class="text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>
        //                 <div class="flex gap-2 py-4">
        //                     ${issue.labels?.[0] ? `
        //                     <a class="flex justify-center items-center gap-1 font-medium text-[10px] bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-full" href="">
        //                     <img class="scale-90" src="assets/Vector.png" alt="vector">
        //                     <span>${issue.labels[0].toUpperCase()}</span>
        //                     </a> ` : ""}

        //                     ${issue.labels?.[1] ? `
        //                     <a class="flex justify-center items-center gap-1 font-medium text-[10px] bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-full static" href="">
        //                     <img class="scale-90" src="assets/Lifebuoy.png" alt="vector">
        //                     <span>${issue.labels[1].toUpperCase()}</span>
        //                     </a> ` : ""}
        //                     </div>
        //             </div>
        //             <div class="border-t-2 border-[#E4E4E7]">
        //                 <p class="text-[#64748B] text-[12px] px-4 py-3">${issue.author} <br>
        //                 <span class="block mt-2">${new Date(issue.createdAt).toLocaleDateString()}</span></p>
        //             </div>
        // `;
//         issuesContainer.appendChild(card);
//     })
// }

// loadIssues();






// const API_BASE = "https://phi-lab-server.vercel.app/api/v1/lab";

// const container = document.getElementById("issuesContainer");
// const spinner = document.getElementById("loadingSpinner");

// const btnAll = document.getElementById("allBtn");
// const btnOpen = document.getElementById("openBtn");
// const btnClosed = document.getElementById("closedBtn");

// let issuesStore = [];

// // loader control
// function toggleLoader(state) {
//     if (state) {
//         spinner.classList.remove("hidden");
//         container.classList.add("hidden");
//     } else {
//         spinner.classList.add("hidden");
//         container.classList.remove("hidden");
//     }
// }

// // load all issues
// async function loadIssues() {
//     toggleLoader(true);

//     try {
//         const res = await fetch(`${API_BASE}/issues`);
//         const data = await res.json();
//         issuesStore = data.data;

//         renderIssues(issuesStore);
//     } catch (err) {
//         console.log(err);
//     }

//     toggleLoader(false);
// }

// // render issues
// function renderIssues(list) {

//     container.innerHTML = "";

//     list.forEach(issue => {

//         const card = document.createElement("div");

//         const borderColor = issue.status === "open"
//             ? "border-green-500"
//             : "border-purple-500";

//         card.className = `border-t-4 ${borderColor} shadow p-4 rounded cursor-pointer hover:shadow-lg`;

//         card.innerHTML = `
//         <h2 class="font-semibold text-lg mb-1">${issue.title}</h2>
//         <p class="text-sm text-gray-500 mb-2">${issue.description.slice(0,80)}...</p>

//         <div class="text-sm space-y-1">
//             <p><span class="font-medium">Author:</span> ${issue.author}</p>
//             <p><span class="font-medium">Priority:</span> ${issue.priority}</p>
//             <p><span class="font-medium">Label:</span> ${issue.label}</p>
//             <p><span class="font-medium">Created:</span> ${issue.createdAt}</p>
//         </div>
//         `;

//         card.addEventListener("click", () => {
//             loadIssueDetails(issue.id);
//         });

//         container.appendChild(card);
//     });

// }

// // filter open
// btnOpen.addEventListener("click", () => {

//     setActive(btnOpen);

//     const filtered = issuesStore.filter(i => i.status === "open");

//     renderIssues(filtered);

// });

// // filter closed
// btnClosed.addEventListener("click", () => {

//     setActive(btnClosed);

//     const filtered = issuesStore.filter(i => i.status === "closed");

//     renderIssues(filtered);

// });

// // show all
// const issueCount = document.getElementById("issueCount");
// btnAll.addEventListener("click", () => {

//     setActive(btnAll);

//     renderIssues(issuesStore);

// });

// // active button style
// function setActive(btn) {

//     [btnAll, btnOpen, btnClosed].forEach(b => {
//         b.classList.remove("btn-primary");
//     });

//     btn.classList.add("btn-primary");

// }


// // search
// const searchInput = document.querySelector("input");

// document.querySelector(".btn-primary").addEventListener("click", async () => {

//     const text = searchInput.value.trim();

//     if (!text) {
//         renderIssues(issuesStore);
//         return;
//     }

//     toggleLoader(true);

//     try {

//         const res = await fetch(`${API_BASE}/issues/search?q=${text}`);
//         const data = await res.json();

//         renderIssues(data.data);

//     } catch (err) {
//         console.log(err);
//     }

//     toggleLoader(false);

// });


// // issue details modal
// async function loadIssueDetails(id) {

//     const res = await fetch(`${API_BASE}/issue/${id}`);
//     const data = await res.json();

//     showModal(data.data);

// }

// function showModal(issue) {

//     const modal = document.createElement("dialog");

//     modal.className = "modal";

//     modal.innerHTML = `
//     <div class="modal-box">

//         <h3 class="font-bold text-xl mb-2">${issue.title}</h3>

//         <p class="mb-3">${issue.description}</p>

//         <div class="space-y-1 text-sm">

//         <p><b>Author:</b> ${issue.author}</p>
//         <p><b>Status:</b> ${issue.status}</p>
//         <p><b>Priority:</b> ${issue.priority}</p>
//         <p><b>Label:</b> ${issue.label}</p>
//         <p><b>Created At:</b> ${issue.createdAt}</p>

//         </div>

//         <div class="modal-action">
//         <form method="dialog">
//         <button class="btn">Close</button>
//         </form>
//         </div>

//     </div>
//     `;

//     document.body.appendChild(modal);

//     modal.showModal();

// }

// // initial load
// loadIssues();



