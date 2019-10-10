window.addEventListener('load', async () => {
    const container = d3.select('#container')
        .append('svg')
        .attr('id', 'svg-container')
        .attr('width', '100%')
        .attr('height', '100%');
    const have = (fn, ...t) => fn(...t);
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
            .attr('width', 60)
            .attr('height', 30)
            .attr('viewBox', '0 0 1024 1024')
            .attr('y', 180 + i * 35)
            .attr('x', 135 + d.group * 90 + (d.group > 11 ? 50 : -50))
            .attr('fill', getColor(d.Color));
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
    // console.log(startedAt);
    // console.log(data);

    let groupedData = [];
    data.forEach(d => {
        const group = Math.round((new Date(d.Timestamp).getTime() - startedAt) / 300000);
        if (!groupedData[group]) groupedData[group] = [];
        groupedData[group].push({
            ...d,
            group
        });
    });
    groupedData = groupedData.map(g => g.sort((a, b) => (typeMap[a.Type] - typeMap[b.Type]) || (colorMap[a.Color] - colorMap[b.Color])));
    // console.log(groupedData);

    group = container
        .selectAll('g')
        .data(groupedData)
        .enter()
        .append('g')
        .attr('class', 'bar');
    group
        .append('svg:text')
        .attr('y', 120)
        .attr('x', (_, i) => 145 + i * 90 + (i > 11 ? 50 : -50))
        .attr('font-family', 'Ubuntu, sans-serif')
        .attr('fill', '#ccc')
        .attr('font-size', 16)
        .text((_, i) => have(d => d.toISOString().substr(11, 5), new Date(1568908800000 + i * 300000)));

    group
        .selectAll('svg')
        .data(d => d)
        .enter()
        .each(appendIcon);

});