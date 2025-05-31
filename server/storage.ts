import { users, type User, type InsertUser, media, type Media, type InsertMedia } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllMedia(): Promise<Media[]>;
  getMediaById(id: number): Promise<Media | undefined>;
  getFeaturedMedia(): Promise<Media | undefined>;
  getMediaByCategory(category: string): Promise<Media[]>;
  createMedia(media: InsertMedia): Promise<Media>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private media: Map<number, Media>;
  currentUserId: number;
  currentMediaId: number;

  constructor() {
    this.users = new Map();
    this.media = new Map();
    this.currentUserId = 1;
    this.currentMediaId = 1;
    this.initializeMediaData();
  }

  private initializeMediaData() {
    const mediaData: InsertMedia[] = [
      {
        title: "Epic Action Adventure",
        description: "An intense action-packed adventure that will keep you on the edge of your seat with spectacular stunts and amazing visual effects.",
        duration: "2:45:30",
        quality: "4K Ultra HD",
        genre: "Action",
        thumbnailUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Movies",
        rating: "4K",
        year: 2023,
        isFeatured: true
      },
      {
        title: "Love & Laughter",
        description: "A heartwarming romantic comedy about finding love in unexpected places, filled with humor and genuine emotion.",
        duration: "1:48:20",
        quality: "Full HD",
        genre: "Romance • Comedy",
        thumbnailUrl: "https://pixabay.com/get/gb6b8bb1656ae9a264524011caf16123ee287afe57ffa27e710c125bef45facacfc4d4acb92f1af85e47936ffe912af9fe396b7570f52c0b934e021caa40f2d61_1280.jpg",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Movies",
        rating: "HD",
        year: 2023,
        isFeatured: false
      },
      {
        title: "Future Horizons",
        description: "A mind-bending sci-fi thriller that explores the boundaries of technology and human consciousness in a dystopian future.",
        duration: "2:12:45",
        quality: "4K Ultra HD",
        genre: "Sci-Fi • Thriller",
        thumbnailUrl: "https://pixabay.com/get/g93c5b744b7c1a401ecf9c47669491df833633eb169b0b47c334f82a4e2ba7df77805b1de12d9ba7884e7ffe4039df14a212c14c90727ee3ee7fd98dbf1cf37de_1280.jpg",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Movies",
        rating: "NEW",
        year: 2024,
        isFeatured: false
      },
      {
        title: "Wild Planet",
        description: "An incredible journey through Earth's most remote wilderness areas, showcasing breathtaking wildlife and stunning landscapes.",
        duration: "0:52:30",
        quality: "4K Ultra HD",
        genre: "Documentary • Nature",
        thumbnailUrl: "https://pixabay.com/get/g09682da98408a377e4ea1b66851b1884e4b48608c2d8e89ca5cc7471fab9c6d16b1f70ca302f9207c75124c88527f81866c19a3cad457d7abe0cdf37f0508a4e_1280.jpg",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Documentaries",
        rating: "4K",
        year: 2023,
        isFeatured: false
      },
      {
        title: "Midnight Terror",
        description: "A spine-chilling horror experience that will haunt your dreams with psychological thrills and supernatural elements.",
        duration: "1:35:15",
        quality: "Full HD",
        genre: "Horror • Thriller",
        thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Movies",
        rating: "18+",
        year: 2023,
        isFeatured: false
      },
      {
        title: "Family Quest",
        description: "A delightful family adventure that brings together multiple generations on an unforgettable journey of discovery.",
        duration: "1:42:10",
        quality: "Full HD",
        genre: "Family • Adventure",
        thumbnailUrl: "https://pixabay.com/get/gf4cee359fe84dc10bb32bdd4b95a38dcc0554f9c3eca1844de481312dc00fd33811b1339c89e19f5da46928a676173c7c2fad1c10b0193f879f605081fb2fe01_1280.jpg",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Movies",
        rating: "PG",
        year: 2023,
        isFeatured: false
      },
      {
        title: "Championship Dreams",
        description: "An inspiring sports drama about overcoming obstacles and achieving greatness against all odds.",
        duration: "2:18:45",
        quality: "4K Ultra HD",
        genre: "Sports • Drama",
        thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Movies",
        rating: "TRENDING",
        year: 2023,
        isFeatured: false
      },
      {
        title: "Concert Special",
        description: "An electrifying live musical performance featuring incredible artists and unforgettable songs.",
        duration: "1:28:30",
        quality: "4K Ultra HD",
        genre: "Music • Live",
        thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        category: "Music",
        rating: "LIVE",
        year: 2024,
        isFeatured: false
      }
    ];

    mediaData.forEach(mediaItem => {
      this.createMedia(mediaItem);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllMedia(): Promise<Media[]> {
    return Array.from(this.media.values());
  }

  async getMediaById(id: number): Promise<Media | undefined> {
    return this.media.get(id);
  }

  async getFeaturedMedia(): Promise<Media | undefined> {
    return Array.from(this.media.values()).find(media => media.isFeatured);
  }

  async getMediaByCategory(category: string): Promise<Media[]> {
    return Array.from(this.media.values()).filter(media => media.category === category);
  }

  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = this.currentMediaId++;
    const mediaItem: Media = { ...insertMedia, id };
    this.media.set(id, mediaItem);
    return mediaItem;
  }
}

export const storage = new MemStorage();
