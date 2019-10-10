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
        let adds = 0;
        if (i > 100) adds += 8;
        if (i > 106) adds += 8;
        if (i > 112) adds += 8;
        if (i > 118) adds += 8;
        i += adds;
        const x = 105 + (i % 14) * 70;
        const y = 85 + Math.floor(i / 14) * 35;
        const g = d3.select(this)
            .append('svg')
            .attr('width', 80)
            .attr('height', 40)
            .attr('viewBox', '0 0 1024 1024')
            .attr('y', y)
            .attr('x', x)
            .attr('fill', getColor(d.Color))
            .style('opacity', '0.7');
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
    // console.log(data);

    container
        .append('svg:text')
        .attr('y', 435)
        .attr('x', 380)
        .attr('font-family', 'Ubuntu, sans-serif')
        .attr('fill', '#888')
        .attr('font-size', 100)
        .text('VEHICLES');

    group = container
        .selectAll('g')
        .data(data)
        .enter()
        .append('svg')
        .each(appendIcon);


});