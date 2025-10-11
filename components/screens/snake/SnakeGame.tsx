"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUp, LuPause, LuPlay, LuRotateCcw} from "react-icons/lu";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION: Direction = "RIGHT"

const SnakeGame = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
    const [food, setFood] = useState<Position>(INITIAL_FOOD)
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const generateFood = useCallback((): Position => {
        let newFood: Position
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            }
        } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
        return newFood
    }, [snake])

    const resetGame = () => {
        setSnake(INITIAL_SNAKE)
        setFood(INITIAL_FOOD)
        setDirection(INITIAL_DIRECTION)
        setGameOver(false)
        setScore(0)
        setIsPlaying(true)
        setIsPaused(false)
    }

    const moveSnake = useCallback(() => {
        if (gameOver || !isPlaying || isPaused) return

        setSnake((currentSnake) => {
            const newSnake = [...currentSnake]
            const head = { ...newSnake[0] }

            // Move head based on direction
            switch (direction) {
                case "UP":
                    head.y -= 1
                    break
                case "DOWN":
                    head.y += 1
                    break
                case "LEFT":
                    head.x -= 1
                    break
                case "RIGHT":
                    head.x += 1
                    break
            }

            // Check wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true)
                setIsPlaying(false)
                return currentSnake
            }

            // Check self collision
            if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true)
                setIsPlaying(false)
                return currentSnake
            }

            newSnake.unshift(head)

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                setScore((prev) => {
                    const newScore = prev + 10
                    if (newScore > highScore) {
                        setHighScore(newScore)
                    }
                    return newScore
                })
                setFood(generateFood())
            } else {
                newSnake.pop()
            }

            return newSnake
        })
    }, [direction, food, gameOver, isPlaying, isPaused, generateFood, highScore])

    useEffect(() => {
        const gameInterval = setInterval(moveSnake, 150)
        return () => clearInterval(gameInterval)
    }, [moveSnake])

    const handleDirectionChange = (newDirection: Direction) => {
        if (!isPlaying || isPaused) return

        // Prevent reverse direction
        const opposites: { [key in Direction]: Direction } = {
            UP: "DOWN",
            DOWN: "UP",
            LEFT: "RIGHT",
            RIGHT: "LEFT",
        }

        if (opposites[direction] !== newDirection) {
            setDirection(newDirection)
        }
    }

    const togglePause = () => {
        if (isPlaying && !gameOver) {
            setIsPaused(!isPaused)
        }
    }

    const renderCell = (x: number, y: number) => {
        const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y
        const isSnakeBody = snake.slice(1).some((segment) => segment.x === x && segment.y === y)
        const isFood = food.x === x && food.y === y

        let cellClass = "w-3 h-3 border border-gray-800/20"

        if (isSnakeHead) {
            cellClass += " bg-green-500 rounded-sm shadow-sm"
        } else if (isSnakeBody) {
            cellClass += " bg-green-400 rounded-sm"
        } else if (isFood) {
            cellClass += " bg-red-500 rounded-full shadow-sm animate-pulse"
        } else {
            cellClass += " bg-gray-100"
        }

        return <div key={`${x}-${y}`} className={cellClass} />
    }

    return (
        <div className="flex-1 flex flex-col px-3 mt-12">
            {/* Game Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-400">Snake</h1>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <span>Score: {score}</span>
                        <span>High: {highScore}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {isPlaying && !gameOver && (
                        <Button size="sm" variant="outline" onClick={!isPlaying ? resetGame : togglePause} className="bg-gray-400">
                            {isPaused ? <LuPlay className="w-4 h-4" /> : <LuPause className="w-4 h-4" />}
                        </Button>
                    )}

                    {!isPlaying && (
                        <Button size="sm" variant="outline" onClick={resetGame} className="bg-green-500 hover:bg-green-600">
                            <LuPlay className="w-4 h-4" />
                        </Button>
                    )}

                    {(isPaused || gameOver) && (
                        <Button size="sm" variant="outline" onClick={resetGame} className="bg-gray-400">
                            <LuRotateCcw className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Game Board */}
            <div className="flex-1 flex items-center justify-center">
                <div className="relative">
                    <div
                        className="grid gap-0 border-2 border-gray-800 rounded-lg p-2 bg-gray-50"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                        }}
                    >
                        {Array.from({ length: GRID_SIZE }, (_, y) =>
                            Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y)),
                        )}
                    </div>

                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 text-center shadow-xl">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Game Over!</h2>
                                <p className="text-gray-600 mb-4">Final Score: {score}</p>
                                <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600">
                                    Play Again
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
                <div className="grid grid-cols-3 gap-2 max-w-48 mt-4 mx-auto text-white">
                    <div></div>
                    <Button
                        size="lg"
                        variant="outline"
                        className="aspect-square bg-transparent"
                        onClick={() => handleDirectionChange("UP")}
                        disabled={!isPlaying || gameOver || isPaused}
                    >
                        <LuArrowUp className="w-6 h-6" />
                    </Button>
                    <div></div>
                    <Button
                        size="lg"
                        variant="outline"
                        className="aspect-square bg-transparent"
                        onClick={() => handleDirectionChange("LEFT")}
                        disabled={!isPlaying || gameOver || isPaused}
                    >
                        <LuArrowLeft className="w-6 h-6" />
                    </Button>
                    <div></div>
                    <Button
                        size="lg"
                        variant="outline"
                        className="aspect-square bg-transparent"
                        onClick={() => handleDirectionChange("RIGHT")}
                        disabled={!isPlaying || gameOver || isPaused}
                    >
                        <LuArrowRight className="w-6 h-6" />
                    </Button>
                    <div></div>
                    <Button
                        size="lg"
                        variant="outline"
                        className="aspect-square bg-transparent"
                        onClick={() => handleDirectionChange("DOWN")}
                        disabled={!isPlaying || gameOver || isPaused}
                    >
                        <LuArrowDown className="w-6 h-6" />
                    </Button>
                    <div></div>
                </div>
        </div>
    )
}

export default SnakeGame