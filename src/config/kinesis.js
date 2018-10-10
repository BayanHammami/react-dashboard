import AWS from 'aws-sdk';

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:12147d51-1a30-4f83-a738-1ca36888f28b'
});

AWS.config.region = 'ap-southeast-2';

var kinesis = new AWS.Kinesis({
    apiVersion: '2013-12-02'
});

export const collectEvent = (eventName) => {
  var record = {
    Data: JSON.stringify({
        url: window.location.href,
        event: eventName,
        time: new Date()
    }),
    PartitionKey: 'partition-' + AWS.config.credentials.identityId
  };

  kinesis.putRecords({
      Records: [record],
      StreamName: 'simple-app'
  }, function(err, data) {
      if (err) {
          console.error(err);
      }
  });
};
