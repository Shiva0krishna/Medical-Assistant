 import fs from 'fs/promises';
import path from 'path';

export async function getDatafromJson(message) {
    try {
        const filePath = path.resolve('D:/Projects/docs-editor/my-turborepo/apps/httpprotocol/routes/data.json');
        const fileData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileData);

        for (const key in data) {
            if (message.toLowerCase().includes(key.toLowerCase())) {
                const diseaseData = data[key];
                const lowerMessage = message.toLowerCase();

                if (lowerMessage.includes("treatment")) {
                    return diseaseData.treatment;
                } else if (lowerMessage.includes("causes")) {
                    return diseaseData.causes;
                } else if (lowerMessage.includes("symptoms")) {
                    return diseaseData.symptoms;
                } else if (lowerMessage.includes("description")) {
                    return diseaseData.description;
                } else {
                    return diseaseData.description;
                }
            }
        }

        return `No relevant information found for your message: '${message}'`;
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error fetching data';
    }
}
