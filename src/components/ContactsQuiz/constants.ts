export const QUESTIONS = [
  {
    contactId: 'c94c7e666354943881f83e030ab5d031a51cf6d99154b4506de061809d938ba2', // parent
    redHerringId: '1b23b9aae59fbe03b9af08755e8a6d5980c5e9efce92f38065a3ffdf695a65b4', // (friend)
    description:
      'Here’s the rundown of Will’s outgoing calls and SMSes to the person he communicates with most often. Look at the pattern of calls and texts, and see if you can figure out who it is.',
    explanation:
      'The communications are almost entirely via phone, not SMS – a more common pattern for talking to your folks than your mate.'
  },
  {
    contactId: '1b23b9aae59fbe03b9af08755e8a6d5980c5e9efce92f38065a3ffdf695a65b4', // friend
    redHerringId: 'c94c7e666354943881f83e030ab5d031a51cf6d99154b4506de061809d938ba2', // (parent)
    description: 'Here are Will’s communications with his second most common contact.',
    explanation: 'The SMS-heavy communication style was the giveaway.'
  },
  {
    contactId: '77e2053059fa7cb7a2c4fd82b752b8905c511c85405edc8aa4a51ecd5c8b51cf', // friend
    redHerringId: '0b296c5ea64da22b95c7f71bae8fdf3c447738d646304faa242b7fcaf8e3d2e3', // (work colleague)
    description: 'And just when you thought you were getting the hang of it, here’s a twist.',
    explanation:
      'You might have wondered if that trip to western Victoria was work-related, but it wasn’t. The communication also spread into the wee hours at times.'
  },
  {
    contactId: '0b296c5ea64da22b95c7f71bae8fdf3c447738d646304faa242b7fcaf8e3d2e3', // work colleague
    redHerringId: '1b23b9aae59fbe03b9af08755e8a6d5980c5e9efce92f38065a3ffdf695a65b4', // (friend)
    description: 'How about this one?',
    explanation: 'You may have noticed the communications are focused around the start and end of the work day.'
  },
  {
    contactId: '02927b3dd5e1b61dcdd4ef92a73af6e3894988435384abfc718d77bd0589ad4a', // work source
    redHerringId: '0b296c5ea64da22b95c7f71bae8fdf3c447738d646304faa242b7fcaf8e3d2e3', // (work colleague)
    description: 'As a journalist, sources’ identity can be critically important. Can you tell if this is a source?',
    // explanation: 'You scored [score].'
    explanation: ''
  }
];
