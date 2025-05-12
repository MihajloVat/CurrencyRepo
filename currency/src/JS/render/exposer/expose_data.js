(async () => {
    try {
        const data = await window.tools.readData();
        window.fileData = JSON.parse(data);
    } catch (error) {
        console.error(error)
    }
})()