+++
categories = ["ML", "NLP"]
date = "2016-04-14T15:46:49+08:00"
draft = false
tags = ["ML", "NLP"]
title = "Create a Natural Language Question Answering system with IBM Watson"
+++

{{< img src="/images/post/qa-system-watson/watson.png" title="" class="align-center">}}
Recently I started a new project to build QA system for Mindvalley. After a short discussion with my colleagues we decided 
to use the 2011 jeopardy winner (**Watson**).  
As you may know Watson is a question answering computer system capable of answering questions posed in natural language,
it developed in IBM's DeepQA project by a research team led by principal investigator David Ferrucci.   
IBM also released it's cloud platform *IBM Bluemix* in 2014. It supports several programming languages and services 
as well as integrated DevOps to build, run, deploy and manage applications on the cloud. 
And of-course Watson API's are accessible in Bluemix platform.

`{"status":"in_progress"}`
<!--more-->

## Before you begin
Before you begin, you need the following pieces

* You need [Bluemix account](https://console.ng.bluemix.net/registration/)
* Node.js
* Python
 
## Overview of Question Answer System 

The final goal is simple; design and develop an application be able to: 

* Analyze unstructured data
* Understands complex questions
* Presents answers and solution

![](/images/post/qa-system-watson/overview-concept.png)

 But unfortunately, it is not as easy as advertised by IBM. In past IBM offered IBM Watson Question and Answer (QA)
  but in summer of 2015 this service replaced by four new services to support customize and embed Q&A applications.  
  The four replacement services recommended for different types of question and answer capabilities are:

![](/images/post/qa-system-watson/classifier.png) 
[Natural Language Classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html) – allows you to Interpret and classify natural language with confidence.

![](/images/post/qa-system-watson/Dialog.png)
[Dialog](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html) – allows you to script a conversation and help walk a user through a process

![](/images/post/qa-system-watson/retriveandrank.png)
[Retrieve and Rank](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-rank.html) – allows information retrieval with a machine learning model

![](/images/post/qa-system-watson/passage.png)
[Document Conversion](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/document-conversion.html) – takes documents and ‘chunks them up” into smaller answer units to return as passages

based on your input data and requirements, you can choose one or combinations of these services to build a comprehensive and robust system.

## My Approach

 I decide to use combination of `Document Conversion` and `Retrieve and Rank` Services. Document conversion service used to transform documents into `Answer Units`, and use those as input to 
 train the Retrieve and Rank Service.
      
 ![](/images/post/qa-system-watson/activity-diagram.png)
 
### Bluemix platform preparation
Before we start you need to prepare and setup your server and services. I decided to deploy my code in Bluemix as well, 
however you can just create your API in bluemix and deploy your code wherever you like (AWS :))

Login into you Bluemix account, in dashboard click on `Service and APIs`
you need to create two services `Document Conversion` and `Retrieve and Rank` and copy and paste the credentials. (it is pretty easy I am not going to explain it)

![](/images/post/qa-system-watson/bluemixApis.png)

### Document Preparation  
  The first and most important step is document preparation. The more disciplined you are in your handling of data, the more consistent and better results you are like likely to achieve. Watson 
  *Document Conversion* service helps you in this process so you don't need to do it manually but we need to prepare our document for DC service. 
  You may ask how you can prepare a document? the answer is by providing related question as header of each paragraph.
  DC service is sensitive to headers, it transform document to json format which contains list of `answer_units` dictionary. look at following example;  
  
* **Document Sample**   
  
           What is Watson?
           Watson is an artificially intelligent computer system capable of answering questions
           posed in natural language, developed in IBM&#39;s DeepQA project by a research team led
           by principal investigator David Ferrucci. Watson was named after IBM&#39;s first CEO and
           industrialist Thomas J. Watson. The computer system was specifically developed to
           answer questions on the quiz show Jeopardy! In 2011, Watson competed on Jeopardy!
           against former winners Brad Rutter and Ken Jennings. Watson received the first place
           prize of $1 million.
           
           How did it Work?
           Watson had access to 200 million pages of structured and unstructured content
           consuming four terabytes of disk storage including the full text of Wikipedia, but was not
           connected to the Internet during the game. For each clue, Watson&#39;s three most probable
           responses were displayed on the television screen. Watson consistently outperformed
           its human opponents on the game&#39;s signaling device, but had trouble responding to a
           few categories, notably those having short clues containing only a few words.
    
           And then, what happened?
           In February 2013, IBM announced that Watson software system&#39;s first commercial
           application would be for utilization management decisions in lung cancer treatment at
           Memorial Sloan–Kettering Cancer Center in conjunction with health insurance company
           WellPoint. IBM Watson&#39;s former business chief Manoj Saxena says that 90% of nurses
           in the field who use Watson now follow its guidance.
       
* **Answer Units**
     
 {{< highlight json >}} 
 {
   "source_document_id":"",
   "timestamp":"2016-04-15T08:42:37.055Z",
   "media_type_detected":"application/wordprocessingml.document",
   "metadata":[{"name":"Content-Type","content":"text/html; charset=UTF-8"},
               {"name":"author","content":"Eva Luo"},
               {"name":"publicationdate","content":"2015-08-20"}],
   "answer_units":[
         {
            "id":"ff4da46f-b07a-4c12-aa2d-d5b0d3414c17",
            "type":"h3",
            "parent_id":"",
            "title":"What is Watson?",
            "direction":"ltr",
            "content":[
               {
                "media_type":"text/plain",
                "text":"Watson is an artificially intelligent computer ..."
               }
               ]}],
   "warnings":[]
   } {{< /highlight >}}
   
Now we can use list of answer units for training Retrieve and Rank system.

### Setup Retrieve and Rank System

This service helps users find the most relevant information for their query by using a combination of search and machine 
learning algorithms to detect "signals" in the data. Built on top of Apache Solr, developers load their data into the service,
train a machine learning model based on known relevant results, then leverage this model to provide improved results to their end users based on their question or query.

Lets makes our hands dirty. if you have worked with Solr before, you may know we need our cluster and collection to index the data, so the let's setup them.
I used Node.js for this project before you start you need to install  

1. Create Cluster
To use the Retrieve and Rank service, you must create a Solr cluster. A Solr cluster manages your search collections, which you will create later.

2. Create Collection
3. Index (Add) Documents
4. Create Ground Truth
5. Build Training Data
6. Create and Train The Ranker
7. Rank The Result
 