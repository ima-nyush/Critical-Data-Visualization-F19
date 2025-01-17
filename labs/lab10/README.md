### Lab 10: Interaction

- [download](historic-events/historic-events.zip) mini project.
- the data is from [here](https://thebackend.dev/building-monarchs) via [Data Is Plural](https://docs.google.com/spreadsheets/d/1wZhPLMCHKJvwOkP4juclhjFgqIY8fQFMemwKL2c64vk/edit#gid=0).

#### CSS

1. Use d3 do gives elements of a selection a class.
  ```javascript
  datagroups.append("circle")
    .attr("class", "datapointCircle")
  ;
  ```
2. Use `CSS` to change styles or initiate CSS animations on hover
  ```css
  .datapointCircle:hover{
    opacity: 1;
  }
  ```

Tip: in order to not pollute class names, remember css selectors, like
```css
.datagroup circle:hover{
  opacity: 1;
}
```
CSS gives solutions to more complex situations, too. Use Google; experiment. See what this dies, for example:
```CSS
.datagroup:hover circle{
  opacity: 1;
}
```

#### Event Listeners in D3

D3's documentation on [Handling Events](https://github.com/d3/d3-selection#handling-events)
```javascript
// this adds the same event listener
// to every element in a given selection
// we can react to all kinds of events (reference: https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events)
selection.on("mouseover", function(){
  console.log("hovered");
});
```
We can do whatever we want inside the callback function. What do you think the following code will do?
```javascript
selection.on("click", function(){
  selection
      .transition()
      .duration(1000)
      .attr("opacity", 0)
      .remove()
  ;
});
```
...not so sensical. Often you will want to do something to or with the element that was interacted with. You can select it like this:
```javascript
select.on("click", function(){
  d3.select(this)
      .transition()
      .duration(1000)
      .attr("transform", "scale(2)")
  ;
});
```
...I am using `transform: scale(2)` to make my generally applicable. Of course, you can use more specific attributes, like `r` for circles or `width` for rectangles, etc.

Challenge: How could we select all elements EXCEPT the one interacted with. There is many solutions, here is one:
```javascript
// in this example both selections would most likely be the same
selection.on("mouseover", function(d){
  selection.filter(function(dd){
    return d!=dd;
  })
      .transition()
      .duration(1000)
      .attr("transform", "scale(2)")
  ;

});
```

#### Mini Project

Our data is an array containing elements like
```javascript
{
  date: Thu Jan 01 1942 00:00:00 GMT+0800 (China Standard Time) {}
  description: ""
  event: "Manhattan project develops the atom bomb"
  hidden: ""
  type: "science"
}
```
Let's try to always display the `event` line above our visualization whenever we hover a circle (and make it disappear when out mouse moves out).

To start, we create one text element the content of which we then just keep on refreshing. So somewhere at the top of our file we can write something like this:
```javascript
let infotext = viz.append("text")
  // .text("blablablbalablablabla")
  .attr("x", w/2)
  .attr("y", padding/2)
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("fill", "#ff5333")
;
```
note, I gave some random text while positioning and styling the element, then commented it out. Giving the element a variable name (`infotext`) will make it easier to refer to it in our `mouseover` function:
```javascript
datagroups.selectAll("circle").on("mouseover", function(d){
  let text = d.event; // get the text from the datapoint
  infotext.text(text); // change the text of the infotext element
});
```
##### make text disappear on `mouseout`
Great, next you can use `mouseout` event handler to make the text disappear when we leave the element

##### tooltip

explore what `d3.event` gives you. Use it to build a "tooltip" or, in other words, use it to adjust the position of the infoText to make it feel like a pop up text
