# Heap Visualizer

This project is a **Heap Visualization Tool** that allows users to interact with a heap data structure. Users can perform various heap operations like inserting nodes, deleting nodes, searching for elements, converting between max-heap and min-heap, and sorting a heap. The heap is visualized in real-time using D3.js, where users can observe heapify processes and node manipulations.

## Features

- **Interactive Heap Visualization**: A dynamic visual representation of a heap is rendered using D3.js, showing node positions and links between nodes.
- **Heap Operations**: 
  - **Insert Node**: Adds a new node to the heap and adjusts the heap structure accordingly.
  - **Delete Node**: Removes a specified node from the heap and re-adjusts the heap.
  - **Delete Root**: Removes the root node and reorganizes the heap.
  - **Heapify**: The heap is automatically restructured when nodes are inserted or deleted.
- **Max-Heap and Min-Heap**: The tool allows toggling between a max-heap and a min-heap.
- **Heap Sorting**: Allows sorting the heap in ascending or descending order using the heap sort algorithm.
- **Search Node**: Allows searching for a specific node within the heap.
- **Responsive Design**: The visualization adjusts to different screen sizes for the best user experience across devices.
- **Dark Mode and Light Mode**: Has a switch to toggle between light and dark themes for a more personalized experience.

## Technologies Used

- **D3.js**: For visualizing the heap and its operations in real-time.
- **HTML/CSS**: Basic structure and styling for the web page.
- **JavaScript**: Logic for heap operations, event handling, and DOM manipulation.

## Prerequisites

To run this project locally, you'll need:
- A modern web browser (e.g., Chrome, Firefox, Edge).
- Basic understanding of heap data structure and its operations.

## Demo

A live demo of the project is available below:
- **Live Demo**: [Link](https://heap-visualizer.vercel.app/)
