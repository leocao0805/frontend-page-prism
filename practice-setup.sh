#!/bin/bash

# 🚀 Quick Start Script for Practice
# Run this before each timed practice session

echo "🎯 Setting up Page Prism practice environment..."
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node 18+ first."
    exit 1
fi

echo "✅ Node version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi
echo ""

# Check if Ollama is running (for AI bonus feature)
echo "🤖 Checking Ollama (for AI bonus feature)..."
if curl -s http://localhost:11434/api/version > /dev/null 2>&1; then
    echo "✅ Ollama is running on localhost:11434"
else
    echo "⚠️  Ollama is NOT running. AI feature (Story 7) won't work."
    echo "   To start Ollama:"
    echo "   docker run -d -v ~/ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama"
    echo "   docker exec -it ollama ollama run tinyllama"
fi
echo ""

# Open helpful files
echo "📖 Opening practice files..."
echo "   - PRACTICE_PLAN.md (the 6 stories + AI bonus)"
echo "   - PRACTICE_TEMPLATES.md (code templates)"
echo "   - PRACTICE_CHECKLIST.md (75-min timeline)"
echo "   - TALKING_POINTS.md (what to say during interview)"
echo ""

# Summary
echo "✅ Environment is ready!"
echo ""
echo "🎯 Next steps:"
echo "   1. Set a 75-minute timer"
echo "   2. Open PRACTICE_CHECKLIST.md"
echo "   3. Run: npm run dev (in one terminal)"
echo "   4. Run: npm test -- --watch (in another terminal)"
echo "   5. Open: http://localhost:5173 in browser"
echo ""
echo "💡 Pro tip: Read all 7 stories first (5 min), then start coding!"
echo ""
echo "Good luck! 🍀"
