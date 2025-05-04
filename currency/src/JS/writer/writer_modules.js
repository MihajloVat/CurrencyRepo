const fs = require('fs').promises;
const path = require('path');
const {app} = require('electron');

class FileWriter {
    constructor(providerInstance, processorInstance,filePath) {
        this.providerInstance = providerInstance;
        this.processorInstance = processorInstance;
        this.filePath = filePath;

    }

    async write() {
        try {
            const rawData = await this.providerInstance.getData();
            const processedData = this.processorInstance.process(rawData);

            await fs.writeFile(this.filePath, JSON.stringify(processedData, null, 2));
        } catch (error) {
            console.error(error);
        }
    }
}


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

class NBUDataProvider extends DataProvider {
    constructor(dates) {
        super();
        this.dates = dates;
    }

    async getData() {
        const data = [];
        for (const day of this.dates) {
            try {
                const response = await fetch(
                    `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${day}&json`
                );
                const dataOnDay = await response.json();
                data.push(dataOnDay);
            } catch (err) {
                console.log('failed to get Data in DataProvider: ', err);
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
                const code = currency.cc;
                const rate = currency.rate;

                if (!output[code]) {
                    output[code] = [];
                }

                output[code].push(rate);
            }
        }

        return output;
    }
}

module.exports = {NBUDataProvider, NBUDataProcessor, FileWriter};
