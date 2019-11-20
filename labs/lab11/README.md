### LAB 11 - Scrolling Interaction

Today's lab is largely not going to be working on the exact same code.


We will talk through an example for transitions that are triggered by scrolling. **After that, please copy in, step by step, your own code and make it work with the transition.**

- Download the scrolling example [here](scroller/scrollexample.zip).
- we talk through it.
- You may work with data that comes with it* (although I highly recommend using your own). It comes from [here](https://www.publishersweekly.com/pw/translation/search/index.html). It's an archive of book that have been translated into English since 2008. It includes, among other things, Author, Author Gender and Country.
  - I will show you how I *got it*. (copy, paste, essentially)


About the code:
- Your visualization needs to be placed into the `id='visualization'` div.
- I prepared an event listener. It listens for scrolls and returns whichever text box is currently closest to the vertical center of the screen. Pay special attention to understanding this part in the example code. Inside this even listener is where you would trigger transitions.


-----
\*if you do work with the data that came with the code, here is some advice. The data is in "tab separated format". It's like `csv` just with tabs instead of commas. You can easily load it like this:
```javascript
d3.tsv("translatedbooks.tsv").then(function(incomingData){
  let data = formatData(incomingData);
})
```

as you see I am doing a little extra data cleaning/formatting. The function I use is this:
```javascript
var parseTime = d3.timeParse("%b,%Y");
function formatData(indata){
  return indata.map((d)=>{
      // add proper date objects to our data
      d.parsedDate = parseTime(d["pubdate mo"] + "," + d["pubdate yr"]);
      return d
  }).filter(d=>{
    // making sure both date and isbn number are given
    // i am using the isbn number to uniquely identify the data points
    return d.parsedDate!=null&&!isNaN(d.isbn)
  })
  .reduce((acc,d)=>{
    // I noticed the data lists some isbn numbers twice
    // here i clean duplicates out
    // this is not ideal, the cruelty of data cleaning
    if(acc.findIndex(a=>a.isbn==d.isbn)==-1){
      acc.push(d);
    }
    return acc
  }, [])
}
```
