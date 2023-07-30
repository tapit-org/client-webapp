enum PROFILE_TYPES {
    PERSONAL = 'Personal',
    PROFESSIONAL = 'Professional',
}

export interface ProfileCardInterface {
    username: string;
    name: string;
    selectedDesign: PROFILE_TYPES;
    image: string;
}


export const getProfileCardList = async () => {
    // Axios call to backend
    const profileCardList: ProfileCardInterface[] = [
        {
            username: 'abhiyantran_construction',
            name: 'Padma Bhat',
            selectedDesign: PROFILE_TYPES.PROFESSIONAL,
            image: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fabhiyantran_construction.png?alt=media&token=e0686749-ea9e-4a2f-b8a3-d5004e68d8b0'
        },
        {
            username: 'abhiyantran_construction',
            name: 'Chethan Hombesh',
            selectedDesign: PROFILE_TYPES.PERSONAL,
            image: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fchethan_aureate.png?alt=media&token=afea942e-9e52-4d85-85fc-7d857d66ceec',
        },
        {
            username: 'abhiyantran_construction',
            name: 'Chethan Hombesh',
            selectedDesign: PROFILE_TYPES.PERSONAL,
            image: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fchethan_aureate.png?alt=media&token=afea942e-9e52-4d85-85fc-7d857d66ceec',
        },
    ];
    return profileCardList;
};

export const getProfileData = async (username: string) => {
    // Axios call to backend
    const profileData: any = {
        uid: 'ieKj7S1JwXdWtoa7ZfK7YaRD0lx1',
        username: username,
        name: 'Padma Bhat',
        title: "Founder & CEO",
        company: "Abhiyantran Construction",
        email: "abhiyantran@outlook.com",
        phone: "9611146034",
        phoneCode: "91",
        location: "Mysuru | Bengaluru",
        about: "Abhiyantran Constructions: Where Dreams Take Shape! Based in Karnataka, we are a dynamic construction company specializing in home renovations, end-to-end construction solutions, and the creation of stunning farmhouses and residential villas. With our innovative designs, attention to detail, and a commitment to excellence, we transform spaces into extraordinary living experiences. From revitalizing your existing home to crafting bespoke farmhouses and villas, we bring your vision to life with unmatched creativity and impeccable craftsmanship. Trust Abhiyantran Constructions to turn your dreams into architectural masterpieces!",
        selectedDesign: PROFILE_TYPES.PROFESSIONAL,
        image: 'https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/profiles%2Fabhiyantran_construction.png?alt=media&token=e0686749-ea9e-4a2f-b8a3-d5004e68d8b0',
        coverImage: "https://firebasestorage.googleapis.com/v0/b/tapit-connect-prod.appspot.com/o/covers%2Fabhiyantran_construction.png?alt=media&token=28156db2-8aa7-4d35-aa88-957ecdbd1939",
        customButtons: [
            {
                label: "Visit Website",
                link: "https://abhiyantran.webflow.io/"
            }
        ]
    };
    return profileData;
};
