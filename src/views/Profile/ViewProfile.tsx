import { FC, useEffect, useState } from 'react';
import detail1JPG from 'images/products/detail1.jpg';
import detail2JPG from 'images/products/detail2.jpg';
import detail3JPG from 'images/products/detail3.jpg';
import Policy from 'views/ProductDetail/Policy';
import { Box, Chip, Grid, Stack } from '@mui/material';
import { getProfileData } from 'services/profile.service';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { Link, useParams } from 'react-router-dom';
import Nav from 'shared/Nav/Nav';
import NavItem2 from 'components/NavItem2';
import SocialIcon from './SocialIcon';

export interface ProductDetailPageProps {
    className?: string;
}

const ViewProfile: FC<ProductDetailPageProps> = ({ className = '' }) => {
    const { username } = useParams()
    const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];
    const [profileData, setProfileData] = useState(null)
    const [tabActive, setTabActive] = useState("Man");
    useEffect(() => {
        (async () => {
            setProfileData(await getProfileData(username))
        })();
    }, [username])
    const renderSocials = () => {
        return (
            <div>
                <Nav
                    className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar m-4"
                    containerClassName="relative flex justify-center w-full text-sm md:text-base"
                >
                    {[
                        {
                            name: 'YOUTUBE',
                            link: "Women",
                        },
                        {
                            name: 'WHATSAPP',
                            link: "Women",
                        },
                        {
                            name: 'TWITTER',
                            link: "Women",
                        },
                        {
                            name: 'VIMEO',
                            link: "Women",
                        },
                        {
                            name: 'TELEGRAM',
                            link: "Women",
                        },
                        {
                            name: 'VIMEO',
                            link: "Women",
                        },
                        {
                            name: 'TELEGRAM',
                            link: "Women",
                        },

                    ].map((item, index) => (
                        <NavItem2
                            key={index}
                            isActive={tabActive === item.name}
                            onClick={() => setTabActive(item.name)}
                        >
                            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm">
                                <div className="w-10 h-10">
                                    <SocialIcon type={item.name} />
                                </div>
                            </div>
                        </NavItem2>
                    ))}
                </Nav>
            </div>
        );
    };

    if (profileData) {

        return (
            <Box className="m-auto" sx={{
                maxWidth: 480
            }} >
                <Grid container className="p-3">
                    <div className="w-full">
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={profileData.coverImage}
                                    className="w-full rounded-2xl object-cover"
                                    alt="cover"
                                />
                            </div>
                            <div
                                className="flex flex-col p-3 rounded-2xl shadow-lg bg-white  dark:bg-black mx-5 relative"
                                style={{
                                    marginTop: -60,
                                    marginBottom: 100
                                }}
                            >
                                <Stack className="my-2.5" direction={'row'} alignItems="center">
                                    <div className='mx-3'>
                                        <img
                                            style={{
                                                maxWidth: 120,
                                                maxHeight: 120
                                            }}
                                            src={profileData.image}
                                            className="rounded-full object-cover m-auto"
                                            alt="profile"
                                        />
                                    </div>
                                    <div className='mx-3'>
                                        <p className="font-semibold text-slate-900 text-xl">{profileData.name}</p>
                                        <p className="text-slate-500 mt-0.5 text-xs">{profileData.title} | {profileData.company}</p>
                                        <div className='mt-3'>
                                            {profileData && profileData.customButtons && profileData.customButtons.map((button: any, index: number) => {
                                                return <Link to={button.link} key={index}>
                                                    <ButtonPrimary
                                                        fontSize="text-xs"
                                                        sizeClass="p-2 px-3">
                                                        {button.label}
                                                    </ButtonPrimary>
                                                </Link>
                                            })}
                                        </div>
                                        {/* <p className="text-slate-500 mt-0.5 text-xs">{profileData.email}</p>
                                            <p className="text-slate-500 mt-0.5 text-xs">+ {profileData.phoneCode} {profileData.phone}</p> */}
                                    </div>

                                </Stack>
                                <div className='m-3'>
                                    <p className="text-center text-sm">{profileData.about}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Box className='fixed bottom-0 w-100 text-center m-auto' sx={{
                    maxWidth: 480
                }}>
                    {renderSocials()}
                </Box>
            </Box>
        );
    }
};

export default ViewProfile;
