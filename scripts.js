function applySymbol(symbol, text) {
    const symbolDict = {
        "@": `@${text}@`,
        "#": `#${text}#`,
        "&": `&${text}&`,
        "$": `$${text}$`
    };
    return symbolDict[symbol] || text;
}

function generateLetter(e) {
    e.preventDefault();

    const dateChoice = document.getElementById("dateChoice");
const timeChoice = document.getElementById("timeChoice");
const startCity = document.getElementById("startCity");
const endCity = document.getElementById("endCity");
const participants = document.getElementById("participants");
const objective = document.getElementById("objective");
const resultText = document.getElementById("resultText");
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");

function applySymbol(symbol, text) {
    const symbolDict = {
        "@": `@${text}@`,
        "#": `#${text}#`,
        "&": `&${text}&`,
        "$": `$${text}$`
    };
    return symbolDict[symbol] || text;
}

function generateLetter(e) {
    e.preventDefault();

    const dateValue = dateChoice.value;
    const timeValue = timeChoice.value;
    const startCityValue = startCity.value;
    const endCityValue = endCity.value;
    const participantsValue = participants.value;
    const objectiveValue = objective.value;

    const letter = `공성 안내

시간: ${dateValue} ${timeValue}

위치: ${startCityValue}

재배치:  ${endCityValue}

참여: ${participantsValue}

목적: ${objectiveValue}

중요한 공성입니다. 맹우 여러분들의 많은 참여 부탁드립니다.`;

    resultText.value = letter;
}

function copyToClipboard() {
    resultText.select();
    document.execCommand("copy");
    alert("텍스트가 클립보드에 복사되었습니다.");
}

generateButton.addEventListener("click", generateLetter);
copyButton.addEventListener("click", copyToClipboard);

