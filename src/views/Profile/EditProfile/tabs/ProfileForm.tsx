import { BusinessOutlined, PersonOutlined, TitleOutlined } from "@mui/icons-material";
import { Box, Grid} from "@mui/material";
import Input from "shared/Input/Input";

const ProfileForm = ({
    name,
    setName,
    title,
    setTitle,
    company,
    setCompany,
}) => {

    return (
        <div>
            <form noValidate>
                <Box>
                    <Grid container spacing={0}>
                        <Grid xs={12}>
                            <div className="flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <PersonOutlined fontSize="small" />
                                </span>
                                <Input
                                    id="name-profile"
                                    type="text"
                                    name="name"
                                    value={name}
                                    className="!rounded-l-none"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Display Name"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <div className="mt-2 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <TitleOutlined fontSize="small" />
                                </span>
                                <Input
                                    id="title-login"
                                    type="text"
                                    name="title"
                                    value={title}
                                    className="!rounded-l-none"
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter Title"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="mt-2 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <BusinessOutlined fontSize="small" />
                                </span>
                                <Input
                                    id="company-login"
                                    type="text"
                                    name="company"
                                    value={company}
                                    className="!rounded-l-none"
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Enter Company"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    )

};

export default ProfileForm;
