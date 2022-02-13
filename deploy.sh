#!/usr/bin/env bash
BUCKET="your-bucket-name"
BUCKET_KEY="app.zip"
EC2_KEY_NAME="yourEc2KeyName"
CFN_STACK_NAME="ElasticBeanstalk"

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)
cd ${SOURCE_DIR}

#deploy
aws cloudformation deploy \
    --template-file template.yml \
    --stack-name ${CFN_STACK_NAME} \
    --parameter-overrides \
        bucket=${BUCKET} \
        bucketKey=${BUCKET_KEY} \
        ec2KeyName=${EC2_KEY_NAME} \
   --capabilities CAPABILITY_NAMED_IAM
