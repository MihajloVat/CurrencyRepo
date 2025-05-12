const {NBU_URL_BASE, NBU_URL_SUFFIX} = require('./writer_config')

const fs = require('fs').promises;

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
            console.error('error while writing file', err);
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
                    `${NBU_URL_BASE}${day}${NBU_URL_SUFFIX}`
                );
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

module.exports = {NBUDataProvider, NBUDataProcessor, FileWriter};
