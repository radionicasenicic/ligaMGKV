const teams = [
    "Четврто 1", "Четврто 2", "Четврто 3", "Четврто 4", 
    "Четврто 5-6", "Четврто 8", "Четврто 7-9", "Професори"
];

const results = [
    // Results format: [Team 1, Team 2, Score 1, Score 2]
    [["Четврто 1", "Четврто 2", 21, 12], ["Четврто 8", "Четврто 7-9", undefined, undefined], ["Четврто 5-6", "Четврто 4", 27, 4], ["Четврто 3", "Професори", 14, 8]],
    // Other rounds...
];

const points = {};

// Initialize teams points
teams.forEach(team => {
    points[team] = 0;
});

// Calculate points from results
results.forEach(round => {
    round.forEach(match => {
        const [team1, team2, score1, score2] = match;

        // Check if scores are undefined (i.e., waiting for the result)
        if (score1 === undefined || score2 === undefined) {
            // No points are assigned in this case
            return;
        }

        if (score1 > score2) {
            points[team1] += 3;
        } else if (score2 > score1) {
            points[team2] += 3;
        } else {
            points[team1] += 1;
            points[team2] += 1;
        }
    });
});

// Display results
const resultsDiv = document.getElementById("results");
results.forEach((round, index) => {
    const roundDiv = document.createElement("div");
    roundDiv.innerHTML = `<h3>Коло ${index + 1}</h3>`;
    
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Тим 1</th>
                <th>Тим 2</th>
                <th>Резултат</th>
            </tr>
        </thead>
    `;

    const tbody = document.createElement("tbody");
    round.forEach(match => {
        const [team1, team2, score1, score2] = match;
        const row = document.createElement("tr");

        // If score is undefined, show "Чека се резултат"
        let resultDisplay = `${score1} - ${score2}`;
        if (score1 === undefined || score2 === undefined) {
            resultDisplay = "Чека се резултат";
        }

        row.innerHTML = `
            <td>${team1}</td>
            <td>${team2}</td>
            <td>${resultDisplay}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    roundDiv.appendChild(table);
    resultsDiv.appendChild(roundDiv);
});

// Display ranking table
const rankingTable = document.getElementById("rankingTable");
const sortedTeams = Object.keys(points).sort((a, b) => points[b] - points[a]);

sortedTeams.forEach(team => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${team}</td>
        <td>${points[team]}</td>
    `;
    rankingTable.appendChild(row);
});
