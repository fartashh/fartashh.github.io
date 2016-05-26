+++
categories = ["AWS", "Lambda"]
date = "2016-05-24T16:21:57+08:00"
draft = false
tags = ["AWS", "Lambda"]
title = "Serverless Approach to Transcode Media"
image = "http://fartashh.github.io/images/lambda-transcoder/s3-lambda-transcoder.png"
desc = "MRR calculation by using pandas"

+++

{{< img src="/images/post/lambda-transcoder/s3-lambda-transcoder.png" title="" class="align-center">}}
Handling and managing media content is quite challenging. You need to decode the media to different format and quality, 
to serve users with different device and bandwidth. 
And I am pretty sure you don't want to handle this complexity in you app :).
In this post I explain how to setup the fully automated serverless approach by using AWS S3, Lambda, abd Elastic Transcoder. 
<!--more-->

## Case Study
I always get any concept better with case study so I have decided to have one. 

> Build feature to support streaming for IOS devices

As you may know Apple use HTTP Live Streaming (HLS) which is an adaptive streaming communications protocol created by 
Apple to communicate with iOS and Apple TV devices and Macs running OSX in Snow Leopard or later.

The final system, automatically detect the *.mp3 file uploaded to `input` bucket, call lambda function to create a new 
Transcoder job (convert mp3 to hls) and save the output in `output` bucket.

## Setup Elastic Transcoder
Amazon Elastic Transcoder is media transcoding in cloud. it helps us to convert media files that have stored in S3 into 
media files in the formats required by consumer playback devices. In our case we want to convert mp3 to the format supported 
by HLS protocol.

To get it up and and running you need to be familiar with three component of ET.
  
  * **Pipelines** are queues that manage your transcoding jobs. When you create a job, you specify which pipeline you
   want to add the job to. Elastic Transcoder starts processing the jobs in a pipeline in the order in which you added them.
  * **Presets** are templates that contain most of the settings for transcoding media files from one format to another. 
   Elastic Transcoder includes some default presets for common formats, for example, several iPod and iPhone versions.
   You can also create your own presets for formats that aren't included among the default presets. You specify which
   preset you want to use when you create a job.
  * **Jobs** do the work of transcoding. Each job converts one file into up to 30 formats. For example, if you want to 
   convert a media file into six different formats, you can create files in all six formats by creating a single job. 

#### Setup Pipeline
In order to run transcoder job we need to create new pipeline first.
{{< img src="/images/post/lambda-transcoder/pipeline.png" title="" class="align-center">}}
To create a pipeline you need to specify the input, out, and thumbnails buckets. Also you can set some optional options;
such as storage class and permission for each bucket.
I add `Open/Download` permission for All users, to `out` bucket. you can manage bucket accessibility based on your strategy. 

After creating pipeline you can create a new job to convert your media but we want to do it automatically ;).

#### Understanding Presets
As explained before **Presets** are pre configured template you can use for transcoding media files from one format to another.
For instance to prepare your media for HLS protocol there are 13 different presets available and we are going to use one.
I decided to use `System preset: HLS Audio - 160k` but you can choose any other or create your own preset.


## Create Your Lambda function
Let's create our lambda function. Select `S3-get-object` blueprint.
configure event source by selecting `S3` as event source type, `input` as Bucket, and for event type select 
`Object Created > Put`.
{{< img src="/images/post/lambda-transcoder/lambda-event.png" title="" class="align-center">}}
click next and replace the code with following code.

{{< highlight javascript >}}
   
   'use strict';
   console.log('Loading function');
   
   let aws = require('aws-sdk');
   let s3 = new aws.S3({ apiVersion: '2006-03-01' });
   let elastictranscoder = new aws.ElasticTranscoder();
   
   
   exports.handler = (event, context, callback) => {
   
       // Get the object from the event and show its content type
       const bucket = event.Records[0].s3.bucket.name;
       const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

       var params = {
         Input: { 
           Key: key
         },
         PipelineId: '[USE YOUR PIPELINE ID]', 
         OutputKeyPrefix: '[OUT PUT KEY PREFIX ex. `iphone/`]',
         Outputs: [
           {
             SegmentDuration:'10.0',    
             Key: basename(key),
             PresetId: '[PRESETID ex `1351620000001-200060`]', // hls
           }
         ]
       };
   
       elastictranscoder.createJob(params, function(err, data) {
         if (err){
           console.log(err, err.stack); // an error occurred
           context.fail();
           return;
         }
         context.succeed();
       });
   };

{{< /highlight >}}

under the section `Lambda function handler and role` create new role based on 's3 execution role' to let lambda write 
into s3 bucket.

You are almost done. update the *PipelineId*, *OutputKeyPrefix*, and *PresetId* with your data and click next.
In Review section you just need to Enable the event source and click on create function button. 

Congratulations you have a serverless media transcoder system. whenever you upload a file to your input bucket it raise an
event which handled by Lambda function. Lambda handler add a new job by using the given presets in pipeline and when it is done 
new format of data available at output bucket.

