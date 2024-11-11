import https from 'https';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { setTimeout } from 'timers/promises';

class AudioAPI {
  constructor(apiKey, pollingInterval = 5000, apiUrl = 'https://api.narakeet.com') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.pollingInterval = pollingInterval;
  }

  requestAudioTask(text, voice, format = 'mp3') {
    const url = `${this.apiUrl}/text-to-speech/${format}?voice=${voice}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'x-api-key': this.apiKey,
      }
    };
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(text, 'utf8');
      req.end();
    });
  }

  async pollUntilFinished(taskUrl, progressCallback = null) {
    while (true) {
      const response = await this.getRequest(taskUrl),
        jsonResponse = JSON.parse(response);
      if (jsonResponse.finished) {
        return jsonResponse;
      }
      if (jsonResponse) {
        progressCallback(jsonResponse);
      }
      await setTimeout(this.pollingInterval);
    }
  }

  downloadToFile(url, filePath) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 200) {
			const file = fs.createWriteStream(filePath);
			res.pipe(file);
			file.on('finish', () => file.close(resolve));
        } else {
          reject(new Error(`Failed to download file: Status code ${res.statusCode}`));
        }
      }).on('error', reject);
    });
  }

  getRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, {}, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
          }
        });
      }).on('error', reject);
    });
  }
}

export default AudioAPI;

