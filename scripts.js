const svg = d3.select("#heapSvg");
const width = +svg.attr("width");
const height = +svg.attr("height");

let heap = [];
let heapType = "max";
function calculateNodePositions(heap) {
    const positions = [];
    const ySpacing = 100;

    for (let i = 0; i < heap.length; i++) {
        const level = Math.floor(Math.log2(i + 1));
        const nodesAtLevel = 2 ** level;
        const xSpacing = width / (nodesAtLevel + 1);

        const xPos = (i - (2 ** level - 1) + 1) * xSpacing + xSpacing / 16;
        const yPos = level * ySpacing + 50;

        positions.push({ x: xPos, y: yPos });
    }

    return positions;
}

function renderHeap() {
    const maxDepth = 4;
    const currentDepth = Math.floor(Math.log2(heap.length)) + 1;

    if (currentDepth > maxDepth) {
        alert("The tree depth exceeds the limit of 4. Please choose a smaller dataset for better visualization.");
        return;
    }

    const positions = calculateNodePositions(heap);

    let linkGroup = svg.select(".linkGroup");
    if (linkGroup.empty()) {
        linkGroup = svg.append("g").attr("class", "linkGroup");
    }
    let nodeGroup = svg.select(".nodeGroup");
    if (nodeGroup.empty()) {
        nodeGroup = svg.append("g").attr("class", "nodeGroup");
    }

    const links = linkGroup.selectAll(".link")
        .data(heap.slice(1))
        .join("line")
        .attr("class", "link")
        .attr("x1", (d, i) => positions[Math.floor((i + 1 - 1) / 2)].x)
        .attr("y1", (d, i) => positions[Math.floor((i + 1 - 1) / 2)].y)
        .attr("x2", (d, i) => positions[i + 1].x)
        .attr("y2", (d, i) => positions[i + 1].y)
        .attr("stroke", "#3498db")
        .attr("stroke-width", 2);

    const nodes = nodeGroup.selectAll(".nodeGroup")
        .data(heap)
        .join("g")
        .attr("class", "nodeGroup")
        .attr("transform", (d, i) => `translate(${positions[i].x}, ${positions[i].y})`)
        .on("click", highlightNode);

    nodes.selectAll("circle").remove();
    nodes.selectAll("text").remove();

    nodes.append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .attr("fill", "#f39c12")
        .attr("stroke", "#f1c40f")
        .attr("stroke-width", 2);

    nodes.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d) => d)
        .style("fill", "black")
        .style("font-size", "12px")
        .style("font-weight", "bold");
}

function swapHeapNodes(index1, index2) {
    [heap[index1], heap[index2]] = [heap[index2], heap[index1]];
}

function highlightNode(event, d) {
    svg.selectAll(".node").classed("highlight", false);
    d3.select(this).select("circle").classed("highlight", true);
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
        if (largest === index) break;

        swapHeapNodes(index, largest);
        index = largest;
    }
}

function compare(a, b) {
    return heapType === "max" ? a > b : a < b;
}

function randomizeHeap() {
    const heapSize = Math.floor(Math.random() * 10) + 5;
    heap = Array.from({ length: heapSize }, () => Math.floor(Math.random() * 100));
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        heapifyDown(i);
    }
    renderHeap();
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

function searchNode(value) {
    const index = heap.indexOf(value);
    alert(`The value ${value} is present at index ${index} in the heap.`);
}

document.getElementById("heapType").addEventListener("change", (e) => {
    heapType = e.target.value;
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

document.getElementById("randomHeap").addEventListener("click",  () =>{
    randomizeHeap();
});

document.getElementById("convertHeap").addEventListener("click", () => {
    convertHeap();
});

renderHeap();