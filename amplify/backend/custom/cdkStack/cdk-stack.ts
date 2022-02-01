import * as cdk from "@aws-cdk/core";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
import { CfnWebACL } from "@aws-cdk/aws-wafv2";
import { CfnWebACLAssociation } from "@aws-cdk/aws-wafregional";

export class cdkStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */

    const dependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          {
            category: "api",
            resourceName: "amplifychatapp",
          },
        ]
      );

    const cfnWebACL = new CfnWebACL(this, "WebACL", {
      defaultAction: {
        allow: {},
      },
      scope: "REGIONAL",
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: "waf",
        sampledRequestsEnabled: false,
      },
    });

    
    const cfnWebACLAssociation = new CfnWebACLAssociation(this, 'WebACLAssociation', {
      resourceArn: dependencies.api.amplifychatapp.GraphQLAPIIdOutput,
      webAclId: cfnWebACL.attrId
    });

    cfnWebACLAssociation.node.addDependency(cfnWebACL);
  }
}
