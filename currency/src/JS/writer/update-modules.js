const {NBU_URL_BASE, NBU_URL_SUFFIX} = require('./config')
const {MONTH_BACK} = require('./config')
const fs = require('fs').promises;

class DataProvider {
    getData() {
        throw new Error('Method not implemented');
    }
}

class DataProcessor {
    process(rawData) {
        throw new Error('Method not implemented');
    }
}

class FileWriter {
    constructor(providerInstance, processorInstance, filePath) {
        this.providerInstance = providerInstance;
        this.processorInstance = processorInstance;
        this.filePath = filePath;
    }

    async write() {
        try {
            const rawData = await this.providerInstance.getData();

            const processedData = this.processorInstance.process(rawData);

            await fs.writeFile(this.filePath, JSON.stringify(processedData, null, 2));
        } catch (err) {
            console.error('error while writing file (FileWriters instance)', err);
        }
    }
}

class NBUDataProvider extends DataProvider {
    constructor(dates) {
        super();
        this.dates = dates;
    }

    async getData() {
        const data = [];
        for (const day of this.dates) {
            try {
                const response = await fetch(`${NBU_URL_BASE}${day}${NBU_URL_SUFFIX}`);
                const dataOnDay = await response.json();
                data.push(dataOnDay);
            } catch (err) {
                console.log('error while getting data', err);
            }
        }
        return {data, dates: this.dates};
    }
}

class NBUDataProcessor extends DataProcessor {
    process(rawData) {
        const output = {dates: rawData.dates};

        for (const dailyData of rawData.data) {
            for (const currency of dailyData) {
                try {
                    const code = currency.cc;
                    const rate = currency.rate;

                    if (!output[code]) {
                        output[code] = [];
                    }

                    output[code].push(rate);
                } catch (err) {
                    console.error('error while processing data: ', err);
                }
            }
        }

        return output;
    }
}


class NBUProcUpdater extends DataProcessor {
    constructor(oldData, diff) {
        super();
        this.diff = diff;
        this.oldData = oldData;
    }

    update(data) {
        const updatedData = {};

        const oldDates = this.oldData.dates || [];
        const newDates = data.dates || [];
        const datesStartIndex = Math.min(this.diff, oldDates.length);
        updatedData.dates = [...oldDates.slice(datesStartIndex), ...newDates];

        for (const key in this.oldData) {
            if (key === 'dates') continue;
            const oldValues = this.oldData[key] || [];
            const newValues = data[key] || [];
            let valuesStartIndex = null
            if (oldValues.length >= MONTH_BACK) {
                valuesStartIndex = Math.min(this.diff, oldValues.length);
            } else {
                valuesStartIndex = 0
            }
            updatedData[key] = [...oldValues.slice(valuesStartIndex), ...newValues];
        }

        for (const key in data) {
            if (!updatedData[key] && key !== 'dates') {
                updatedData[key] = [...data[key]];
            }
        }

        return updatedData;
    }

    process(newData) {
        const data = {dates: newData.dates};

        for (const dailyData of newData.data) {
            for (const currency of dailyData) {
                try {
                    const code = currency.cc;
                    const rate = currency.rate;

                    if (!data[code]) {
                        data[code] = [];
                    }

                    data[code].push(rate);
                } catch (err) {
                    console.error('error while processing data: ', err);
                }
            }
        }
        console.log(JSON.stringify(data, null, 2));
        return this.update(data);
    }
}


module.exports = {NBUDataProvider, NBUProcUpdater, NBUDataProcessor, FileWriter};
