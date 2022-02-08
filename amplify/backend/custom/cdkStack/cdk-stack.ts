import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { CfnWebACL, CfnWebACLAssociation } from '@aws-cdk/aws-wafv2';
import { Function, Code, Runtime, LayerVersion } from '@aws-cdk/aws-lambda';
import { AwsCliLayer } from '@aws-cdk/lambda-layer-awscli';
import { Bucket } from '@aws-cdk/aws-s3';
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId
} from '@aws-cdk/custom-resources';
import { awsManagedRules } from './waf-rules';

export class cdkStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name'
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */

    const envName = cdk.Fn.ref('env');

    const dependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          {
            category: 'api',
            resourceName: 'listUsersApi'
          },
          {
            category: 'api',
            resourceName: 'amplifychatapp'
          },
          {
            category: 'function',
            resourceName: 'amplifychatapplistusers'
          },
          {
            category: 'hosting',
            resourceName: 'S3AndCloudFront'
          }
        ]
      );

    const apiGatewayId = cdk.Fn.ref(dependencies.api.listUsersApi.ApiId);

    const appSyncId = cdk.Fn.ref(
      dependencies.api.amplifychatapp.GraphQLAPIIdOutput
    );

    // awsCliFunc.addLayers(layer);

    // const policy = AwsCustomResourcePolicy.fromSdkCalls({
    //   resources: [func.functionArn]
    // });

    // new AwsCustomResource(this, 'UpdateEnvVar', {
    //   onCreate: {
    //     service: 'Lambda',
    //     action: 'updateFunctionConfiguration',
    //     parameters: {
    //       FunctionName: func.functionArn,
    //       Environment: {
    //         Variables: {
    //           CLOUDFRONT_URL: 'https://dy6j8td40wd7r.cloudfront.net'
    //         }
    //       }
    //     },
    //     physicalResourceId: PhysicalResourceId.of('listUsersFunction')
    //   },
    //   policy: policy
    // });

    const webAcl = new CfnWebACL(this, 'WebACL', {
      name: `WebACL-${envName}`,
      defaultAction: {
        allow: {}
      },
      scope: 'REGIONAL',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'webAcl',
        sampledRequestsEnabled: false
      },
      rules: awsManagedRules.map((wafRule) => wafRule.rule)
    });

    const apiGatewayAssociation = new CfnWebACLAssociation(
      this,
      'AssociatedApiGateway',
      {
        resourceArn: `arn:aws:apigateway:${cdk.Aws.REGION}::/restapis/${apiGatewayId}/stages/${envName}`,
        webAclArn: webAcl.attrArn
      }
    );

    const appSyncAssociation = new CfnWebACLAssociation(
      this,
      'WebACLAssociation',
      {
        resourceArn: `arn:aws:appsync:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:apis/${appSyncId}`,
        webAclArn: webAcl.attrArn
      }
    );

    apiGatewayAssociation.node.addDependency(apiGatewayId);
    apiGatewayAssociation.node.addDependency(webAcl);
    appSyncAssociation.node.addDependency(appSyncId);
    appSyncAssociation.node.addDependency(webAcl);

    // const functionArn = cdk.Fn.ref(
    //   dependencies.function.amplifychatapplistusers.Arn
    // );

    // const cloudfrontUrl = cdk.Fn.ref(
    //   dependencies.hosting.S3AndCloudFront.CloudFrontSecureURL
    // );

    // const func = Function.fromFunctionArn(
    //   this,
    //   'listUsersFunction',
    //   functionArn
    // );

    const sourceBurcket = Bucket.fromBucketArn(this, 'sourceBucket', 'arn:aws:s3:::cdk-lambda-src');
    const awsCliLayer = new AwsCliLayer(this, 'AwsCliLayer');
    const awsCliLayerVersion = LayerVersion.fromLayerVersionArn(
      this,
      'LayerVersion',
      awsCliLayer.layerVersionArn
    );
    const awsCliFunc = new Function(this, 'awsCliFunction', {
      functionName: `chatapp-${envName}-awscli`,
      code: Code.fromBucket(sourceBurcket, 'aws-cli-function.zip'),
      runtime: Runtime.PROVIDED,
      handler: 'index.handler',
      layers: [awsCliLayerVersion],
      timeout: cdk.Duration.seconds(300)
    });
  }
}
