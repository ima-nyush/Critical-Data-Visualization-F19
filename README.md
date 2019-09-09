# Critical Data & Visualization Fall 2019

Welcome! This page will be filled with material and links throughout the Semester. I recommend you **bookmark it now**.

- Instructor: Leon Eckert, leon.eckert@nyu.edu
- Class Times: Mondays & Wednesdays, 1:15pm-2:30pm
- Credits: 4
- Room: 824
- Office Hours: Tuesdays, 9am-12pm ([sign up](https://calendar.google.com/calendar/selfsched?sstoken=UUE0X1AyMVlCNnpyfGRlZmF1bHR8ZTBmYjk2MTcyMjZkZmUwMzhjYTllN2IxMzlkMmQ4MTU))

#### Course Description
Data is at the heart of the increasing role technology has in our lives. Data collection and algorithmic processing are not only central to recent technical breakthroughs such as in AI and automation but have created new economic paradigms where data equals value and shape political approaches to power and control.

Decisions based on algorithms affect society at large whether it’s changing the way we transport and distribute goods, or influencing the things we buy, the news we read or even the people we date. The *world* that algorithms *see* is data. For the average person, however, data is seldom more than an abstract idea.

So what exactly is data? How is value extracted from it? And why should we care? How can we ethically balance the positive uses of data-driven systems with the threats they pose to discriminate and infringe basic human rights?
This class seeks to untangle some of these issues practically and theoretically.

[Course Overview and Learning Outcomes](https://github.com/leoneckert/cdv-fall19#course-overview-and-learning-outcomes)


#### Content
- Week 1 - [Mapping the Landscape](https://github.com/leoneckert/cdv-fall19#week-1)
- Week 2 - [Data Infrastructures](https://github.com/leoneckert/cdv-fall19#week-2)
- Week 3 - Bias
- Week 4 - Prediction and Uncertainty
- **Fall Break**
- Week 5 - Concept Review
- Week 6 - Data Zine Project Presentations 🎉
- Week 7 - Data Ethics
- Week 8 - Concept Review
- Week 9 - Algorithmic decision-making & automating inequality
- Week 10 - Data Story: Work in Progress Presentations 📚
- Week 11 - Surveillance Capitalism
- Week 12 - Concept Review
- Week 13 - Activism, Leaks and Whistleblowers
- Week 14 - Data Story Project Presentations 🥂


## WEEK 1

![mapping the landscape](other/assets/week1.jpg)

### Monday Class

Introductions.

Group Activity: Mapping the subjects of this course.

Take-aways:
- Data is never “raw”, but always cooked.
- Data and Data Infrastructures.
  - looking beyond data as a resource
  - data is performative
- “data”
  - from latin (‘given’)
    - how about "capta" (== ‘taken’)?*
  - used in singular and plural
- data has no truth
\*J Drucker

#### Assignments:

Due this Wednesday (2019/09/04):
- Do this assignment first (strongly recommended)
-  We will spend 50% of our time in this course coding. Having a shared foundation for this is **extremely important**. I will always be there to support and assist you with problems you encounter. For now, please work your way through [Coding Foundation: Setup and Exercises](coding-foundation) and submit your work in the end.
- Here is a thorough, interactive ``basic-javascript`` tutorial if you want to brush up your skills: [Basic JavaScript](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-javascript/). And [here](https://www.codecademy.com/learn/introduction-to-javascript) is Codecadey's version.

Due Monday (2019/09/09):
- Listen to two parts of **Reply All's 'The Crime Machine' Podcast**. This is both super entertaining AND relevant next class. You can listen to the podcast via
  - your browser ([Part 1](https://gimletmedia.com/shows/reply-all/o2hx34), [Part 2](https://gimletmedia.com/shows/reply-all/n8hwl7))
  - castbox ([Part 1](https://castbox.fm/episode/127-The-Crime-Machine%2C-Part-I-id4550-id177120350), [Part 2](https://castbox.fm/episode/128-The-Crime-Machine%2C-Part-II-id4550-id177120351))
  - spotify ([Part 1](https://open.spotify.com/episode/6uagdYENZ1HjiaeX7gbqIN), [Part 2](https://open.spotify.com/episode/4ULMa8oh9nJWSv4PM9gPNh))
  - apple podcast ([Part 1](https://podcasts.apple.com/hk/podcast/127-the-crime-machine-part-i/id941907967?i=1000446958122), [Part 2](https://podcasts.apple.com/hk/podcast/128-the-crime-machine-part-ii/id941907967?i=1000446958123))
  - other services (search "Reply All Crime Machine")
- Read [**Critical Questions for Big Data**](readings/boyd_crawford_2012.pdf) by danah boyd and Kate Crawford. The linked version has some intentional notes that will help you. Please read the whole text despite below prompts being pointed at specific sections. There is no right or wrong, **what counts more than anything is your own opinion**. For each prompt, write no more than a short paragraph:
  - Introduction and Chapter 2
    - Why does Bowker say "'*Raw data is both and oxymoron and a bad idea*'" ? (pp. 663)
  - Section 1 (pp. 665)
    - What could be meant by the quote "'*accounting tools [...] do not simply aid the measurement of economic activity, they shape the reality they measure*'"? Try draw parallels to the CompStat system from the Reply All Podcast.
  - Section 3 and 4 (pp. 668)
    - In which way is Twitter data limited?
  - Section 5 (pp. 671)
    - If you don't need to login to obtain certain data, then it is public and free to use. Or isn't it? Please share your opinion.
  - Section 6
    - No prompts here, but a very well written chapter that is relevant to everything we will be talking about this semester. Please enjoy.

###### Optional/Related readings and resources:

- [*\"Raw Data" is an Oxymoron* (Introduction)](https://mitpress.mit.edu/books/raw-data-oxymoron), Gitelman L (2013)\*
- [*\"Raw Data" is an Oxymoron* (Capter 1: Data before the Fact)](https://mitpress.mit.edu/books/raw-data-oxymoron), Rosenberg D\*
- [*Data infrastructure literacy*](https://journals.sagepub.com/doi/10.1177/2053951718786316), Gray J, Gerlitz C, Bounegru L (2018)
- [*Humanities Approaches to Graphical Display*](http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html), J Drucker (2011)


*online version accessible through NYU library

### Wednesday Lab

Find the Lab in detail [here](https://github.com/leoneckert/cdv-fall19/tree/master/labs/lab1)

Content:
- how a browser meets a website
- how a browser sees html
- css and js, endless metaphors
- review homework
- review JavaScript data structures
- collect data using Google Forms
- Mini data visualization using javascript

#### Assignments:

Due this Wednesday (2019/09/11):
- Create a Google Form collecting data of the "linear scale" type (like we did in this week's Lab)
- collect responses from at least 10 people (e.g. send it to people in this class room (I can help distribute))
- use the techniques [used in the lab](https://github.com/leoneckert/cdv-fall19/tree/master/labs/lab1) to
  - export the data in `json` format
  - transform it to an array with average values
  - build a bar graph using JavaScript ([lab's code](https://github.com/leoneckert/cdv-fall19/tree/master/labs/lab1/in-class-website))
- the last two points can be worked on simultaneously (you don't need all the responses to start working on the code)
- relvant links:
  - [This week's lab](https://forms.gle/F6cSqr8Rqmbqm7JQA)
  - [How to collect data using Google Forms
  ](https://github.com/leoneckert/cdv-fall19/tree/master/labs/collect-data-google-form)



## WEEK 2

![data infrastructures](other/assets/week2.jpg)

### Monday Class

Reading discussion

Mapping Data Infrastructures
  test!

Announcement: Data Zine
  todo sample projects!

Introduce Group Research Assignments

#### Assignments:

Due Wednesday (2019/09/11):
- Watch [this fun talk by Mike Bostock](https://vimeo.com/69448223), creator of [D3js](http://d3js.org/).

Due Monday (2019/09/16):
  - DATA ZINE PROJECT
    - brainstorm today which data to collect*
    - start collecting data at midnight (at the very start of September 9th)
    - bring your collected data next week
  - Watch (and read) ProPublica's "Breaking the Black Box" video series
    1. [What Facebook Knows About You](https://www.propublica.org/article/breaking-the-black-box-what-facebook-knows-about-you)
    2. [When Algorithms Decide What You Pay](https://www.propublica.org/article/breaking-the-black-box-when-algorithms-decide-what-you-pay)
    3. [When Machines Learn by Experimenting on Us](https://www.propublica.org/article/breaking-the-black-box-when-machines-learn-by-experimenting-on-us)
    4. [How Machines Learn to Be Racist](https://www.propublica.org/article/breaking-the-black-box-how-machines-learn-to-be-racist?word=Trump)
  - for **GROUP 1 only**:
    - make yourself deeply familiar with the subject and reading of your research
    - facilitate a discussion:
      1. present your research. focus specifically on what you think the class needs to know to actively take part in the discussion
      2. design a discussion format and facilitate it in class
    - arrange a meeting with me to catch up on your work (how about Thursday or Friday?)

*tips:
- use **Dear Data** ([link1](http://giorgialupi.com/dear-data), [link1](http://www.stefanieposavec.com/dear-data-about)) as an inspiration
- what to collect? anything, the more detail the better.
- don’t just decide on what general subject to collect, but make a plan for the actual measurements (think of Dear Data)
- you can use a notebook, or spreadsheet, or build you own Google Form that you open up every evening/now and then/hour/minute.
- set an alarm for measurements.

###### Optional/Related readings and resources:


## WEEK 3
## WEEK 4
## WEEK 5
## WEEK 6
## WEEK 7
## WEEK 8
## WEEK 9
## WEEK 10
## WEEK 11
## WEEK 12
## WEEK 13
## WEEK 14

------------
#### Course Overview and Learning Outcomes
The overarching goal of this class is for students to gain the tools and the comfort to think critically about the ways data is utilized in the ever growing technological landscape we are immersed in.
With this in mind, the class is split in two weekly sessions: a theoretical class and a practical lab.

The classes include lectures introducing contemporary theorists, artists, groups, and in-class discussions or exercises. Four themes guiding this exploration are “Data, Information, Knowledge”, “Data Bias”, “Data Ethics” and “Power, Control, Access”.
In the weekly lab, students will learn the fundamentals of web-based data visualization using JavaScript. The purpose of this is to understand what data feels like through hands-on experimentation and what data says or doesn’t say by rendering the information it carries visually.

Upon completion of this course, students will be able to:
- **map** actors, their roles and relations within a broader data infrastructure
- **identify** problematics of "datafication" and **generate** ideas for response
- **identify** various visions, values and cultures inherent to datasets
- **build** data visualizations for the web
- **build** their own datasets
- **make use** of data APIs and scraped data
- **visually** communicate information pertaining to a given dataset
- **critique** their own work and others' constructively
