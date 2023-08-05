export enum SOCIAL_TYPES {
    WHATSAPP = 'WHATSAPP',
    FACEBOOK = 'FACEBOOK',
    TWITTER = 'TWITTER',
    VIMEO = 'VIMEO',
}

export interface SocialButtonInterface {
    name: SOCIAL_TYPES,
    link: string
}
