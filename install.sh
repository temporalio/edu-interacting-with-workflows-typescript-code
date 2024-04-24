#!/usr/bin/env bash
for dir in exercises/*/{practice,solution}/; do (pushd "$dir" && npm install); done
for dir in samples/*/; do (pushd "$dir" && npm install); done
