# Sudoku Solver

## Try it on your browser

Site link: https://sudoku-solver-website.netlify.app/  
It may take a while to load since I'm hosting the site on Netlify.

## Tech Stack

React, JavaScript, CSS, HTML  
react-icons

## An image while it is on auto solve mode

![Solving](/solving.png)

## The Project

The project is basically a sudoku solver website. It has hundreds of pre-defined sudoku puzzles with different level settings. You can use them to test the solving algorithm or you can just solve it on your own with your keyboard or with the number buttons aside. There are buttons at the bottom of the number buttons. The left one is the undo button in case you need it. The middle one clears the selected cell, and the right one clears the entire grid of cells.
To solve the puzzle automatically, click the button "Auto Solve" at any time and it will find a solution. You can adjust its speed of solving with the slider labeled as "Speed". Also, you can check the "Instant Solve" box to solve the puzzle instantly. (It takes some time to solve on harder puzzles even with this option. It looks like the website crashed for a few seconds, but it's not.)  
Moreover, you can create your own puzzles, and it will be stored in the local storage.

![Buttons](/buttons.png)

## How does it work?

It uses the "Backtracking" algorithm with recursion to solve.

## Design

I used an animated gradient for the borders of most of the elements on the site. It also works well with different window sizes.
