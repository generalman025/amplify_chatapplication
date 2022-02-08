import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { CfnWebACL, CfnWebACLAssociation } from '@aws-cdk/aws-wafv2';
import {awsManagedRules} from './waf-rules';

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
          }
        ]
      );
      
    const apiGatewayId = cdk.Fn.ref(dependencies.api.listUsersApi.ApiId);

    const appSyncId = cdk.Fn.ref(
      dependencies.api.amplifychatapp.GraphQLAPIIdOutput
    );

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
        resourceArn: `arn:aws:apigateway:${
          cdk.Aws.REGION
        }::/restapis/${apiGatewayId}/stages/${envName}`,
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
  }
}