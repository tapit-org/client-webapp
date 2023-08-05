import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EmailOutlined, LanguageOutlined, LocationOnOutlined, PhoneOutlined, ShareOutlined } from '@mui/icons-material';
import { SocialButtonInterface } from 'interfaces/social.interface';
import SocialIcon from 'views/Profile/components/SocialIcon';
import NcImage from 'shared/NcImage/NcImage';
const ACTION_ICONS = {
    website: <LanguageOutlined fontSize="small" />,
    email: <EmailOutlined fontSize="small" />,
    phone: <PhoneOutlined fontSize="small" />,
}
const DefaultProfileTemplate = ({ profileData }) => {
    const renderSocials = (socials: SocialButtonInterface[]) => {
        return (
            <div>
                <Stack
                    className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar m-4 justify-items-center"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}

                >
                    {socials.map((item, index) => (
                        <Link
                            className="w-10 h-10"
                            key={index}
                            to={item.link}
                        >
                            <SocialIcon type={item.name} />
                        </Link>
                    ))}
                </Stack>
            </div>
        );
    };

    if (profileData) {
        return (
            <Box className="m-auto relative " sx={{
                maxWidth: 480
            }} >
                <Grid container className="p-3">
                    <div className="w-full">
                        <div className="relative">
                            <div>
                                <NcImage
                                    containerClassName="relative h-0 aspect-h-9 aspect-w-16 rounded-xl overflow-hidden"
                                    className="w-full rounded-2xl object-cover"
                                    src={profileData.coverImage}
                                />
                            </div>
                            <div
                                className="flex flex-col p-3 rounded-2xl shadow-lg bg-white  dark:bg-black mx-5 relative"
                                style={{
                                    marginTop: -60,
                                    marginBottom: 100
                                }}
                            >
                                <Stack className="mt-3 mb-2" direction="row" alignItems="center" sx={{ minWidth: 0 }}>
                                    <div className='mx-3'>
                                        <img
                                            style={{
                                                maxWidth: 80,
                                                maxHeight: 80
                                            }}
                                            src={profileData.profileImage || require("images/placeholder-profile.png")}
                                            className="rounded-full object-cover m-auto"
                                            alt="profile"
                                        />
                                    </div>
                                    <div className='mx-2' style={{ minWidth: 0 }}>
                                        <Typography variant='h6' className="font-semibold text-slate-900 text-xl" >{profileData.name}</Typography>
                                        <p className="text-slate-500 mt-0.5 text-xs">{profileData.title}
                                            {profileData.title && profileData.company && <span>, </span>}
                                            {profileData.company}</p>
                                    </div>
                                </Stack>
                                <Stack className='w-100 text-slate-600' alignItems="center" justifyContent="center" direction={'row'} spacing={2}>
                                    {profileData && profileData.actionButtons && profileData.actionButtons.filter((actionButton: any) => actionButton.enabled).map((actionButton: any) =>
                                        <Tooltip title={actionButton.id} key={actionButton.id} >
                                            <Link to={actionButton.link} className='my-2'>
                                                {ACTION_ICONS[actionButton.id]}
                                            </Link>
                                        </Tooltip>
                                    )}
                                    {profileData.website && <Tooltip title="Website" >
                                        <Link to={profileData.website} className='my-2'>
                                            <LanguageOutlined />
                                        </Link>
                                    </Tooltip>}
                                    {profileData.phone && <Tooltip title="Phone">
                                        <Link to={profileData.phone} className='my-2'>
                                            <PhoneOutlined />
                                        </Link>
                                    </Tooltip>}
                                    {profileData.email && <Tooltip title="Email">
                                        <Link to={profileData.email} className='my-2'>
                                            <EmailOutlined />
                                        </Link>
                                    </Tooltip>}
                                    {profileData.location && <Tooltip title="Location">
                                        <Link to={profileData.location} className='my-2'>
                                            <LocationOnOutlined />
                                        </Link>
                                    </Tooltip>}
                                    {profileData.download && <Tooltip title="Save">
                                        <Link to={profileData.download} className='my-2'>
                                            <DownloadOutlined />
                                        </Link>
                                    </Tooltip>}
                                    {profileData.share && <Tooltip title="Share">
                                        <Link to={profileData.share} className='my-2'>
                                            <ShareOutlined />
                                        </Link>
                                    </Tooltip>}
                                </Stack>
                                {profileData.about && <div className='m-3'>
                                    <p className="text-center text-sm" dangerouslySetInnerHTML={{__html: profileData.about}}></p>
                                </div>}
                            </div>
                        </div>
                    </div>
                </Grid>
                {profileData.socials.length > 0 && <Box className='absolute bottom-0 w-100 text-center m-auto' sx={{
                    maxWidth: 480
                }}>
                    {renderSocials(profileData.socials)}
                </Box>}
            </Box>
        );
    }
};

export default DefaultProfileTemplate;
