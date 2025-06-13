export interface ContentParsed {
    id: string ;
    title: string;
    date: Date;
    description: string;
    type: string;
    mediaId: string;
    createdAt: Date;
    items: NormalizedItem[]
}

export interface NormalizedItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date | null;
  author?: string;
  categories?: string[];
}

export interface ContentCardFeed {
title: string;
date: Date;
description: string;
type: string;
mediaName: string;
}


