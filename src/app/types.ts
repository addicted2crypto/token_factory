export interface Tip {
    id: number;
    author: string;
    content: string;
    votes: number;
    upvotes: number;
    //add upvotes changed to votes for now
    downvotes: number;
  }
  