const axios = require("axios");
const fs = require('fs');
const csv = require('csv-parser');
const d = new Date();

async function readCSVFile(fileName) {
    return new Promise((resolve, reject) => {
        const fileContents = [];
        fs.createReadStream(fileName)
            .pipe(csv())
            .on('data', (row) => {
                fileContents.push(row);
            })
            .on('end', () => {
                resolve(fileContents);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function main() {
    const fileNames = ["aq.csv", "sr-aq.csv", "WM-WD.csv"];
    const allFileContents = [];

    try {
        for (const fileName of fileNames) {
            const response = await axios.post("http://localhost:3000/register", { name: fileName });
            const insertedData = response.data.insertedData;
            console.log(response.data.insertedData);
            const fileContents = await readCSVFile(fileName);
            // insertedData.csvContents = fileContents;

            allFileContents.push(fileContents);
        }

        // console.log(allFileContents);
    } catch (error) {
        console.error("Error occurred:", error);
    }

    var reqSent = 0;
    var avgResposeTime = 0;
    async function sendData() {
        const time = d.getTime();
        var sen = Math.floor((Math.random() * 2));
        var data = Math.floor((Math.random() * (allFileContents[sen].length)))
        var sensorInfo = allFileContents[sen][data];

        sensorInfo.sensorData = fileNames[sen];
        sensorInfo.startTime = time;


        try {
            const response = await axios.post("http://localhost:3000/info", sensorInfo);
            const newTime = d.getTime();
            const responseTime = newTime - time;
            console.log("response time: ", responseTime);
            reqSent += 1;
            avgResposeTime += responseTime;
            console.log("avgResposeTime: ", avgResposeTime / reqSent);
            // console.log(response.data.insertedData)
        } catch (e) {
            console.log(e)
        }
    }


    setInterval(sendData, 5000);


}

main();
