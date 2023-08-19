import { Box, Grid } from '@mui/material';
import Label from 'components/Label/Label';
import React, { FC } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import Input from 'shared/Input/Input';
import Radio from 'shared/Radio/Radio';
import Select from 'shared/Select/Select';


const ProfileForm1 = ({
    name,
    setName,
    title,
    setTitle,
    company,
    setCompany,
}) => {

    return (
        <Box className="border border-slate-200 dark:border-slate-700 px-6 py-7 rounded-xl">
            <Grid container spacing={1} className='mb-3'>
                <Grid item xs={12}>
                    <Label className="text-sm">Display name</Label>
                    <Input
                        id="name-profile"
                        type="text"
                        name="name"
                        value={name}
                        className="mt-1.5"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} className='mb-3'>
                <Grid item xs={12} md={6}>
                    <Label className="text-sm">Job Title</Label>
                    <Input
                        id="job-title"
                        type="text"
                        name="job-title"
                        value={title}
                        className="mt-1.5"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Label className="text-sm">Company</Label>
                    <Input
                        id="company"
                        type="text"
                        name="company"
                        value={company}
                        className="mt-1.5"
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Box>
    )
};

export default ProfileForm1;
