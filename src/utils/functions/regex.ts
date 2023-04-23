export const splittByCamelCase = (str: string) => {
    if (str === "ISOTank") return "ISO Tank";
    if (str === "ETDAtLoading") return "ETD POL";
    if (str === "ETAAtDischarge") return "ETA POD";
    return str.replace(/([a-z]+)([A-Z])/g, "$1 $2");
};

export const firstLetterReturn = (str: string) => {
    if (str === "ISOTank") return "ISO";
    const splittedString = splittByCamelCase(str);
    const first = splittedString.charAt(0).toUpperCase();
    const second = splittedString.split(" ")[1][0].toUpperCase();

    return first + second;
};
