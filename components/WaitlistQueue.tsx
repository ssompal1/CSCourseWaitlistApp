import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Button, Typography, Box, Grid, Stack } from "@mui/material";
import WaitlistQueueItem from "./WaitlistQueueItem";
 
interface WaitlistProps {
   courseName: string;
}
 
export default function WaitlistQueue({ courseName }: WaitlistProps) {
    const { data: session } = useSession();

    const [waitlist, setWaitlist] = useState<[string, string][]>([]);
    useEffect(() => {
        fetchWaitlist().then((data) => setWaitlist(data))
    }, []) 

    const CourseWaitlist_URL = "http://localhost:3231/getCourseWaitlist?className=" + courseName;
    async function fetchWaitlist(): Promise<[string, string][]> {
        const r = await fetch(CourseWaitlist_URL);
        const json = await r.json();
        return await (json as Promise<[string, string][]>);
    }
 
    const WaitlistUpdate_URL = "http://localhost:3231/addStudent?";
    const studentName = "studentName=" + session?.user?.name;
    const studentEmail = "email=" + session?.user?.email;
    const className = "className=" + courseName;
    async function addToWaitlist(): Promise<[string, string][]> {
        const r = await fetch(WaitlistUpdate_URL + studentName + "&" + studentEmail + "&" + className);
        const json = await r.json();
        return await (json as Promise<[string, string][]>);
    }
    
    return (
        <Grid item xs={12} md={9}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                   Queue {session?.user?.email} {session?.user?.name}
                </Typography>
                <Button variant="contained" onClick={() => {
                    addToWaitlist()
                    fetchWaitlist().then((data) => setWaitlist(data));
                }}>
                       Join Queue
               </Button>
           </Stack>
           <Box mt={1}>
               <Stack spacing={1}>
                   {waitlist.map((student, index) => (
                       <WaitlistQueueItem key={student.at(0)} name={student.at(0)} email={student.at(1)} position={index + 1}/>
                   ))}
               </Stack>
           </Box>
       </Grid>
   );
}
