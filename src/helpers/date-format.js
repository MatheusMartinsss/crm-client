import * as moment from 'moment'


export const formatBRL = (date) => {
    const data = new Date(date)
    let day = moment(data).format("DD/MM/YYYY")
    return day;
}
export const formatENG = (date) => {
    const data = new Date(date)
    let day = moment(data).format("YYYY-MM-DD")
    return day;
}
