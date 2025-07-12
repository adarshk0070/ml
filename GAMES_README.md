# 🎮 Game Hub - Complete Game Collection

This project includes a comprehensive collection of games with proper routing and navigation.

## 🎯 Available Games

### 1. **Chess Game** (`/games/chess`)
- **File**: `src/components/ChessGame.jsx`
- **Features**: 
  - Full chess board with all pieces
  - Valid move validation
  - Checkmate detection
  - Captured pieces tracking
  - Clean, modern UI

### 2. **Tic-Tac-Toe** (`/games/tictactoe`)
- **File**: `src/components/TicTacToe.jsx`
- **Features**:
  - Human vs Human mode
  - Human vs AI mode (with smart AI)
  - Score tracking
  - Winning animations
  - Both arrow keys and WASD support

### 3. **Connect Four** (`/games/connect4`)
- **File**: `src/components/ConnectFour.jsx`
- **Features**:
  - Classic Connect Four gameplay
  - Human vs Human and Human vs AI modes
  - Animated piece dropping
  - Winning line highlighting
  - Score tracking

### 4. **Snake & Ladder** (`/games/snakeladder`)
- **File**: `src/components/SnakeAndLadder.jsx`
- **Features**:
  - 10x10 board with snakes and ladders
  - Dice rolling animation
  - Move history tracking
  - Human vs Human and Human vs AI modes
  - Visual game pieces

### 5. **Car Racing** (`/games/car`)
- **File**: `src/components/carGame.jsx`
- **Features**:
  - Multiple cars and tracks
  - Character selection
  - Real-time racing with obstacles
  - Audio controls
  - Scoring system

### 6. **Bike Racing** (`/games/bike`)
- **File**: `src/components/BikeGame.jsx`
- **Features**:
  - Bike racing mechanics
  - Multiple tracks
  - Obstacle navigation

### 7. **Quiz Game** (`/games/quiz`)
- **File**: `src/components/QuizGame.jsx`
- **Features**:
  - Multiple choice questions
  - Score tracking
  - Timer functionality

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Access the games**:
   - Main menu: `http://localhost:3001/`
   - Game selection: `http://localhost:3001/#/games`
   - Direct game access: `http://localhost:3001/#/games/[game-name]`

## 🎮 Game Controls

### Chess
- **Click** to select and move pieces
- **ESC** to deselect

### Tic-Tac-Toe
- **Click** on squares to place X/O
- **Radio buttons** to switch between Human vs AI

### Connect Four
- **Click** on columns to drop pieces
- **Radio buttons** to switch game modes

### Snake & Ladder
- **Click "Roll Dice"** to roll dice
- **Radio buttons** to switch between Human vs AI

### Car Racing
- **Arrow Keys** or **WASD** to control car
- **ESC** to pause/resume
- **Click volume icon** to mute/unmute

### Bike Racing
- **Arrow Keys** for movement
- **Space** for actions

## 📁 Project Structure

```
src/
├── components/
│   ├── ChessGame.jsx          # Chess game component
│   ├── TicTacToe.jsx          # Tic-tac-toe game
│   ├── ConnectFour.jsx        # Connect Four game
│   ├── SnakeAndLadder.jsx     # Snake & Ladder game
│   ├── carGame.jsx            # Car racing game
│   ├── BikeGame.jsx           # Bike racing game
│   ├── QuizGame.jsx           # Quiz game
│   └── GameMenu.jsx           # Game selection menu
├── App.jsx                    # Main app with routing
├── GameList.jsx               # Game list page
├── Home.jsx                   # Home page
└── styles/
    └── game.css               # Game styles
```

## 🎨 Features

- **Responsive Design**: All games work on desktop and mobile
- **Modern UI**: Clean, professional interface
- **Smooth Animations**: Enhanced user experience
- **AI Opponents**: Smart AI for strategy games
- **Score Tracking**: Persistent scoring system
- **Audio Controls**: Background music and sound effects
- **Route Navigation**: Clean URL routing for all games

## 🔧 Technical Details

- **React**: Main framework
- **React Router**: Navigation and routing
- **CSS**: Styling and animations
- **Lazy Loading**: Optimized game loading
- **Responsive**: Mobile-friendly design

## 🎯 Game Categories

- **Racing**: Car Racing, Bike Racing
- **Strategy**: Chess, Tic-Tac-Toe, Connect Four
- **Arcade**: Snake & Ladder
- **Puzzle**: Quiz Game

All games are fully functional with proper error handling, responsive design, and smooth user experience!