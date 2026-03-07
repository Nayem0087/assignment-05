const issuesContainer = document.getElementById('issuesContainer');
// console.log(issuesContainer);
async function loadIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json();
    console.log(data);
    displayIssues(data.data);
}

function displayIssues(issues) {
    console.log(issues);
    issues.forEach(issue => {
        console.log(issue);
        const card = document.createElement('div');
        card.className = 'shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md ';
        card.innerHTML = `
            <div class="px-4 py-4">
                        <div class="flex justify-between py-4">
                            <img src="assets/Open-Status.png" alt="open-status">
                            <h5 class="font-medium text-[12px] bg-[#FEECEC] text-[#EF4444] px-6 py-1 rounded-full">High
                            </h5>
                        </div>
                        <h3 class="font-semibold text-[14px]pb-2">Fix navigation menu on mobile devices</h3>
                        <p class="text-[#64748B] text-[12px]">The navigation menu doesn't collapse properly on mobile
                            devices...</p>
                        <div class="flex gap-4 py-4">
                            <a class="flex justify-center items-center gap-1 font-medium text-[12px] bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-full"
                                href="">
                                <img class="scale-90" src="assets/Vector.png" alt="vector">
                                <span>Blog</span>
                            </a>
                            <a class="flex justify-center items-center gap-1 font-medium text-[12px] bg-[#FFF8DB] text-[#D97706] px-3 py-1 rounded-full"
                                href="">
                                <img class="scale-90" src="assets/Lifebuoy.png" alt="vector">
                                <span>Help Wanted</span>
                            </a>
                        </div>
                    </div>
                    <div class="border-t-2 border-[#E4E4E7]">
                        <p class="text-[#64748B] text-[12px] px-4 py-3">#1by john_doe <br> 1/15/2024</p>
                    </div>
        `
        issuesContainer.appendChild(card);
    })
}

loadIssues();