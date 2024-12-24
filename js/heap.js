let heap = [];
let heapType = "max";

//Heapify Processes

function swapHeapNodes(index1, index2) {
    [heap[index1], heap[index2]] = [heap[index2], heap[index1]];
}

function compare(a, b) {
    return heapType === "max" ? a > b : a < b;
}

function heapifyUp(index) {
    while (index > 0 && compare(heap[index], heap[Math.floor((index - 1) / 2)])) {
        swapHeapNodes(index, Math.floor((index - 1) / 2));
        index = Math.floor((index - 1) / 2);
    }
}

function heapifyDown(index) {
    while (true) {
        let largest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        if (left < heap.length && compare(heap[left], heap[largest])) {
            largest = left;
        }
        if (right < heap.length && compare(heap[right], heap[largest])) {
            largest = right;
        }
        if (largest === index) 
            break;
        swapHeapNodes(index, largest);
        index = largest;
    }
}

// Heap Setting Functions

function searchNode(value) {
    const index = heap.indexOf(value);
    if(index !== -1){
        alert(`The value ${value} is present at index ${index} in the heap.`);
    }else{
        alert(`The value ${value} is not present in the heap.`);
    }
}

function insertNode(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
    renderHeap();
}

function deleteNode(value) {
    const index = heap.indexOf(value);
    if (index !== -1) {
        heap[index] = heap[heap.length - 1];
        heap.pop();
        if (index < heap.length) {
            heapifyDown(index);
            heapifyUp(index);
        }
        renderHeap();
    }else{
        alert(`Value ${value} is not in the heap.`);
        return;
    }
}

function deleteRoot() {
    if (heap.length > 0) {
        heap[0] = heap[heap.length - 1];
        heap.pop();
        heapifyDown(0);
        renderHeap();
    }else{
        alert("Cannot delete root. The heap is empty.");
        return;
    }
}

function convertHeap() {
    if (heap.length === 0) {
        alert("Cannot convert heap. The heap is empty.");
        return;
    }
    heapType = heapType === "max" ? "min" : "max";
    const convertButton = document.getElementById("convertHeap");
    convertButton.textContent = heapType === "max" ? "Convert Max Heap to Min Heap" : "Convert Min Heap to Max Heap";
    const heapTypeSelect = document.getElementById("heapType");
    heapTypeSelect.value = heapType;
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        heapifyDown(i);
    }
    renderHeap();
}

function randomizeHeap() {
    const heapSize = Math.floor(Math.random() * 10) + 5;
    heap = Array.from({ length: heapSize }, () => Math.floor(Math.random() * 100));
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        heapifyDown(i);
    }
    renderHeap();
}

// Event Listeners

document.getElementById("heapType").addEventListener("change", (e) => {
    heapType = e.target.value;
    const convertButton = document.getElementById("convertHeap");
    convertButton.textContent = heapType === "max" ? "Convert Max Heap to Min Heap" : "Convert Min Heap to Max Heap";
});

document.getElementById("searchBtn").addEventListener("click", () => {
    const value = parseInt(document.getElementById("nodeSearch").value, 10);
    if (!isNaN(value)) searchNode(value);
});

document.getElementById("insertBtn").addEventListener("click", () => {
    const value = parseInt(document.getElementById("nodeInput").value, 10);
    if (!isNaN(value)) insertNode(value);
});

document.getElementById("deleteBtn").addEventListener("click", () => {
    const value = parseInt(document.getElementById("nodeDelete").value, 10);
    if (!isNaN(value)) deleteNode(value);
});

document.getElementById("deleteRootBtn").addEventListener("click", () =>{
    deleteRoot();
});

document.getElementById("convertHeap").addEventListener("click", () => {
    convertHeap();
});

document.getElementById("randomHeap").addEventListener("click",  () =>{
    randomizeHeap();
});