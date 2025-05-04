const fileReader = window.api.fileReader;

(async () => {
    try {
        const data = await fileReader.readData();
        window.fileData = JSON.parse(data);
    } catch (error) {
        console.error(error)
    }
})()