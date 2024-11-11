# Narakeet Text to Speech Long Content (Polling) API example in JavaScript (NodeJS)

This repository provides a quick example demonstrating how to access the Narakeet [streaming Text to Speech API](https://www.narakeet.com/docs/automating/text-to-speech-api/) from NodeJS. 

The example sends a request to generate audio from text and saves it `output.mp3` in the local directory.

Note that Narakeet also has a text to speech API to generate short content, suitable for quick conversion tasks. See the [Streaming API example](https://github.com/narakeet/text-to-speech-api-nodejs-example) for more information on how to use that.

## Prerequisites

To use this example, you will need NodeJS 20 or later, and an API key for Narakeet.

## Running the example


1. set your Narakeet API key as the environment variable NARAKEET_API_KEY
2. edit [index.mjs](index.mjs) and change the text, format and voice parameters on lines 7-9; optionally you can change how the API key is loaded on line 6 if you do not want to load it from the environment variables.
2. run `node index.mjs`
3. check the file printed by the final status, it will contain the generated MP3 file

## More information

Check out https://www.narakeet.com/docs/automating/text-to-speech-api/ for more information on the Narakeet Text to Speech API
