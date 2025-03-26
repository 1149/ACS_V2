// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useState } from 'react';
import { Stack, PrimaryButton, Image, ChoiceGroup, Text, TextField } from '@fluentui/react';
import { Label } from '@fluentui/react';
import { registerIcons, Callout, mergeStyles, Link } from '@fluentui/react';
import heroSVG from '../../assets/hero.svg';
import { imgStyle, infoContainerStyle, callContainerStackTokens, callOptionsGroupStyles, configContainerStyle, configContainerStackTokens, containerStyle, containerTokens, headerStyle, teamsItemStyle, buttonStyle } from '../styles/HomeScreen.styles';
import { outboundTextField } from '../styles/HomeScreen.styles';
import { dialpadOptionStyles, alternateCallerIdCalloutStyles, alternateCallerIdCalloutTitleStyles, alternateCallerIdCalloutLinkStyles } from '../styles/HomeScreen.styles';
import { ThemeSelector } from '../theming/ThemeSelector';
import { localStorageAvailable } from '../utils/localStorage';
import { getDisplayNameFromLocalStorage, saveDisplayNameToLocalStorage } from '../utils/localStorage';
import { DisplayNameField } from './DisplayNameField';
import { getRoomIdFromUrl } from '../utils/AppUtils';
import { getIsCTE } from '../utils/AppUtils';
import { Dialpad } from '@azure/communication-react';
import { Backspace20Regular } from '@fluentui/react-icons';
import { useIsMobile } from '../utils/useIsMobile';
export const HomeScreen = (props) => {
    const imageProps = { src: heroSVG.toString() };
    const headerTitle = props.joiningExistingCall ? 'Join Call' : 'Start or join a call!';
    const callOptionsGroupLabel = 'Select a call option';
    const buttonText = 'Next';
    const callOptions = [
        { key: 'ACSCall', text: 'Start a call' },
        { key: 'StartRooms', text: 'Start a Rooms call' },
        { key: 'TeamsMeeting', text: 'Join a Teams meeting using ACS identity' },
        { key: 'Rooms', text: 'Join a Rooms Call' },
        { key: 'TeamsIdentity', text: 'Join a Teams call using Teams identity' },
        { key: '1:N', text: 'Start a 1:N ACS Call' },
        { key: 'PSTN', text: 'Start a PSTN Call' },
        { key: 'TeamsAdhoc', text: 'Call a Teams User or voice application' }
    ];
    const roomIdLabel = 'Room ID';
    const teamsTokenLabel = 'Enter a Teams token';
    const teamsIdLabel = 'Enter a Teams Id';
    const roomsRoleGroupLabel = 'Rooms Role';
    const roomRoleOptions = [
        { key: 'Consumer', text: 'Consumer' },
        { key: 'Presenter', text: 'Presenter' },
        { key: 'Attendee', text: 'Attendee' }
    ];
    // Get display name from local storage if available
    const defaultDisplayName = localStorageAvailable ? getDisplayNameFromLocalStorage() : null;
    const [displayName, setDisplayName] = useState(defaultDisplayName !== null && defaultDisplayName !== void 0 ? defaultDisplayName : undefined);
    const [chosenCallOption, setChosenCallOption] = useState(callOptions[0]);
    const [callLocator, setCallLocator] = useState();
    const [meetingId, setMeetingId] = useState();
    const [passcode, setPasscode] = useState();
    const [chosenRoomsRoleOption, setRoomsRoleOption] = useState(roomRoleOptions[1]);
    const [alternateCallerId, setAlternateCallerId] = useState();
    const [outboundParticipants, setOutboundParticipants] = useState();
    const [dialPadParticipant, setDialpadParticipant] = useState();
    const [teamsToken, setTeamsToken] = useState();
    const [teamsId, setTeamsId] = useState();
    const [outboundTeamsUsers, setOutboundTeamsUsers] = useState();
    const [alternateCallerIdCalloutVisible, setAlternateCallerIdCalloutVisible] = useState(false);
    const startGroupCall = chosenCallOption.key === 'ACSCall';
    const teamsCallChosen = chosenCallOption.key === 'TeamsMeeting';
    const teamsIdentityChosen = chosenCallOption.key === 'TeamsIdentity';
    const pstnCallChosen = chosenCallOption.key === 'PSTN';
    const acsCallChosen = chosenCallOption.key === '1:N';
    const teamsAdhocChosen = chosenCallOption.key === 'TeamsAdhoc';
    const buttonEnabled = (displayName || teamsToken) &&
        (startGroupCall ||
            (teamsCallChosen && callLocator) ||
            (((chosenCallOption.key === 'Rooms' && callLocator) || chosenCallOption.key === 'StartRooms') &&
                chosenRoomsRoleOption) ||
            (pstnCallChosen && dialPadParticipant && alternateCallerId) ||
            (teamsAdhocChosen && outboundTeamsUsers) ||
            (outboundParticipants && acsCallChosen) ||
            (teamsIdentityChosen && callLocator && teamsToken && teamsId));
    registerIcons({ icons: { DialpadBackspace: React.createElement(Backspace20Regular, null) } });
    const isMobileSession = useIsMobile();
    const showDisplayNameField = !teamsIdentityChosen;
    const [teamsIdFormatError, setTeamsIdFormatError] = useState(false);
    return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: containerTokens, className: containerStyle },
        React.createElement(Image, Object.assign({ alt: "Welcome to the ACS Calling sample app", className: imgStyle }, imageProps)),
        React.createElement(Stack, { className: infoContainerStyle },
            React.createElement(Text, { role: 'heading', "aria-level": 1, className: headerStyle }, headerTitle),
            React.createElement(Stack, { className: configContainerStyle, tokens: configContainerStackTokens },
                React.createElement(Stack, { tokens: callContainerStackTokens },
                    !props.joiningExistingCall && (React.createElement(ChoiceGroup, { styles: callOptionsGroupStyles, label: callOptionsGroupLabel, defaultSelectedKey: "ACSCall", options: callOptions, required: true, onChange: (_, option) => {
                            option && setChosenCallOption(option);
                            setTeamsIdFormatError(false);
                        } })),
                    (teamsCallChosen || teamsIdentityChosen) && (React.createElement(TextField, { className: teamsItemStyle, iconProps: { iconName: 'Link' }, label: 'Meeting Link', required: true, placeholder: 'Enter a Teams meeting link', onChange: (_, newValue) => {
                            newValue ? setCallLocator({ meetingLink: newValue }) : setCallLocator(undefined);
                        } })),
                    (teamsCallChosen || teamsIdentityChosen) && (React.createElement(Text, { className: teamsItemStyle, block: true, variant: "medium" },
                        React.createElement("b", null, "Or"))),
                    (teamsCallChosen || teamsIdentityChosen) && (React.createElement(TextField, { className: teamsItemStyle, iconProps: { iconName: 'MeetingId' }, label: 'Meeting Id', required: true, placeholder: 'Enter a meeting id', onChange: (_, newValue) => {
                            setMeetingId(newValue);
                            newValue ? setCallLocator({ meetingId: newValue, passcode: passcode }) : setCallLocator(undefined);
                        } })),
                    (teamsCallChosen || teamsIdentityChosen) && (React.createElement(TextField, { className: teamsItemStyle, iconProps: { iconName: 'passcode' }, label: 'Passcode', placeholder: 'Enter a meeting passcode', onChange: (_, newValue) => {
                            // meeting id is required, but passcode is not
                            setPasscode(newValue);
                            meetingId ? setCallLocator({ meetingId: meetingId, passcode: newValue }) : setCallLocator(undefined);
                        } })),
                    teamsCallChosen && (React.createElement(Text, { className: teamsItemStyle, block: true, variant: "medium" },
                        React.createElement("b", null, "And"))),
                    (chosenCallOption.key === 'TeamsIdentity' || getIsCTE()) && (React.createElement(Stack, null,
                        React.createElement(TextField, { className: teamsItemStyle, label: teamsTokenLabel, required: true, placeholder: 'Enter a Teams Token', onChange: (_, newValue) => setTeamsToken(newValue) }))),
                    (chosenCallOption.key === 'TeamsIdentity' || getIsCTE()) && (React.createElement(Stack, null,
                        React.createElement(TextField, { className: teamsItemStyle, label: teamsIdLabel, required: true, placeholder: 'Enter a Teams user ID (8:orgid:<UUID>)', errorMessage: teamsIdFormatError ? `Teams user ID should be in the format '8:orgid:<UUID>'` : undefined, onChange: (_, newValue) => {
                                if (!newValue) {
                                    setTeamsIdFormatError(false);
                                    setTeamsId(undefined);
                                }
                                else if (newValue.match(/8:orgid:[a-zA-Z0-9-]+/)) {
                                    setTeamsIdFormatError(false);
                                    setTeamsId(newValue);
                                }
                                else {
                                    setTeamsIdFormatError(true);
                                    setTeamsId(undefined);
                                }
                            } }))),
                    chosenCallOption.key === 'Rooms' && (React.createElement(Stack, null,
                        React.createElement(TextField, { className: teamsItemStyle, label: roomIdLabel, required: true, placeholder: 'Enter a room ID', onChange: (_, newValue) => setCallLocator(newValue ? { roomId: newValue } : undefined) }))),
                    (chosenCallOption.key === 'Rooms' || chosenCallOption.key === 'StartRooms' || getRoomIdFromUrl()) && (React.createElement(ChoiceGroup, { styles: callOptionsGroupStyles, label: roomsRoleGroupLabel, defaultSelectedKey: "Presenter", options: roomRoleOptions, required: true, onChange: (_, option) => option && setRoomsRoleOption(option) })),
                    acsCallChosen && (React.createElement(Stack, null,
                        React.createElement(TextField, { className: outboundTextField, label: 'Participants', required: true, placeholder: "Comma seperated ACS user ID's", onChange: (_, newValue) => setOutboundParticipants(newValue) }))),
                    teamsAdhocChosen && (React.createElement(Stack, null,
                        React.createElement(TextField, { className: outboundTextField, label: 'Teams user ID', required: true, placeholder: 'Enter a Teams user ID (8:orgid:<UUID>)', errorMessage: teamsIdFormatError ? `Teams user ID should be in the format '8:orgid:<UUID>'` : undefined, onChange: (_, newValue) => {
                                if (!newValue) {
                                    setTeamsIdFormatError(false);
                                    setOutboundTeamsUsers(undefined);
                                }
                                else if (newValue.match(/8:orgid:[a-zA-Z0-9-]+/)) {
                                    setTeamsIdFormatError(false);
                                    setOutboundTeamsUsers(newValue);
                                }
                                else {
                                    setTeamsIdFormatError(true);
                                    setOutboundTeamsUsers(undefined);
                                }
                            } }))),
                    pstnCallChosen && (React.createElement(Stack, null,
                        React.createElement(Label, { required: true, style: { paddingBottom: '0.5rem' } }, "Please dial the number you wish to call."),
                        React.createElement(Stack, { styles: dialpadOptionStyles },
                            React.createElement(Dialpad, { longPressTrigger: isMobileSession ? 'touch' : 'mouseAndTouch', onChange: (newValue) => {
                                    /**
                                     * We need to pass in the formatting for the phone number string in the onChange handler
                                     * to make sure the phone number is in E.164 format.
                                     */
                                    const phoneNumber = '+' + (newValue === null || newValue === void 0 ? void 0 : newValue.replace(/\D/g, ''));
                                    setDialpadParticipant(phoneNumber);
                                } })),
                        React.createElement(TextField, { required: true, id: 'alternateCallerId-input', className: outboundTextField, label: 'Azure Communication Services phone number for caller ID', placeholder: 'Please enter phone number', onChange: (_, newValue) => setAlternateCallerId(newValue), onFocus: () => setAlternateCallerIdCalloutVisible(true) }),
                        alternateCallerIdCalloutVisible && (React.createElement(Callout, { role: "dialog", gapSpace: 0, target: document.getElementById('alternateCallerId-input'), className: mergeStyles(alternateCallerIdCalloutStyles), onDismiss: () => setAlternateCallerIdCalloutVisible(false) },
                            React.createElement(Text, { block: true, className: mergeStyles(alternateCallerIdCalloutTitleStyles), variant: "large" }, "AlternateCallerId"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "This number will act as your caller id when no display name is provided."),
                                React.createElement("li", null, "Must be from same Azure Communication Services resource as the user making the call.")),
                            React.createElement(Link, { className: mergeStyles(alternateCallerIdCalloutLinkStyles), target: "_blank", href: "https://learn.microsoft.com/en-us/azure/communication-services/concepts/telephony/plan-solution" }, "Learn more about phone numbers and Azure Communication Services.")))))),
                showDisplayNameField && React.createElement(DisplayNameField, { defaultName: displayName, setName: setDisplayName }),
                React.createElement(PrimaryButton, { disabled: !buttonEnabled, className: buttonStyle, text: buttonText, onClick: () => {
                        if (displayName || teamsIdentityChosen) {
                            displayName && saveDisplayNameToLocalStorage(displayName);
                            const acsParticipantsToCall = parseParticipants(outboundParticipants);
                            const teamsParticipantsToCall = parseParticipants(outboundTeamsUsers);
                            const dialpadParticipantToCall = parseParticipants(dialPadParticipant);
                            props.startCallHandler({
                                //TODO: This needs to be updated after we change arg types of TeamsCall
                                displayName: !displayName ? 'Teams UserName PlaceHolder' : displayName,
                                callLocator: callLocator,
                                option: chosenCallOption.key,
                                role: chosenRoomsRoleOption === null || chosenRoomsRoleOption === void 0 ? void 0 : chosenRoomsRoleOption.key,
                                outboundParticipants: acsParticipantsToCall ? acsParticipantsToCall : dialpadParticipantToCall,
                                alternateCallerId,
                                teamsToken,
                                teamsId,
                                outboundTeamsUsers: teamsParticipantsToCall
                            });
                        }
                    } }),
                React.createElement("div", null,
                    React.createElement(ThemeSelector, { label: "Theme", horizontal: true }))))));
};
/**
 * splits the participant Id's so we can call multiple people.
 */
const parseParticipants = (participantsString) => {
    if (participantsString) {
        return participantsString.replaceAll(' ', '').split(',');
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=HomeScreen.js.map