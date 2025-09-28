let idCounter = 0;

export const v4 = () => {
    idCounter += 1;
    return `mock-uuid-${idCounter}`;
};

export const __resetCounter = () => {
    idCounter = 0;
};