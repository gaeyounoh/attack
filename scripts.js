document.getElementById("generateButton").addEventListener("click", generateLetter);
document.getElementById("copyButton").addEventListener("click", copyToClipboard);

let cities = {};

async function fetchCities() {
    const sheetId = '1Nw8tCyNPqVXhvvjPEwDCbjf0mCqgXrzpshDYxUNTXd4';
    const sheetName = 'city';
    const cityUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    const response = await fetch(cityUrl);
    const csvContent = await response.text();
    const csvLines = csvContent.split('\n');
    const headers = csvLines[0].split(',');

    for (let i = 1; i < csvLines.length; i++) {
        const cityData = csvLines[i].split(',');
        const cityNameIndex = headers.indexOf('도시명');
        const coordinatesIndex = headers.indexOf('좌표');

        const cityName = cityData[cityNameIndex];
        const coordinates = cityData[coordinatesIndex];

        cities[cityName] = coordinates;
    }
}

fetchCities();

function applySymbol(symbol, text) {
    const symbolDict = {
        "@": `@${text}@`,
        "#": `#${text}#`,
        "&": `&${text}&`,
        "$": `$${text}$`
    };

    return symbolDict[symbol] || text;
}

function generateLetter() {
    const dateChoice = document.getElementById("datePicker").value;
    const timeChoice = document.getElementById("timePicker").value;
    const datetimeChoice = `${dateChoice} ${timeChoice}`;

    const startCity = document.getElementById("startCity").value;
    const endCity = document.getElementById("endCity").value;
    const participants = document.getElementById("participants").value;
    const objective = document.getElementById("objective").value;

    const timeSymbol = document.getElementById("timeSymbol").value;
    const locationSymbol = document.getElementById("locationSymbol").value;
    const relocationSymbol = document.getElementById("relocationSymbol").value;
    const participationSymbol = document.getElementById("participationSymbol").value;
    const objectiveSymbol = document.getElementById("objectiveSymbol").value;

    const datetimeText = applySymbol(timeSymbol, datetimeChoice);
    const startCityText = applySymbol(locationSymbol, `${startCity} 좌표 ${cities[startCity] || ''}`);
    const endCityText = applySymbol(relocationSymbol, `${endCity} 좌표 ${cities[endCity] || ''}`);
    const participantsText = applySymbol(participationSymbol, participants);
    const objectiveText = applySymbol(objectiveSymbol, objective);

    const letter = `공성 안내

시간: ${datetimeText}

위치: ${startCityText}

재배치: ${endCityText}

참여: ${participantsText}

목적: ${objectiveText}

중요한 공성입니다. 맹우 여러분들의 많은 참여 부탁드립니다.`;

    document.getElementById("resultText").value = letter;
}

function copyToClipboard() {
    const resultText = document.getElementById("resultText");
    resultText.select();
    document.execCommand("copy");

    alert("텍스트가 클립보드에 복사되었습니다.");
}
