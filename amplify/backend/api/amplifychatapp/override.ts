import { AmplifyApiGraphQlResourceStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyApiGraphQlResourceStackTemplate) {
    resources.api.GraphQLAPI.xrayEnabled = true;
    // resources.api.GraphQLAPI.attrArn
}

