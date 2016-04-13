+++
date = "2016-01-25T19:58:03+08:00"
draft = false
title       = "Nitro: A quick and simple profiler for Go"
description = "Nitro is a simple profiler for your Golang applications"
tags        = [ "Development", "Go", "profiling" ]
topics      = [ "Development", "Go" ]
slug        = "nitro"
+++

This is a welcome post Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean comm
<!--more-->
# Nitro

Quick and easy performance analyzer library for [Go](http://golang.org/).

## Overview

Nitro is a quick and easy performance analyzer library for Go.
It is useful for comparing A/B against different drafts of functions
or different functions.

## Implementing Nitro

Using Nitro is simple. First, use `go get` to install the latest version
of the library.

    $ go get github.com/spf13/nitro

Next, include nitro in your application.