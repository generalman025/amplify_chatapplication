import { CfnWebACL } from '@aws-cdk/aws-wafv2';

export type WafRule = {
  name: string;
  rule: CfnWebACL.RuleProperty;
};

export const awsManagedRules: WafRule[] = [
  // Protection against automated bots
  {
    name: 'AWS-AWSManagedRulesBotControlRuleSet',
    rule: {
      name: 'AWS-AWSManagedRulesBotControlRuleSet',
      priority: 10,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesBotControlRuleSet'
        }
      },
      overrideAction: {
        none: {}
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRulesBotControlRuleSet'
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
      priority: 30,
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
  // Block requests from services that allow obfuscation of viewer identity
  {
    name: 'AWS-AWSManagedRulesAnonymousIpList',
    rule: {
      name: 'AWS-AWSManagedRulesAnonymousIpList',
      priority: 40,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesAnonymousIpList'
        }
      },
      overrideAction: {
        none: {}
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRulesAnonymousIpList'
      }
    }
  },
  // Block request patterns that are known to be invalid and associated with exploitation or discovery of vulnerabilities
  {
    name: 'AWS-AWSManagedRulesKnownBadInputsRuleSet',
    rule: {
      name: 'AWS-AWSManagedRulesKnownBadInputsRuleSet',
      priority: 50,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesKnownBadInputsRuleSet'
        }
      },
      overrideAction: {
        none: {}
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSManagedRulesKnownBadInputsRuleSet'
      }
    }
  },
  // Blocks common SQL Injection
  {
    name: 'AWS-AWSManagedRulesSQLiRuleSet',
    rule: {
      name: 'AWS-AWSManagedRulesSQLiRuleSet',
      priority: 60,
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
