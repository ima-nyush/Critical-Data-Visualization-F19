const baseY = 260;

window.addEventListener('load', async () => {
    const container = d3.select('#container')
        .append('svg')
        .attr('id', 'svg-container')
        .attr('width', '100%')
        .attr('height', '100%');
    const type = ['Bus', 'Truck', 'SUV', 'Sedan'];
    const color = ['black', 'white', 'silver', 'other', 'blue', 'red', 'green'];
    const getColor = c => c === 'other' ? 'gold' : c;
    const typeMap = {};
    const colorMap = {};
    type.forEach((t, i) => typeMap[t] = i);
    color.forEach((t, i) => colorMap[t] = i);
    const icon = {};
    for await (const t of type) {
        icon[t] = (await d3.xml('icon/' + t + '.svg')).documentElement;
    }
    const appendIcon = function (d, i) {
        const g = d3.select(this)
            .append('svg')
            .attr('width', 110)
            .attr('height', 55)
            .attr('viewBox', '0 0 1024 1024')
            .attr('y', baseY + 120 * i)
            .attr('x', 80)
            .attr('fill', '#999');
        buildIcon(g, d.Type);
    }
    const buildIcon = function (svg, type) {
        for (const ele of icon[type].children) {
            if (ele.tagName !== 'path') continue;
            svg.append('path')
                .attr('d', ele.attributes.d.value);
        }
    }
    // console.log(icon);

    const data = await d3.json('data.json');
    const startedAt = new Date(data[0].Timestamp).getTime();
    const timeData = [];
    const groupedData = type.map(t => ({
        Type: t,
        Data: []
    }));
    data.forEach(d => {
        const group = Math.round((new Date(d.Timestamp).getTime() - startedAt) / 300000);
        if (!timeData[group]) timeData[group] = [];
        timeData[group].push(d);
    });
    timeData.forEach((td, i) => {
        groupedData.forEach((g, j) => {
            g.Data[i] = [];
            g.Data.Type = j;
        });
        td.forEach(d => {
            groupedData[type.indexOf(d.Type)].Data[i].push(d);
        })
    });
    console.log(groupedData);

    const getX = (_, i) => 220 + i * 38;
    const getY = (d, _, t) => baseY + 45 + t.Type * 120 - d.length * 5;
    const curve = d3.line()
        .x(getX)
        .y(getY)
        .curve(d3.curveCatmullRom.alpha(0.5));

    curveGradient = container.append("defs")
        .append("linearGradient")
        .attr("id", "curve-gradient")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "100%")
        .attr("y2", "0%");
    curveGradient
        .append("stop")
        .attr("class", "start")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(255, 255, 255, 0.2)")
        .attr("stop-opacity", 1);
    curveGradient
        .append("stop")
        .attr("class", "end")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(255, 255, 255, 1)")
        .attr("stop-opacity", 1);

    container
        .append('svg:text')
        .attr('y', 150)
        .attr('x', 100)
        .attr('font-family', 'Ubuntu, sans-serif')
        .attr('fill', '#888')
        .attr('font-size', 72)
        .text('VEHICLES');

    group = container
        .selectAll('g')
        .data(groupedData)
        .enter()
        .append('g')
        .attr('class', 'bar');

    group
        .append('svg')
        .each(appendIcon);
    group
        .append("path")
        .attr("class", "curve")
        .attr("d", d => curve(d.Data))
        .attr("stroke", "url(#curve-gradient)")
        .attr("stroke-width", 2)
        .attr("fill", "transparent");


});