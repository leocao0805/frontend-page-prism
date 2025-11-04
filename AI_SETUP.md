# AI Caption Generation Setup

This project includes an AI-powered caption generation feature using Ollama's tinyllama model.

## Prerequisites

1. **Install Ollama**: https://ollama.ai/
2. **Pull the tinyllama model**:
   ```bash
   ollama pull tinyllama
   ```

## Option 1: Run Ollama Locally (Recommended)

1. Start Ollama:
   ```bash
   ollama serve
   ```

2. The service will be available at `http://localhost:11434`

## Option 2: Run Ollama with Docker

1. Run Ollama container:
   ```bash
   docker run -d -v ~/ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
   ```

2. Pull the model inside the container:
   ```bash
   docker exec -it ollama ollama pull tinyllama
   ```

## Testing the AI Feature

1. Navigate to a project detail page
2. Click "Add Inspiration"
3. Enter a valid URL (e.g., `https://dribbble.com/shots/popular`)
4. Click "Generate Caption with AI"
5. The AI will generate a caption and populate the notes field
6. You can edit the generated caption before saving

## Testing the API Manually

```bash
curl --location 'http://localhost:11434/api/generate' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "tinyllama",
    "prompt": "Generate a caption for this design: https://example.com",
    "stream": false
  }'
```

## Error Handling

The app handles the following scenarios:
- Ollama service not running → Shows error message
- Invalid URL → Validates before calling AI
- Empty AI response → Shows error message
- Network errors → Shows connection error

## Notes

- The AI button is only enabled when a valid URL is entered
- Caption generation takes 2-10 seconds depending on your machine
- You can always edit the AI-generated caption before saving
- The feature works offline if Ollama is running locally
