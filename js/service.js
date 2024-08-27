function getRandInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function choiceInList(list) {
    let size = list.length;
    let index = getRandInt(0, size - 1);
    return list[index];
}

export { getRandInt, choiceInList }