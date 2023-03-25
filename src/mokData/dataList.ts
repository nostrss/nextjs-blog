export type BlogPost = {
  user: User;
  postId: number;
  title: string;
  body: string;
  tag?: string[];
  createdAt: string;
  comments?: BlogComments[];
  likes?: number;
  views?: number;
};

export type BlogComments = {
  createdAt: string;
  commentId: number;
  comment: string;
  user: User;
};

export type User = {
  userId: number;
  name: string;
  profileImage: string;
};

export const blogList: BlogPost[] = [
  {
    user: {
      userId: 1,
      name: 'Alice',
      profileImage: 'https://example.com/profile-image-1.png',
    },
    postId: 1,
    title: 'First Blog Post',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices augue et ligula lobortis, vel posuere enim auctor. Nunc posuere velit sed sem fringilla tincidunt. Nam et pretium quam, nec feugiat velit. Vestibulum feugiat justo vitae odio bibendum, at rhoncus lectus tincidunt. Donec eget sem sed lacus pellentesque imperdiet. ',
    tag: ['blogging', 'first-post'],
    createdAt: '2022-03-01T10:00:00Z',
    comments: [
      {
        createdAt: '2022-03-02T09:00:00Z',
        commentId: 1,
        comment: 'Great post, thanks for sharing!',
        user: {
          userId: 2,
          name: 'Bob',
          profileImage: 'https://example.com/profile-image-2.png',
        },
      },
      {
        createdAt: '2022-03-03T14:00:00Z',
        commentId: 2,
        comment: 'I really enjoyed reading this.',
        user: {
          userId: 3,
          name: 'Charlie',
          profileImage: 'https://example.com/profile-image-3.png',
        },
      },
    ],
    likes: 20,
    views: 100,
  },
  {
    user: {
      userId: 4,
      name: 'David',
      profileImage: 'https://example.com/profile-image-4.png',
    },
    postId: 2,
    title: '10 Tips for Better Sleep',
    body: "Are you having trouble sleeping? You're not alone. Here are 10 tips that can help you get a better night's sleep: 1. Stick to a sleep schedule. 2. Create a bedtime routine. 3. Get comfortable. 4. Limit exposure to light. 5. Don't drink caffeine late in the day. 6. Don't drink alcohol before bed. 7. Don't eat a big meal before bedtime. 8. Exercise regularly. 9. Manage stress. 10. Consider sleep aids. ",
    tag: ['health', 'sleep'],
    createdAt: '2022-03-05T12:00:00Z',
    comments: [
      {
        createdAt: '2022-03-06T08:00:00Z',
        commentId: 3,
        comment: "Thanks for the tips, I'll try them out!",
        user: {
          userId: 5,
          name: 'Emma',
          profileImage: 'https://example.com/profile-image-5.png',
        },
      },
      {
        createdAt: '2022-03-07T15:00:00Z',
        commentId: 4,
        comment:
          "I've been struggling with insomnia for years, I hope this helps!",
        user: {
          userId: 6,
          name: 'Frank',
          profileImage: 'https://example.com/profile-image-6.png',
        },
      },
    ],
    likes: 30,
    views: 200,
  },
];
