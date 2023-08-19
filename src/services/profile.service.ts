import { BUTTON_TYPES } from "interfaces/button.interface";
import { PROFILE_TYPES, ProfileCardInterface, ProfileInterface } from "interfaces/profile.interface";

export const getProfileCardList = async () => {
    // Axios call to backend
    const profileCardList: ProfileCardInterface[] = [
        {
            username: 'abhiyantran_construction',
            name: 'Padma Bhat',
            selectedDesign: PROFILE_TYPES.PROFESSIONAL,
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fabhiyantran_construction.png?alt=media&token=e0686749-ea9e-4a2f-b8a3-d5004e68d8b0'
        },
        {
            username: 'abhiyantran_construction',
            name: 'Chethan Hombesh',
            selectedDesign: PROFILE_TYPES.PERSONAL,
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fchethan_aureate.png?alt=media&token=afea942e-9e52-4d85-85fc-7d857d66ceec',
        },
        {
            username: 'abhiyantran_construction',
            name: 'Chethan Hombesh',
            selectedDesign: PROFILE_TYPES.PERSONAL,
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fchethan_aureate.png?alt=media&token=afea942e-9e52-4d85-85fc-7d857d66ceec',
        },
    ];
    return profileCardList;
};

export const getProfileData = async (username: string) => {
    // Axios call to backend
    const profileData: ProfileInterface = {
        uid: 'ieKj7S1JwXdWtoa7ZfK7YaRD0lx1',
        username: username,
        name: 'Padma Bhat',
        title: "Founder & CEO",
        company: "Abhiyantran Construction",
        email: "abhiyantran@outlook.com",
        phone: "9611146034",
        phoneCode: "91",
        website: "https://abhiyantran.webflow.io/",
        location: "Mysuru | Bengaluru",
        actionButtons: [
            {
                id: BUTTON_TYPES.EMAIL,
                enabled: true,
                link: "https://mui.com/",
            },
            {
                id: BUTTON_TYPES.PHONE,
                enabled: false,
                link: "https://mui.com/",
            }
        ],
        socials: [
            {
                id: BUTTON_TYPES.FACEBOOK,
                enabled: true,
                link: "https://mui.com/",
            },
            {
                id: BUTTON_TYPES.WHATSAPP,
                enabled: true,
                link: "https://mui.com/",
            },
            {
                id: BUTTON_TYPES.TWITTER,
                enabled: true,
                link: "https://mui.com/",
            },
            {
                id: BUTTON_TYPES.VIMEO,
                enabled: true,
                link: "https://mui.com/",
            }
        ],
        about: "Abhiyantran Constructions: Where Dreams Take Shape! Based in Karnataka, we are a dynamic construction company specializing in home renovations, end-to-end construction solutions, and the creation of stunning farmhouses and residential villas. With our innovative designs, attention to detail, and a commitment to excellence, we transform spaces into extraordinary living experiences. From revitalizing your existing home to crafting bespoke farmhouses and villas, we bring your vision to life with unmatched creativity and impeccable craftsmanship. Trust Abhiyantran Constructions to turn your dreams into architectural masterpieces!",
        selectedDesign: PROFILE_TYPES.PROFESSIONAL,
        profileImage: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fabhiyantran_construction.png?alt=media&token=e0686749-ea9e-4a2f-b8a3-d5004e68d8b0',
        coverImage: "https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/covers%2Fabhiyantran_construction.png?alt=media&token=28156db2-8aa7-4d35-aa88-957ecdbd1939"
    };
    return profileData;
};

export const getNewProfileData = async (username: string) => {
    // Axios call to backend
    const profileData: ProfileInterface = {
        uid: 'ieKj7S1JwXdWtoa7ZfK7YaRD0lx1',
        username: username,
        name: null,
        title: null,
        company: null,
        email: null,
        phone: null,
        phoneCode: null,
        website: null,
        location: null,
        socials: [],
        actionButtons: [],
        about: null,
        selectedDesign: PROFILE_TYPES.PROFESSIONAL,
        profileImage: null,
        coverImage: null
    };
    return profileData;
};

export const createProfile = (profileData: ProfileInterface) => {
    
}