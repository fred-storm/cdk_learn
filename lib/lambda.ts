import * as lambda from 'aws-cdk-lib/aws-lambda';

const fnendpoint = new lambda.Function(this, 'Getendpoint7575', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'getEndpoint.js',
  code: lambda.Code.fromAsset(path.join(__dirname, 'lambdahandler')),
});

export fnendpoint
