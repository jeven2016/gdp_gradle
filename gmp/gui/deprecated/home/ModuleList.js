/**
 * Created by zjtech on 16-8-8.
 */
import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';

export default class ModuleList extends Component {
    render() {
        return (
            <List>
                <Subheader>Nested List Items</Subheader>
                <ListItem primaryText="Sent mail" leftIcon={<ContentSend />}/>
                <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />}/>
                <ListItem
                    primaryText="Inbox"
                    leftIcon={<ContentInbox />}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                        <ListItem
                            key={1}
                            primaryText="Starred"
                            leftIcon={<ActionGrade />}
                        />,
                        <ListItem
                            key={2}
                            primaryText="Sent Mail"
                            leftIcon={<ContentSend />}
                            disabled={true}
                            nestedItems={[
                                <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />}/>,
                            ]}
                        />,
                    ]}
                />
            </List>
        );
    }
}