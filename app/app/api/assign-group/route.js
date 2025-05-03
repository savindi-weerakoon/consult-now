import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-north-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();

export async function POST(req) {
    try {
        const { group, username } = await req.json();

        await cognito.adminAddUserToGroup({
            GroupName: group,
            Username: username,
            UserPoolId: 'eu-north-1_oEtnFjfF7', // ← use your actual user pool ID
        }).promise();

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[Assign Group Error]', err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
