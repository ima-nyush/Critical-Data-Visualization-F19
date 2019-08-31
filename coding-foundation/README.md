## Coding Foundation: Setup and Exercises

This semester you will be maintaining a Github repository of you own to backup and share your work. Think of a repository as an online backup copy of your local (on your computer) project folder. The idea is this:

![push](assets/push.png)

As you can see above, there will be two repositories:
- One is the one I am maintaining (red). That is also the one on which you are reading this text right now. Here you will get information and resources throughout the Semester.
- The other repository is your own one (green). It will live on your own GitHub account and you are the only one that is uploading to it. Instead of "uploading", we will call this action **push**. You make changes to your files (and create new ones etc.) on your computer, then you push them to your "remote repository" on GitHub.

The following steps will guide you through setting all this up. Please follow carefully:

###### 1) Make a GitHub account
This is much like setting up any other account, you will not need much help, except, let me recommend to make a student account instead of a regular one. It comes with some nice, free benefits: [https://education.github.com/pack](https://education.github.com/pack)

###### 2) Create your own repository
You can create as many repositories as you like. By the way, repositories are public, everyone can see them. It's great to share code, we should all get used to this. However, keep this in mind so you don't accidentally share sensitive information. But don't worry, I will remind you often and show you ways to avoid it :)
You will find a big PLUS symbol on the top right when you are logged into GitHub. This is where you create new repositories. However (!) in our case we will do it differently. That is because I have prepared some files for you to get started. You will "fork" (make a copy) of a repository I have prepared. Follow [this link](https://github.com/leoneckert/my-cdv-fall19) and click on "fork" in the top right corner:

![find-fork](assets/find-fork.png)

After some seconds you will be redirected to a page that looks almost the same, but, if you look closely, you will notice that you now have your own copy of the repository that I prepared for you. You can also find it under your repositories on your profile:

![forked](assets/forked.png)

#### Software

The order of these steps is not fully worked out :) Now that we have a repository, let's make sure we have the software we will be working with.

###### Google Chrome

This is the browser we will be using. Please [download it](https://www.google.com/chrome/) if you don't have it already.

###### Atom Text Editor

We will be using Atom to write our code. Please download it [here](https://atom.io).

###### Atom Packages

We are going to use four Atom extensions. Three of the come preinstalled. Verify if you see them when you open Atom:

![packages](assets/packages.png)

Apart from these there is one more we need. It's called **atom-live-server**. To install it go to ```Atom>Preferences...```, click on ``+ Install``, find **atom-live-server** and hit ``install``:

![atom-live-server](assets/atom-live-server.png)

Verify that it is installed:

![installed](assets/atom-live-server-installed.png)


Great! We have achieved a lot. Let's go on!

#### Working environment

For the whole semester, you will always work in the same folder (with subfolder of course). This folder exists already, but only online, in your GitHub repository. Now we will download it, or as we call it in the context of GitHub, we **clone** your repository to you local machine (aka your computer).

###### Clone remote repository using Atom

First, let's find the repository we want to clone on your GitHub profile. We will tell atom to clone it the descriptor we need is to be found on the right side, copy the HTTPS-link:

![https](assets/https-link.png)


Now open Atom. In the menu bar, click on ``packages > Command Palette > Toggle``. A search bar on the top of your Atom window should appear, search for "GitHub Clone" and hit enter:

![clone](assets/clone.png)

A dialogue window opens on the top of the window. Paste the url you copied from Github from the first line and write the first line exactly (just with your username of course) like in below screenshot.

![clone2](assets/clone2.png)

Then hit enter, wait a little, and have a look on your Desktop:

![cdv](assets/cdv.png)

Close Atom, and decide where you want to drag this folder to, put it somewhere where it can stay all semester (or maybe you are happy with it on the Desktop - I like my Desktop clean :)

Great, we are very far, everything you will work on takes place in this folder. Follow along as I run you through the basic workflow:

###### Open your files in Atom (the right way(s))
I recommend to use one of two ways to open your class folder in Atom.

1. After opening Atom, click ``File>Open..`` and navigate to your folder, don't click on a subfolder or a specific file, just on the folder named "my-cdv-fall19". Then click ``Open``.
2. Find the "my-cdv-fall19" folder in your file system, drag it onto the Atom application icon.

If you did it correctly you will notice two things. 1) Atom displays all the files and subfolder easily accessible in the sidebar. 2) See this little book symbol next to the name of the repository? That means that Atom know that it is also a GitHub repository and will make it really easy for us to push our changes to GitHub!

![atom-dir](assets/atom-dir.png)

###### Opening atom-live-server

From now on you will always use atom-live-server. Let's see how it works. With your folder open in Atom, click ``packages>atom-live-server>Start Server``:

![start server](assets/start-server.png)

Your browser should automatically open (please define Chrome as your default browser), in the url you will see something like ``http://127.0.0.1:3000/`` or ``http://localhost:3000/`` (the number at the end might vary) and in the browser you see all the folder from your "my-cdv-fall19" directory:

![live server](assets/live-server.png)

great! this is exciting :D you will be able to see everything you work on here. Mainly you will work on websites in this class, if you work on them while using ``atom-live-server`` you can see changes you makes in real time. In your browser click on the test-page folder I prepared, a website! If you want try making a change to the website ``index.html`` file in Atom, save, then return to your browser. Cool right?

###### Shutting atom-live-server down

I assume the best way would be to click on ``Packages>atom-live-server>Stop...``, but if you forget this sometimes and just close Atom, or leave the live server open, that's not a big deal either.

###### Pushing changes to your remote GitHub repository

Okay, I bet this is new for you and I am excited. Let's assume we work on a project somewhere inside the "my-cdv-fall19" directory. Normally this would probably take place in a subfolder like ``my-cdv-fall19/my-work/week3/data-project``, but for now let's make some changes in ``test-page/index.html`` and save them (``cmd+s``). Look at the files in your sidebar, the are green now:

![changes](assets/changes.png)

This means that Atom realizes you made changes that have not yet been backed up/pushed to GitHub. Next we want to push this changes. Find the little, tiny "Git" at the bottom right of the window? (If not, lok out for "Git" in the meny bar ``packages`` drop down).

![git](assets/git.png)

After clicking it, a new Tab opens in Atom. It looks a but complicated, I will dedicate a new chapter to this next part:

###### The push

There is **three steps** you need to do every time you **push changes to GitHub**:
1. Stage changes (select which files/changes to commit and push)
2. Commit (add a little messages about the changes you made)
3. Push (push the changes to Github)

**Stage**
In most cases you can click "Stage all", which will simply stage all the files in which you made changes since your last push. FYI in the box dialogue you can always see those files.

![unstaged](assets/unstaged.png)

**Commit**
Not how you can now see the files you have staged in the second box. Type a little message describin the changes you made, keep it simple, late at night even a "💤" will do. Best practice is to be specific. One benefit of using GitHub is that you can go backwards in time when your project suddenly doesn't work anymore. You can go back to any commit/push you want. For this, a descriptive commit message is helpful, too.

![commit](assets/commit.png)

**Push**
The last step is to push it all up to GitHub. Click ``Push`` at the bottom. Then, check your GitHub repository online. Are the changes there? 🤞🤞🤞🤞

![push2](assets/push2.png)


Well, that's it, you made it. You can now use GitHub (and Atom and atom-live-server). This is very cool!!!










<!-- Hi,
welcome to the Critical Data & Visualization class. Please follow the following steps. First, we will set up your work environment for this semester, and then run you through a little JavaScript exercise. In the end, I will show you how to submit things (assignments, poems, memes, etc.) to be shared with me & the rest of the students.

## Chrome Browser

## Text Editor

## GitHub Student Account

## Fork the class repo

## Atom Packages

## Clone the repo through Atom

## Coding exercise



## Submitting things (in this case, your coding exercise)






 -->



<!--##Create a space-->

<!--To start off, please create a directory structure fo everything we will do this semester. Choose a place on your computer that you don't expect to change later on. -->

<!--Create the directories like this:-->

<!--```-->
<!--cdv-->
<!--├── coding-foundation-->
<!--│   └── page1-->
<!--├── lab1-->
<!--│   ├── page1-->
<!--│   └── page2-->
<!--└── lab2-->
<!--```-->

<!--##Text editor-->

<!--In this class we will be using the [Atom Text Editor](https://atom.io) to write code. Unless you feel strongly about a different one, I recommend using the same. Please download it if you don't have it already. -->

<!--##Build an html page-->

<!--In `cdv/coding-foundation/page1`, build a simple html page. Make sure to add some element and some styling. If you want, write some JavaScript (more will follow later).-->

<!--I recommend structuring the page like thisi:-->


<!--```-->
<!--cdv-->
<!--├── coding-foundation-->
<!--│   └── page1-->
<!--│       ├── css-->
<!--│       │   └── styles.css-->
<!--│       ├── index.html-->
<!--│       └── js-->
<!--│           └── myscript.js-->
<!--└── ...-->
<!--```-->

<!--##Serving your website-->

<!--As you were working on the page, how did you see it? If you opened it with you browser, chances are it says something like `file://...` or `/Users/your-name/...` in the URL bar, does it?-->
<!--It this class, we will always be serving the pages we are working on via a "localhost server". If you have never heard of this before, read up on it for 20 minutes (but no longer). The easiest way to use a localhost for our pruposes is an package we can download for atom. It's called *atom-live-server*; please find out how to install and use it, this will be a must-know.-->


<!--##Chrome Developer Tools-->

<!--Unless you feel strongly for a different browser, please use Google Chrome for class. We will be using the Chrome Developer tools all the time. Make yourself familiar by reading the [Introduction](https://www.bitdegree.org/learn/chrome-developer-tools) and chapters about [Elements](https://www.bitdegree.org/learn/inspect-element) and the [JavaScript Console](https://www.bitdegree.org/learn/javascript-console) on this [page](https://www.bitdegree.org/learn/chrome-developer-tools).-->
