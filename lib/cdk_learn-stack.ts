import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CfnEC2Fleet } from "aws-cdk-lib/aws-ec2";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as dest from "aws-cdk-lib/aws-lambda-destinations";
import path = require("path");
import * as s3 from "aws-cdk-lib/aws-s3";

// import * as sqs from 'aws-cdk-lib/aws-sqs';
//const exvpc = ec2.Vpc.fromLookup(this,  "ImportVPC", { isDefault: true });

export class CdkLearnStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const learnBucket = new s3.Bucket(this, "wxApp7575");
    const server1 = new ec2.Instance(this, "TestInstance", {
      vpc: ec2.Vpc.fromLookup(this, "ImportVPC", { isDefault: true }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });
    const outlookQueue = new sqs.Queue(this, "outlookQueue7575", {
      encryption: sqs.QueueEncryption.SQS_MANAGED,
    });

    const fnEndpoint = new lambda.Function(this, "getEndpoint7575", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler", //filename must have the .handler for this property.(Filename is actually index.mjs)
      code: lambda.Code.fromAsset(path.join(__dirname, "../getEndpoint")),
      onSuccess: new dest.SqsDestination(outlookQueue),
    });

    const fnOutlook = new lambda.Function(this, "getOutlook7575", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../getOutlook")),
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkLearnQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
