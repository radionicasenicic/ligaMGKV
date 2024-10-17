const teams = [
    "Четврто 1", "Четврто 2", "Четврто 3", "Четврто 4", 
    "Четврто 5-6", "Четврто 8", "Четврто 7-9", "Професори"
];

const results = [
    // Results format: [Team 1, Team 2, Score 1, Score 2]
    [["Четврто 1", "Четврто 2", 3, 1], ["Четврто 3", "Четврто 4", 2, 2], ["Четврто 5-6", "Четврто 8", 0, 0], ["Четврто 7-9", "Професори", 1, 3]],
   [["Четврто 1", "Четврто 3", 4, 2], ["Четврто 2", "Четврто 4", 1, 1], ["Четврто 5-6", "Четврто 7-9", 2, 3], ["Четврто 8", "Професори", 1, 4]],
    // Add other round results here for the 7 rounds...
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
        row.innerHTML = `
            <td>${team1}</td>
            <td>${team2}</td>
            <td>${score1} - ${score2}</td>
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
