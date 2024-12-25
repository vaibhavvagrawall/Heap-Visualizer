const svg = d3.select("#heapSvg");
const width = +svg.attr("width");
const height = +svg.attr("height");

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
    const maxDepth = 5;
    const currentDepth = Math.floor(Math.log2(heap.length)) + 1;

    if (currentDepth > maxDepth) {
        alert("The tree depth exceeds the limit of 4. Please choose a smaller dataset for better visualization.");
        return;
    }

    const positions = calculateNodePositions(heap);

    let linkGroup = svg.select(".linkGroup");
    let nodeGroup = svg.select(".nodeGroup");

    if (linkGroup.empty()) {
        linkGroup = svg.append("g").attr("class", "linkGroup");
    }

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

function highlightNode(event, d) {
    svg.selectAll(".node").classed("highlight", false);
    d3.select(this).select("circle").classed("highlight", true);
}
