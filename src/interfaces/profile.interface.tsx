import { SocialButtonInterface } from "./social.interface";

export enum PROFILE_TYPES {
    PERSONAL = 'Personal',
    PROFESSIONAL = 'Professional',
}

export interface ProfileCardInterface {
    username: string;
    name: string;
    selectedDesign: PROFILE_TYPES;
    profileImage: string;
}

export interface ProfileInterface {
    uid: string,
    username: string,
    name: string,
    title: string | null,
    company: string | null,
    email: string | null,
    phone: string | null,
    phoneCode: string | null,
    website: string | null,
    location: string | null,
    socials: SocialButtonInterface[],
    about: string | null,
    selectedDesign: PROFILE_TYPES,
    profileImage: string | null,
    coverImage: string | null
}