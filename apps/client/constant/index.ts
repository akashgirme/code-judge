import { Instagram, Linkedin, Twitter, Youtube } from 'iconoir-react';

export enum HeaderData {
  title = 'Starting Challenges',
  description = 'Login to solve the coding challenges',
}

export const SocialLinks = [
  {
    Icon: Instagram,
    path: '/',
    title: 'Instagram',
  },
  {
    Icon: Youtube,
    path: '/',
    title: 'Youtube',
  },
  {
    Icon: Twitter,
    path: '/',
    title: 'Twitter (X)',
  },
  {
    Icon: Linkedin,
    path: '/',
    title: 'LinkedIn',
  },
];
