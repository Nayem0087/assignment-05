const issuesContainer = document.getElementById('issuesContainer');
// console.log(issuesContainer);
async function loadIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json();
    // console.log(data);
    displayIssues(data.data);
}

function displayIssues(issues) {
    // console.log(issues);
    issues.forEach(issue => {
        console.log(issue.labels[1]);
        const card = document.createElement('div');
        card.className = 'shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md ';

        //         {
        //     "id": 1,
        //     "title": "Fix navigation menu on mobile devices",
        //     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        //     "status": "open",
        //     "labels": [
        //         "bug",
        //         "help wanted"
        //     ],
        //     "priority": "high",
        //     "author": "john_doe",
        //     "assignee": "jane_smith",
        //     "createdAt": "2024-01-15T10:30:00Z",
        //     "updatedAt": "2024-01-15T10:30:00Z"
        // }
        const labelsHTML = issue.labels
            .filter(label => label) // undefined বাদ দেয়
            .map(label => `
                <a class="flex justify-center items-center gap-1 font-medium text-[12px] bg-gray-200 px-2 py-1 rounded-full">${label}</a>
            `)
            .join('');

        card.innerHTML = `
            <div class="px-4 py-4">
                        <div class="flex justify-between py-4">
                            <img src="assets/Open-Status.png" alt="open-status">
                            <h5 class="font-medium text-[12px] bg-[#FEECEC] text-[#EF4444] px-6 py-1 rounded-full">${issue.priority}
                            </h5>
                        </div>
                        <h3 class="font-semibold text-[14px]pb-2">${issue.title}</h3>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>
                        <div class="flex gap-4 py-4">
                            ${labelsHTML}
                        </div>
                    </div>
                    <div class="border-t-2 border-[#E4E4E7]">
                        <p class="text-[#64748B] text-[12px] px-4 py-3">${issue.author} <br>
                        <span class="block mt-2">${new Date(issue.createdAt).toLocaleDateString()}</span></p>
                    </div>
        `
        issuesContainer.appendChild(card);
    })
}

loadIssues();