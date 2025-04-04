/// <reference types="react" />
import { CommunicationUserIdentifier, MicrosoftTeamsUserIdentifier } from '@azure/communication-common';
import { CallAdapterLocator } from '@azure/communication-react';
import type { StartCallIdentifier } from '@azure/communication-react';
export interface CallScreenProps {
    token: string;
    userId: CommunicationUserIdentifier | MicrosoftTeamsUserIdentifier;
    callLocator?: CallAdapterLocator;
    targetCallees?: StartCallIdentifier[];
    displayName: string;
    alternateCallerId?: string;
    isTeamsIdentityCall?: boolean;
}
export declare const CallScreen: (props: CallScreenProps) => JSX.Element;
//# sourceMappingURL=CallScreen.d.ts.map