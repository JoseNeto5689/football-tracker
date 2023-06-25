export function nextID(list) {
    const numbers = new Set();
    for (const objeto of list) {
        numbers.add(objeto.id);
    }
    let nextID = 0;
    while (numbers.has(nextID)) {
        nextID++;
    }

    return nextID;
}