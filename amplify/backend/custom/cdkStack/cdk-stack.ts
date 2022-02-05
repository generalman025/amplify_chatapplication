import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { CfnWebACL, CfnWebACLAssociation } from '@aws-cdk/aws-wafv2';

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

    const appSyncDependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          {
            category: 'api',
            resourceName: 'amplifychatapp'
          }
        ]
      );

    const apiGatewayDependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          {
            category: 'api',
            resourceName: 'listUsersApi'
          }
        ]
      );

    const appsyncId = cdk.Fn.ref(
      appSyncDependencies.api.amplifychatapp.GraphQLAPIIdOutput
    );
    const apiGatewayId = cdk.Fn.ref(
      apiGatewayDependencies.api.listUsersApi.ApiId
    );

    const webAcl = new CfnWebACL(this, 'WebACL', {
      defaultAction: {
        allow: {}
      },
      scope: 'REGIONAL',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'waf',
        sampledRequestsEnabled: false
      },
      rules: awsManagedRules.map((wafRule) => wafRule.rule)
    });

    const associatedAppSync = new CfnWebACLAssociation(
      this,
      'AssociatedAppSync',
      {
        resourceArn: `arn:aws:appsync:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:apis/${appsyncId}`,
        webAclArn: webAcl.attrArn
      }
    );

    const associatedApiGateway = new CfnWebACLAssociation(
      this,
      'AssociatedApiGateway',
      {
        resourceArn: `arn:aws:apigateway:${cdk.Aws.REGION}::/restapis/${apiGatewayId}/stages/${cdk.Fn.ref('env')}`,
        webAclArn: webAcl.attrArn
      }
    );

    associatedAppSync.node.addDependency(webAcl);
    associatedApiGateway.node.addDependency(webAcl);
  }
}

interface WafRule {
  name: string;
  rule: CfnWebACL.RuleProperty;
}

const awsManagedRules: WafRule[] = [
  // AWS IP Reputation list includes known malicious actors/bots and is regularly updated
  {
    name: 'AWS-AWSManagedRulesAmazonIpReputationList',
    rule: {
      name: 'AWS-AWSManagedRulesAmazonIpReputationList',
      priority: 10,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesAmazonIpReputationList'
        }
      },
      overrideAction: {
        none: {}
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRulesAmazonIpReputationList'
      }
    }
  },
  // Common Rule Set aligns with major portions of OWASP Core Rule Set
  {
    name: 'AWS-AWSManagedRulesCommonRuleSet',
    rule: {
      name: 'AWS-AWSManagedRulesCommonRuleSet',
      priority: 20,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesCommonRuleSet',
          // Excluding generic RFI body rule for sns notifications
          // https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html
          excludedRules: [
            { name: 'GenericRFI_BODY' },
            { name: 'SizeRestrictions_BODY' }
          ]
        }
      },
      overrideAction: {
        none: {}
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWS-AWSManagedRulesCommonRuleSet'
      }
    }
  },
  // Blocks common SQL Injection
  {
    name: 'AWSManagedRulesSQLiRuleSet',
    rule: {
      name: 'AWSManagedRulesSQLiRuleSet',
      priority: 30,
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRulesSQLiRuleSet'
      },
      overrideAction: {
        none: {}
      },
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesSQLiRuleSet',
          excludedRules: []
        }
      }
    }
  },
  // Blocks common PHP attacks such as using high risk variables and methods in the body or queries
  {
    name: 'AWSManagedRulePHP',
    rule: {
      name: 'AWSManagedRulePHP',
      priority: 40,
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRulePHP'
      },
      overrideAction: {
        none: {}
      },
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesPHPRuleSet',
          excludedRules: []
        }
      }
    }
  },
  // Blocks attacks targeting LFI(Local File Injection) for linux systems
  {
    name: 'AWSManagedRuleLinux',
    rule: {
      name: 'AWSManagedRuleLinux',
      priority: 50,
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRuleLinux'
      },
      overrideAction: {
        none: {}
      },
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesLinuxRuleSet',
          excludedRules: []
        }
      }
    }
  }
];
