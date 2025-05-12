//used in writer_modules.js (NBU data provider)
const NBU_URL_BASE = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=`
const NBU_URL_SUFFIX = `&json`

//used as default parameter in dates_getter (getDates)
const MONTH_BACK = 120;

module.exports = {NBU_URL_BASE, NBU_URL_SUFFIX, MONTH_BACK};