// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { mergeStyles } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';
export const imgStyle = mergeStyles({
    width: '16.5rem',
    padding: '0.5rem',
    '@media (max-width: 67.1875rem)': {
        display: 'none'
    }
});
export const containerTokens = {
    childrenGap: '4rem'
};
export const infoContainerStyle = mergeStyles({
    padding: '0.5rem',
    width: '20rem'
});
export const containerStyle = mergeStyles({
    height: '100%',
    width: '100% ',
    padding: '2rem',
    minWidth: '24rem',
    minHeight: 'auto'
});
export const configContainerStyle = mergeStyles({
    minWidth: '10rem',
    width: 'auto',
    height: 'auto'
});
export const configContainerStackTokens = {
    childrenGap: '1.25rem'
};
export const callContainerStackTokens = {
    childrenGap: '0.75rem'
};
export const callOptionsGroupStyles = {
    label: { padding: 0 }
};
export const headerStyle = mergeStyles({
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    width: '20rem',
    marginBottom: '1.5rem'
});
export const bodyItemStyle = mergeStyles({
    marginTop: '1.25rem'
});
export const teamsItemStyle = mergeStyles({
    marginTop: '0.75rem'
});
export const buttonStyle = mergeStyles({
    fontWeight: 600,
    fontSize: '0.875rem',
    width: '100%',
    height: '2.5rem',
    borderRadius: 3,
    padding: '0.625rem'
});
export const outboundTextField = mergeStyles({
    paddingTop: '0.5rem'
});
export const dialpadOptionStyles = {
    root: {
        margin: 'auto',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem'
    }
};
export const alternateCallerIdCalloutStyles = {
    width: '25rem',
    height: '12rem',
    maxWidth: '90%',
    padding: '20px 24px'
};
export const alternateCallerIdCalloutTitleStyles = {
    marginBottom: 12,
    fontWeight: FontWeights.semilight
};
export const alternateCallerIdCalloutLinkStyles = {
    display: 'block',
    marginTop: 20
};
//# sourceMappingURL=HomeScreen.styles.js.map