import { AmplifyApiGraphQlResourceStackTemplate } from "@aws-amplify/cli-extensibility-helper";
import { CfnWebACL } from "@aws-cdk/aws-wafv2";

export function override(resources: AmplifyApiGraphQlResourceStackTemplate) {
  resources.api.GraphQLAPI.xrayEnabled = true;
  const cfnWebACL = new CfnWebACL(this, 'WebACL', {
      defaultAction: {
          allow: { },
      },
      scope: resources.api.GraphQLAPI.attrArn,
      visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: 'waf',
          sampledRequestsEnabled: false
      }
  });
}
