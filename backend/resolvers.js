// Placeholder for actual database/service logic

// Example User data (replace with DB interaction)
const users = [
  { id: '1', username: 'Alice', email: 'alice@example.com' },
  { id: '2', username: 'Bob', email: 'bob@example.com' },
];

// Example Podcast data (replace with DB interaction)
const podcasts = [
  { id: '101', title: 'Podcast One', description: 'First ep', audioUrl: 'minio/path/1', uploaderId: '1' },
  { id: '102', title: 'Podcast Two', description: 'Second ep', audioUrl: 'minio/path/2', uploaderId: '1' },
  { id: '103', title: 'Podcast Three', description: 'Third ep', audioUrl: 'minio/path/3', uploaderId: '2' },
];

export const resolvers = {
  Query: {
    hello: () => 'Hello from Listenmode Backend via Resolver!',
    // getUser: (parent, { id }) => users.find(user => user.id === id),
    // getPodcast: (parent, { id }) => podcasts.find(podcast => podcast.id === id),
    // listPodcasts: () => podcasts,
  },

  // Add Mutation resolvers here later
  // Mutation: { ... }

  // Example: Resolver for nested types (if needed)
  User: {
    // Resolve the 'podcasts' field for a User
    podcasts: (parent) => podcasts.filter(podcast => podcast.uploaderId === parent.id),
  },

  Podcast: {
    // Resolve the 'uploader' field for a Podcast
    uploader: (parent) => users.find(user => user.id === parent.uploaderId),
  },
}; 