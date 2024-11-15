import {
  CSSProperties,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  SVGProps,
} from 'react';

export type IconType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>;

export type SocialIcon = {
  color: string;
  name: string;
  path: string;
};

export type NetworkLink<LinkOptions> = (
  url: string,
  options: LinkOptions
) => string;

export type WindowPosition = 'windowCenter' | 'screenCenter';

export type CustomProps<LinkOptions> = {
  buttonTitle?: string;
  /**
   * Disables click action and adds `disabled` class
   */
  disabled?: boolean;
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.CSSProperties;
  forwardedRef?: Ref<HTMLButtonElement>;
  networkName: string;
  networkLink: NetworkLink<LinkOptions>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, link: string) => void;
  openShareDialogOnClick?: boolean;
  opts: LinkOptions;
  /**
   * URL of the shared page
   */
  url: string;
  style?: React.CSSProperties;
  windowWidth?: number;
  windowHeight?: number;
  windowPosition?: WindowPosition;
  /**
   *  Takes a function that returns a Promise to be fulfilled before calling
   * `onClick`. If you do not return promise, `onClick` is called immediately.
   */
  beforeOnClick?: () => Promise<void> | void;
  /**
   * Takes a function to be called after closing share dialog.
   */
  onShareWindowClose?: () => void;
  resetButtonStyle?: boolean;
  blankTarget?: boolean;
  size?: number;
  round?: boolean;
  borderRadius?: number;
  iconStyle?: CSSProperties;
  iconFillColor?: string;
  bgColor?: string;
};

//* Share Links types

export type EmailLinkParams = {
  body?: string;
  separator?: string;
  subject?: string;
};
// Facebook Link: TYPE
export type FacebookLinkParams = { quote?: string; hashtag?: string };

// Facebook Messenger Link: TYPE
export type FacebookMessengerLinkParams = {
  appId: string;
  redirectUri?: string;
  to?: string;
};

// InstaPaper Link: TYPE
export type InstaPaperLinkParams = { title?: string; description?: string };

// Linkedin Link: TYPE
export type LinkedInLinkParams = {
  title?: string;
  summary?: string;
  source?: string;
};

// Pinterest Link: TYPE
export type PinterestLinkParams = { media: string; description?: string };

// Reddit Link: TYPE
export type RedditLinkParams = { title?: string };

// Telegram Link: TYPE
export type TelegramLinkParams = { title?: string };

// Twitter Link: TYPE
export type TwitterLinkParams = {
  title?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
};

// WhatsApp Link: TYPE
export type WhatsAppLinkParams = { title?: string; separator?: string };
