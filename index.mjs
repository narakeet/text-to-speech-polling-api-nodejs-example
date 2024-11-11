import NarakeetAudioAPI from './narakeet-api.mjs';
import os from 'os';
import path from 'path';
import { randomUUID } from 'crypto';

const APIKEY=process.env.NARAKEET_API_KEY,
	text = 'Hello from the long content polling API.',
	format = 'mp3',
	voice = 'rodney',
	api = new NarakeetAudioAPI(APIKEY /*, pollingInterval*/),
	printProgress = (progressStatus) => {
		console.log(`(${progressStatus.percent}%): ${progressStatus.message}`);
	},
	task = await api.requestAudioTask(text, voice, ),
	taskResult = await api.pollUntilFinished(task.statusUrl, printProgress);

if (!taskResult.succeeded) {
	throw new Error('task failed: ' + taskResult.message);
} else {
	const tempPath = path.join(os.tmpdir(), `${randomUUID()}.${format}`); 
	await api.downloadToFile(taskResult.result, tempPath);
	console.log(`task successful; audio duration is ${taskResult.durationInSeconds} seconds, file downloaded to ${tempPath}`);
}
