const teams = [
    "Четврто 1", "Четврто 2", "Четврто 3", "Четврто 4", 
    "Четврто 5-6", "Четврто 8", "Четврто 7-9", "Професори"
];

const results = [
    // Results format: [Team 1, Team 2, Score 1, Score 2]
    [["Четврто 1", "Четврто 2", 21, 12], ["Четврто 8", "Четврто 7-9", undefined, undefined], ["Четврто 5-6", "Четврто 4", 27, 4], ["Четврто 3", "Професори", 14, 8]],
    [["Четврто 5-6", "Четврто 2",undefined , undefined], ["Четврто 7-9", "Четврто 1", undefined, undefined], ["Четврто 3", "Четврто 8", undefined, undefined], ["Четврто 4", "Професори", undefined, undefined]],
    // Add more rounds if needed...
];

const points = {};
const goals = {};

// Initialize teams points and goals
teams.forEach(team => {
    points[team] = 0;
    goals[team] = { scored: 0, conceded: 0 };
});

// Calculate points and goals from results
results.forEach(round => {
    round.forEach(match => {
        const [team1, team2, score1, score2] = match;

        // Check if scores are undefined (i.e., waiting for the result)
        if (score1 === undefined || score2 === undefined) {
            return; // No points are assigned in this case
        }

        // Update goals scored and conceded
        goals[team1].scored += score1;
        goals[team1].conceded += score2;
        goals[team2].scored += score2;
        goals[team2].conceded += score1;

        // Calculate points
        if (score1 > score2) {
            points[team1] += 3; // Team 1 wins
        } else if (score2 > score1) {
            points[team2] += 3; // Team 2 wins
        } else {
            points[team1] += 1; // Draw
            points[team2] += 1; // Draw
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
const sortedTeams = Object.keys(points).sort((a, b) => {
    // Sort by points
    if (points[b] !== points[a]) {
        return points[b] - points[a];
    }
    // Calculate goal difference
    const goalDifferenceA = goals[a].scored - goals[a].conceded;
    const goalDifferenceB = goals[b].scored - goals[b].conceded;
    if (goalDifferenceB !== goalDifferenceA) {
        return goalDifferenceB - goalDifferenceA; // Sort by goal difference
    }
    // Sort by goals scored if goal difference is the same
    return goals[b].scored - goals[a].scored;
});

sortedTeams.forEach(team => {
    const row = document.createElement("tr");
    const goalDifference = goals[team].scored - goals[team].conceded; // Calculate goal difference
    row.innerHTML = `
        <td>${team}</td>
        <td>${points[team]}</td>
        <td>${goalDifference}</td> <!-- Display goal difference -->
    `;
    rankingTable.appendChild(row);
});
