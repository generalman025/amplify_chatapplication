import { CfnWebACL } from "@aws-cdk/aws-wafv2";

export type WafRule = {
    name: string;
    rule: CfnWebACL.RuleProperty;
  }
  
export const awsManagedRules: WafRule[] = [
  // Common Rule Set aligns with major portions of OWASP Core Rule Set
  {
    name: 'AWS-AWSManagedRulesCommonRuleSet',
    rule: {
      name: 'AWS-AWSManagedRulesCommonRuleSet',
      priority: 10,
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
  // AWS IP Reputation list includes known malicious actors/bots and is regularly updated
  {
    name: 'AWS-AWSManagedRulesAmazonIpReputationList',
    rule: {
      name: 'AWS-AWSManagedRulesAmazonIpReputationList',
      priority: 20,
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
    }
  ];
  