import React from 'react'
import Header from '../header'
import Footer from '../footer';
import WaitlistHeader from '../../components/WaitlistHeader';
import WaitlistQueue from '../../components/WaitlistQueue';
import { useRouter } from "next/router";
 
export default function CourseWaitlist() {
 const router = useRouter();
 const { courseName } = router.query;
 
 return (
   <div>
     <Header title='Computer Science Course Waitlists'/>
     <br></br>
     <WaitlistHeader courseName={courseName as string}/>
     <br></br>
     <WaitlistQueue courseName={courseName as string}/>
     <Footer title='Created by Calvin Eng' description='with minimal help from Tabitha Lynn'/>
   </div>
 )
}
