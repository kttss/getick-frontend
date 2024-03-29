export class ChatFakeDb {
  public static contacts = [
    {
      id: '5725a680b3249760ea21de52',
      name: 'Youssef OUAZIZI',
      avatar: 'assets/images/avatars/Henderson.jpg',
      status: 'online',
      mood: ''
    },
    {
      id: '5725a680b8d240c011dd224b',
      name: 'Amine ALAMI',
      avatar: 'assets/images/avatars/Harper.jpg',
      status: 'online',
      mood: ''
    },

    {
      id: '5725a6809413bf8a0a5272b1',
      name: 'Said TAIBI',
      avatar: 'assets/images/avatars/Velazquez.jpg',
      status: 'online',
      mood: ''
    },
    {
      id: '5725a6809fdd915739187ed5',
      name: 'Blair',
      avatar: 'assets/images/avatars/Blair.jpg',
      status: 'offline',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      unread: 3
    },
    {
      id: '5725a68007920cf75051da64',
      name: 'Boyle',
      avatar: 'assets/images/avatars/Boyle.jpg',
      status: 'offline',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a68031fdbb1db2c1af47',
      name: 'Christy',
      avatar: 'assets/images/avatars/Christy.jpg',
      status: 'offline',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680bc670af746c435e2',
      name: 'Copeland',
      avatar: 'assets/images/avatars/Copeland.jpg',
      status: 'online',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680e7eb988a58ddf303',
      name: 'Estes',
      avatar: 'assets/images/avatars/Estes.jpg',
      status: 'away',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680dcb077889f758961',
      name: 'Harper',
      avatar: 'assets/images/avatars/Harper.jpg',
      status: 'offline',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a6806acf030f9341e925',
      name: 'Helen',
      avatar: 'assets/images/avatars/Helen.jpg',
      status: 'away',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680ae1ae9a3c960d487',
      name: 'Henderson',
      avatar: 'assets/images/avatars/Henderson.jpg',
      status: 'offline',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680b8d240c011dd224b',
      name: 'Josefina',
      avatar: 'assets/images/avatars/Josefina.jpg',
      status: 'online',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a68034cb3968e1f79eac',
      name: 'Katina',
      avatar: 'assets/images/avatars/Katina.jpg',
      status: 'away',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a6801146cce777df2a08',
      name: 'Lily',
      avatar: 'assets/images/avatars/Lily.jpg',
      status: 'do-not-disturb',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a6808a178bfd034d6ecf',
      name: 'Mai',
      avatar: 'assets/images/avatars/Mai.jpg',
      status: 'away',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680653c265f5c79b5a9',
      name: 'Nancy',
      avatar: 'assets/images/avatars/Nancy.jpg',
      status: 'do-not-disturb',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680bbcec3cc32a8488a',
      name: 'Nora',
      avatar: 'assets/images/avatars/Nora.jpg',
      status: 'do-not-disturb',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a6803d87f1b77e17b62b',
      name: 'Odessa',
      avatar: 'assets/images/avatars/Odessa.jpg',
      status: 'away',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680e87cb319bd9bd673',
      name: 'Reyna',
      avatar: 'assets/images/avatars/Reyna.jpg',
      status: 'offline',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a6802d10e277a0f35775',
      name: 'Shauna',
      avatar: 'assets/images/avatars/Shauna.jpg',
      status: 'online',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      unread: null
    },
    {
      id: '5725a680aef1e5cf26dd3d1f',
      name: 'Shepard',
      avatar: 'assets/images/avatars/Shepard.jpg',
      status: 'online',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a680cd7efa56a45aea5d',
      name: 'Tillman',
      avatar: 'assets/images/avatars/Tillman.jpg',
      status: 'do-not-disturb',
      mood: ''
    },
    {
      id: '5725a680fb65c91a82cb35e2',
      name: 'Trevino',
      avatar: 'assets/images/avatars/Trevino.jpg',
      status: 'away',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: '5725a68018c663044be49cbf',
      name: 'Tyson',
      avatar: 'assets/images/avatars/Tyson.jpg',
      status: 'do-not-disturb',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ];

  public static chats = [
    {
      id: '1725a680b3249760ea21de52',
      dialog: [
        {
          who: '5725a680b3249760ea21de52',
          message: 'Hello',
          time: '2017-03-22T08:54:28.299Z'
        },
        {
          who: '5725a6802d10e277a0f35724',
          message: 'Hey Bro!',
          time: '2017-03-22T08:55:28.299Z'
        },
        {
          who: '5725a680b3249760ea21de52',
          message: 'How are you',
          time: '2017-03-22T09:00:28.299Z'
        },
        {
          who: '5725a6802d10e277a0f35724',
          message: 'Fine, what about you?',
          time: '2017-03-22T09:02:28.299Z'
        },
        {
          who: '5725a680b3249760ea21de52',
          message: 'good :)',
          time: '2017-03-22T09:00:28.299Z'
        },
        {
          who: '5725a680b3249760ea21de52',
          message: 'I wanna ask you please!',
          time: '2017-03-22T09:00:28.299Z'
        }
      ]
    },
    {
      id: '2725a680b8d240c011dd2243',
      dialog: [
        {
          who: '5725a680b8d240c011dd224b',
          message: 'Quickly come to the meeting room 1B, we have a big server issue',
          time: '2017-04-22T01:00:00.299Z'
        },
        {
          who: '5725a6802d10e277a0f35724',
          message: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
          time: '2017-04-22T01:05:00.299Z'
        },
        {
          who: '5725a680b8d240c011dd224b',
          message: 'We are losing money! Quick!',
          time: '2017-04-22T01:10:00.299Z'
        }
      ]
    },
    {
      id: '3725a6809413bf8a0a5272b4',
      dialog: [
        {
          who: '5725a6809413bf8a0a5272b1',
          message: 'Quickly come to the meeting room 1B, we have a big server issue',
          time: '2017-04-22T02:10:00.299Z'
        }
      ]
    }
  ];

  public static user = [
    {
      id: '5725a6802d10e277a0f35724',
      name: 'John Doe',
      avatar: 'assets/images/avatars/profile.jpg',
      status: 'online',
      mood: "it's a status....not your diary...",
      chatList: [
        {
          id: '1725a680b3249760ea21de52',
          contactId: '5725a680b3249760ea21de52',
          name: 'Alice Freeman',
          unread: 1,
          lastMessage: 'I wanna ask you please!',
          lastMessageTime: '2017-06-12T02:10:18.931Z'
        },
        {
          id: '2725a680b8d240c011dd2243',
          contactId: '5725a680b8d240c011dd224b',
          name: 'Josefina',
          unread: null,
          lastMessage: 'We are losing money! Quick!',
          lastMessageTime: '2017-02-18T10:30:18.931Z'
        },
        {
          id: '3725a6809413bf8a0a5272b4',
          contactId: '5725a6809413bf8a0a5272b1',
          name: 'Velazquez',
          unread: 2,
          lastMessage: 'Quickly come to the meeting room 1B, we have a big server issue',
          lastMessageTime: '2017-03-18T12:30:18.931Z'
        }
      ]
    }
  ];
}
