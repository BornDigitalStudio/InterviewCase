//@ts-ignore
import en from "react-phone-number-input/locale/en";

import jwt_decode from "jwt-decode";

export function getUserData() {
    return JSON.parse(localStorage.getItem("user")!);
}

export function getIdToken() {
    const user = getUserData();
    if (user) {
        return user.idToken;
    } else {
        return null;
    }
}

export function getAccessToken() {
    const user = getUserData();
    if (user) {
        return user.accessToken;
    } else {
        return null;
    }
}

export function getRefreshToken() {
    const user = getUserData();
    if (user) {
        return user;
    } else {
        return null;
    }
}

export function getAccountType() {
    const user = getUserData();
    if (user) {
        return user.accountType?.Value;
    }
}

export function clearUserData() {
    localStorage.removeItem("user");
}

export function setUserData(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function isTokenExpired() {
    const idToken = getIdToken();

    if (idToken) {
        const decoded = jwt_decode<any>(idToken);
        return decoded.exp < Math.trunc(Date.now() / 1000);
    }
}

// export function getAccountType() {
//     const idToken = getIdToken();

// }

export async function handleRefreshToken() {
    const url =
        "https://qo3gvv3gx0.execute-api.eu-central-1.amazonaws.com/prod/auth-refreshToken";
    const token = getIdToken();
    const refreshToken = getRefreshToken();

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                HOST: "qo3gvv3gx0.execute-api.eu-central-1.amazonaws.com",
                "Content-Length": "0",
                Authorization: `${token}`,
                refreshToken: `${refreshToken}`,
            },
        });
        if (res.ok !== true) {
            clearUserData();
            throw new Error("Unauthorized");
        }
        const data = await res.json();

        return data;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export function convertToCurrency(value: number, currency = "USD") {
    return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    });
}

export const validatePhoneNumber = (value: string) => {
    const phoneRegex =
        /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(value) || "Invalid phone number";
};

export function getCountryNames(country: string) {
    return en[country];
}
export function classNamesSkeleton({
    isLoading,
    classes,
}: {
    isLoading?: boolean;
    classes: any;
}) {
    if (isLoading) {
        return classes.filter(Boolean).join(" ") + "animate-pulse bg-gray-300";
    }
    return classes.filter(Boolean).join(" ");
}

export function joinContainerTypes(typeOfContainer: string) {
    return typeOfContainer === "ISOTank"
        ? typeOfContainer
        : typeOfContainer
              .replace(/([A-Z])/g, " $1")
              .split(" ")
              .map((item: any) => item.charAt(0).toUpperCase())
              .join("");
}

export function formatDateTo(timestamp: number) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const year = date.getFullYear();
    //formatting the date to match figma design
    return date
        ?.toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .replace(
            day.toString(),
            `${day}${
                day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
            }`
        )
        .replace(year.toString(), `, ${year}`);
}

export function formatDecimalToPercent(value: number) {
    const newVal = new Intl.NumberFormat("en-IN", { style: "percent" }).format(
        value
    );
    return newVal;
}

export function formatPercentToDecimal(value: number) {
    return value / 100;
}

export function isValidTimestamp(val: any) {
    if (val < 1000) return false;
    return (
        isNaN(Date.parse(val)) &&
        new Date(val).toLocaleDateString() !== "Invalid Date"
    );
}

export function removeEmptyObj<ObjectType>(object: ObjectType) {
    const newObj = { ...object };
    for (const key in newObj) {
        if (
            newObj[key] === "" ||
            newObj[key] === null ||
            newObj[key] === undefined ||
            (Array.isArray(newObj[key]) && (newObj[key] as any).length === 0)
        ) {
            delete newObj[key];
        }
    }
    return newObj;
}
