/// <reference types="react" />
import { RoomLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { TeamsMeetingIdLocator } from '@azure/communication-calling';
import { CallAdapterLocator } from '@azure/communication-react';
export type CallOption = 'ACSCall' | 'TeamsMeeting' | 'Rooms' | 'StartRooms' | 'TeamsIdentity' | '1:N' | 'PSTN' | 'TeamsAdhoc';
export interface HomeScreenProps {
    startCallHandler(callDetails: {
        displayName: string;
        callLocator?: CallAdapterLocator | TeamsMeetingLinkLocator | RoomLocator | TeamsMeetingIdLocator;
        option?: CallOption;
        role?: string;
        outboundParticipants?: string[];
        alternateCallerId?: string;
        teamsToken?: string;
        teamsId?: string;
        outboundTeamsUsers?: string[];
    }): void;
    joiningExistingCall: boolean;
}
export declare const HomeScreen: (props: HomeScreenProps) => JSX.Element;
//# sourceMappingURL=HomeScreen.d.ts.map