

import React from 'react';
import { Message } from 'semantic-ui-react';

const AccountUsagePolicyMessage = () => {

    return (
        <Message warning>
            <Message.Header>Important</Message.Header>
            <p>
                Please do NOT use your Admin account (commonly known as ADM account). Use regular Maersk account (e.g. maersk.com, twill-logistics.com, damco.com etc.)
                                    </p>
        </Message>
    );
};

export default AccountUsagePolicyMessage;