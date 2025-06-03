async function exposeData() {
    try {
        const data = await window.tools.getFileData();
        window.fileData = JSON.parse(data);
    } catch (error) {
        console.error(error)
    }
}

exposeData();