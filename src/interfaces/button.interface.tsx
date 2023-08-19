export enum BUTTON_TYPES {
    WEBSITE = 'WEBSITE',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    WHATSAPP = 'WHATSAPP',
    FACEBOOK = 'FACEBOOK',
    TWITTER = 'TWITTER',
    VIMEO = 'VIMEO',
}

export interface ButtonInterface {
    id: BUTTON_TYPES,
    enabled: Boolean,
    link: string
}

