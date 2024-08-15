# Knight Templar

## Introduction

Knight Templar is a web-browser extension.
It helps me read more of what I want and consume less of what I should not.

## How It Works

I add any article/blog that I find intresting to a folder in my bookmarks named "Reading List".
I usually find these articles on reddit, youtube, email subscriptions and twitter.
To find the articles, I visit these sites but get stuck in the doom scrolling.

So, the extension does the following:

1. Whenever I try to browser to `(youtube|twitter|reddit).com` it intercepts and ...
1. Reads the `Reading List` folder from my bookmarks.
1. If any articles exists there, it opens up the topmost article instead of the social site.
1. Removes the article url from `Reading List` folder and adds it to another `Read` folder. (feature not working yet)

## Easy Wins

1. Use commands to toggle the extension on/off
2. Adding read articles to `Read` folder
3. Add Icon
4. Structure Code
5. If article url is one of `(youtube|twitter|reddit).com`!, then prevent the infinte loop

## Things to figure out

1. I still need to open the sites sometimes so add a limit to the number of times the site can be accessed, with a per hour time-limit and a schedule also.

2. (not sure how to do this) : add a way to make sure the article's been read. sort of a self assesement. I am thinking of adding some api calls to any llm-model which will read the article and ask me questions from it.

3. Make the search algorithm better for searching the bookmark, because as the size grows linear seach will be time consuming. Maybe add a small cache?

## Not feature but enhancemets

1. Add prettier
2. Add linter
3. Add tests
4. Add CI/CD

## Working pattern

I made this minimum viable using Claude.ai. Currently, I use it daily and add fixes or features as I encounter them when using it. I have a plan to include it in Peerlist showcase your project in October ✝️

## Why to use this or make this?

Started as a thought, now I wish to complete it and implement all the features majorly for the sake of it. It is still useful in its current state as I have read some of the articles that I had stored from god knows when.

### Why name Knight Templar?

Like a kinght templar proected the christian devotess when visting the holy site.
This extension will protect me from doom scrolling.
