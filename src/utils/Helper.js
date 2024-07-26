import { parse } from "libphonenumber-js"

let countryCurrencySymbol = {
    "USD" : "$",
    "EUR" : "€",
    "GBP" : "£",
    "CAD" : "CAD",
    "AUD" : "AUD"
}

export const amoutRateConversion = (amount, rate, country) => {
    let newAmount = (parseFloat(amount) * rate).toFixed(2)
    let final = newAmount*100/100
    if(countryCurrencySymbol[country]) {
        return String(final) + " " + countryCurrencySymbol[country]
    }
    return String(final) + " " + country?.toUpperCase()
    return amount
}

export const valueRateConversion = (value, rate) => {
    let newAmount = (parseFloat(value) * rate).toFixed(2)
    let final = newAmount*100/100
    return String(final)
}

export const symbolAmount = (amount, country) => {
    if(!countryCurrencySymbol[country]) {
        return String(amount) + " " + country?.toUpperCase()
    }
    return String(amount) + " " + countryCurrencySymbol[country] || country?.toUpperCase()
}

export const reconvertAmount = (amount, rate) => {
    let newAmount = (parseFloat(amount) / rate).toFixed(2)
    return newAmount
}