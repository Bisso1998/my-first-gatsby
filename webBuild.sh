#!/usr/bin/env bash
cd ~/activity-repo;
npm run build-with-prefix-path; 
# rm -rf ./../www/activity/*;
# cp -a ./public/. ./../www/activity/;
yes | cp -rf ./public/. ./../www/activity/;